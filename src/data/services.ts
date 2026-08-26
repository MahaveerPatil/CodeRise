export interface Service {
  id: string;
  icon: string; // emoji or icon identifier
  title: string;
  description: string;
  tags: string[];
  expandedContent: string;
}

export const services: Service[] = [
  {
    id: 'web-development',
    icon: '🌐',
    title: 'Web Development',
    description: 'Modern, responsive and high-performance websites and web applications.',
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js'],
    expandedContent: 'We craft pixel-perfect, performant web experiences using cutting-edge technologies. From marketing sites to complex SPAs and server-rendered apps.',
  },
  {
    id: 'software-development',
    icon: '⚙️',
    title: 'Software Development',
    description: 'Custom software engineered around unique business requirements.',
    tags: ['Java', 'Spring Boot', 'Python', 'Microservices'],
    expandedContent: 'End-to-end custom software development — from architecture design to deployment — built to scale with your business.',
  },
  {
    id: 'mobile-development',
    icon: '📱',
    title: 'Mobile App Development',
    description: 'Scalable Android and iOS applications.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    expandedContent: 'Cross-platform and native mobile apps with exceptional UX, offline support, and seamless backend integration.',
  },
  {
    id: 'ai-ml',
    icon: '🤖',
    title: 'AI & Machine Learning',
    description: 'Intelligent solutions that automate processes and unlock insights.',
    tags: ['Python', 'TensorFlow', 'OpenAI', 'LangChain'],
    expandedContent: 'From predictive analytics to LLM-powered automation — we build AI solutions that create measurable business value.',
  },
  {
    id: 'ecommerce',
    icon: '🛒',
    title: 'E-Commerce',
    description: 'High-converting and scalable online stores.',
    tags: ['Shopify', 'WooCommerce', 'Stripe', 'React'],
    expandedContent: 'Full-stack e-commerce solutions with optimized checkout flows, inventory management, and payment integrations.',
  },
  {
    id: 'ui-ux',
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Beautiful interfaces designed around real users.',
    tags: ['Figma', 'Design Systems', 'Prototyping', 'Research'],
    expandedContent: 'User-centered design processes — from research and wireframing to polished design systems and interactive prototypes.',
  },
  {
    id: 'maintenance',
    icon: '🔧',
    title: 'Maintenance & Support',
    description: 'Continuous monitoring, optimization and technical support.',
    tags: ['Monitoring', 'Security', 'Performance', 'Updates'],
    expandedContent: 'Proactive maintenance, security patching, performance optimization, and dedicated technical support to keep your systems running.',
  },
];
