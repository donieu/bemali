
import { BrandData, LinkItem } from './types';

export interface ServiceDetail extends LinkItem {
  iconName: string;
  process: string[];
  howItWorks: string;
  testimonials: { text: string; author: string }[];
}

export interface ExtendedBrandData extends BrandData {
  slogan: string;
  stats: { label: string; value: string }[];
  team?: { name: string; role: string; crp: string }[];
  focus?: string[];
  convenios?: string[];
  emergencies: { label: string; number: string }[];
  services: ServiceDetail[];
  fullBio?: string;
}

const COMMON_PROCESS = [
  "Acolhimento inicial para entender sua história.",
  "Mapeamento das principais demandas e sofrimentos.",
  "Definição conjunta de metas terapêuticas claras.",
  "Sessões semanais com técnicas baseadas em evidências.",
  "Reavaliações periódicas do progresso alcançado."
];

export const BEM_ALI_DATA: ExtendedBrandData = {
  name: "BEM ALI",
  handle: "Espaço de Acolhimento",
  slogan: "Cuidado especializado para você e sua família.",
  bio: "Saúde mental integral com equipe multidisciplinar no JK Shopping.",
  avatar: "/bemali.png",
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
      description: "Atendimento individualizado focado em equilíbrio emocional e autoconhecimento.",
      iconName: "psychology",
      howItWorks: "Através da fala e da escuta qualificada, buscamos desatar nós emocionais e construir novas formas de existir no mundo.",
      process: COMMON_PROCESS,
      testimonials: [
        { text: "Encontrei um lugar onde finalmente me sinto ouvida sem julgamentos.", author: "Ana P." },
        { text: "A terapia foi o melhor investimento que fiz em mim mesmo este ano.", author: "Marcos V." }
      ]
    },
    {
      id: "casal",
      title: "Terapia de Casal",
      url: "#",
      description: "Foco na comunicação, resolução de conflitos e reconstrução de vínculos.",
      iconName: "heart",
      howItWorks: "Mediação profissional para casais que desejam melhorar o diálogo, superar crises ou redefinir a parceria.",
      process: [
        "Sessão conjunta de diagnóstico relacional.",
        "Identificação de padrões repetitivos de briga.",
        "Exercícios de comunicação assertiva.",
        "Fortalecimento da cumplicidade e intimidade."
      ],
      testimonials: [
        { text: "Aprendemos a brigar menos e a nos entender mais. Salvou nosso casamento.", author: "Casal M&F" }
      ]
    },
    {
      id: "familias",
      title: "Terapia de Família",
      url: "#",
      description: "Suporte sistêmico para melhorar a harmonia e resolver impasses familiares.",
      iconName: "users",
      howItWorks: "Trabalhamos as relações entre pais, filhos e irmãos, focando no sistema como um todo para restaurar a paz no lar.",
      process: [
        "Entendimento da hierarquia e papéis familiares.",
        "Sessões com diferentes configurações do grupo.",
        "Mediação de conflitos intergeracionais.",
        "Construção de novas regras de convivência."
      ],
      testimonials: [
        { text: "Nossa dinâmica em casa mudou completamente para melhor.", author: "Família G." }
      ]
    },
    {
      id: "idosos",
      title: "Apoio a Idosos",
      url: "#",
      description: "Cuidado especializado para as transições e desafios da maturidade.",
      iconName: "star",
      howItWorks: "Foco na saúde mental na melhor idade, lidando com lutos, perda de autonomia e busca por novo propósito.",
      process: [
        "Escuta acolhedora sobre a trajetória de vida.",
        "Estimulação cognitiva e emocional.",
        "Apoio na aceitação de limitações e reforço de potências.",
        "Orientação familiar quando necessário."
      ],
      testimonials: [
        { text: "Sinto que ainda tenho muito a viver e a compartilhar.", author: "Sr. Geraldo" }
      ]
    },
    {
      id: "grupo",
      title: "Terapia em Grupo",
      url: "#",
      description: "Espaço de troca e identificação mútua sob mediação profissional.",
      iconName: "users",
      howItWorks: "Grupos temáticos onde a experiência do outro serve como espelho e suporte para a sua própria caminhada.",
      process: [
        "Formação de grupos com demandas similares.",
        "Estabelecimento de pactos de sigilo e respeito.",
        "Trocas horizontais mediadas por psicólogo.",
        "Fortalecimento da rede de apoio social."
      ],
      testimonials: [
        { text: "Saber que não estou sozinho no que sinto me trouxe muita paz.", author: "Participante Grupo Ansiedade" }
      ]
    },
    {
      id: "gestantes",
      title: "Apoio a Gestantes",
      url: "#",
      description: "Suporte emocional no pré-natal e puerpério.",
      iconName: "heart",
      howItWorks: "Psicologia perinatal para acolher as transformações intensas da maternidade, desde o planejamento até o pós-parto.",
      process: [
        "Acolhimento das angústias da gestação.",
        "Preparação psicológica para o parto e maternidade.",
        "Prevenção de depressão pós-parto.",
        "Fortalecimento do vínculo mãe-bebê."
      ],
      testimonials: [
        { text: "Me senti segurada e pronta para receber meu filho.", author: "Carla L." }
      ]
    },
    {
      id: "neurodivergentes",
      title: "Neurodivergentes",
      url: "#",
      description: "Abordagem neuroafirmativa para TEA, TDAH e outras condições.",
      iconName: "neuro",
      howItWorks: "Foco no respeito à singularidade de funcionamento, buscando adaptações e qualidade de vida sem patologização.",
      process: [
        "Acolhimento da identidade neurodivergente.",
        "Identificação de gatilhos sensoriais e emocionais.",
        "Desenvolvimento de estratégias de regulação.",
        "Suporte na navegação em ambientes neurotípicos."
      ],
      testimonials: [
        { text: "Pela primeira vez não sinto que preciso ser 'curado', mas compreendido.", author: "Tiago S." }
      ]
    },
    {
      id: "neuro",
      title: "Neuroavaliação",
      url: "#",
      description: "Diagnóstico e acompanhamento de condições cognitivas.",
      iconName: "neuro",
      howItWorks: "Uso de baterias de testes para investigar memória, atenção, raciocínio e funções executivas.",
      process: [
        "Anamnese detalhada.",
        "Sessões de aplicação de testes padronizados.",
        "Correção e análise quanti-qualitativa.",
        "Entrega de laudo e orientação terapêutica."
      ],
      testimonials: [
        { text: "O diagnóstico foi a chave para eu me entender finalmente.", author: "Julia M." }
      ]
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
  ...BEM_ALI_DATA,
  name: "MARA MAGALHÃES",
  handle: "Psicóloga Clínica | CRP 01/12345",
  avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=800",
  fullBio: "Com mais de 15 anos de atuação, acredito que a psicoterapia é o caminho para a liberdade emocional. Minha abordagem une a ciência da psicologia com uma escuta profundamente humana.",
  stats: [
    { value: "15+", label: "Anos de Experiência" },
    { value: "5k+", label: "Sessões Realizadas" },
    { value: "Mestrado", label: "Formação Acadêmica" }
  ],
};
