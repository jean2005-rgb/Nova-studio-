/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { CreativeScene } from './components/QuantumScene';
import { ProcessTimeline, ServiceGrid, PricingCards, Testimonials, TechStack } from './components/Diagrams';
import { ChatBot } from './components/ChatBot';
import { Menu, X, ArrowRight, Mail, Phone, MoveRight, Sparkles } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

const SectionHeader: React.FC<{ subtitle: string; title: string; align?: 'left' | 'center' }> = ({ subtitle, title, align = 'center' }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className={`mb-16 ${align === 'center' ? 'text-center max-w-3xl mx-auto' : 'text-left max-w-2xl'}`}
  >
    <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-3 block flex items-center gap-2 justify-center md:justify-start">
      {align === 'left' && <Sparkles size={12} />} {subtitle}
    </span>
    <h2 className="font-serif text-4xl md:text-6xl text-brand-dark leading-[1.1]">{title}</h2>
  </motion.div>
);

const NovaLogo = () => (
  <div className="relative w-10 h-10 flex items-center justify-center group-hover:rotate-180 transition-transform duration-700 ease-in-out">
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-brand-gold" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" fill="currentColor"/>
    </svg>
  </div>
);

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: "À propos", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Processus", href: "#process" },
    { name: "Tarifs", href: "#pricing" },
  ];

  return (
    <div className="min-h-screen bg-white text-stone-800 selection:bg-brand-gold selection:text-white font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100 py-4' : 'bg-transparent py-6'}`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <NovaLogo />
            <span className="font-serif font-bold text-xl tracking-wide text-brand-dark">
              NOVA <span className="font-light text-gray-500">WEB STUDIO</span>
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-gray-600 hover:text-brand-gold transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-gold transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
            <a 
              href="#contact" 
              className="px-6 py-2.5 bg-brand-dark text-white rounded-lg hover:bg-brand-gold transition-all duration-300 shadow-lg hover:shadow-brand-gold/30 transform hover:-translate-y-0.5 text-sm font-semibold"
            >
              Démarrer un projet
            </a>
          </div>

          <button className="lg:hidden text-gray-900 p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 text-2xl font-serif"
        >
             {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMenuOpen(false)}
                className="hover:text-brand-gold transition-colors cursor-pointer"
              >
                {link.name}
              </a>
            ))}
        </motion.div>
      )}

      {/* Hero Section - Animation Unchanged */}
      <header className="relative min-h-screen flex items-center overflow-hidden bg-slate-50/50">
        <div className="absolute inset-0 z-0">
            <CreativeScene />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-left max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brand-gold/20 bg-brand-gold/5 backdrop-blur-sm text-sm font-medium text-brand-dark mb-8 shadow-sm">
              <Sparkles size={14} className="text-brand-gold" />
              <span>Studio de création numérique</span>
            </div>
            <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8 text-brand-dark tracking-tight">
              Sublimez <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-teal italic pr-4">l'expérience</span> <br/>
              digitale.
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed max-w-lg font-light">
              Nova Web Studio transforme votre vision en réalité avec un design passionné qui allie esthétique et performance.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
               <a href="#contact" className="px-8 py-4 bg-brand-dark text-white rounded-xl shadow-xl hover:bg-brand-gold transition-all duration-300 text-center font-medium flex items-center justify-center gap-2 group">
                  Démarrer mon projet <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
               </a>
               <a href="#portfolio" className="px-8 py-4 bg-white text-brand-dark border border-gray-200 rounded-xl shadow-sm hover:border-brand-gold hover:text-brand-gold transition-all duration-300 text-center font-medium">
                  Voir le portfolio
               </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div style={{ opacity }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-400 text-sm">
            <span>Scrollez pour découvrir</span>
            <div className="w-px h-12 bg-gray-300"></div>
        </motion.div>
      </header>

      <main>
        {/* About Section - Bento Style */}
        <section id="about" className="py-32 bg-white relative overflow-hidden">
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
              <div className="lg:col-span-5">
                 <SectionHeader align="left" subtitle="L'Agence" title="Plus qu'un simple studio." />
                 <div className="prose prose-lg text-gray-600 mb-12">
                    <p className="mb-6">
                      Chez <strong>Nova</strong>, je ne crée pas seulement des sites web, je conçois des systèmes digitaux qui racontent votre histoire. Avec plus de 7 ans d'expérience, mon approche fusionne la rigueur technique du développement avec la sensibilité artistique du design.
                    </p>
                    <p>
                      Ma philosophie ? Chaque pixel doit avoir une raison d'être. Pas de templates génériques, uniquement du sur-mesure pour des marques ambitieuses.
                    </p>
                 </div>
                 
                 <div className="flex gap-12 pt-8 border-t border-gray-100">
                    <div>
                        <span className="block text-5xl font-serif font-bold text-brand-dark mb-2">7+</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-gold">Années d'xp</span>
                    </div>
                    <div>
                        <span className="block text-5xl font-serif font-bold text-brand-dark mb-2">50+</span>
                        <span className="text-sm font-bold uppercase tracking-widest text-brand-gold">Projets</span>
                    </div>
                 </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-full">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="col-span-2 md:col-span-1 bg-slate-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between min-h-[280px]"
                  >
                      <Sparkles className="w-12 h-12 text-brand-gold mb-4" />
                      <div>
                          <h3 className="font-serif text-2xl font-bold mb-2">Sur Mesure</h3>
                          <p className="text-gray-500 text-sm">Une identité unique qui vous démarque de la concurrence.</p>
                      </div>
                  </motion.div>

                  <motion.div 
                     whileHover={{ y: -5 }}
                     className="col-span-2 md:col-span-1 bg-brand-dark text-white p-8 rounded-3xl flex flex-col justify-between min-h-[280px]"
                  >
                      <NovaLogo />
                      <div>
                          <h3 className="font-serif text-2xl font-bold mb-2">Excellence</h3>
                          <p className="text-gray-400 text-sm">Code optimisé, animations fluides et SEO maximisé.</p>
                      </div>
                  </motion.div>

                  <motion.div 
                     initial={{ opacity: 0, scale: 0.9 }}
                     whileInView={{ opacity: 1, scale: 1 }}
                     viewport={{ once: true }}
                     className="col-span-2 h-[300px] rounded-3xl overflow-hidden relative group"
                  >
                      <img 
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                        alt="Workspace" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent flex items-end p-8">
                          <p className="text-white font-medium">Le studio de création à Paris</p>
                      </div>
                  </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section - Asymmetrical Grid */}
        <section id="services" className="py-32 bg-slate-50">
            <div className="container mx-auto px-6">
                <SectionHeader subtitle="Expertise" title="Services sur mesure" />
                <ServiceGrid />
            </div>
        </section>

        {/* Portfolio Section - Zig Zag Large Layout */}
        <section id="portfolio" className="py-32 bg-white">
            <div className="container mx-auto px-6">
                <SectionHeader subtitle="Portfolio" title="Réalisations sélectionnées" />

                <div className="space-y-32 mt-20">
                    {/* Project 1 - Left Image */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <motion.div 
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-7 relative"
                        >
                            <div className="overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] relative">
                                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                                <img src="https://images.unsplash.com/photo-1481487484168-9b995ecc1679?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Maison Élégance" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-5"
                        >
                            <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-4 block">E-commerce • Mode</span>
                            <h3 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-brand-dark">Maison Élégance</h3>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                Refonte complète d'une boutique de mode haut de gamme. Une expérience d'achat immersive centrée sur l'image qui a permis d'augmenter le taux de conversion de 145%.
                            </p>
                            <a href="#" className="inline-flex items-center gap-3 text-brand-dark font-bold hover:text-brand-gold transition-colors group/link">
                                Voir l'étude de cas <MoveRight className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>

                    {/* Project 2 - Right Image (Reversed) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <motion.div 
                             initial={{ opacity: 0, x: -40 }}
                             whileInView={{ opacity: 1, x: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.6, delay: 0.2 }}
                             className="lg:col-span-5 order-2 lg:order-1"
                        >
                            <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-4 block">Gastronomie • Réservation</span>
                            <h3 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-brand-dark">Le Gourmet</h3>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                Conception d'un site vitrine appétissant intégrant un module de réservation complexe. Une interface épurée qui met en valeur l'art culinaire du chef.
                            </p>
                            <a href="#" className="inline-flex items-center gap-3 text-brand-dark font-bold hover:text-brand-gold transition-colors group/link">
                                Voir l'étude de cas <MoveRight className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                        <motion.div 
                             initial={{ opacity: 0, y: 40 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.6 }}
                             className="lg:col-span-7 order-1 lg:order-2 relative"
                        >
                            <div className="overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] relative">
                                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                                <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Le Gourmet" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Project 3 - Left Image */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center group">
                        <motion.div 
                             initial={{ opacity: 0, y: 40 }}
                             whileInView={{ opacity: 1, y: 0 }}
                             viewport={{ once: true }}
                             transition={{ duration: 0.6 }}
                             className="lg:col-span-7 relative"
                        >
                            <div className="overflow-hidden rounded-[2rem] shadow-2xl aspect-[4/3] relative">
                                <div className="absolute inset-0 bg-brand-dark/10 group-hover:bg-transparent transition-colors z-10 duration-500"></div>
                                <img src="https://images.unsplash.com/photo-1600508774634-4e11d34730e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80" alt="Agence Créa'Vision" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="lg:col-span-5"
                        >
                            <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-4 block">Agence • Creative</span>
                            <h3 className="font-serif text-4xl lg:text-5xl font-bold mb-6 text-brand-dark">Agence Créa'Vision</h3>
                            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                Un portfolio dynamique bourré de micro-interactions et de transitions fluides (WebGL). Un site qui ne se contente pas de montrer, mais qui démontre le savoir-faire.
                            </p>
                            <a href="#" className="inline-flex items-center gap-3 text-brand-dark font-bold hover:text-brand-gold transition-colors group/link">
                                Voir l'étude de cas <MoveRight className="group-hover/link:translate-x-1 transition-transform" />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>

        {/* Process Section */}
        <section id="process" className="py-32 bg-brand-dark text-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                     <span className="text-brand-gold font-bold tracking-widest uppercase text-xs mb-3 block">Méthodologie</span>
                     <h2 className="font-serif text-4xl md:text-5xl text-white mb-6">De l'idée au site fini</h2>
                     <p className="text-gray-400 text-lg">Un processus structuré pour des résultats prévisibles et exceptionnels.</p>
                </div>
                <ProcessTimeline />
            </div>
        </section>

         {/* Tech Stack */}
         <section className="py-20 border-b border-gray-100 bg-white">
            <div className="container mx-auto px-6 text-center">
                <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-8">Stack Technique Moderne</p>
                <TechStack />
            </div>
         </section>

        {/* Pricing */}
        <section id="pricing" className="py-32 bg-slate-50">
             <div className="container mx-auto px-6">
                <SectionHeader subtitle="Investissement" title="Formules transparentes" />
                <PricingCards />
             </div>
        </section>

        {/* Testimonials */}
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6 text-center mb-16">
                 <SectionHeader subtitle="Témoignages" title="Ils me font confiance" />
            </div>
            <Testimonials />
        </section>

        {/* Contact - Modern Card */}
        <section id="contact" className="py-24 bg-white relative">
            <div className="container mx-auto px-6">
                <div className="bg-brand-dark rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold opacity-10 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-teal opacity-10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
                        <div className="text-white">
                            <h2 className="font-serif text-5xl md:text-6xl mb-6">Démarrons un projet ensemble.</h2>
                            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
                                Vous avez une vision ? J'ai les outils pour la réaliser. Discutons de vos objectifs lors d'un premier appel gratuit.
                            </p>
                            
                            <div className="space-y-8">
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">Email</p>
                                        <p className="text-2xl font-serif">hello@nova-studio.fr</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 group cursor-pointer">
                                    <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-brand-gold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase font-bold tracking-wider mb-1">Téléphone</p>
                                        <p className="text-2xl font-serif">+33 6 12 34 56 78</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <form className="bg-white p-8 md:p-10 rounded-3xl shadow-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nom</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all" placeholder="Votre nom" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Email</label>
                                    <input type="email" className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all" placeholder="email@exemple.com" />
                                </div>
                            </div>
                            <div className="mb-6">
                                 <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Type de projet</label>
                                 <select className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all text-gray-700">
                                     <option>Site Vitrine</option>
                                     <option>E-commerce</option>
                                     <option>Application Web</option>
                                     <option>Autre</option>
                                 </select>
                            </div>
                            <div className="mb-8">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Message</label>
                                <textarea rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 outline-none transition-all" placeholder="Décrivez votre projet..."></textarea>
                            </div>
                            <button className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-brand-gold transition-all duration-300 shadow-lg transform hover:-translate-y-1">
                                Envoyer ma demande
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>

      </main>

      <footer className="bg-gray-50 text-gray-600 py-12 border-t border-gray-200">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
                 <NovaLogo />
                 <span className="font-bold text-brand-dark">NOVA WEB STUDIO</span>
            </div>
            <div className="flex gap-8 text-sm font-medium">
                <a href="#" className="hover:text-brand-gold transition-colors">Mentions Légales</a>
                <a href="#" className="hover:text-brand-gold transition-colors">Confidentialité</a>
                <a href="#" className="hover:text-brand-gold transition-colors">CGV</a>
            </div>
            <div className="text-xs text-gray-400">
                © 2024. Fait avec passion à Paris.
            </div>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
};

export default App;