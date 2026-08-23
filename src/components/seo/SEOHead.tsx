import { useEffect, useRef } from 'react';
import { defaultSEO } from '../../utils/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  /** Primary schema (e.g. Organization) */
  schema?: object;
  /** Additional schemas (e.g. FAQ, BreadcrumbList) */
  schemas?: object[];
  /** noindex pages like admin */
  noIndex?: boolean;
}

function setMeta(name: string, content: string, property = false) {
  const attr = property ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string, extra?: Record<string, string>) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  if (extra) {
    Object.entries(extra).forEach(([k, v]) => el!.setAttribute(k, v));
  }
}

export function SEOHead({
  title = defaultSEO.title,
  description = defaultSEO.description,
  canonical = defaultSEO.canonical,
  ogImage = defaultSEO.ogImage,
  schema,
  schemas = [],
  noIndex = false,
}: SEOHeadProps) {
  const schemaScriptRefs = useRef<HTMLScriptElement[]>([]);

  useEffect(() => {
    document.title = title;

    // Core
    setMeta('description', description);
    setMeta('robots', noIndex ? 'noindex, nofollow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    setLink('canonical', canonical);

    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:image:width', '1200', true);
    setMeta('og:image:height', '630', true);
    setMeta('og:image:alt', title, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonical, true);
    setMeta('og:site_name', defaultSEO.siteName, true);
    setMeta('og:locale', 'en_IN', true);

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:site', defaultSEO.twitterHandle);
    setMeta('twitter:creator', defaultSEO.twitterHandle);
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:image:alt', title);
  }, [title, description, canonical, ogImage, noIndex]);

  useEffect(() => {
    // Remove previously injected schema scripts
    schemaScriptRefs.current.forEach((s) => s.remove());
    schemaScriptRefs.current = [];

    const allSchemas = [...(schema ? [schema] : []), ...schemas];
    allSchemas.forEach((s) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(s);
      document.head.appendChild(script);
      schemaScriptRefs.current.push(script);
    });

    return () => {
      schemaScriptRefs.current.forEach((s) => s.remove());
      schemaScriptRefs.current = [];
    };
  }, [schema, schemas]);

  return null;
}
