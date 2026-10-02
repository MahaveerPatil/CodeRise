import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';

const sections = [
  {
    title: '1. Information We Collect',
    content: `When you use our contact form, we collect the information you voluntarily provide — including your name, email address, phone number, company name, and project details. We do not collect any information without your knowledge or consent.`,
  },
  {
    title: '2. How We Use Your Information',
    content: `We use the information you provide solely to:
• Respond to your project inquiry
• Send you a confirmation of receipt
• Communicate with you about your project or our services

We do not sell, rent, or share your personal information with third parties for marketing purposes.`,
  },
  {
    title: '3. Data Storage',
    content: `Your inquiry data is stored securely in our database (Supabase, hosted on AWS). We retain inquiry data for up to 2 years for business record purposes. You may request deletion of your data at any time by contacting us at hello@coderise.com.`,
  },
  {
    title: '4. Cookies',
    content: `This website does not use tracking cookies or analytics tools. We do not use Google Analytics, Facebook Pixel, or any other third-party tracking scripts. The only external requests made are to load fonts (Google Fonts) and to submit your inquiry to our API.`,
  },
  {
    title: '5. Third-Party Services',
    content: `We use the following third-party services to operate this website:
• Supabase — database and authentication (supabase.com)
• Resend — transactional email delivery (resend.com)
• Cloudflare — hosting and CDN (cloudflare.com)
• Google Fonts — typography (fonts.google.com)
• Google Maps — location display (maps.google.com)

Each of these services has their own privacy policy governing their data practices.`,
  },
  {
    title: '6. Your Rights',
    content: `Under applicable law (including India's Digital Personal Data Protection Act 2023 and GDPR for EU residents), you have the right to:
• Access the personal data we hold about you
• Request correction of inaccurate data
• Request deletion of your data
• Withdraw consent at any time

To exercise any of these rights, contact us at hello@coderise.com.`,
  },
  {
    title: '7. Security',
    content: `We take reasonable technical and organisational measures to protect your data from unauthorised access, loss, or misuse. All data in transit is encrypted via HTTPS/TLS.`,
  },
  {
    title: '8. Contact',
    content: `For any privacy-related questions or requests, contact us at:
Email: hello@coderise.com
Phone: +91 8310659343
Address: Devaki Lodge, Kakatiyas, Belagavi, Karnataka 590001, India`,
  },
];

export default function PrivacyPolicyPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="Privacy Policy — CodeRise"
        description="Privacy Policy for CodeRise — how we collect, use, and protect your personal data."
        noIndex
      />
      <main id="main" className="min-h-screen bg-bg-base pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors text-sm font-medium mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            ← Back to Home
          </button>

          <h1 className="font-display font-bold text-4xl text-text-primary mb-2">Privacy Policy</h1>
          <p className="text-text-muted text-sm font-mono mb-10">Last updated: 26 August 2026</p>

          <p className="text-text-secondary leading-relaxed mb-10">
            CodeRise ("we", "us", "our") is committed to protecting your personal information. This Privacy Policy explains what data we collect, how we use it, and your rights in relation to it.
          </p>

          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="font-display font-semibold text-lg text-text-primary mb-3">{section.title}</h2>
                <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
