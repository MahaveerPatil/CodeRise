export const defaultSEO = {
  title: 'VELTRICKS — Premium Software Development Company India | Web, Mobile, AI & Cloud',
  description:
    'VELTRICKS is a premium software development company in India. We build world-class websites, web apps, mobile apps, AI/ML solutions, cloud infrastructure and e-commerce stores. Turn your idea into reality.',
  canonical: 'https://veltricks.dev/',
  ogImage: 'https://veltricks.dev/og-image.jpg',
  twitterHandle: '@veltricks',
  siteName: 'VELTRICKS',
};

export const pageSEO: Record<string, { title: string; description: string; canonical: string }> = {
  home: {
    title: 'VELTRICKS — Premium Software Development Company India | Web, Mobile, AI & Cloud',
    description:
      'VELTRICKS builds premium digital products — websites, web apps, mobile apps, AI/ML, cloud & DevOps. India-based software development company serving global clients.',
    canonical: 'https://veltricks.dev/',
  },
  blog: {
    title: 'Blog — Tech Insights & Tutorials | VELTRICKS',
    description:
      'Explore expert articles on web development, mobile apps, AI/ML, cloud architecture and software engineering best practices from the VELTRICKS team.',
    canonical: 'https://veltricks.dev/blog',
  },
};

// Organization structured data
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VELTRICKS',
  alternateName: 'Veltricks Software',
  url: 'https://veltricks.dev',
  logo: {
    '@type': 'ImageObject',
    url: 'https://veltricks.dev/favicon.svg',
    width: 512,
    height: 512,
  },
  description: defaultSEO.description,
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-8310659343',
      contactType: 'customer service',
      email: 'hello@veltricks.dev',
      availableLanguage: ['English', 'Hindi'],
      areaServed: 'Worldwide',
    },
  ],
  sameAs: [
    'https://linkedin.com/company/veltricks',
    'https://github.com/veltricks',
    'https://twitter.com/veltricks',
    'https://instagram.com/veltricks',
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software Development Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development',
          description:
            'Modern, responsive and high-performance websites and web applications using React, Next.js and TypeScript.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development',
          description: 'Scalable Android and iOS applications using React Native and Flutter.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI & Machine Learning',
          description:
            'Intelligent automation, predictive analytics and LLM-powered solutions using Python, TensorFlow and OpenAI.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cloud & DevOps',
          description:
            'Cloud infrastructure, CI/CD pipelines and scalable deployment on AWS and Azure.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Software Development',
          description:
            'End-to-end custom software engineered around unique business requirements using Java, Spring Boot and Python.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-Commerce Development',
          description:
            'High-converting online stores with Shopify, WooCommerce and custom React solutions.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'UI/UX Design',
          description:
            'User-centered interface design using Figma, prototyping and modern design systems.',
        },
      },
    ],
  },
};

// FAQ Schema — boosts chances of rich result / People Also Ask
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What services does VELTRICKS offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VELTRICKS offers web development, mobile app development (iOS & Android), AI/ML solutions, cloud & DevOps, custom software development, e-commerce stores, and UI/UX design services.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is VELTRICKS a software development company in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. VELTRICKS is a premium software development company based in India, serving clients globally across the US, UK, Australia and beyond.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does software development cost at VELTRICKS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project costs vary based on scope and complexity. VELTRICKS works with budgets starting from ₹50,000 for smaller projects up to ₹10,00,000+ for enterprise solutions. Contact us for a free estimate.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I hire VELTRICKS for my project?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Simply fill out the project inquiry form on our website at veltricks.dev or email us at hello@veltricks.dev. We respond within 24 hours.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does VELTRICKS work with startups?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. VELTRICKS has specific startup packages that include MVP development, UI/UX design, web and mobile app development, and ongoing technical support to help startups go from idea to launch.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does VELTRICKS use?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VELTRICKS uses React, Next.js, TypeScript, Node.js, Python, Java, Spring Boot, React Native, Flutter, AWS, Azure, Docker, Kubernetes, TensorFlow, OpenAI and more.',
      },
    },
  ],
};

// BreadcrumbList schema helper
export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
