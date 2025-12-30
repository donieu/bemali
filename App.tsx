
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BEM_ALI_DATA } from './constants';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [welcomeMsg, setWelcomeMsg] = useState<string>("Um espaço feito para o seu acolhimento.");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeService, setActiveService] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Escreva um manifesto de uma frase curta e acolhedora sobre saúde mental para a marca 'Bem Ali'. Máximo 8 palavras.",
          config: { temperature: 0.7 }
        });
        if (response.text) setWelcomeMsg(response.text.trim().replace(/"/g, ''));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchWelcome();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveService((prev) => (prev + 1) % BEM_ALI_DATA.services.length);
        setIsTransitioning(false);
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col p-4 md:p-6 lg:p-10 bg-transparent overflow-hidden">
      {/* HEADER */}
      <header className="flex items-center justify-between mb-4 md:mb-6 animate-fade-up">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full glass p-1 animate-float shadow-xl border-2 border-white">
            <img src={BEM_ALI_DATA.avatar} alt="Logo Bem Ali" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-serif text-2xl md:text-3xl font-bold tracking-tight leading-none text-[#4a3f35]">{BEM_ALI_DATA.name}</h1>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-bold text-[#8c7e6f] mt-1.5">{BEM_ALI_DATA.handle}</p>
          </div>
        </div>
        <div className="hidden sm:flex flex-col items-end">
          <div className="px-3 py-1 glass rounded-full text-[10px] font-bold text-[#4a3f35] border border-white/40">JK SHOPPING</div>
          <span className="text-[9px] text-[#8c7e6f] mt-1.5 font-medium">Taguatinga • Brasília</span>
        </div>
      </header>

      {/* MANIFESTO */}
      <div className="mb-3 md:mb-5 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        <div className="glass rounded-2xl py-3 px-6 text-center border-white/50">
          {loading ? (
            <div className="h-3 w-32 bg-[#ede7e1] animate-pulse rounded-full mx-auto"></div>
          ) : (
            <p className="font-serif italic text-[#6b5d4d] text-sm md:text-lg">
              "{welcomeMsg}"
            </p>
          )}
        </div>
      </div>

      {/* BENTO GRID */}
      <main className="flex-1 grid grid-cols-6 grid-rows-12 gap-3 animate-fade-up" style={{ animationDelay: '0.2s' }}>
        
        {/* SERVICES CAROUSEL */}
        <div className="col-span-6 row-span-5 md:row-span-6 glass rounded-[2rem] p-6 md:p-8 relative overflow-hidden flex flex-col justify-center transition-all duration-500">
          <div className="absolute top-6 right-8 flex gap-2 z-10">
            {BEM_ALI_DATA.services.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-700 ${activeService === i ? 'w-8 bg-[#4a3f35]' : 'w-2 bg-[#d6ccc2]'}`}
              />
            ))}
          </div>
          
          <div className={`transition-all duration-700 ${isTransitioning ? 'opacity-0 scale-95 blur-sm' : 'opacity-100 scale-100 blur-0'}`}>
            <span className="text-[10px] tracking-[0.3em] font-bold text-[#8c7e6f] uppercase mb-4 block">Especialidades</span>
            <h2 className="font-serif text-3xl md:text-4xl text-[#4a3f35] font-bold leading-tight mb-4">
              {BEM_ALI_DATA.services[activeService].title}
            </h2>
            <p className="text-xs md:text-sm text-[#8c7e6f] max-w-md leading-relaxed">
              {BEM_ALI_DATA.services[activeService].description}
            </p>
            <div className="mt-6 md:mt-8">
              <button className="px-5 py-2.5 bg-[#4a3f35] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#6b5d4d] transition-all transform active:scale-95 shadow-lg shadow-[#4a3f35]/20">
                Saiba Mais
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="col-span-3 row-span-3 glass rounded-3xl p-4 flex items-center justify-around border-white/60">
          {BEM_ALI_DATA.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-xl md:text-2xl font-black text-[#4a3f35] tracking-tighter leading-none mb-1">{stat.value}</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-black text-[#8c7e6f]">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* WHATSAPP CTA */}
        <a href={BEM_ALI_DATA.links[0].url} className="col-span-3 row-span-3 bento-item bg-[#4a3f35] rounded-3xl p-4 flex flex-col items-center justify-center text-white shadow-xl shadow-[#4a3f35]/20">
          <Icon name="whatsapp" className="w-8 h-8 mb-2" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] leading-none">Agendar</span>
          <span className="text-[9px] opacity-60 mt-1.5 font-medium tracking-tighter leading-none">(61) 99999-8888</span>
        </a>

        {/* TEAM TICKER */}
        <div className="col-span-6 row-span-3 glass rounded-3xl p-5 flex flex-col justify-center border-white/40 bg-white/30">
          <div className="flex items-center gap-3 mb-3">
            <h4 className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-black text-[#8c7e6f]">Equipe</h4>
            <div className="h-px flex-1 bg-gradient-to-r from-[#e5e0db] to-transparent"></div>
          </div>
          <div className="flex justify-between items-start overflow-hidden gap-4">
            {BEM_ALI_DATA.team.map((m, i) => (
              <div key={i} className="flex flex-col min-w-0">
                <span className="text-[10px] md:text-[11px] font-bold text-[#4a3f35] truncate">{m.name}</span>
                <span className="text-[8px] text-[#8c7e6f] font-semibold truncate uppercase mt-0.5 tracking-tighter opacity-70">{m.role}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONVENIOS MARQUEE */}
        <div className="col-span-6 row-span-1 glass rounded-2xl relative overflow-hidden flex items-center bg-white/20 border-white/30">
          <div className="absolute left-0 top-0 bottom-0 px-4 bg-[#fdfcfb]/95 z-20 flex items-center border-r border-[#e5e0db]/50 backdrop-blur-md">
            <span className="text-[7px] md:text-[8px] font-black text-[#8c7e6f] uppercase tracking-[0.2em]">Convênios</span>
          </div>
          <div className="animate-marquee pl-24 pr-4">
            <div className="flex gap-10 items-center">
              {[...BEM_ALI_DATA.convenios, ...BEM_ALI_DATA.convenios].map((c, i) => (
                <span key={i} className="text-[8px] md:text-[9px] font-bold text-[#4a3f35]/60 uppercase tracking-[0.15em] whitespace-nowrap">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#fdfcfb] to-transparent z-10"></div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-4 md:mt-6 animate-fade-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex justify-between items-center pb-3 border-b border-[#ede7e1]/40">
          <div className="flex gap-6">
            {BEM_ALI_DATA.socials.map((social) => (
              <a key={social.platform} href={social.url} className="text-[#8c7e6f] hover:text-[#4a3f35] transition-all transform hover:scale-110 active:scale-90">
                <Icon name={social.platform} className="w-5 h-5 md:w-6 md:h-6" />
              </a>
            ))}
          </div>
          <div className="flex flex-col items-end gap-1">
             <div className="flex gap-3">
                <div className="flex flex-col items-end leading-none">
                  <span className="text-[7px] md:text-[8px] font-black text-[#c53030] tracking-widest mb-1">EMERGÊNCIAS</span>
                  <div className="flex gap-3">
                    <span className="text-[9px] font-bold text-[#c53030]">SAMU 192</span>
                    <span className="text-[9px] font-bold text-[#c53030]">CVV 188</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
        <div className="pt-3 flex justify-between items-center opacity-50">
           <p className="text-[7px] md:text-[8px] text-[#8c7e6f] tracking-[0.5em] font-black uppercase">Bem Ali • Studio de Acolhimento</p>
           <p className="text-[7px] md:text-[8px] text-[#8c7e6f] font-bold italic">Brasília • DF</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
