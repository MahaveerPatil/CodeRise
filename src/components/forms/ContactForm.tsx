import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  timeline: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  service?: string;
  description?: string;
  general?: string;
}

const initialData: FormData = {
  name: '',
  company: '',
  email: '',
  phone: '',
  service: '',
  budget: '',
  timeline: '',
  description: '',
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FIELD_MAX = { name: 100, email: 254, description: 2000, company: 200, phone: 20 } as const;

// Calls the Cloudflare Worker API — swap VITE_CLOUDFLARE_WORKER_URL in .env for production
async function submitForm(data: FormData): Promise<void> {
  const workerUrl = import.meta.env.VITE_CLOUDFLARE_WORKER_URL as string;
  if (!workerUrl) {
    throw new Error('Contact form is not configured. Please email us directly at hello@coderise.com.');
  }
  const res = await fetch(`${workerUrl}/inquiries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Submission failed' })) as { error?: string };
    throw new Error(err.error || 'Submission failed');
  }
}

const fieldClass = (error?: string) =>
  cn(
    'w-full px-4 py-3 rounded-lg bg-bg-elevated border text-text-primary text-sm',
    'placeholder:text-text-muted transition-colors duration-200',
    'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent',
    error
      ? 'border-error'
      : 'border-border-subtle hover:border-border-default'
  );

export function ContactForm() {
  const [data, setData] = useState<FormData>(initialData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (fields: Partial<FormData>): FormErrors => {
    const e: FormErrors = {};
    if ('name' in fields && !fields.name?.trim()) e.name = 'Name is required.';
    if ('email' in fields) {
      if (!fields.email?.trim()) e.email = 'Email is required.';
      else if (!emailRegex.test(fields.email)) e.email = 'Enter a valid email address.';
    }
    if ('service' in fields && !fields.service) e.service = 'Please select a service.';
    if ('description' in fields && !fields.description?.trim())
      e.description = 'Project description is required.';
    if ('name' in fields && fields.name && fields.name.length > FIELD_MAX.name)
      e.name = `Name must be ${FIELD_MAX.name} characters or fewer.`;
    if ('email' in fields && fields.email && fields.email.length > FIELD_MAX.email)
      e.email = `Email must be ${FIELD_MAX.email} characters or fewer.`;
    if ('description' in fields && fields.description && fields.description.length > FIELD_MAX.description)
      e.description = `Description must be ${FIELD_MAX.description} characters or fewer.`;
    return e;
  };

  const handleChange = (field: keyof FormData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleBlur = (field: keyof FormData) => {
    const fieldErrors = validate({ [field]: data[field] });
    setErrors((prev) => {
      const next = { ...prev };
      if (fieldErrors[field as keyof FormErrors]) {
        (next as Record<string, string>)[field] = fieldErrors[field as keyof FormErrors]!;
      } else {
        delete (next as Record<string, string>)[field];
      }
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allErrors = validate(data);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }
    setLoading(true);
    setErrors({});
    try {
      await submitForm(data);
      setSubmitted(true);
    } catch {
      setErrors({ general: 'Something went wrong. Please try again or email us directly.' });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-16 h-16 rounded-full bg-success/20 border border-success/40 flex items-center justify-center mb-5"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10B981"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <h3 className="font-display font-bold text-2xl text-text-primary mb-3">
          Message Received!
        </h3>
        <p className="text-text-secondary">
          We'll review your project and get back to you within 24 hours.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Project inquiry form">
      {errors.general && (
        <div
          role="alert"
          className="mb-5 p-4 rounded-lg bg-error/10 border border-error/30 text-error text-sm"
        >
          {errors.general}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-secondary mb-1.5">
            Name <span className="text-error" aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            type="text"
            value={data.name}
            placeholder="Your name"
            maxLength={FIELD_MAX.name}
            onChange={(e) => handleChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className={fieldClass(errors.name)}
            aria-required="true"
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          <AnimatePresence>
            {errors.name && (
              <motion.p
                id="name-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1 text-xs text-error"
              >
                {errors.name}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Company */}
        <div>
          <label
            htmlFor="company"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Company
          </label>
          <input
            id="company"
            type="text"
            value={data.company}
            placeholder="Company name (optional)"
            maxLength={FIELD_MAX.company}
            onChange={(e) => handleChange('company', e.target.value)}
            className={fieldClass()}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-secondary mb-1.5">
            Email <span className="text-error" aria-hidden="true">*</span>
          </label>
          <input
            id="email"
            type="email"
            value={data.email}
            placeholder="your@email.com"
            maxLength={FIELD_MAX.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className={fieldClass(errors.email)}
            aria-required="true"
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          <AnimatePresence>
            {errors.email && (
              <motion.p
                id="email-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1 text-xs text-error"
              >
                {errors.email}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-text-secondary mb-1.5">
            Phone
          </label>
          <input
            id="phone"
            type="tel"
            value={data.phone}
            placeholder="+91 98765 43210 (optional)"
            maxLength={FIELD_MAX.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className={fieldClass()}
          />
        </div>

        {/* Service */}
        <div>
          <label
            htmlFor="service"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Service <span className="text-error" aria-hidden="true">*</span>
          </label>
          <select
            id="service"
            value={data.service}
            onChange={(e) => handleChange('service', e.target.value)}
            onBlur={() => handleBlur('service')}
            className={fieldClass(errors.service)}
            aria-required="true"
            aria-describedby={errors.service ? 'service-error' : undefined}
          >
            <option value="">Select a service</option>
            <option value="website">Website</option>
            <option value="web-app">Web Application</option>
            <option value="mobile">Mobile App</option>
            <option value="ai-ml">AI / ML</option>
            <option value="ecommerce">E-Commerce</option>
            <option value="software">Software Development</option>
            <option value="other">Other</option>
          </select>
          <AnimatePresence>
            {errors.service && (
              <motion.p
                id="service-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1 text-xs text-error"
              >
                {errors.service}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Budget */}
        <div>
          <label
            htmlFor="budget"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Budget
          </label>
          <select
            id="budget"
            value={data.budget}
            onChange={(e) => handleChange('budget', e.target.value)}
            className={fieldClass()}
          >
            <option value="">Select a budget range</option>
            <option value="under-50k">Under ₹50,000</option>
            <option value="50k-2l">₹50,000 – ₹2,00,000</option>
            <option value="2l-5l">₹2,00,000 – ₹5,00,000</option>
            <option value="5l-10l">₹5,00,000 – ₹10,00,000</option>
            <option value="above-10l">Above ₹10,00,000</option>
          </select>
        </div>

        {/* Timeline */}
        <div>
          <label
            htmlFor="timeline"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Project Timeline
          </label>
          <select
            id="timeline"
            value={data.timeline}
            onChange={(e) => handleChange('timeline', e.target.value)}
            className={fieldClass()}
          >
            <option value="">Select a timeline</option>
            <option value="asap">As soon as possible</option>
            <option value="1-3m">1–3 months</option>
            <option value="3-6m">3–6 months</option>
            <option value="6m+">6+ months</option>
            <option value="flexible">Flexible</option>
          </select>
        </div>

        {/* Description — full width */}
        <div className="md:col-span-2">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-text-secondary mb-1.5"
          >
            Project Description <span className="text-error" aria-hidden="true">*</span>
          </label>
          <textarea
            id="description"
            rows={5}
            value={data.description}
            placeholder="Tell us about your project — what you want to build, who it's for, and what problem it solves..."
            maxLength={FIELD_MAX.description}
            onChange={(e) => handleChange('description', e.target.value)}
            onBlur={() => handleBlur('description')}
            className={cn(fieldClass(errors.description), 'resize-y min-h-[120px]')}
            aria-required="true"
            aria-describedby={errors.description ? 'description-error' : undefined}
          />
          <AnimatePresence>
            {errors.description && (
              <motion.p
                id="description-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-1 text-xs text-error"
              >
                {errors.description}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mt-6">
        <button
          type="submit"
          disabled={loading}
          className={cn(
            'w-full py-4 rounded-xl font-semibold text-white transition-all duration-200',
            'bg-gradient-to-r from-brand-primary to-brand-accent',
            'hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base',
            loading && 'opacity-70 cursor-not-allowed'
          )}
          aria-busy={loading}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="w-4 h-4 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
              Sending...
            </span>
          ) : (
            'Send Project Inquiry →'
          )}
        </button>
      </div>
    </form>
  );
}
