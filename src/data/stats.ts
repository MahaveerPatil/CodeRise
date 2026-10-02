export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export const stats: Stat[] = [
  { value: 10,  suffix: '+', label: 'Projects Delivered' },
  { value: 8,   suffix: '+', label: 'Happy Clients' },
  { value: 24,  suffix: 'h', label: 'Response Time' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];
