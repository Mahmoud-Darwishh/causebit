export type ProjectType = 'live' | 'video' | 'case-study' | 'design';
export type ProjectCategory = 'web' | 'mobile' | 'uiux' | 'ecommerce' | 'saas' | 'dashboard';

export interface ProjectMedia {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  alt?: string;
}

export interface Project {
  id: string;
  slug: string;
  type: ProjectType;
  category: ProjectCategory[];
  titleKey: string; // Translation key
  descriptionKey: string; // Translation key
  liveUrl?: string; // For live projects
  media: ProjectMedia[]; // Screenshots, videos
  technologies?: string[];
  year: number;
  featured: boolean;
  testimonial?: {
    textKey: string;
    author: string;
    role: string;
  };
}

export const projects: Project[] = [
  // Example structure - you'll replace with your actual projects
  {
    id: 'iccy',
    slug: 'icancoachyou',
    type: 'live',
    category: ['web', 'saas', 'dashboard', 'uiux'],
    titleKey: 'projects.items.iccy.title',
    descriptionKey: 'projects.items.iccy.description',
    liveUrl: 'https://icancoachyou.online/en',
    media: [
      {
        type: 'image',
        url: '/projects/iccy/11.png',
        alt: 'ICCY platform landing overview'
      },
      {
        type: 'image',
        url: '/projects/iccy/1.png',
        alt: 'ICCY platform landing overview'
      },
      {
        type: 'image',
        url: '/projects/iccy/2.png',
        alt: 'ICCY coaching dashboard view'
      },
      {
        type: 'image',
        url: '/projects/iccy/3.jpg',
        alt: 'ICCY session management screen'
      },
      {
        type: 'image',
        url: '/projects/iccy/4.png',
        alt: 'ICCY client progress and insights'
      },
      {
        type: 'image',
        url: '/projects/iccy/5.png',
        alt: 'ICCY AI assistant conversation'
      }
    ],
    technologies: ['Next.js', 'TypeScript', 'next-intl', 'AI APIs', 'PostgreSQL'],
    year: 2026,
    featured: true,
    testimonial: {
      textKey: 'projects.items.iccy.testimonial',
      author: 'ICCY Team',
      role: 'Product Leadership'
    }
  },
  
  {
    id: 'anees',
    slug: 'anees-health',
    type: 'live',
    category: ['web', 'saas', 'dashboard', 'uiux'],
    titleKey: 'projects.items.anees.title',
    descriptionKey: 'projects.items.anees.description',
    liveUrl: 'https://aneeshealth.com',
    media: [
    {
        type: 'image',
        url: '/projects/anees/11.png',
        alt: 'Anees Health platform landing page'
      },
      {
        type: 'image',
        url: '/projects/anees/1.png',
        alt: 'Anees Health platform landing page'
      },
      {
        type: 'image',
        url: '/projects/anees/2.png',
        alt: 'Anees telemedicine consultation interface'
      },
      {
        type: 'image',
        url: '/projects/anees/3.png',
        alt: 'Anees home care services dashboard'
      },
      {
        type: 'image',
        url: '/projects/anees/4.png',
        alt: 'Anees patient management system'
      },
      {
        type: 'image',
        url: '/projects/anees/5.png',
        alt: 'Anees healthcare provider dashboard'
      },
      {
        type: 'image',
        url: '/projects/anees/6.png',
        alt: 'Anees mobile app interface'
      },
      {
        type: 'image',
        url: '/projects/anees/12.png',
        alt: 'Anees mobile app interface'
      }
    ],
    technologies: ['Next.js', 'TypeScript', 'WebRTC', 'PostgreSQL', 'AWS'],
    year: 2025,
    featured: true,
    testimonial: {
      textKey: 'projects.items.anees.testimonial',
      author: 'Anees Health',
      role: 'Healthcare Leadership'
    }
  },
  
  {
    id: 'roadmentors',
    slug: 'road-mentors',
    type: 'video',
    category: ['web', 'uiux', 'dashboard'],
    titleKey: 'projects.items.roadmentors.title',
    descriptionKey: 'projects.items.roadmentors.description',
    media: [
      {
        type: 'image',
        url: '/projects/roadmentors/1.png',
        alt: 'Road Mentors platform overview'
      },
      {
        type: 'image',
        url: '/projects/roadmentors/2.png',
        alt: 'Road Mentors course catalog'
      },
      {
        type: 'image',
        url: '/projects/roadmentors/3.png',
        alt: 'Road Mentors learning dashboard'
      },
      {
        type: 'image',
        url: '/projects/roadmentors/4.png',
        alt: 'Road Mentors AI course interface'
      },
      {
        type: 'video',
        url: '/projects/roadmentors/vid.mp4',
        thumbnail: '/projects/roadmentors/1.png',
        alt: 'Road Mentors platform demo'
      }
    ],
    technologies: ['React', 'Vite', 'TypeScript', 'Firebase', 'Educational Tools'],
    year: 2025,
    featured: true,
    testimonial: {
      textKey: 'projects.items.roadmentors.testimonial',
      author: 'Road Mentors',
      role: 'Education Leadership'
    }
  },
  {
    id: 'elmawkaa',
    slug: 'elmawkaa',
    type: 'live',
    category: ['web', 'ecommerce'],
    titleKey: 'projects.items.elmawkaa.title',
    descriptionKey: 'projects.items.elmawkaa.description',
    liveUrl: 'https://elmawkaa.com',
    media: [
      {
        type: 'image',
        url: '/projects/elmawkaa/1.png',
        alt: 'ElMawkaa e-commerce platform homepage'
      },
      {
        type: 'image',
        url: '/projects/elmawkaa/2.jpg',
        alt: 'ElMawkaa product catalog and ordering'
      },
      {
        type: 'image',
        url: '/projects/elmawkaa/3.jpg',
        alt: 'ElMawkaa construction materials listing'
      }
    ],
    technologies: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Inventory Management'],
    year: 2025,
    featured: true,
    testimonial: {
      textKey: 'projects.items.elmawkaa.testimonial',
      author: 'ElMawkaa',
      role: 'Business Owner'
    }
  },
  {
    id: 'sparx',
    slug: 'sparx-media',
    type: 'live',
    category: ['web', 'uiux'],
    titleKey: 'projects.items.sparx.title',
    descriptionKey: 'projects.items.sparx.description',
    liveUrl: 'https://sparx-media.netlify.app',
    media: [
      { type: 'image', url: '/projects/sparx/1.png', alt: 'Sparx Media homepage' },
      { type: 'image', url: '/projects/sparx/2.png', alt: 'Sparx Media services section' },
      { type: 'image', url: '/projects/sparx/3.png', alt: 'Sparx Media portfolio/case section' },
      { type: 'image', url: '/projects/sparx/4.png', alt: 'Sparx Media contact/CTA section' }
    ],
    technologies: ['Next.js', 'TypeScript', 'CSS', 'SEO'],
    year: 2024,
    featured: true,
    testimonial: {
      textKey: 'projects.items.sparx.testimonial',
      author: 'Sparx Media',
      role: 'Marketing Leadership'
    }
  },
  {
    id: 'furnitureui',
    slug: 'furniture-ui',
    type: 'design',
    category: ['uiux', 'ecommerce'],
    titleKey: 'projects.items.furnitureui.title',
    descriptionKey: 'projects.items.furnitureui.description',
    liveUrl: 'https://www.behance.net/gallery/159809575/CO-design-UI-UX',
    media: [
      { type: 'image', url: '/projects/furnitureui/1.png', alt: 'Furniture e‑commerce UI – catalog' },
      { type: 'image', url: '/projects/furnitureui/2.png', alt: 'Furniture e‑commerce UI – product details' },
      { type: 'image', url: '/projects/furnitureui/3.png', alt: 'Furniture e‑commerce UI – cart/checkout' }
    ],
    technologies: ['Figma', 'Design System', 'Prototyping'],
    year: 2024,
    featured: false
  },
  {
    id: 'travelui',
    slug: 'travel-agency-ui',
    type: 'design',
    category: ['web', 'uiux'],
    titleKey: 'projects.items.travelui.title',
    descriptionKey: 'projects.items.travelui.description',
    liveUrl: 'https://www.behance.net/gallery/159810567/tgaroub',
    media: [
      { type: 'image', url: '/projects/travelui/1.png', alt: 'Travel agency UI – landing page' },
      { type: 'image', url: '/projects/travelui/2.png', alt: 'Travel agency UI – destinations' },
      { type: 'image', url: '/projects/travelui/3.png', alt: 'Travel agency UI – booking flow' },
      { type: 'image', url: '/projects/travelui/4.png', alt: 'Travel agency UI – trip details' },
      { type: 'image', url: '/projects/travelui/5.png', alt: 'Travel agency UI – user dashboard' }
    ],
    technologies: ['Figma', 'Design System', 'Prototyping'],
    year: 2024,
    featured: false
  },
  {
    id: 'motoractor',
    slug: 'motor-actor-ui',
    type: 'design',
    category: ['web', 'uiux'],
    titleKey: 'projects.items.motoractor.title',
    descriptionKey: 'projects.items.motoractor.description',
    liveUrl: 'https://www.behance.net/gallery/142229101/Motor-Actor',
    media: [
      { type: 'image', url: '/projects/motoractor-ui/1.png', alt: 'Motor Actor UI – homepage' },
      { type: 'image', url: '/projects/motoractor-ui/2.png', alt: 'Motor Actor UI – product showcase' },
      { type: 'image', url: '/projects/motoractor-ui/3.png', alt: 'Motor Actor UI – features section' },
      { type: 'image', url: '/projects/motoractor-ui/4.jpg', alt: 'Motor Actor UI – details view' }
    ],
    technologies: ['Figma', 'Design System', 'Prototyping'],
    year: 2024,
    featured: false
  },
  {
    id: 'mobileleaders',
    slug: 'mobile-leaders',
    type: 'live',
    category: ['web', 'ecommerce', 'uiux'],
    titleKey: 'projects.items.mobileleaders.title',
    descriptionKey: 'projects.items.mobileleaders.description',
    liveUrl: 'https://mobile-leaders.netlify.app',
    media: [
      {
        type: 'image',
        url: '/projects/mobileleaders/11.png',
        alt: 'Mobile Leaders store homepage'
      },
      {
        type: 'image',
        url: '/projects/mobileleaders/2.png',
        alt: 'Mobile Leaders product listing'
      },
      {
        type: 'image',
        url: '/projects/mobileleaders/3.png',
        alt: 'Mobile Leaders shopping cart'
      }
    ],
    technologies: ['React', 'JavaScript', 'CSS', 'Responsive Design'],
    year: 2024,
    featured: true,
    testimonial: {
      textKey: 'projects.items.mobileleaders.testimonial',
      author: 'Mobile Leaders',
      role: 'Store Owner'
    }
  },
  
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter(p => p.featured);
}

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects.filter(p => p.category.includes(category));
}
