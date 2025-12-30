
import React, { useState, useEffect, useMemo, memo, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { BEM_ALI_DATA, MARA_PERSONAL_DATA, ServiceDetail, TeamMember } from './constants';
import { Icon } from './components/Icon';

// --- SUB-COMPONENTES MEMOIZADOS ---

const AnimatedStat = memo(({ value, label, icon }: { value: string, label: string, icon: string }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const numericPart = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = numericPart / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= numericPart) {
        setDisplayValue(numericPart);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [numericPart]);

  return (
    <div className="flex flex-col items-center group cursor-default relative py-2">
      <div className="absolute inset-0 bg-[#A3B18A]/5 scale-0 group-hover:scale-150 rounded-full blur-2xl transition-transform duration-700 pointer-events-none"></div>
      <div className="relative z-10 flex flex-col items-center transition-transform duration-500 group-hover:-translate-y-1">
        <div className="mb-1 opacity-20 group-hover:opacity-40 transition-opacity">
           <Icon name={icon} className="w-4 h-4 md:w-5 md:h-5 text-[#8B5E52]" />
        </div>
        <span className="text-2xl md:text-4xl font-black text-[#8B5E52] tracking-tighter">
          {displayValue}{suffix}
        </span>
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] font-black text-[#A3B18A] mt-1 group-hover:text-[#8B5E52] transition-colors">
          {label}
        </span>
      </div>
    </div>
  );
});

const FAQItem = memo(({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    const willOpen = !isOpen;
    setIsOpen(willOpen);
    
    if (willOpen && itemRef.current) {
      requestAnimationFrame(() => {
        itemRef.current?.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      });
    }
  };

  return (
    <div 
      ref={itemRef} 
      className="border-b border-[#8B5E52]/10 py-6 scroll-mt-32 transition-colors duration-300"
    >
      <button 
        onClick={handleToggle}
        className="w-full flex justify-between items-center text-left group focus:outline-none"
      >
        <span className={`text-xl md:text-2xl font-serif transition-colors duration-300 ${isOpen ? 'text-[#A3B18A]' : 'text-[#8B5E52]'}`}>
          {question}
        </span>
        <div className={`transition-transform duration-500 ease-out ${isOpen ? 'rotate-180 text-[#A3B18A]' : 'text-[#8B5E52]/40'}`}>
          <Icon name="chevron-right" className="w-6 h-6 rotate-90" />
        </div>
      </button>
      <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
        <p className="text-lg text-[#8B5E52]/70 leading-relaxed max-w-2xl">{answer}</p>
      </div>
    </div>
  );
});

