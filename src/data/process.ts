export interface ProcessStep {
  number: string; // zero-padded e.g. "01"
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { number: '01', title: 'Discover', description: 'Understand the business, users and objectives.' },
  { number: '02', title: 'Strategize', description: 'Define the technology and product roadmap.' },
  { number: '03', title: 'Design', description: 'Create the user experience and visual system.' },
  { number: '04', title: 'Develop', description: 'Build the product using modern technologies.' },
  { number: '05', title: 'Test', description: 'Ensure quality, performance and security.' },
  { number: '06', title: 'Deploy', description: 'Launch the product to production.' },
  { number: '07', title: 'Scale', description: 'Maintain, optimize and continuously improve.' },
];
