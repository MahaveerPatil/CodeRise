export const defaultSEO = {
  title: 'VELTRICKS — Premium IT Solutions & Software Development',
  description:
    'VELTRICKS builds premium digital products — websites, web apps, mobile apps, AI/ML solutions, cloud infrastructure, and more. Turn your ideas into technology that works.',
  canonical: 'https://veltricks.dev',
  ogImage: '/og-image.jpg',
  twitterHandle: '@veltricks',
  siteName: 'VELTRICKS',
};

export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'VELTRICKS',
  url: 'https://veltricks.dev',
  logo: 'https://veltricks.dev/logo.png',
  description: defaultSEO.description,
  sameAs: [
    'https://linkedin.com/company/veltricks',
    'https://github.com/veltricks',
    'https://twitter.com/veltricks',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    email: 'hello@veltricks.dev',
  },
};
