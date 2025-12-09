/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Monitor, ShoppingBag, Smartphone, Search, PenTool, Layout, Code, LineChart, Shield, Zap, MoveRight } from 'lucide-react';

// --- PROCESS TIMELINE (Redesigned) ---
export const ProcessTimeline: React.FC = () => {
    const steps = [
        { id: 1, title: "Découverte", desc: "Audit et Stratégie", icon: Search },
        { id: 2, title: "Wireframing", desc: "Structure et UX", icon: Layout },
        { id: 3, title: "Design UI", desc: "Maquettes Haute-fidélité", icon: PenTool },
        { id: 4, title: "Développement", desc: "Code Clean & SEO", icon: Code },
        { id: 5, title: "Lancement", desc: "Mise en ligne & Tests", icon: Zap },
    ];

    const [activeStep, setActiveStep] = useState(0);

    return (
        <div className="relative py-10">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-800 -z-10 hidden md:block transform -translate-y-1/2"></div>
            
            <div className="flex flex-col md:flex-row justify-between gap-8">
                {steps.map((step, index) => {
                    const Icon = step.icon;
                    return (
                        <motion.div 
                            key={step.id} 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex flex-col items-center group cursor-pointer"
                            onMouseEnter={() => setActiveStep(index)}
                        >
                            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-500 mb-6 border-2 relative overflow-hidden ${index <= activeStep ? 'border-brand-teal bg-gray-900 shadow-[0_0_30px_rgba(95,158,160,0.3)]' : 'border-gray-700 bg-gray-900'}`}>
                                <div className={`absolute inset-0 bg-brand-teal opacity-0 transition-opacity duration-300 ${index === activeStep ? 'opacity-20' : ''}`}></div>
                                <Icon size={28} className={index <= activeStep ? 'text-brand-teal' : 'text-gray-500'} />
                            </div>
                            <h4 className={`font-serif text-xl font-bold mb-1 ${index <= activeStep ? 'text-white' : 'text-gray-500'}`}>{step.title}</h4>
                            <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">{step.desc}</p>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    );
};

// --- SERVICE GRID (Bento Style) ---
export const ServiceGrid: React.FC = () => {
    const services = [
        {
            title: "Design & UX/UI",
            desc: "Création d'interfaces uniques qui captivent votre audience dès le premier regard.",
            icon: Monitor,
            className: "md:col-span-2 md:row-span-1 bg-gray-900 text-white",
            iconColor: "text-brand-teal"
        },
        {
            title: "E-commerce",
            desc: "Boutiques Shopify & Woo ultra-performantes.",
            icon: ShoppingBag,
            className: "md:col-span-1 md:row-span-2 bg-white border border-gray-100",
            iconColor: "text-blue-600"
        },
        {
            title: "App Web",
            desc: "Solutions SaaS et outils métiers complexes.",
            icon: Smartphone,
            className: "md:col-span-1 bg-white border border-gray-100",
            iconColor: "text-purple-600"
        },
        {
            title: "SEO & Perf",
            desc: "Optimisation technique pour Google.",
            icon: LineChart,
            className: "md:col-span-1 bg-white border border-gray-100",
            iconColor: "text-orange-600"
        },
        {
            title: "Branding",
            desc: "Identité visuelle complète.",
            icon: PenTool,
            className: "md:col-span-1 bg-brand-teal text-white",
            iconColor: "text-white"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[200px]">
            {services.map((s, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`p-8 rounded-3xl flex flex-col justify-between shadow-sm hover:shadow-xl transition-shadow ${s.className}`}
                >
                    <div className="flex justify-between items-start">
                        <s.icon size={32} className={s.iconColor} />
                        <div className="w-8 h-8 rounded-full border border-current opacity-20 flex items-center justify-center">
                            <MoveRight size={14} />
                        </div>
                    </div>
                    <div>
                        <h3 className="font-serif text-2xl font-bold mb-2">{s.title}</h3>
                        <p className={`text-sm ${s.className.includes('text-white') ? 'text-white/70' : 'text-gray-500'}`}>{s.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

// --- PRICING CARDS ---
export const PricingCards: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* ESSENTIAL */}
            <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Starter</span>
                <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">Essentiel</h3>
                <div className="text-4xl font-bold text-gray-900 mb-8">1 500€</div>
                
                <ul className="space-y-4 mb-8">
                    {["Site vitrine (5 pages)", "Design Responsive", "SEO de base", "Admin simplifiée"].map((feat, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                            <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0"><Check size={12} /></div>
                            {feat}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-3 border border-gray-200 text-gray-900 font-bold rounded-xl hover:border-gray-900 transition-colors">Choisir Essentiel</button>
            </motion.div>

            {/* PRO - Featured */}
            <motion.div whileHover={{ y: -10 }} className="p-8 bg-gray-900 text-white rounded-3xl shadow-2xl relative md:scale-110 z-10">
                <div className="absolute top-0 right-0 bg-brand-teal text-white text-xs font-bold px-4 py-2 rounded-bl-2xl rounded-tr-2xl uppercase tracking-wider">Recommandé</div>
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Croissance</span>
                <h3 className="font-serif text-3xl font-bold text-white mb-4">Pro</h3>
                <div className="text-4xl font-bold text-brand-teal mb-8">3 500€</div>
                
                <ul className="space-y-4 mb-8">
                    {["Site complet (10 pages)", "Design Sur-mesure", "Animations avancées", "Stratégie de contenu", "Optimisation perf."].map((feat, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm text-gray-300">
                             <div className="w-5 h-5 rounded-full bg-brand-teal flex items-center justify-center text-white shrink-0"><Check size={12} /></div>
                            {feat}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-4 bg-brand-teal text-white font-bold rounded-xl hover:bg-white hover:text-gray-900 transition-colors shadow-lg">Choisir Pro</button>
            </motion.div>

            {/* PREMIUM */}
            <motion.div whileHover={{ y: -10 }} className="p-8 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Entreprise</span>
                <h3 className="font-serif text-3xl font-bold text-gray-900 mb-4">Premium</h3>
                <div className="text-4xl font-bold text-gray-900 mb-8">Sur devis</div>
                
                <ul className="space-y-4 mb-8">
                    {["E-commerce complexe", "Applications Web / SaaS", "Branding intégral", "Support prioritaire 24/7"].map((feat, i) => (
                         <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                             <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 shrink-0"><Check size={12} /></div>
                            {feat}
                        </li>
                    ))}
                </ul>
                <button className="w-full py-3 border border-gray-200 text-gray-900 font-bold rounded-xl hover:border-gray-900 transition-colors">Me contacter</button>
            </motion.div>
        </div>
    );
}

// --- TESTIMONIALS ---
export const Testimonials: React.FC = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {[
                {
                    name: "Sophie Martin",
                    role: "Atelier Botanique",
                    text: "Une expérience exceptionnelle. Il a su capturer l'essence de ma marque. Nos ventes en ligne ont triplé !",
                    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                },
                {
                    name: "Thomas Dupont",
                    role: "TechInnovate",
                    text: "Professionnel et créatif. L'attention portée aux détails a fait toute la différence. Je recommande !",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                },
                {
                    name: "Marie Lefebvre",
                    role: "Wellness Studio",
                    text: "Un designer talentueux qui écoute vraiment. Le système de réservation a simplifié notre gestion.",
                    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80"
                }
            ].map((t, i) => (
                <div key={i} className="bg-slate-50 p-8 rounded-[2rem] hover:bg-white hover:shadow-xl transition-all duration-300 border border-transparent hover:border-gray-100 group">
                    <div className="flex items-center gap-4 mb-6">
                        <img src={t.image} alt={t.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white" />
                        <div>
                            <h4 className="font-serif font-bold text-gray-900">{t.name}</h4>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">{t.role}</p>
                        </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">"{t.text}"</p>
                    <div className="flex gap-1 mt-4 text-brand-teal opacity-50">
                        {[...Array(5)].map((_, idx) => <Star key={idx} size={12} fill="currentColor" />)}
                    </div>
                </div>
            ))}
        </div>
    );
};

// --- TECH STACK (Ticker Style) ---
export const TechStack: React.FC = () => {
    const techs = ["Figma", "React.js", "TypeScript", "Node.js", "Next.js", "Webflow", "Tailwind CSS", "Shopify", "WordPress", "Three.js", "SEO"];
    
    return (
        <div className="flex flex-wrap justify-center gap-4">
            {techs.map((tech, i) => (
                <span key={i} className="px-6 py-3 bg-white border border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-brand-teal hover:text-brand-teal transition-colors cursor-default shadow-sm">
                    {tech}
                </span>
            ))}
        </div>
    )
}