
import { BrandData, LinkItem } from './types';

export interface ExtendedBrandData extends BrandData {
  slogan: string;
  stats: { label: string; value: string }[];
  team?: { name: string; role: string; crp: string }[];
  focus?: string[];
  convenios?: string[];
  emergencies: { label: string; number: string }[];
  services: (LinkItem & { iconName: string })[];
  fullBio?: string;
  testimonials?: { text: string; author: string }[];
}

export const BEM_ALI_DATA: ExtendedBrandData = {
  name: "BEM ALI",
  handle: "Espaço de Acolhimento",
  slogan: "Cuidado especializado para você e sua família, com psicologia clínica e neuroavaliação.",
  bio: "Saúde mental integral com equipe multidisciplinar no JK Shopping.",
  avatar: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=400&h=400",
  stats: [
    { value: "2+", label: "Anos" },
    { value: "1k+", label: "Vidas" },
    { value: "100%", label: "Cuidado" }
  ],
  services: [
    {
      id: "psicologia",
      title: "Psicologia Clínica",
      url: "#",
      description: "Atendimento individualizado focado em equilíbrio emocional.",
      iconName: "psychology"
    },
    {
      id: "neuro",
      title: "Neuroavaliação",
      url: "#",
      description: "Diagnóstico e acompanhamento de condições cognitivas.",
      iconName: "neuro"
    },
    {
      id: "especializado",
      title: "Suporte Integral",
      url: "#",
      description: "Especializado para neurodivergentes, gestantes e atletas.",
      iconName: "heart"
    }
  ],
  links: [
    {
      id: "whatsapp",
      title: "WhatsApp",
      url: "https://wa.me/5561999998888",
      description: "(61) 99999-8888",
    }
  ],
  team: [
    { name: "Dra. Mara Magalhães", role: "Psicóloga Clínica", crp: "01/12345" },
    { name: "Dr. João Santos", role: "Neuropsicólogo", crp: "01/23456" },
    { name: "Dra. Bárbara", role: "Psicóloga do Esporte", crp: "01/34567" }
  ],
  convenios: [
    "Unimed", "Amil", "SulAmérica", "Bradesco Saúde", 
    "NotreDame Intermédica", "Golden Cross", "Care Plus", "Omint", "Allianz"
  ],
  socials: [
    { platform: 'instagram', url: '#' },
    { platform: 'whatsapp', url: 'https://wa.me/5561999998888' },
    { platform: 'website', url: 'mailto:contato@bemali.com.br' }
  ],
  emergencies: [
    { label: "CVV", number: "188" },
    { label: "SAMU", number: "192" }
  ]
};

export const MARA_PERSONAL_DATA: ExtendedBrandData = {
  name: "MARA MAGALHÃES",
  handle: "Psicóloga Clínica | CRP 01/12345",
  slogan: "Uma jornada de escuta ética e transformação humana.",
  bio: "Especialista em traumas e ansiedade, dedicada a ressignificar histórias de vida.",
  fullBio: "Com mais de 15 anos de atuação, acredito que a psicoterapia é o caminho para a liberdade emocional. Minha abordagem une a ciência da psicologia com uma escuta profundamente humana e personalizada.",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800",
  stats: [
    { value: "15+", label: "Anos de Experiência" },
    { value: "5k+", label: "Sessões Realizadas" },
    { value: "Mestrado", label: "Formação Acadêmica" }
  ],
  services: [
    {
      id: "individual",
      title: "Psicoterapia Individual",
      url: "#",
      description: "Atendimento focado na sua singularidade, em um ambiente de total segurança e sigilo.",
      iconName: "psychology"
    },
    {
      id: "trauma",
      title: "Tratamento de Traumas",
      url: "#",
      description: "Utilização de protocolos avançados para processamento de eventos traumáticos e estresse pós-traumático.",
      iconName: "star"
    },
    {
      id: "mentoria",
      title: "Mentoria para Profissionais",
      url: "#",
      description: "Orientação clínica e ética para psicólogos que buscam elevar sua prática profissional.",
      iconName: "users"
    }
  ],
  focus: ["Traumas Complexos", "Ansiedade & Estresse", "Luto & Perdas", "Transições de Carreira", "Desenvolvimento de Lideranças"],
  testimonials: [
    { text: "A Mara me ajudou a encontrar uma clareza que eu não achava ser possível. Sou eternamente grata.", author: "Ana L." },
    { text: "Profissional impecável. Sua escuta é transformadora.", author: "Carlos M." }
  ],
  links: [
    {
      id: "whatsapp",
      title: "Agendar com Mara",
      url: "https://wa.me/5561999998888",
      description: "Horários exclusivos para novos pacientes",
    }
  ],
  socials: [
    { platform: 'instagram', url: '#' },
    { platform: 'whatsapp', url: 'https://wa.me/5561999998888' },
    { platform: 'website', url: 'mailto:mara@bemali.com.br' }
  ],
  emergencies: [
    { label: "CVV", number: "188" },
    { label: "SAMU", number: "192" }
  ]
};
