
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
      <header className="flex items-center justify-between mb-4 md:mb-6 animate-fade-up shrink-0">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-16 h-16 md:w-24 md:h-24 rounded-full glass p-1 animate-float shadow-xl border-2 border-white relative z-10 shrink-0">
            <img src={BEM_ALI_DATA.avatar} alt="Logo Bem Ali" className="w-full h-full object-cover rounded-full" />
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-tight leading-none text-[#8B5E52] truncate">{BEM_ALI_DATA.name}</h1>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-bold text-[#A3B18A] mt-1.5 truncate">{BEM_ALI_DATA.handle}</p>
            
            <div className="flex items-center gap-1.5 mt-2 text-[#8B5E52] opacity-80">
              <Icon name="map" className="w-3 h-3 md:w-3.5 md:h-3.5 shrink-0" />
              <span className="text-[9px] md:text-[10px] font-bold tracking-wide truncate">JK SHOPPING • Brasília/DF</span>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex flex-col items-end shrink-0">
          <div className="px-3 py-1.5 glass rounded-full text-[9px] font-black tracking-widest text-[#8B5E52] border border-[#8B5E52]/10 bg-white/60 shadow-sm uppercase">
            Acolhimento
          </div>
          <span className="text-[8px] text-[#A3B18A] mt-1.5 font-bold tracking-widest uppercase">Taguatinga • DF</span>
        </div>
      </header>

      {/* MANIFESTO */}
      <div className="mb-3 md:mb-5 animate-fade-up shrink-0" style={{ animationDelay: '0.1s' }}>
        <div className="glass rounded-2xl py-2 md:py-3 px-6 text-center border-white/60 bg-white/50 shadow-sm">
          {loading ? (
            <div className="h-3 w-32 bg-[#e8d8d2] animate-pulse rounded-full mx-auto"></div>
          ) : (
            <p className="font-serif italic text-[#8B5E52] text-xs md:text-xl leading-relaxed">
              "{welcomeMsg}"
            </p>
          )}
        </div>
      </div>

      {/* BENTO GRID */}
      <main className="flex-1 grid grid-cols-6 grid-rows-12 gap-3 md:gap-4 animate-fade-up min-h-0" style={{ animationDelay: '0.2s' }}>
        
        {/* SERVICES CAROUSEL */}
        <div className="col-span-6 row-span-5 md:row-span-6 glass rounded-[2rem] p-5 md:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-center transition-all duration-500 shadow-md border border-white/80">
          <div className="absolute top-5 right-6 flex gap-2 z-10">
            {BEM_ALI_DATA.services.map((_, i) => (
              <div 
                key={i} 
                className={`h-1 rounded-full transition-all duration-700 ${activeService === i ? 'w-6 md:w-10 bg-[#8B5E52]' : 'w-1.5 bg-[#e8d8d2]'}`}
              />
            ))}
          </div>
          
          <div className={`transition-all duration-700 h-full flex flex-col justify-center ${isTransitioning ? 'opacity-0 scale-98 blur-sm translate-y-2' : 'opacity-100 scale-100 blur-0 translate-y-0'}`}>
            <div className="flex items-center gap-2 mb-2 md:mb-4">
              <Icon name={BEM_ALI_DATA.services[activeService].iconName} className="w-6 h-6 md:w-8 md:h-8 text-[#A3B18A] shrink-0" />
              <span className="text-[9px] md:text-[11px] tracking-[0.3em] font-black text-[#A3B18A] uppercase">Especialidades</span>
            </div>
            
            <h2 className="font-serif text-xl md:text-3xl lg:text-4xl text-[#8B5E52] font-bold leading-tight mb-2 md:mb-4">
              {BEM_ALI_DATA.services[activeService].title}
            </h2>
            
            <p className="text-[10px] md:text-sm lg:text-base text-[#8B5E52]/80 max-w-lg leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
              {BEM_ALI_DATA.services[activeService].description}
            </p>
            
            <div className="mt-4 md:mt-8">
              <button className="px-5 py-2 md:px-7 md:py-3 bg-[#8B5E52] text-white rounded-full text-[9px] md:text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all transform active:scale-95 shadow-lg shadow-[#8B5E52]/20 flex items-center gap-2 w-fit">
                Saiba Mais
                <Icon name="check" className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="col-span-3 row-span-3 glass rounded-3xl p-3 flex items-center justify-around border-white/60 bg-white/60 shadow-sm">
          {BEM_ALI_DATA.stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <span className="block text-lg md:text-2xl font-black text-[#8B5E52] tracking-tighter leading-none mb-1 transition-transform group-hover:scale-105">{stat.value}</span>
              <span className="text-[8px] md:text-[9px] uppercase tracking-widest font-black text-[#A3B18A] scale-90 md:scale-100">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* WHATSAPP CTA */}
        <a href={BEM_ALI_DATA.links[0].url} className="col-span-3 row-span-3 bento-item bg-[#8B5E52] rounded-3xl p-3 flex flex-col items-center justify-center text-white shadow-xl shadow-[#8B5E52]/10 group">
          <Icon name="whatsapp" className="w-7 h-7 md:w-9 md:h-9 mb-1.5 md:mb-2 relative z-10 transition-transform group-hover:scale-110" />
          <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] leading-none">Agendar</span>
          <span className="text-[8px] opacity-80 mt-1 md:mt-1.5 font-medium tracking-tighter leading-none">(61) 99999-8888</span>
        </a>

        {/* TEAM */}
        <div className="col-span-6 row-span-3 glass rounded-3xl p-4 md:p-6 flex flex-col justify-center border-white/40 bg-white/40 overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 mb-2 md:mb-4">
            <h4 className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[#A3B18A] whitespace-nowrap">Equipe Técnica</h4>
            <div className="h-px flex-1 bg-gradient-to-r from-[#e8d8d2] to-transparent"></div>
          </div>
          <div className="grid grid-cols-3 gap-2 md:gap-4 overflow-hidden">
            {BEM_ALI_DATA.team.map((m, i) => (
              <div key={i} className="flex flex-col min-w-0">
                <span className="text-[9px] md:text-xs font-bold text-[#8B5E52] truncate leading-tight">{m.name.split(' ').slice(0, 2).join(' ')}</span>
                <span className="text-[7px] md:text-[9px] text-[#A3B18A] font-black uppercase mt-0.5 tracking-tighter opacity-90 truncate">{m.role.split(' ')[0]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONVENIOS MARQUEE */}
        <div className="col-span-6 row-span-1 glass rounded-2xl relative overflow-hidden flex items-center bg-white/40 border-white/40">
          <div className="absolute left-0 top-0 bottom-0 px-3 md:px-5 bg-[#F5E6E0]/95 z-20 flex items-center border-r border-[#e8d8d2]/50 backdrop-blur-md shadow-sm">
            <span className="text-[7px] md:text-[8px] font-black text-[#A3B18A] uppercase tracking-[0.15em]">Convênios</span>
          </div>
          <div className="animate-marquee pl-24 pr-4">
            <div className="flex gap-10 items-center">
              {[...BEM_ALI_DATA.convenios, ...BEM_ALI_DATA.convenios].map((c, i) => (
                <span key={i} className="text-[8px] md:text-[9px] font-bold text-[#8B5E52]/60 uppercase tracking-[0.1em] whitespace-nowrap">
                  {c}
                </span>
              ))}
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F5E6E0] to-transparent z-10"></div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="mt-4 md:mt-6 animate-fade-up shrink-0" style={{ animationDelay: '0.4s' }}>
        <div className="flex justify-between items-center pb-3 border-b border-[#e8d8d2]/60">
          <div className="flex gap-6">
            {BEM_ALI_DATA.socials.map((social) => (
              <a key={social.platform} href={social.url} className="text-[#A3B18A] hover:text-[#8B5E52] transition-all transform hover:scale-110 active:scale-90 p-1">
                <Icon name={social.platform} className="w-5 h-5 md:w-6 md:h-6 shrink-0" />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-end leading-none">
              <span className="text-[7px] font-black text-[#8B5E52] tracking-widest mb-1 uppercase opacity-60">Plantão</span>
              <div className="flex gap-2">
                <span className="text-[8px] md:text-[9px] font-bold text-[#8B5E52]/90">SAMU 192</span>
                <span className="text-[8px] md:text-[9px] font-bold text-[#8B5E52]/90">CVV 188</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-2 flex justify-between items-center opacity-50">
           <p className="text-[7px] md:text-[8px] text-[#8B5E52] tracking-[0.4em] font-black uppercase">Bem Ali • Studio de Acolhimento</p>
           <p className="text-[7px] md:text-[8px] text-[#A3B18A] font-bold italic truncate">Brasília • DF</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
