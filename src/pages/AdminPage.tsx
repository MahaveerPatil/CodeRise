import { useState, useEffect, useCallback } from 'react';
import { WORKER_URL, type Inquiry } from '../lib/supabase';
import { SEOHead } from '../components/seo/SEOHead';

const STATUS_BADGE: Record<string, string> = {
  new: 'text-brand-primary bg-brand-primary/10 border-brand-primary/30',
  read: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
  replied: 'text-green-400 bg-green-400/10 border-green-400/30',
  archived: 'text-text-muted bg-bg-elevated border-border-subtle',
};

const SESSION_KEY = 'coderise_admin_session';

function getToken(): string | null {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const { accessToken, expiresAt } = JSON.parse(raw) as { accessToken: string; expiresAt: number };
    if (expiresAt && Date.now() / 1000 > expiresAt) { sessionStorage.removeItem(SESSION_KEY); return null; }
    return accessToken;
  } catch { return null; }
}

function setToken(accessToken: string, expiresAt: number) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ accessToken, expiresAt }));
}

function clearToken() {
  sessionStorage.removeItem(SESSION_KEY);
}

async function api<T>(path: string, method = 'GET', body?: unknown): Promise<T> {
  const token = getToken();
  const res = await fetch(`${WORKER_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Request failed' })) as { error?: string };
    throw Object.assign(new Error(err.error || 'Request failed'), { status: res.status });
  }
  return res.json() as Promise<T>;
}

type AuthView = 'login' | 'forgot' | 'forgot-sent';

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [view, setView] = useState<AuthView>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await api<{ accessToken: string; expiresAt: number }>(
        '/admin/auth/login', 'POST', { email, password }
      );
      setToken(data.accessToken, data.expiresAt);
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await api('/admin/auth/forgot-password', 'POST', { email: resetEmail });
      setView('forgot-sent');
    } catch {
      // Show success anyway to avoid email enumeration
      setView('forgot-sent');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'w-full px-4 py-3 rounded-lg bg-bg-elevated border border-border-subtle text-text-primary text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary';

  return (
    <div className="min-h-screen bg-bg-base flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <span className="font-display font-bold text-3xl gradient-text">CodeRise</span>
          <p className="text-text-muted text-sm mt-1">Admin Dashboard</p>
        </div>

        <div className="p-8 rounded-2xl border border-border-subtle bg-bg-card">

          {/* ── Login view ── */}
          {view === 'login' && (
            <>
              {error && (
                <div className="mb-5 p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">{error}</div>
              )}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                    placeholder="you@example.com" className={inputClass} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-sm font-medium text-text-secondary">Password</label>
                    <button type="button" onClick={() => { setResetEmail(email); setError(''); setView('forgot'); }}
                      className="text-xs text-brand-primary hover:underline">
                      Forgot password?
                    </button>
                  </div>
                  <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                    className={inputClass} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow transition-all disabled:opacity-70">
                  {loading ? 'Signing in...' : 'Sign In'}
                </button>
              </form>
            </>
          )}

          {/* ── Forgot password view ── */}
          {view === 'forgot' && (
            <>
              <button onClick={() => { setError(''); setView('login'); }}
                className="flex items-center gap-1.5 text-xs text-text-muted hover:text-text-primary mb-5 transition-colors">
                ← Back to login
              </button>
              <h2 className="font-display font-bold text-lg text-text-primary mb-1">Reset your password</h2>
              <p className="text-text-muted text-sm mb-5">
                Enter your admin email and we'll send a reset link.
              </p>
              {error && (
                <div className="mb-5 p-3 rounded-lg bg-error/10 border border-error/30 text-error text-sm">{error}</div>
              )}
              <form onSubmit={handleForgot} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-1.5">Email</label>
                  <input type="email" value={resetEmail} onChange={e => setResetEmail(e.target.value)} required
                    placeholder="you@example.com" className={inputClass} />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-glow transition-all disabled:opacity-70">
                  {loading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>
            </>
          )}

          {/* ── Reset email sent view ── */}
          {view === 'forgot-sent' && (
            <div className="text-center py-4">
              <div className="w-14 h-14 rounded-full bg-success/15 border border-success/30 flex items-center justify-center mx-auto mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" aria-hidden="true">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h2 className="font-display font-bold text-lg text-text-primary mb-2">Check your email</h2>
              <p className="text-text-muted text-sm mb-1">
                If <span className="text-text-primary font-medium">{resetEmail}</span> is registered,
              </p>
              <p className="text-text-muted text-sm mb-6">
                you'll receive a password reset link shortly.
              </p>
              <button onClick={() => { setError(''); setView('login'); }}
                className="text-sm text-brand-primary hover:underline">
                ← Back to login
              </button>
            </div>
          )}

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
    try {
      const data = await api<Inquiry[]>('/admin/inquiries');
      setInquiries(data || []);
    } catch (err) {
      if (err instanceof Error && (err as Error & { status?: number }).status === 401) {
        clearToken();
        setAuthed(false);
      }
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const token = getToken();
    if (token) {
      api('/admin/auth/session')
        .then(() => { setAuthed(true); loadInquiries(); })
        .catch(() => { clearToken(); setLoading(false); });
    } else {
      setLoading(false);
    }
  }, [loadInquiries]);

  const handleLogin = () => { setAuthed(true); loadInquiries(); };

  const handleLogout = async () => {
    const token = getToken();
    if (token) {
      await api('/admin/auth/logout', 'POST').catch(() => {});
    }
    clearToken();
    setAuthed(false);
  };

  const updateStatus = async (id: string, status: Inquiry['status']) => {
    await api(`/admin/inquiries/${id}`, 'PATCH', { status });
    setInquiries(p => p.map(i => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected(p => p ? { ...p, status } : null);
  };

  const saveNotes = async () => {
    if (!selected) return;
    setSaving(true);
    await api(`/admin/inquiries/${selected.id}`, 'PATCH', { notes });
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
      <SEOHead title="Admin — CodeRise" />
      <div className="min-h-screen bg-bg-base text-text-primary">
        {/* Header */}
        <header className="sticky top-0 z-10 border-b border-border-subtle bg-bg-surface/90 backdrop-blur-md px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-display font-bold text-xl gradient-text">CodeRise</span>
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

                  <a href={`mailto:${selected.email}?subject=Re: Your CodeRise Project Inquiry&body=Hi ${selected.name},%0D%0A%0D%0AThank you for reaching out!%0D%0A%0D%0A`}
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
