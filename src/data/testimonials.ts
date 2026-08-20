export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  text: string;
  rating: number; // 1-5
  isPlaceholder: true; // Always true — replace with real testimonials before launch
}

// ⚠️ PLACEHOLDER TESTIMONIALS — Replace with real client testimonials before launch
export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Arjun Mehta',
    company: 'TechFlow Solutions',
    role: 'Founder & CEO',
    text: 'VELTRIX delivered our SaaS platform on time and beyond our expectations. Their technical depth and attention to detail is remarkable. Would absolutely recommend for any serious software project.',
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    company: 'RetailEdge India',
    role: 'Head of Digital',
    text: 'Our e-commerce platform saw a 40% increase in conversions after VELTRIX rebuilt it. The team communicates transparently and delivers what they promise.',
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: 't3',
    name: 'Rahul Verma',
    company: 'DataSpark Analytics',
    role: 'CTO',
    text: 'The AI dashboard VELTRIX built handles millions of data points in real-time. Clean architecture, excellent code quality, and a team that truly understands the product vision.',
    rating: 5,
    isPlaceholder: true,
  },
];
