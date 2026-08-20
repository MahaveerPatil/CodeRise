export const defaultSEO = {
  title: 'VELTRIX — Premium IT Solutions & Software Development',
  description:
    'VELTRIX builds premium digital products — websites, web apps, mobile apps, AI/ML solutions, cloud infrastructure, and more. Turn your ideas into technology that works.',
  canonical: 'https://veltrix.dev',
  ogImage: '/og-image.jpg',
  twitterHandle: '@veltrix',
  siteName: 'VELTRIX',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VELTRIX',
  url: 'https://veltrix.dev',
  logo: 'https://veltrix.dev/logo.png',
  description: defaultSEO.description,
  sameAs: [
    'https://linkedin.com/company/veltrix',
    'https://github.com/veltrix',
    'https://twitter.com/veltrix',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@veltrix.dev',
  },
};
