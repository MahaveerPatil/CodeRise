export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

// NOTE: These are placeholder values — update with real data before launch
export const stats: Stat[] = [
  { value: 50, suffix: '+', label: 'Projects Completed' },
  { value: 20, suffix: '+', label: 'Happy Clients' },
  { value: 5,  suffix: '+', label: 'Years of Experience' },
  { value: 99, suffix: '%', label: 'Commitment Rate' },
];
