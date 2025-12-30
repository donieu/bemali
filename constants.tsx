
import { BrandData } from './types';

export interface ExtendedBrandData extends BrandData {
  slogan: string;
  stats: { label: string; value: string }[];
  team: { name: string; role: string; crp: string }[];
  convenios: string[];
  emergencies: { label: string; number: string }[];
}

export const BEM_ALI_DATA: ExtendedBrandData = {
  name: "BEM ALI",
  handle: "Espaço de Acolhimento",
  slogan: "Cuidado especializado para você e sua família, com psicologia clínica e neuroavaliação.",
  bio: "Saúde mental integral com equipe multidisciplinar no JK Shopping.",
  avatar: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=200&h=200",
  stats: [
    { value: "2+", label: "Anos" },
    { value: "1k+", label: "Vidas" },
    { value: "100%", label: "Cuidado" }
  ],
  links: [
    {
      id: "psicologia",
      title: "Psicologia Clínica",
      url: "#",
      description: "Equilíbrio emocional para todas as idades.",
      isFeatured: true
    },
    {
      id: "neuro",
      title: "Neuroavaliação",
      url: "#",
      description: "Diagnóstico e acompanhamento cognitivo.",
      isFeatured: true
    },
    {
      id: "whatsapp",
      title: "WhatsApp",
      url: "https://wa.me/5561999998888",
      description: "(61) 99999-8888",
      isFeatured: false
    }
  ],
  team: [
    { name: "Dra. Mara Magalhães", role: "Psicóloga Clínica", crp: "01/12345" },
    { name: "Dr. João Santos", role: "Neuropsicólogo", crp: "01/23456" },
    { name: "Dra. Bárbara", role: "Psicóloga do Esporte", crp: "01/34567" }
  ],
  convenios: ["Unimed", "Amil", "SulAmérica", "Bradesco", "NotreDame"],
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
