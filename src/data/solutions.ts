export interface Solution {
  id: string;
  name: string;
  description: string;
  icon: string;
  services: string[];
}

export const solutions: Solution[] = [
  {
    id: 'startups',
    name: 'Startups',
    description: 'Turn ideas into market-ready products.',
    icon: '🚀',
    services: ['Web Development', 'Mobile App Development', 'UI/UX Design', 'MVP Development'],
  },
  {
    id: 'small-business',
    name: 'Small Businesses',
    description: 'Digitize operations and reach more customers.',
    icon: '🏢',
    services: ['Web Development', 'E-Commerce', 'Maintenance & Support', 'SEO & Performance'],
  },
  {
    id: 'growing-companies',
    name: 'Growing Companies',
    description: 'Automate processes and scale technology.',
    icon: '📈',
    services: ['Software Development', 'Cloud & DevOps', 'AI & Machine Learning', 'Integrations'],
  },
  {
    id: 'enterprises',
    name: 'Enterprises',
    description: 'Build secure, scalable and integrated systems.',
    icon: '🏛️',
    services: ['Custom Software', 'Cloud Architecture', 'Security & Compliance', 'Long-Term Support'],
  },
];
