export const defaultSEO = {
  title: 'VELTRICKS — IT & Software Development Company in Belagavi (Belgaum) | Web, Mobile, AI & Cloud',
  description:
    'VELTRICKS is a top IT and software development company in Belagavi (Belgaum), Karnataka. We build websites, web apps, mobile apps, AI/ML solutions and cloud infrastructure. Serving Belagavi, Belgaum and clients worldwide.',
  canonical: 'https://veltricks.dev/',
  ogImage: 'https://veltricks.dev/og-image.jpg',
  twitterHandle: '@veltricks',
  siteName: 'VELTRICKS',
};

export const pageSEO: Record<string, { title: string; description: string; canonical: string }> = {
  home: {
    title: 'VELTRICKS — IT & Software Company in Belagavi Belgaum | Web, Mobile, AI & Cloud',
    description:
      'Top IT and software development company in Belagavi (Belgaum), Karnataka. Web development, mobile apps, AI/ML, cloud & DevOps. Hiring in Belagavi. Contact us today.',
    canonical: 'https://veltricks.dev/',
  },
  blog: {
    title: 'Blog — Tech Insights & Tutorials | VELTRICKS Belagavi',
    description:
      'Expert articles on web development, mobile apps, AI/ML and cloud from VELTRICKS — IT company based in Belagavi, Karnataka.',
    canonical: 'https://veltricks.dev/blog',
  },
};

// Organization structured data
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VELTRICKS',
  alternateName: ['Veltricks Software', 'Veltricks Belagavi', 'Veltricks Belgaum'],
  url: 'https://veltricks.dev',
  logo: {
    '@type': 'ImageObject',
    url: 'https://veltricks.dev/favicon.svg',
    width: 512,
    height: 512,
  },
  description:
    'VELTRICKS is a premium IT and software development company in Belagavi (Belgaum), Karnataka, India. We offer web development, mobile app development, AI/ML solutions, cloud infrastructure and UI/UX design.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Belagavi',
    addressRegion: 'Karnataka',
    postalCode: '590001',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-8310659343',
      contactType: 'customer service',
      email: 'hello@veltricks.dev',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
      areaServed: ['Belagavi', 'Karnataka', 'India', 'Worldwide'],
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
    name: 'IT & Software Development Services in Belagavi',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Web Development Belagavi',
          description:
            'Professional website and web app development in Belagavi, Belgaum using React, Next.js and TypeScript.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile App Development Belagavi',
          description: 'Android and iOS app development company in Belagavi, Karnataka.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI & Machine Learning Belagavi',
          description:
            'AI and ML development services from Belagavi, Karnataka — automation, analytics and LLM solutions.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Cloud & DevOps',
          description: 'Cloud infrastructure and DevOps services — AWS, Azure, Docker, Kubernetes.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Custom Software Development Belagavi',
          description:
            'Custom software solutions for businesses in Belagavi and Belgaum, Karnataka.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'E-Commerce Development Belagavi',
          description:
            'E-commerce website development for businesses in Belagavi using Shopify, WooCommerce and React.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'UI/UX Design',
          description: 'Professional UI/UX design services in Belagavi, Karnataka.',
        },
      },
    ],
  },
};

// FAQ Schema — targets local Belagavi/Belgaum + general searches
export const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Is VELTRICKS an IT company in Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. VELTRICKS is an IT and software development company based in Belagavi (also known as Belgaum), Karnataka, India. We serve local businesses in Belagavi as well as clients across India and worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which software companies are in Belgaum Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VELTRICKS is one of the leading software development companies in Belagavi (Belgaum), Karnataka. We specialize in web development, mobile apps, AI/ML solutions and cloud infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is VELTRICKS hiring in Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, VELTRICKS is actively hiring developers, designers and tech professionals in Belagavi, Karnataka. Contact us at hello@veltricks.dev or visit veltricks.dev to learn about open opportunities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What IT services does VELTRICKS offer in Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VELTRICKS offers web development, mobile app development, AI & ML solutions, cloud & DevOps, custom software development, e-commerce stores and UI/UX design services in Belagavi, Belgaum and across Karnataka.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I contact the best software company in Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reach VELTRICKS — a top software development company in Belagavi — by emailing hello@veltricks.dev, calling +91-8310659343, or filling out the contact form at veltricks.dev.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does VELTRICKS offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'VELTRICKS offers web development, mobile app development (iOS & Android), AI/ML solutions, cloud & DevOps, custom software development, e-commerce stores and UI/UX design services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does software development cost at VELTRICKS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project costs vary based on scope. VELTRICKS works with budgets starting from ₹50,000 for smaller projects up to ₹10,00,000+ for enterprise solutions. Contact us for a free estimate.',
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
