export const defaultSEO = {
  title: 'CodeRise — IT & Software Development Company in Belagavi (Belgaum) | Web, Mobile, AI & Cloud',
  description:
    'CodeRise is a top IT and software development company in Belagavi (Belgaum), Karnataka. We build websites, web apps, mobile apps, AI/ML solutions and cloud infrastructure. Serving Belagavi, Belgaum and clients worldwide.',
  canonical: 'https://coderise.com/',
  ogImage: 'https://coderise.com/og-image.jpg',
  twitterHandle: '@coderise',
  siteName: 'CodeRise',
};

export const pageSEO: Record<string, { title: string; description: string; canonical: string }> = {
  home: {
    title: 'CodeRise — IT & Software Company in Belagavi Belgaum | Web, Mobile, AI & Cloud',
    description:
      'Top IT and software development company in Belagavi (Belgaum), Karnataka. Web development, mobile apps, AI/ML solutions and custom software. Hiring in Belagavi. Contact us today.',
    canonical: 'https://coderise.com/',
  },
  blog: {
    title: 'Blog — Tech Insights & Tutorials | CodeRise Belagavi',
    description:
      'Expert articles on web development, mobile apps, AI/ML and cloud from CodeRise — IT company based in Belagavi, Karnataka.',
    canonical: 'https://coderise.com/blog',
  },
};

// Organization structured data
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'CodeRise',
  alternateName: ['CodeRise Software', 'CodeRise Belagavi', 'CodeRise Belgaum'],
  url: 'https://coderise.com',
  logo: {
    '@type': 'ImageObject',
    url: 'https://coderise.com/favicon.svg',
    width: 512,
    height: 512,
  },
  description:
    'CodeRise is a premium IT and software development company in Belagavi (Belgaum), Karnataka, India. We offer web development, mobile app development, AI/ML solutions, cloud infrastructure and UI/UX design.',
  foundingDate: '2024',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Devaki Lodge, Kakatiyas',
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
      email: 'hello@coderise.com',
      availableLanguage: ['English', 'Hindi', 'Kannada'],
      areaServed: ['Belagavi', 'Karnataka', 'India', 'Worldwide'],
    },
  ],
  sameAs: [
    'https://linkedin.com/company/coderise',
    'https://github.com/coderise',
    'https://twitter.com/coderise',
    'https://instagram.com/coderise',
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
      name: 'Is CodeRise an IT company in Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. CodeRise is an IT and software development company based in Belagavi (also known as Belgaum), Karnataka, India. We serve local businesses in Belagavi as well as clients across India and worldwide.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which software companies are in Belgaum Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CodeRise is one of the leading software development companies in Belagavi (Belgaum), Karnataka. We specialize in web development, mobile apps, AI/ML solutions and cloud infrastructure.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is CodeRise hiring in Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes, CodeRise is actively hiring developers, designers and tech professionals in Belagavi, Karnataka. Contact us at hello@coderise.com or visit coderise.com to learn about open opportunities.',
      },
    },
    {
      '@type': 'Question',
      name: 'What IT services does CodeRise offer in Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CodeRise offers web development, mobile app development, AI & ML solutions, custom software development, e-commerce stores and UI/UX design services in Belagavi, Belgaum and across Karnataka.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I contact the best software company in Belagavi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'You can reach CodeRise — a top software development company in Belagavi — by emailing hello@coderise.com, calling +91-8310659343, or filling out the contact form at coderise.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'What services does CodeRise offer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'CodeRise offers web development, mobile app development (iOS & Android), AI/ML solutions, custom software development, e-commerce stores and UI/UX design services.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does software development cost at CodeRise?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Project costs vary based on scope. CodeRise works with budgets starting from ₹50,000 for smaller projects up to ₹10,00,000+ for enterprise solutions. Contact us for a free estimate.',
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
