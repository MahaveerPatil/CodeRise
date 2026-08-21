import { useState, useEffect, useCallback } from 'react';
import { supabase, type Inquiry } from '../lib/supabase';
import { SEOHead } from '../components/seo/SEOHead';

const STATUS_BADGE: Record<string, string> = {
  new: 'text-brand-primary bg-brand-primary/10 border-brand-primary/30',
  read: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  replied: 'text-green-400 bg-green-400/10 border-green-400/30',
  archived: 'text-text-muted bg-bg-elevated border-border-subtle',
};

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError(authError.message);
    else onLogin();
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display font-bold text-3xl gradient-text">VELTRICKS</span>
          <p className="text-text-muted text-sm mt-1">Admin Dashboard</p>
        </div>
        <div className="p-8 rounded-2xl border border-border-subtle bg-bg-card">
          {error && (
            <div className="mb-5 p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">{error}</div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full px-4 py-3 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full px-4 py-3 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary" />
            </div>
            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow transition-all disabled:opacity-70">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [filter, setFilter] = useState('all');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadInquiries = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    setInquiries((data as Inquiry[]) || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) { setAuthed(true); loadInquiries(); }
    });
  }, [loadInquiries]);

  const handleLogin = () => { setAuthed(true); loadInquiries(); };
  const handleLogout = async () => { await supabase.auth.signOut(); setAuthed(false); };

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    await supabase.from('inquiries').update({ status }).eq('id', id);
    setInquiries(p => p.map(i => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected(p => p ? { ...p, status } : null);
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    await supabase.from('inquiries').update({ notes }).eq('id', selected.id);
    setInquiries(p => p.map(i => i.id === selected.id ? { ...i, notes } : i));
    setSelected(p => p ? { ...p, notes } : null);
    setSaving(false);
  };

  if (!authed) return <LoginForm onLogin={handleLogin} />;

  const counts = {
    all: inquiries.length,
    new: inquiries.filter(i => i.status === 'new').length,
    read: inquiries.filter(i => i.status === 'read').length,
    replied: inquiries.filter(i => i.status === 'replied').length,
    archived: inquiries.filter(i => i.status === 'archived').length,
  };

  const filtered = filter === 'all' ? inquiries : inquiries.filter(i => i.status === filter);

  return (
    <>
      <SEOHead title="Admin — VELTRICKS" />
      <div className="min-h-screen bg-bg-base text-text-primary">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-border-subtle bg-bg-surface/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl gradient-text">VELTRICKS</span>
            <span className="text-text-muted text-sm border border-border-subtle rounded-full px-2 py-0.5 text-xs">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={loadInquiries} className="text-sm text-text-muted hover:text-brand-primary transition-colors">↻ Refresh</button>
            <button onClick={handleLogout} className="text-sm text-text-muted hover:text-brand-primary transition-colors">Logout</button>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
            {(Object.entries(counts) as [string, number][]).map(([key, val]) => (
              <button key={key} onClick={() => setFilter(key)}
                className={`p-4 rounded-xl border text-left transition-all ${filter === key ? 'border-brand-primary bg-brand-primary/5' : 'border-border-subtle bg-bg-card hover:border-border-default'}`}>
                <div className="text-2xl font-bold font-display text-text-primary">{val}</div>
                <div className="text-xs text-text-muted uppercase tracking-widest mt-1 capitalize">{key}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* List */}
            <div className="lg:col-span-2 space-y-2">
              {loading ? (
                <div className="flex justify-center py-12"><div className="w-6 h-6 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" /></div>
              ) : filtered.length === 0 ? (
                <div className="text-center py-12 text-text-muted text-sm">No inquiries found.</div>
              ) : (
                filtered.map(inquiry => (
                  <button key={inquiry.id} onClick={() => { setSelected(inquiry); setNotes(inquiry.notes || ''); updateStatus(inquiry.id, inquiry.status === 'new' ? 'read' : inquiry.status); }}
                    className={`w-full text-left p-4 rounded-xl border transition-all ${selected?.id === inquiry.id ? 'border-brand-primary bg-brand-primary/5' : 'border-border-subtle bg-bg-card hover:border-border-default'}`}>
                    <div className="flex items-start justify-between mb-1.5">
                      <p className="font-semibold text-text-primary text-sm">{inquiry.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full border font-mono shrink-0 ml-2 ${STATUS_BADGE[inquiry.status]}`}>{inquiry.status}</span>
                    </div>
                    <p className="text-text-muted text-xs">{inquiry.email}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-brand-primary font-medium">{inquiry.service}</span>
                      <span className="text-xs text-text-muted">{new Date(inquiry.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}</span>
                    </div>
                  </button>
                ))
              )}
            </div>

            {/* Detail */}
            <div className="lg:col-span-3">
              {selected ? (
                <div className="rounded-xl border border-border-subtle bg-bg-card p-6 space-y-5 sticky top-24">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-display font-bold text-xl text-text-primary">{selected.name}</h2>
                      {selected.company && <p className="text-text-muted text-sm">{selected.company}</p>}
                    </div>
                    <button onClick={() => setSelected(null)} className="text-text-muted hover:text-text-primary w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-elevated">✕</button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      ['Email', <a key="email" href={`mailto:${selected.email}`} className="text-brand-primary hover:underline">{selected.email}</a>],
                      ['Phone', selected.phone || '—'],
                      ['Service', selected.service],
                      ['Budget', selected.budget || '—'],
                      ['Timeline', selected.timeline || '—'],
                      ['Date', new Date(selected.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })],
                    ].map(([label, value]) => (
                      <div key={String(label)}>
                        <p className="text-text-muted text-xs uppercase tracking-widest mb-0.5">{label}</p>
                        <div className="text-text-primary text-sm font-medium">{value}</div>
                      </div>
                    ))}
                  </div>

                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Description</p>
                    <p className="text-text-secondary text-sm leading-relaxed bg-bg-elevated p-3 rounded-lg">{selected.description}</p>
                  </div>

                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Update Status</p>
                    <div className="flex flex-wrap gap-2">
                      {(['new', 'read', 'replied', 'archived'] as Inquiry['status'][]).map(s => (
                        <button key={s} onClick={() => updateStatus(selected.id, s)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${selected.status === s ? STATUS_BADGE[s] : 'border-border-subtle text-text-muted hover:border-border-default'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-text-muted text-xs uppercase tracking-widest mb-2">Internal Notes</p>
                    <textarea value={notes} onChange={e => setNotes(e.target.value)} rows={3}
                      className="w-full px-3 py-2 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary resize-none"
                      placeholder="Add notes about this inquiry..." />
                    <button onClick={saveNotes} disabled={saving}
                      className="mt-2 px-4 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-semibold hover:shadow-glow transition-all disabled:opacity-60">
                      {saving ? 'Saving...' : 'Save Notes'}
                    </button>
                  </div>

                  <a href={`mailto:${selected.email}?subject=Re: Your VELTRICKS Project Inquiry&body=Hi ${selected.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-brand-primary text-brand-primary text-sm font-medium hover:bg-brand-primary/5 transition-colors">
                    ✉ Reply via Email
                  </a>
                </div>
              ) : (
                <div className="rounded-xl border border-border-subtle bg-bg-card p-8 flex items-center justify-center text-text-muted text-sm h-48">
                  Select an inquiry to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
