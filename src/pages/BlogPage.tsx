import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SectionHeading } from '../components/ui/SectionHeading';
import { Badge } from '../components/ui/Badge';
import { SEOHead } from '../components/seo/SEOHead';
import { fadeUp, staggerContainer } from '../utils/animations';

interface BlogPostSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  tags: string[];
  created_at: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const workerUrl = (import.meta.env.VITE_CLOUDFLARE_WORKER_URL as string) || '';

  useEffect(() => {
    if (!workerUrl) { setLoading(false); return; }
    fetch(`${workerUrl}/blog`)
      .then(r => r.json())
      .then(data => { setPosts(data as BlogPostSummary[]); setLoading(false); })
      .catch(() => setLoading(false));
  }, [workerUrl]);

  return (
    <>
      <SEOHead
        title="Blog — CodeRise"
        description="Technology insights, case studies, and development articles from the CodeRise team."
        canonical="https://coderise.dev/blog"
      />
      <main id="main" className="min-h-screen bg-bg-base pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <SectionHeading
              label="BLOG"
              title="Insights & [Articles]"
              subtitle="Technology insights, case studies, and development articles from the CodeRise team."
              align="center"
            />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-muted text-lg">No articles yet.</p>
              <p className="text-text-muted text-sm mt-2">Check back soon — new content is coming!</p>
            </div>
          ) : (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {posts.map((post, i) => (
                <motion.button
                  key={post.id}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="text-left p-6 rounded-2xl border border-border-subtle bg-bg-card hover:border-brand-primary/40 hover:bg-bg-elevated transition-all group"
                >
                  <p className="text-text-muted text-xs font-mono mb-3">
                    {new Date(post.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </p>
                  <h2 className="font-display font-bold text-lg text-text-primary group-hover:text-brand-primary transition-colors mb-2 leading-snug">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {post.tags?.map(tag => <Badge key={tag} variant="default">{tag}</Badge>)}
                  </div>
                  <p className="text-brand-primary text-sm font-medium mt-4 group-hover:underline">Read more →</p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </>
  );
}
