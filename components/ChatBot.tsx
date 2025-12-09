/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { MessageCircle, X, Mic, MicOff, Loader2, Volume2 } from 'lucide-react';

// Audio Helpers
function createBlob(data: Float32Array): any {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    int16[i] = data[i] * 32768;
  }
  return {
    data: encode(new Uint8Array(int16.buffer)),
    mimeType: 'audio/pcm;rate=16000',
  };
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isTalking, setIsTalking] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const audioContextRef = useRef<AudioContext | null>(null);
    const inputContextRef = useRef<AudioContext | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const processorRef = useRef<ScriptProcessorNode | null>(null);
    const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
    const sessionRef = useRef<any>(null);
    const nextStartTimeRef = useRef<number>(0);
    const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

    const connect = async () => {
        try {
            setError(null);
            setIsTalking(false);
            
            // Output Audio Context
            audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
            
            // Input Audio Context
            inputContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
            
            // Microphone Stream
            streamRef.current = await navigator.mediaDevices.getUserMedia({ audio: true });

            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

            const sessionPromise = ai.live.connect({
                model: 'gemini-2.5-flash-native-audio-preview-09-2025',
                callbacks: {
                    onopen: () => {
                        console.log('Gemini Live Connected');
                        setIsConnected(true);
                        
                        // Setup Input Processing
                        if (inputContextRef.current && streamRef.current) {
                            sourceRef.current = inputContextRef.current.createMediaStreamSource(streamRef.current);
                            processorRef.current = inputContextRef.current.createScriptProcessor(4096, 1, 1);
                            
                            processorRef.current.onaudioprocess = (e) => {
                                const inputData = e.inputBuffer.getChannelData(0);
                                const pcmBlob = createBlob(inputData);
                                sessionPromise.then((session: any) => {
                                    session.sendRealtimeInput({ media: pcmBlob });
                                });
                            };

                            sourceRef.current.connect(processorRef.current);
                            processorRef.current.connect(inputContextRef.current.destination);
                        }
                    },
                    onmessage: async (message: LiveServerMessage) => {
                        const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
                        
                        if (base64Audio && audioContextRef.current) {
                            setIsTalking(true);
                            // Simple activity timeout to toggle visual state
                            setTimeout(() => setIsTalking(false), 500);

                            const ctx = audioContextRef.current;
                            nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
                            
                            const audioBuffer = await decodeAudioData(
                                decode(base64Audio),
                                ctx,
                                24000,
                                1
                            );

                            const source = ctx.createBufferSource();
                            source.buffer = audioBuffer;
                            source.connect(ctx.destination);
                            
                            source.addEventListener('ended', () => {
                                sourcesRef.current.delete(source);
                            });

                            source.start(nextStartTimeRef.current);
                            nextStartTimeRef.current += audioBuffer.duration;
                            sourcesRef.current.add(source);
                        }

                        if (message.serverContent?.interrupted) {
                             sourcesRef.current.forEach(src => src.stop());
                             sourcesRef.current.clear();
                             nextStartTimeRef.current = 0;
                             setIsTalking(false);
                        }
                    },
                    onclose: () => {
                        console.log('Gemini Live Closed');
                        disconnect();
                    },
                    onerror: (e: any) => {
                        console.error('Gemini Live Error', e);
                        setError("Erreur de connexion");
                        disconnect();
                    }
                },
                config: {
                    responseModalities: [Modality.AUDIO],
                    systemInstruction: "Tu es Léa, l'assistante virtuelle d'un designer web freelance. Tu es française, amicale et professionnelle. Ton rôle est d'aider les clients potentiels en répondant à leurs questions sur les services (Création site vitrine, E-commerce, Apps), les tarifs (Essentiel à partir de 1500€, Pro à 3500€, Premium sur devis) et le processus. Sois concise. Si un client veut un devis précis, invite-le à utiliser le formulaire de contact ou à écrire à hello@designer-web.fr."
                }
            });

            sessionRef.current = sessionPromise;

        } catch (err) {
            console.error(err);
            setError("Microphone inaccessible");
            disconnect();
        }
    };

    const disconnect = () => {
        setIsConnected(false);
        setIsTalking(false);
        
        if (sessionRef.current) {
             // Try to close properly if the session object exposes it, 
             // but mostly we clean up local resources.
             sessionRef.current.then((s: any) => s.close && s.close());
             sessionRef.current = null;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }

        if (sourceRef.current) {
            sourceRef.current.disconnect();
            sourceRef.current = null;
        }

        if (processorRef.current) {
            processorRef.current.disconnect();
            processorRef.current = null;
        }

        if (audioContextRef.current) {
            audioContextRef.current.close();
            audioContextRef.current = null;
        }

        if (inputContextRef.current) {
            inputContextRef.current.close();
            inputContextRef.current = null;
        }
        
        sourcesRef.current.clear();
        nextStartTimeRef.current = 0;
    };

    // Cleanup on unmount
    useEffect(() => {
        return () => disconnect();
    }, []);

    const toggleChat = () => {
        if (isOpen) {
            disconnect();
            setIsOpen(false);
        } else {
            setIsOpen(true);
        }
    }

    return (
        <>
            {/* Floating Action Button */}
            <button 
                onClick={toggleChat}
                className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 ${isOpen ? 'bg-gray-800 rotate-90' : 'bg-brand-teal hover:scale-110'}`}
            >
                {isOpen ? <X color="white" size={24} /> : <MessageCircle color="white" size={24} />}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-24 right-8 z-50 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <div className="bg-brand-teal p-4 flex items-center gap-3">
                         <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                             <Volume2 className="text-white" size={20} />
                         </div>
                         <div>
                             <h3 className="font-serif font-bold text-white text-lg">Léa (IA)</h3>
                             <p className="text-teal-50 text-xs">Assistante vocale • 24/7</p>
                         </div>
                    </div>
                    
                    <div className="p-8 flex flex-col items-center justify-center min-h-[300px] bg-slate-50 relative">
                        {error ? (
                            <div className="text-center text-red-500">
                                <p className="mb-4">{error}</p>
                                <button onClick={connect} className="px-4 py-2 bg-white border border-red-200 rounded-full text-sm font-bold shadow-sm">Réessayer</button>
                            </div>
                        ) : (
                            <>
                                <div className={`w-32 h-32 rounded-full flex items-center justify-center mb-8 transition-all duration-300 relative ${isConnected ? (isTalking ? 'bg-brand-teal/10 scale-110' : 'bg-green-50') : 'bg-gray-100'}`}>
                                    {isConnected && (
                                        <div className={`absolute inset-0 rounded-full border-4 border-brand-teal/30 ${isTalking ? 'animate-pulse-slow' : ''}`}></div>
                                    )}
                                    {isConnected && isTalking && (
                                        <div className="absolute inset-0 rounded-full border-4 border-brand-teal animate-ping opacity-20"></div>
                                    )}
                                    
                                    <button 
                                        onClick={isConnected ? disconnect : connect}
                                        className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isConnected ? 'bg-white text-red-500 hover:bg-red-50' : 'bg-brand-teal text-white hover:bg-brand-accent hover:scale-105'}`}
                                    >
                                        {isConnected ? <Mic size={32} /> : <MicOff size={32} />}
                                    </button>
                                </div>

                                <div className="text-center space-y-2">
                                    <h4 className="font-bold text-gray-900 text-xl">
                                        {isConnected ? (isTalking ? "Je vous écoute..." : "En ligne") : "Démarrer la discussion"}
                                    </h4>
                                    <p className="text-sm text-gray-500 max-w-[200px] mx-auto">
                                        {isConnected 
                                            ? "Parlez naturellement pour poser vos questions sur mes services." 
                                            : "Cliquez sur le micro pour échanger de vive voix avec Léa."}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};