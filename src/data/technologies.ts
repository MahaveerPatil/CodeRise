export interface Technology {
  name: string;
  icon: string; // SVG path string or emoji
}

// Split into two rows for the carousel
export const techRow1: Technology[] = [
  { name: 'Java', icon: '☕' },
  { name: 'Spring Boot', icon: '🍃' },
  { name: 'React', icon: '⚛️' },
  { name: 'JavaScript', icon: 'JS' },
  { name: 'HTML5', icon: 'H5' },
  { name: 'CSS3', icon: 'C3' },
  { name: 'Python', icon: '🐍' },
  { name: 'Node.js', icon: '🟢' },
  { name: 'MySQL', icon: '🗄️' },
];

export const techRow2: Technology[] = [
  { name: 'PostgreSQL', icon: '🐘' },
  { name: 'Docker', icon: '🐳' },
  { name: 'Git', icon: '🔀' },
  { name: 'GitHub', icon: '🐙' },
  { name: 'Linux', icon: '🐧' },
  { name: 'AWS', icon: '☁️' },
  { name: 'Azure', icon: '🔷' },
  { name: 'Kubernetes', icon: '⎈' },
];
