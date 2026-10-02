import { useNavigate } from 'react-router-dom';
import { SEOHead } from '../components/seo/SEOHead';

const sections = [
  {
    title: '1. Services',
    content: `CodeRise provides custom software development, web development, mobile app development, AI/ML solutions, UI/UX design, and related IT services. The specific scope of work, deliverables, timelines, and pricing for any engagement are defined in a separate Statement of Work (SOW) or project agreement signed by both parties.`,
  },
  {
    title: '2. Intellectual Property',
    content: `Upon receipt of full payment, CodeRise assigns all intellectual property rights in the custom work product to the client. CodeRise retains the right to display the project in its portfolio unless otherwise agreed in writing. Any open-source components used in the project remain subject to their respective licences.`,
  },
  {
    title: '3. Payment Terms',
    content: `Payment terms are specified in individual project agreements. Unless otherwise agreed:
• Projects under ₹1,00,000: 100% upfront
• Projects ₹1,00,000–₹5,00,000: 50% upfront, 50% on delivery
• Projects above ₹5,00,000: 40% upfront, 40% at milestone, 20% on final delivery

Late payments may attract interest at 1.5% per month.`,
  },
  {
    title: '4. Confidentiality',
    content: `Both parties agree to keep confidential all non-public information disclosed during the engagement. This obligation survives termination of the project. CodeRise will not disclose your business data, source code, or project details to third parties without your written consent.`,
  },
  {
    title: '5. Limitation of Liability',
    content: `CodeRise's total liability for any claim arising from services rendered shall not exceed the total fees paid by the client for the specific project giving rise to the claim. We are not liable for indirect, incidental, or consequential damages.`,
  },
  {
    title: '6. Warranties',
    content: `CodeRise warrants that work will be performed professionally and conform to the agreed specifications. We provide a 30-day bug-fix warranty after project delivery at no additional cost. This warranty does not cover new feature requests or changes in requirements.`,
  },
  {
    title: '7. Termination',
    content: `Either party may terminate a project with 14 days written notice. In the event of termination, the client is responsible for payment of all work completed up to the termination date. Deposits paid are non-refundable unless CodeRise is in material breach.`,
  },
  {
    title: '8. Governing Law',
    content: `These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Belagavi, Karnataka, India.`,
  },
  {
    title: '9. Contact',
    content: `For any questions about these Terms, contact us at:
Email: hello@coderise.com
Phone: +91 8310659343
Address: Devaki Lodge, Kakatiyas, Belagavi, Karnataka 590001, India`,
  },
];

export default function TermsPage() {
  const navigate = useNavigate();

  return (
    <>
      <SEOHead
        title="Terms & Conditions — CodeRise"
        description="Terms and Conditions for engaging CodeRise for software development and IT services."
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

          <h1 className="font-display font-bold text-4xl text-text-primary mb-2">Terms & Conditions</h1>
          <p className="text-text-muted text-sm font-mono mb-10">Last updated: 26 August 2026</p>

          <p className="text-text-secondary leading-relaxed mb-10">
            These Terms & Conditions govern the provision of services by CodeRise ("we", "us", "our") to clients. By engaging our services or submitting an inquiry, you agree to these terms.
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
