// Supabase types — all database operations go through the Cloudflare Worker.
// VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are no longer used by the frontend.
// Set SUPABASE_URL and SUPABASE_SERVICE_KEY as worker secrets:
//   wrangler secret put SUPABASE_SERVICE_KEY (run in the worker/ directory)

export const WORKER_URL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL as string;

if (import.meta.env.DEV && !WORKER_URL) {
  console.warn('[CodeRise] VITE_CLOUDFLARE_WORKER_URL is not set. Admin panel and contact form will not work.');
}

export type Inquiry = {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  service: string;
  budget: string | null;
  timeline: string | null;
  description: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  tags: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
};