const StaffBottomSheet = memo(({ isOpen, onClose, staff, onSeeFullProfile }: { 
  isOpen: boolean, 
  onClose: () => void, 
  staff: TeamMember | null,
  onSeeFullProfile?: () => void
}) => {
  if (!staff) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 z-[400] bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[401] bg-[#fdfaf9] rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.3)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-[92vh] overflow-y-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="max-w-2xl mx-auto px-6 py-10 md:px-12">
          <div className="flex justify-between items-center mb-10">
             <div className="w-12 h-1.5 bg-[#8B5E52]/10 rounded-full" />
             <button onClick={onClose} className="p-3 bg-[#8B5E52]/5 rounded-full hover:bg-[#8B5E52]/10 transition-colors">
                <Icon name="close" className="w-5 h-5 text-[#8B5E52]" />
             </button>
          </div>

          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-6 scale-110">
              <img 
                src={staff.avatar} 
                alt={staff.name} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover" 
              />
            </div>
            <h3 className="font-serif text-3xl md:text-5xl text-[#8B5E52] font-bold mb-2">{staff.name}</h3>
            <p className="text-[#A3B18A] font-black uppercase tracking-[0.3em] text-[10px] md:text-xs">{staff.role} • CRP {staff.crp}</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {staff.specialties.map((s, i) => (
              <span key={i} className="px-4 py-1.5 bg-[#A3B18A]/10 text-[#A3B18A] text-[10px] font-black uppercase tracking-widest rounded-full">
                {s}
              </span>
            ))}
          </div>

          <section className="mb-10 text-center md:text-left">
            <h4 className="font-serif text-xl text-[#8B5E52] mb-4 border-b border-[#8B5E52]/5 pb-2">Sobre o Profissional</h4>
            <p className="text-lg text-[#8B5E52]/80 leading-relaxed italic">"{staff.bio}"</p>
          </section>

          <section className="mb-10 text-center md:text-left">
            <h4 className="font-serif text-xl text-[#8B5E52] mb-4 border-b border-[#8B5E52]/5 pb-2">Abordagem Técnica</h4>
            <p className="text-lg text-[#8B5E52]/70 font-medium">{staff.approach}</p>
          </section>

          <div className="flex flex-col gap-4 mt-12 mb-6">
            <a 
              href={`https://wa.me/5561999998888?text=Olá,%20gostaria%20de%20agendar%20um%20atendimento%20com%20o(a)%20${staff.name}`}
              className="w-full py-6 bg-[#8B5E52] text-white rounded-[2rem] font-bold uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-xl"
            >
              Agendar com {staff.name.split(' ')[0]} <Icon name="whatsapp" className="w-6 h-6" />
            </a>
            
            {staff.name.includes("Mara") && onSeeFullProfile && (
              <button 
                onClick={onSeeFullProfile}
                className="w-full py-5 bg-transparent border-2 border-[#8B5E52]/20 text-[#8B5E52] rounded-[2rem] font-bold uppercase tracking-widest hover:bg-[#8B5E52]/5 transition-all"
              >
                Ver Perfil Completo
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
});

const BottomSheet = memo(({ isOpen, onClose, service, data }: { isOpen: boolean, onClose: () => void, service: ServiceDetail | null, data: any }) => {
  if (!service) return null;

  return (
    <>
      <div 
        className={`fixed inset-0 z-[300] bg-black/40 backdrop-blur-sm transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[301] bg-[#fdfaf9] rounded-t-[3.5rem] shadow-[0_-20px_50px_rgba(0,0,0,0.15)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] max-h-[94vh] overflow-y-auto ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="max-w-3xl mx-auto px-6 py-10 md:px-12 md:py-16">
          <div className="flex justify-between items-center mb-10 sticky top-0 bg-[#fdfaf9]/80 backdrop-blur-md z-10 py-2 -mt-4">
             <div className="w-12 h-1.5 bg-[#8B5E52]/10 rounded-full" />
             <button onClick={onClose} className="p-3 bg-[#8B5E52]/5 rounded-full hover:bg-[#8B5E52]/10 transition-colors">
                <Icon name="close" className="w-5 h-5 text-[#8B5E52]" />
             </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-16">
            <div className="w-20 h-20 md:w-28 md:h-28 rounded-3xl bg-[#A3B18A]/10 flex items-center justify-center shrink-0 shadow-inner">
              <Icon name={service.iconName} className="w-12 h-12 md:w-16 md:h-16 text-[#A3B18A]" />
            </div>
            <div className="text-center md:text-left">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#A3B18A] mb-2 block">Modalidade Especializada</span>
              <h3 className="font-serif text-4xl md:text-6xl text-[#8B5E52] font-bold leading-none">{service.title}</h3>
            </div>
          </div>

          <section className="mb-16">
            <h4 className="font-serif text-2xl text-[#8B5E52] mb-6 border-b border-[#8B5E52]/10 pb-4">O que esperar</h4>
            <p className="text-lg md:text-2xl text-[#8B5E52]/70 leading-relaxed font-light mb-8 italic">
              "{service.howItWorks}"
            </p>
          </section>

          <section className="mb-16">
            <h4 className="font-serif text-2xl text-[#8B5E52] mb-10 border-b border-[#8B5E52]/10 pb-4">Nossa Jornada de Cuidado</h4>
            <div className="space-y-10">
              {service.process.map((step, idx) => (
                <div key={idx} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-[#8B5E52] text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                      {idx + 1}
                    </div>
                    {idx < service.process.length - 1 && <div className="w-px h-full bg-[#8B5E52]/20 mt-2" />}
                  </div>
                  <div className="pb-4">
                    <p className="text-[#8B5E52] text-lg md:text-xl font-semibold leading-tight mb-2">Fase {idx + 1}</p>
                    <p className="text-[#8B5E52]/70 text-base md:text-lg">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-16">
            <h4 className="font-serif text-2xl text-[#8B5E52] mb-10 border-b border-[#8B5E52]/10 pb-4">O que dizem nossos pacientes</h4>
            <div className="grid md:grid-cols-2 gap-6">
              {service.testimonials.map((t, i) => (
                <div key={i} className="p-10 bg-white rounded-[3rem] shadow-sm border border-[#8B5E52]/5 relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute top-4 right-8 text-[#A3B18A]/20 font-serif text-7xl">“</div>
                  <p className="italic text-[#8B5E52]/80 relative z-10 mb-8 text-lg leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#A3B18A]/20 flex items-center justify-center">
                      <Icon name="users" className="w-4 h-4 text-[#A3B18A]" />
                    </div>
                    <span className="text-[11px] uppercase font-black tracking-widest text-[#A3B18A]">— {t.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="sticky bottom-0 bg-[#fdfaf9]/95 backdrop-blur-xl p-6 -mx-6 md:-mx-12 border-t border-[#8B5E52]/5 flex flex-col items-center justify-center">
            <a 
              href={data.links[0].url}
              className="w-full md:w-auto px-12 py-6 bg-[#8B5E52] text-white rounded-[2rem] font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-[#8B5E52]/30"
            >
              Iniciar agendamento <Icon name="whatsapp" className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </>
  );
});

const ServiceCard = memo(({ activeService, isTransitioning, data, onOpenSheet, onNext, onPrev }: any) => {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const threshold = 50; 
    const distance = touchStartX.current - touchEndX.current;
    
    if (Math.abs(distance) > threshold) {
      if (distance > 0) {
        onNext(); 
      } else {
        onPrev(); 
      }
    }
  };

  return (
    <div 
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ touchAction: 'pan-y' }}
      className="col-span-6 row-span-5 md:row-span-6 glass rounded-[2rem] p-5 md:p-8 lg:p-10 relative overflow-hidden flex flex-col justify-center shadow-md border border-white/80 transition-all duration-500 cursor-grab active:cursor-grabbing select-none"
    >
      <div className="absolute top-5 right-6 flex gap-1.5 z-10">
        {data.services.map((_: any, i: number) => (
          <div 
            key={i} 
            className={`h-1 rounded-full transition-all duration-700 ${activeService === i ? 'w-6 md:w-8 bg-[#8B5E52]' : 'w-1 bg-[#e8d8d2]'}`}
          />
        ))}
      </div>
      
      <div className={`transition-all duration-700 h-full flex flex-col justify-center ${isTransitioning ? 'opacity-0 scale-98 blur-sm translate-y-2' : 'opacity-100 scale-100 blur-0 translate-y-0'}`}>
        <div className="flex items-center gap-2 mb-2 md:mb-4">
          <Icon name={data.services[activeService]?.iconName} className="w-6 h-6 md:w-8 md:h-8 text-[#A3B18A] shrink-0" />
          <span className="text-[9px] md:text-[11px] tracking-[0.3em] font-black text-[#A3B18A] uppercase">Especialidades</span>
        </div>
        
        <h2 className="font-serif text-2xl md:text-3xl lg:text-5xl text-[#8B5E52] font-bold leading-tight mb-2 md:mb-4">
          {data.services[activeService]?.title}
        </h2>
        
        <p className="text-[11px] md:text-sm lg:text-lg text-[#8B5E52]/80 max-w-lg leading-relaxed font-medium line-clamp-2 md:line-clamp-none">
          {data.services[activeService]?.description}
        </p>
        
        <div className="mt-5 md:mt-8">
          <button 
            onClick={(e) => { e.stopPropagation(); onOpenSheet(data.services[activeService]); }}
            className="px-6 py-2.5 md:px-8 md:py-4 bg-[#8B5E52] text-white rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest hover:brightness-110 transition-all transform active:scale-95 shadow-lg shadow-[#8B5E52]/20 flex items-center gap-2 w-fit"
          >
            Conhecer Modalidade
            <Icon name="check" className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-5 left-5 right-5 flex justify-between opacity-10 pointer-events-none sm:hidden items-center">
        <Icon name="chevron-left" className="w-4 h-4" />
        <span className="text-[8px] uppercase tracking-[0.15em] font-bold">Arraste para navegar</span>
        <Icon name="chevron-right" className="w-4 h-4" />
      </div>
    </div>
  );
});

const MarqueeSection = memo(({ convenios }: { convenios: string[] }) => (
  <div className="col-span-6 row-span-1 glass rounded-2xl relative overflow-hidden flex items-center bg-white/40 border-white/40">
    <div className="absolute left-0 top-0 bottom-0 px-3 md:px-5 bg-[#F5E6E0]/95 z-20 flex items-center border-r border-[#e8d8d2]/50 backdrop-blur-md shadow-sm">
      <span className="text-[7px] md:text-[8px] font-black text-[#A3B18A] uppercase tracking-[0.15em]">Convênios</span>
    </div>
    <div className="animate-marquee pl-24 pr-4">
      <div className="flex gap-10 items-center">
        {convenios.concat(convenios).map((c, i) => (
          <span key={i} className="text-[8px] md:text-[9px] font-bold text-[#8B5E52]/60 uppercase tracking-[0.1em] whitespace-nowrap">
            {c}
          </span>
        ))}
      </div>
    </div>
    <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F5E6E0] to-transparent z-10"></div>
  </div>
));

const App: React.FC = () => {
  const [isPersonal, setIsPersonal] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [welcomeMsg, setWelcomeMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [activeService, setActiveService] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const [isStaffSheetOpen, setIsStaffSheetOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<TeamMember | null>(null);

  const servicesCount = isPersonal ? MARA_PERSONAL_DATA.services.length : BEM_ALI_DATA.services.length;

  useEffect(() => {
    const fetchWelcome = async () => {
      setLoading(true);
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = isPersonal 
          ? "Escreva um manifesto de uma frase curta (max 8 palavras) e poderosa sobre psicologia clínica para o perfil pessoal da Dra. Mara Magalhães."
          : "Escreva um manifesto de uma frase curta (max 8 palavras) e acolhedora sobre saúde mental para a marca 'Bem Ali'.";
        
        const response = await ai.models.generateContent({
          model: 'gemini-3-flash-preview',
          contents: prompt,
          config: { temperature: 0.7 }
        });
        if (response.text) setWelcomeMsg(response.text.trim().replace(/"/g, ''));
      } catch (e) {
        setWelcomeMsg(isPersonal ? "Transformando dor em crescimento consciente." : "Um espaço feito para o seu acolhimento.");
      } finally {
        setLoading(false);
      }
    };
    fetchWelcome();
  }, [isPersonal]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSheetOpen && !isStaffSheetOpen) {
        handleNextService();
      }
    }, 8000);
    return () => clearInterval(interval);
  }, [isPersonal, isSheetOpen, isStaffSheetOpen, servicesCount]);

  useEffect(() => {
    document.body.className = isPersonal ? 'personal-mode antialiased' : 'antialiased';
    document.body.style.overflow = (isSheetOpen || isStaffSheetOpen || isSwitching) ? 'hidden' : 'auto';
  }, [isPersonal, isSheetOpen, isStaffSheetOpen, isSwitching]);

  const handleNextService = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveService((prev) => (prev + 1) % servicesCount);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrevService = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveService((prev) => (prev - 1 + servicesCount) % servicesCount);
      setIsTransitioning(false);
    }, 500);
  };

  const toggleProfile = () => {
    setIsStaffSheetOpen(false);
    setIsSwitching(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setIsPersonal(!isPersonal);
      setActiveService(0);
      setIsSwitching(false);
    }, 800);
  };

  const handleOpenSheet = (service: ServiceDetail) => {
    setSelectedService(service);
    setIsSheetOpen(true);
  };

  const handleOpenStaffSheet = (member: TeamMember) => {
    setSelectedStaff(member);
    setIsStaffSheetOpen(true);
  };

  const statIcons = ['calendar', 'users', 'heart'];

  if (isPersonal) {
    return (
      <div className={`relative transition-all duration-700 ${isSwitching ? 'scale-[0.98] blur-md opacity-50' : 'scale-100 blur-0 opacity-100'}`}>
        <div className="min-h-screen w-full flex flex-col animate-fade-up">
          <button 
            onClick={toggleProfile}
            className="fixed top-6 right-6 z-[100] glass p-3 rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all border-[#A3B18A]/30 group"
          >
            <div className="flex items-center gap-3 pr-2">
              <div className="w-8 h-8 rounded-full border border-white overflow-hidden">
                 <img 
                    src={BEM_ALI_DATA.avatar} 
                    className="w-full h-full object-cover" 
                    alt="Bem Ali" 
                    loading="lazy"
                    decoding="async"
                 />
              </div>
              <span className="text-[9px] font-black uppercase tracking-widest text-[#8B5E52] hidden group-hover:block transition-all">Ir para Institucional</span>
            </div>
          </button>

          <section className="h-[90vh] md:h-screen w-full relative flex flex-col items-center justify-end md:justify-center p-8 md:p-24 overflow-hidden">
            <div className="absolute inset-0 z-0">
              <img 
                src={MARA_PERSONAL_DATA.avatar} 
                className="w-full h-full object-cover grayscale-[20%] sepia-[10%] opacity-90 transition-transform duration-[10s] hover:scale-110" 
                alt="Mara Magalhães" 
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#fdfaf9] via-[#fdfaf9]/30 to-transparent"></div>
            </div>
            <div className="relative z-10 text-center md:text-left md:w-full">
              <p className="text-[#A3B18A] uppercase tracking-[0.6em] font-black text-xs mb-4">Psicóloga Clínica</p>
              <h1 className="font-serif text-5xl md:text-[8rem] font-bold text-[#8B5E52] leading-[0.85] mb-8">Mara <br className="hidden md:block"/> Magalhães</h1>
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-end">
                <p className="max-w-md text-sm md:text-xl font-medium text-[#8B5E52]/70 italic leading-relaxed">"{welcomeMsg}"</p>
                <div className="h-px w-24 bg-[#A3B18A]/50 hidden md:block mb-4"></div>
                <p className="text-[10px] uppercase tracking-widest font-black text-[#A3B18A]">CRP 01/12345</p>
              </div>
            </div>
          </section>

          <section className="py-24 px-8 md:px-32 bg-white">
            <div className="max-w-7xl mx-auto">
              <div className="mb-16">
                <span className="text-[#A3B18A] uppercase tracking-[0.4em] font-black text-[10px]">Fundamentos Clínicos</span>
                <h2 className="font-serif text-4xl md:text-7xl text-[#8B5E52] mt-4">Minha Abordagem</h2>
              </div>
              <div className="grid md:grid-cols-3 gap-12">
                {MARA_PERSONAL_DATA.approach?.map((item, i) => (
                  <div key={i} className="group">
                    <div className="w-16 h-16 rounded-2xl bg-[#A3B18A]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                      <Icon name={item.icon} className="w-8 h-8 text-[#A3B18A]" />
                    </div>
                    <h3 className="font-serif text-2xl md:text-3xl text-[#8B5E52] mb-4">{item.title}</h3>
                    <p className="text-lg text-[#8B5E52]/70 leading-relaxed font-light">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 px-8 md:px-32 bg-[#F5E6E0]/20">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20">
              <div className="flex-1">
                <span className="text-[#A3B18A] uppercase tracking-[0.4em] font-black text-[10px]">Autoridade e Estudo</span>
                <h2 className="font-serif text-4xl md:text-7xl text-[#8B5E52] mt-4 mb-8">Trajetória e Especialização</h2>
                <p className="text-xl text-[#8B5E52]/80 leading-relaxed font-light mb-12">O estudo contínuo é o que me permite oferecer um suporte ético e atualizado às demandas complexas da vida moderna.</p>
                <div className="grid grid-cols-2 gap-8">
                  {MARA_PERSONAL_DATA.stats.map((s, i) => (
                    <AnimatedStat key={i} value={s.value} label={s.label} icon={statIcons[i]} />
                  ))}
                </div>
              </div>
              <div className="flex-1 space-y-12">
                {MARA_PERSONAL_DATA.timeline?.map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <span className="text-xl font-black text-[#A3B18A] tabular-nums">{item.year}</span>
                    <div>
                      <h4 className="font-serif text-2xl text-[#8B5E52] group-hover:translate-x-2 transition-transform">{item.title}</h4>
                      <p className="text-[#8B5E52]/60 font-medium uppercase tracking-widest text-[10px] mt-1">{item.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 px-8 md:px-32 bg-[#8B5E52] text-white">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <span className="text-[#A3B18A] uppercase tracking-[0.5em] font-black text-xs">Acolhimento Especializado</span>
                <h2 className="font-serif text-4xl md:text-7xl mt-4">Nossas Modalidades</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {MARA_PERSONAL_DATA.services.map((s, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleOpenSheet(s)}
                    className="group p-10 border border-white/10 rounded-[3rem] hover:bg-white/5 transition-all cursor-pointer flex flex-col justify-between min-h-[380px]"
                  >
                    <div>
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                        <Icon name={s.iconName} className="w-8 h-8 text-[#A3B18A]" />
                      </div>
                      <h3 className="font-serif text-3xl mb-4 leading-tight">{s.title}</h3>
                      <p className="text-white/60 text-base leading-relaxed mb-8 line-clamp-3">{s.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-[#A3B18A] text-xs font-black uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                      Conhecer modalidade <Icon name="check" className="w-4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 px-8 md:px-32 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-20">
                <span className="text-[#A3B18A] uppercase tracking-[0.4em] font-black text-[10px]">Esclarecimentos</span>
                <h2 className="font-serif text-4xl md:text-7xl text-[#8B5E52] mt-4">Dúvidas Frequentes</h2>
              </div>
              <div className="space-y-4">
                {MARA_PERSONAL_DATA.faq?.map((item, i) => (
                  <FAQItem key={i} question={item.question} answer={item.answer} />
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 px-8 md:px-32 flex flex-col items-center text-center bg-[#fdfaf9]">
            <h2 className="font-serif text-5xl md:text-[8rem] text-[#8B5E52] mb-12 leading-none">Inicie sua jornada.</h2>
            <a href={MARA_PERSONAL_DATA.links[0].url} className="px-16 py-8 bg-[#8B5E52] text-white rounded-[2rem] text-xl font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-2xl flex items-center gap-6">
              Agendar Primeiro Atendimento <Icon name="whatsapp" className="w-8 h-8" />
            </a>
          </section>
        </div>
        
        <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} service={selectedService} data={MARA_PERSONAL_DATA} />
        {isSwitching && <TransitionOverlay label="Retornando ao Bem Ali..." />}
      </div>
    );
  }

  return (
    <div className={`relative h-screen w-full flex flex-col p-4 md:p-6 lg:p-10 bg-transparent overflow-hidden transition-all duration-700 ${isSwitching ? 'scale-[0.98] blur-md opacity-50' : 'scale-100'}`}>
      <header className="flex items-center justify-between mb-4 md:mb-6 animate-fade-up shrink-0">
        <div className="flex items-center gap-4 md:gap-6">
          <div 
            onClick={toggleProfile}
            className="w-16 h-16 md:w-24 md:h-24 rounded-full glass p-1 animate-float shadow-xl border-2 border-white relative z-50 shrink-0 cursor-pointer group"
          >
            <div className="absolute -inset-1 bg-gradient-to-tr from-[#A3B18A]/20 to-transparent rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img 
                src={BEM_ALI_DATA.avatar} 
                alt="Logo Bem Ali" 
                className="w-full h-full object-cover rounded-full" 
                decoding="async"
            />
            <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-md border border-[#A3B18A]/20">
              <Icon name="star" className="w-3 h-3 text-[#A3B18A]" />
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <h1 className="font-serif text-2xl md:text-4xl font-bold tracking-tight leading-none text-[#8B5E52] truncate">{BEM_ALI_DATA.name}</h1>
            <p className="text-[9px] md:text-[10px] uppercase tracking-[0.25em] font-bold text-[#A3B18A] mt-1.5 truncate">{BEM_ALI_DATA.handle}</p>
            <div className="flex items-center gap-1.5 mt-1 opacity-70">
              <Icon name="map" className="w-2.5 h-2.5 text-[#A3B18A]" />
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.15em] text-[#8B5E52]/60">JK Shopping</span>
            </div>
          </div>
        </div>
      </header>

      <div className="mb-3 md:mb-5 animate-fade-up shrink-0">
        <div className="glass rounded-2xl py-2 md:py-3 px-6 text-center shadow-sm">
          {loading ? <div className="h-3 w-32 bg-[#e8d8d2] animate-pulse rounded-full mx-auto" /> : <p className="font-serif italic text-[#8B5E52] text-xs md:text-xl leading-relaxed">"{welcomeMsg}"</p>}
        </div>
      </div>

      <main className="flex-1 grid grid-cols-6 grid-rows-12 gap-3 md:gap-4 animate-fade-up min-h-0">
        <ServiceCard 
          activeService={activeService} 
          isTransitioning={isTransitioning} 
          data={BEM_ALI_DATA} 
          onOpenSheet={handleOpenSheet}
          onNext={handleNextService}
          onPrev={handlePrevService}
        />

        <div className="col-span-3 row-span-3 glass rounded-3xl p-3 flex items-center justify-around shadow-sm overflow-hidden relative group/stats">
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-[#A3B18A]/5 pointer-events-none"></div>
          {BEM_ALI_DATA.stats.map((stat, i) => (
            <AnimatedStat key={i} value={stat.value} label={stat.label} icon={statIcons[i]} />
          ))}
        </div>

        {/* --- BOTÃO DE AGENDAMENTO PREMIUM (ESTÁTICO & IMPACTANTE) --- */}
        <a 
          href={BEM_ALI_DATA.links[0].url} 
          className="col-span-3 row-span-3 relative overflow-hidden rounded-[2.5rem] flex flex-col items-center justify-center text-white shadow-2xl active:scale-95 transition-transform duration-300"
        >
          {/* Base de Gradiente com Textura Visual */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#6a443b] via-[#8B5E52] to-[#A3B18A] opacity-100"></div>
          
          {/* Spotlight Estático Central (Glow Permanente) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 blur-[40px] rounded-full pointer-events-none"></div>

          {/* Borda Superior de "Brilho de Vidro" */}
          <div className="absolute top-0 left-4 right-4 h-[1px] bg-white/30 rounded-full"></div>

          {/* Conteúdo do Card */}
          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Ícone com Batida de Coração Sutil */}
            <div className="relative mb-2">
              <div className="absolute inset-0 bg-[#A3B18A] blur-lg opacity-40 scale-125 animate-pulse"></div>
              <Icon name="whatsapp" className="w-8 h-8 md:w-10 md:h-10 relative z-20 drop-shadow-lg" />
            </div>

            <div className="flex flex-col gap-0.5">
              <span className="text-[12px] md:text-[14px] font-black uppercase tracking-[0.3em] leading-none text-white drop-shadow-md">
                Agendar
              </span>
              <span className="text-[7px] md:text-[8px] font-medium text-white/70 uppercase tracking-[0.2em] italic">
                Cuidado Humanizado
              </span>
            </div>
          </div>

          {/* Detalhe Minimalista no Canto */}
          <div className="absolute bottom-3 right-5 opacity-30">
            <Icon name="check" className="w-3 h-3 text-white" />
          </div>
        </a>

        <div className="col-span-6 row-span-4 glass rounded-[2.5rem] p-4 md:p-6 flex flex-col justify-center shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <h4 className="text-bold text-[8px] md:text-[11px] uppercase tracking-[0.3em] font-black text-[#A3B18A]">Corpo Clínico Especializado</h4>
            <div className="h-px flex-1 bg-gradient-to-r from-[#e8d8d2] to-transparent" />
          </div>
          <div className="grid grid-cols-3 gap-3 md:gap-6 overflow-hidden px-2">
            {BEM_ALI_DATA.team?.map((m, i) => (
              <div 
                key={i} 
                className="flex flex-col items-center text-center group cursor-pointer" 
                onClick={() => handleOpenStaffSheet(m)}
              >
                <div className="w-12 h-12 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white shadow-md mb-2 group-hover:scale-105 transition-transform duration-500">
                  <img 
                    src={m.avatar} 
                    alt={m.name} 
                    className="w-full h-full object-cover" 
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-[9px] md:text-[11px] font-bold text-[#8B5E52] leading-tight truncate px-1">{m.name.split(' ').slice(0, 2).join(' ')}</span>
                  <span className="text-[7px] md:text-[9px] text-[#A3B18A] font-black uppercase mt-0.5 tracking-tighter">CRP {m.crp.split(' ')[1] || m.crp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <MarqueeSection convenios={BEM_ALI_DATA.convenios || []} />
      </main>

      <BottomSheet isOpen={isSheetOpen} onClose={() => setIsSheetOpen(false)} service={selectedService} data={BEM_ALI_DATA} />
      <StaffBottomSheet 
        isOpen={isStaffSheetOpen} 
        onClose={() => setIsStaffSheetOpen(false)} 
        staff={selectedStaff}
        onSeeFullProfile={toggleProfile}
      />
      {isSwitching && <TransitionOverlay label="Abrindo perfil de Mara Magalhães..." />}
    </div>
  );
};

const TransitionOverlay = ({ label }: { label: string }) => (
  <div className="fixed inset-0 z-[500] flex items-center justify-center bg-[#fdfaf9]/90 backdrop-blur-xl animate-pulse">
    <div className="flex flex-col items-center gap-6 text-center px-8">
      <div className="w-24 h-24 rounded-full border-4 border-t-[#8B5E52] border-[#A3B18A]/20 animate-spin"></div>
      <p className="font-serif text-3xl text-[#8B5E52] italic">{label}</p>
    </div>
  </div>
);

export default App;
