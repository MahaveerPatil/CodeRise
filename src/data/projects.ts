export interface Project {
  id: string;
  title: string;
  industry: string;
  tagline: string;
  description: string;
  technologies: string[];
  accentColor: string;   // CSS color for gradient placeholder
  imagePlaceholder: string; // gradient string for the card visual
  timeline: string;
  teamSize: string;
  liveUrl?: string;
  // Case study data
  problem: string;
  solution: string;
  architecture: string;
  results: string[];
  challenges: string[];
  outcome: string;
}

export const projects: Project[] = [
  {
    id: 'traffic-management',
    title: 'Intelligent Traffic Management System',
    industry: 'Smart Cities / IoT',
    tagline: 'Reducing urban congestion through AI-driven signal optimization.',
    description: 'AI + IoT based traffic optimization platform that reduced congestion by 35% across 50+ intersections.',
    technologies: ['Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    accentColor: '#6366F1',
    imagePlaceholder: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%)',
    timeline: '6 months',
    teamSize: '4 engineers',
    problem:
      'Urban traffic congestion was costing the city millions in lost productivity. Traditional fixed-timer signals were unable to adapt to real-time traffic patterns, causing unnecessary delays at off-peak intersections while critical junctions overflowed.',
    solution:
      'We built a real-time traffic management platform combining IoT sensors at every intersection with a machine learning model that predicts traffic flow 15 minutes ahead. The system dynamically adjusts signal timing across the entire network as a coordinated unit.',
    architecture:
      'IoT sensors → MQTT broker → Python data pipeline → TensorFlow prediction engine → REST API (Node.js) → React dashboard → PostgreSQL with time-series data. Deployed on AWS with auto-scaling and real-time alerting.',
    results: [
      '35% reduction in average wait time at monitored intersections',
      '28% decrease in fuel consumption from idling',
      'Real-time monitoring across 50+ intersections',
      'Emergency vehicle priority routing implemented',
    ],
    challenges: [
      'Handling sensor data with variable latency and occasional dropouts required robust fallback strategies',
      'The ML model needed to account for local events, weather, and time-of-day patterns simultaneously',
      'Zero-downtime deployment was critical — traffic signals cannot go offline',
    ],
    outcome:
      'The platform is now operational across the city network. The authority reports significant improvements in traffic flow and a measurable reduction in peak-hour congestion. The system paid for itself within 14 months.',
  },
  {
    id: 'business-management',
    title: 'Business Management Platform',
    industry: 'Enterprise Software',
    tagline: 'One platform to manage operations, teams, and growth.',
    description: 'Custom enterprise management software replacing 6 disconnected tools with a single unified platform.',
    technologies: ['Java', 'Spring Boot', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'Azure'],
    accentColor: '#06B6D4',
    imagePlaceholder: 'linear-gradient(135deg, #0f1923 0%, #0d2137 50%, #0a3352 100%)',
    timeline: '9 months',
    teamSize: '5 engineers',
    problem:
      'The client was running their business across 6 separate tools — HR system, project tracker, invoicing, CRM, inventory, and reporting. Data was siloed, manual reconciliation consumed 30+ hours per week, and nothing connected to anything else.',
    solution:
      'A unified business management platform with a single data model. Role-based access across departments, real-time dashboards, automated workflows, and a reporting engine that pulls from every module simultaneously.',
    architecture:
      'Microservices backend (Java/Spring Boot) with domain separation per business function. React SPA frontend with module federation. PostgreSQL per domain with an event bus for cross-domain sync. Deployed on Azure Kubernetes.',
    results: [
      'Replaced 6 separate tools with one platform',
      '30+ hours/week of manual data reconciliation eliminated',
      '90% reduction in reporting preparation time',
      'Onboarded 120+ staff across 3 office locations',
    ],
    challenges: [
      'Data migration from 6 legacy systems with inconsistent schemas',
      'Building a permissions model flexible enough for 8 distinct roles without becoming unmaintainable',
      'Ensuring the platform worked offline-first for the warehouse team',
    ],
    outcome:
      'The client now has complete operational visibility in one place. The finance team closed their first fully automated monthly report within 2 weeks of go-live.',
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    industry: 'Retail / E-Commerce',
    tagline: 'Modern scalable online shopping experience with intelligent recommendations.',
    description: 'High-performance e-commerce platform serving 10,000+ daily active users with 99.9% uptime.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS', 'Docker'],
    accentColor: '#8B5CF6',
    imagePlaceholder: 'linear-gradient(135deg, #1a0a2e 0%, #2d1060 50%, #1a0a4a 100%)',
    timeline: '5 months',
    teamSize: '3 engineers',
    problem:
      "The client's existing Shopify store was hitting platform limits — custom workflows were impossible, fees were eating margins, and performance was degrading under load. They needed a custom-built platform that could handle flash sales without falling over.",
    solution:
      'A fully custom React storefront backed by a Node.js API with Redis caching for product catalog and sessions. Stripe integration for payments, real-time inventory management, and an ML-powered recommendation engine for cross-sells.',
    architecture:
      'React SPA → Node.js REST API → PostgreSQL (primary) + Redis (cache) → AWS S3 (assets) + CloudFront (CDN) + ElasticSearch (product search). Auto-scaling EC2 group behind an Application Load Balancer.',
    results: [
      '3x improvement in page load time vs previous platform',
      'Handled 5,000 concurrent users during launch flash sale with zero downtime',
      '22% increase in average order value from recommendations',
      '40% reduction in platform costs vs Shopify Plus tier',
    ],
    challenges: [
      'Building a cache invalidation strategy that kept product data fresh without over-loading the database',
      'Stripe webhook reliability under high load required idempotency keys and queue-based processing',
      'SEO parity with the previous platform required careful SSR implementation',
    ],
    outcome:
      'The platform launched on schedule and handled Black Friday traffic without incident. The client has since expanded to 3 additional product categories on the same infrastructure.',
  },
  {
    id: 'ai-analytics',
    title: 'AI Analytics Dashboard',
    industry: 'Data & Analytics',
    tagline: 'Real-time intelligent analytics that turn raw data into business decisions.',
    description:
      'Real-time analytics platform processing 2M+ events/day with ML-powered anomaly detection and forecasting.',
    technologies: ['Python', 'React', 'PostgreSQL', 'Redis', 'TensorFlow', 'AWS', 'Kubernetes'],
    accentColor: '#10B981',
    imagePlaceholder: 'linear-gradient(135deg, #050a0e 0%, #0a2318 50%, #051a10 100%)',
    timeline: '7 months',
    teamSize: '4 engineers',
    problem:
      'The client was drowning in data from 15 different sources but had no real-time visibility. Analysts were spending 80% of their time preparing data rather than extracting insights. They needed anomaly alerts before problems became crises.',
    solution:
      'A real-time analytics platform with a streaming data ingestion pipeline, automated ML anomaly detection, and an interactive React dashboard with customizable widgets, drill-downs, and scheduled reports.',
    architecture:
      'Event streams → Kafka → Python processing workers → PostgreSQL + TimescaleDB → FastAPI → React dashboard. TensorFlow Serving for anomaly detection models. Deployed on Kubernetes with Prometheus + Grafana monitoring.',
    results: [
      'Processing 2M+ events per day with sub-second latency',
      'Anomaly detection catches issues 4x faster than manual monitoring',
      '80% reduction in time spent on data preparation',
      'Custom alerts saved the client from 3 major outages in first quarter',
    ],
    challenges: [
      'Ingesting from 15 data sources with different schemas, frequencies, and reliability levels',
      'Training anomaly detection models with limited labeled data required semi-supervised approaches',
      'Dashboard performance with large datasets required careful virtualization and pagination strategy',
    ],
    outcome:
      'The analytics team now spends 80% of their time on insights instead of data preparation. The anomaly detection system has prevented several critical incidents and the platform is being expanded to 3 additional business units.',
  },
  {
    id: 'health-platform',
    title: 'Healthcare Patient Portal',
    industry: 'Healthcare Technology',
    tagline: 'Secure, accessible digital health management for patients and providers.',
    description:
      'HIPAA-compliant patient portal enabling telehealth, records management, and appointment scheduling.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS', 'WebRTC', 'Docker', 'TypeScript'],
    accentColor: '#F59E0B',
    imagePlaceholder: 'linear-gradient(135deg, #1a1000 0%, #2d2000 50%, #1a1500 100%)',
    timeline: '8 months',
    teamSize: '5 engineers',
    problem:
      'A regional healthcare network was running appointments on phone calls, maintaining paper records, and had no way for patients to access their own health information. Doctors were losing 2+ hours daily to administrative tasks.',
    solution:
      'A secure patient portal with telehealth video consultations, digital health records, e-prescriptions, and appointment self-scheduling. Built with HIPAA compliance from the ground up — encryption at rest and in transit, full audit logging, role-based access.',
    architecture:
      'React SPA with end-to-end encryption → Node.js API → PostgreSQL with row-level security → AWS HealthLake for FHIR records → WebRTC for video consultations. Full audit trail via immutable event log.',
    results: [
      '2,500+ patients onboarded in first 6 weeks',
      '65% reduction in administrative phone calls',
      'Telehealth consultations up 300% in 3 months',
      'Zero HIPAA compliance issues after third-party audit',
    ],
    challenges: [
      'HIPAA compliance requirements touched every layer of the stack — required deep security review at each milestone',
      'WebRTC video quality across varying mobile connections required fallback strategies',
      'Patient identity verification had to be robust without creating friction for elderly users',
    ],
    outcome:
      'The portal transformed how the network operates. Doctors report reclaiming 90 minutes of daily admin time. Patient satisfaction scores increased significantly and the network is expanding the platform to 2 additional facilities.',
  },
];
