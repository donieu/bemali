
export interface LinkItem {
  id: string;
  title: string;
  url: string;
  icon?: string;
  description?: string;
  isFeatured?: boolean;
}

export interface SocialLink {
  platform: 'instagram' | 'whatsapp' | 'youtube' | 'pinterest' | 'website';
  url: string;
}

export interface BrandData {
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  links: LinkItem[];
  socials: SocialLink[];
}
