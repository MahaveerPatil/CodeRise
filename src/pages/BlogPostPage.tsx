import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SEOHead } from '../components/seo/SEOHead';
import { Badge } from '../components/ui/Badge';
import { fadeUp } from '../utils/animations';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  tags: string[];
  created_at: string;
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const workerUrl = (import.meta.env.VITE_CLOUDFLARE_WORKER_URL as string) || '';

  useEffect(() => {
    if (!slug || !workerUrl) { navigate('/blog'); return; }
    fetch(`${workerUrl}/blog/${slug}`)
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(data => { setPost(data as BlogPost); setLoading(false); })
      .catch(() => navigate('/blog'));
  }, [slug, navigate, workerUrl]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!post) return null;

  return (
    <>
      <SEOHead
        title={`${post.title} — CodeRise Blog`}
        description={post.excerpt || post.title}
        canonical={`https://coderise.dev/blog/${post.slug}`}
      />
      <main id="main" className="min-h-screen bg-bg-base pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-text-secondary hover:text-brand-primary transition-colors text-sm font-medium mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded"
          >
            ← Back to Blog
          </button>

          <motion.article variants={fadeUp} initial="hidden" animate="visible">
            <p className="text-text-muted text-xs font-mono mb-4">
              {new Date(post.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-text-primary leading-tight mb-5">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-text-secondary text-xl leading-relaxed mb-6">{post.excerpt}</p>
            )}
            <div className="flex flex-wrap gap-2 mb-10 pb-8 border-b border-border-subtle">
              {post.tags?.map(tag => <Badge key={tag} variant="default">{tag}</Badge>)}
            </div>

            <div className="text-text-secondary leading-relaxed whitespace-pre-wrap text-base">
              {post.content}
            </div>
          </motion.article>

          <div className="mt-16 pt-8 border-t border-border-subtle text-center">
            <p className="text-text-muted text-sm mb-4">Have a project in mind?</p>
            <button
              onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              className="px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow transition-all text-sm"
            >
              Start a Project with CodeRise →
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
