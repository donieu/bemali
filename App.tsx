
import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BEM_ALI_DATA } from './constants';
import { Icon } from './components/Icon';

const App: React.FC = () => {
  const [welcomeMsg, setWelcomeMsg] = useState<string>("Cuidar de você é o nosso propósito.");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchWelcome = async () => {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: "Crie uma frase curta de acolhimento psicológico (máximo 8 palavras) para a clínica 'Bem Ali'. O tom deve ser profissional, calmo e humano.",
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

  return (
    <div className="h-screen w-full flex flex-col p-3 md:p-6 bg-[#fdfcfb] overflow-hidden">
      {/* Header - Very Slim */}
      <header className="flex items-center justify-between mb-4 px-2 animate-fade-up">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border border-[#d6ccc2] p-0.5 overflow-hidden bg-white shadow-sm">
            <img src={BEM_ALI_DATA.avatar} alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight leading-none text-[#4a3f35]">{BEM_ALI_DATA.name}</h1>
            <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-[#8c7e6f]">{BEM_ALI_DATA.handle}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-[10px] font-bold text-[#4a3f35] bg-[#ede7e1] px-2 py-0.5 rounded-full">JK SHOPPING</span>
           <span className="text-[8px] text-[#8c7e6f] mt-1 font-medium">Taguatinga Centro, DF</span>
        </div>
      </header>

      {/* Main Bento Area */}
      <main className="flex-1 grid grid-cols-6 grid-rows-12 gap-2 animate-fade-up" style={{ animationDelay: '0.1s' }}>
        
        {/* Gemini Welcome - Span Width */}
        <div className="col-span-6 row-span-1 glass rounded-xl flex items-center justify-center px-4 border border-[#e5e0db]">
          {loading ? (
            <div className="h-2 w-20 bg-[#ede7e1] animate-pulse rounded-full"></div>
          ) : (
            <p className="font-serif italic text-[#6b5d4d] text-sm text-center">"{welcomeMsg}"</p>
          )}
        </div>

        {/* Services Section - Primary Call to Action */}
        <a href={BEM_ALI_DATA.links[0].url} className="col-span-3 row-span-4 bento-item glass rounded-2xl p-4 flex flex-col justify-between group bg-[#f8f5f2]">
           <div className="p-2 bg-white rounded-lg w-fit shadow-sm text-[#4a3f35]">
              <Icon name="website" className="w-5 h-5" />
           </div>
           <div>
              <h3 className="font-serif text-lg leading-tight text-[#4a3f35] font-bold">{BEM_ALI_DATA.links[0].title}</h3>
              <p className="text-[9px] text-[#8c7e6f] mt-1 leading-tight">{BEM_ALI_DATA.links[0].description}</p>
           </div>
        </a>

        <a href={BEM_ALI_DATA.links[1].url} className="col-span-3 row-span-4 bento-item glass rounded-2xl p-4 flex flex-col justify-between group bg-[#f2f0ed]">
           <div className="p-2 bg-white rounded-lg w-fit shadow-sm text-[#4a3f35]">
              <Icon name="website" className="w-5 h-5 opacity-60" />
           </div>
           <div>
              <h3 className="font-serif text-lg leading-tight text-[#4a3f35] font-bold">{BEM_ALI_DATA.links[1].title}</h3>
              <p className="text-[9px] text-[#8c7e6f] mt-1 leading-tight">{BEM_ALI_DATA.links[1].description}</p>
           </div>
        </a>

        {/* Stats - Compact Row */}
        <div className="col-span-6 row-span-2 glass rounded-2xl flex items-center justify-around px-2 bg-white/40 border border-[#eee8e2]">
          {BEM_ALI_DATA.stats.map((stat, i) => (
            <div key={i} className="text-center">
              <span className="block text-lg font-bold text-[#4a3f35] leading-none">{stat.value}</span>
              <span className="text-[8px] uppercase tracking-widest text-[#8c7e6f] font-bold">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="col-span-4 row-span-4 glass rounded-2xl p-4 flex flex-col justify-center gap-2 border border-[#eee8e2]">
          <h4 className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#8c7e6f] border-b border-[#e5e0db] pb-1 mb-1">Equipe Técnica</h4>
          {BEM_ALI_DATA.team.map((m, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-[#4a3f35]">{m.name}</span>
                <span className="text-[8px] text-[#8c7e6f]">{m.role}</span>
              </div>
              <span className="text-[7px] font-mono text-[#b0a194] bg-[#fdfcfb] px-1 rounded border">{m.crp}</span>
            </div>
          ))}
        </div>

        {/* Contact/WhatsApp - Square */}
        <a href={BEM_ALI_DATA.links[2].url} className="col-span-2 row-span-4 bento-item bg-[#4a3f35] rounded-2xl p-4 flex flex-col items-center justify-center text-center text-white">
          <Icon name="whatsapp" className="w-8 h-8 mb-2" />
          <span className="text-[10px] font-bold uppercase tracking-widest">WhatsApp</span>
          <span className="text-[8px] opacity-70 mt-1">Agendar Agora</span>
        </a>

        {/* Convênios - Horizontal Scrolling strip mockup (non-scrollable but list) */}
        <div className="col-span-3 row-span-1 glass rounded-xl px-3 flex items-center gap-2 overflow-hidden bg-white/30">
          <span className="text-[7px] font-bold text-[#8c7e6f] uppercase">Convênios:</span>
          <div className="flex gap-2 text-[7px] text-[#4a3f35] font-semibold whitespace-nowrap">
            {BEM_ALI_DATA.convenios.slice(0, 3).join(" • ")}...
          </div>
        </div>

        {/* Emergencies - Horizontal Strip */}
        <div className="col-span-3 row-span-1 glass rounded-xl px-3 flex items-center justify-between bg-[#fff4f2] border-[#f8d7da]">
          <span className="text-[7px] font-bold text-[#c53030] uppercase">Emergência:</span>
          <div className="flex gap-3">
             <span className="text-[8px] font-bold text-[#c53030]">CVV 188</span>
             <span className="text-[8px] font-bold text-[#c53030]">SAMU 192</span>
          </div>
        </div>

      </main>

      {/* Footer - Minimal */}
      <footer className="mt-4 flex flex-col items-center gap-2 animate-fade-up" style={{ animationDelay: '0.3s' }}>
        <div className="flex gap-6">
          {BEM_ALI_DATA.socials.map((social) => (
            <a key={social.platform} href={social.url} className="text-[#8c7e6f] hover:text-[#4a3f35] transition-transform hover:scale-125">
              <Icon name={social.platform} className="w-4 h-4" />
            </a>
          ))}
        </div>
        <div className="text-center">
           <p className="text-[8px] text-[#8c7e6f] tracking-[0.3em] font-bold uppercase">Bem Ali • Espaço de Acolhimento</p>
           <p className="text-[7px] text-[#b0a194] mt-1 italic">Taguatinga Centro • Brasília DF</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
