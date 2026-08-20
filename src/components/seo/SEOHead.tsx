import { useEffect, useRef } from 'react';
import { defaultSEO } from '../../utils/seo';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  schema?: object;
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

function setLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function SEOHead({
  title = defaultSEO.title,
  description = defaultSEO.description,
  canonical = defaultSEO.canonical,
  ogImage = defaultSEO.ogImage,
  schema,
}: SEOHeadProps) {
  const schemaScriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    document.title = title;
    setMeta('description', description);
    setLink('canonical', canonical);
    // Open Graph
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:image', ogImage, true);
    setMeta('og:type', 'website', true);
    setMeta('og:url', canonical, true);
    setMeta('og:site_name', defaultSEO.siteName, true);
    // Twitter Card
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', ogImage);
    setMeta('twitter:site', defaultSEO.twitterHandle);
  }, [title, description, canonical, ogImage]);

  useEffect(() => {
    // Remove any previously injected schema script
    if (schemaScriptRef.current) {
      schemaScriptRef.current.remove();
      schemaScriptRef.current = null;
    }

    if (schema) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      document.head.appendChild(script);
      schemaScriptRef.current = script;
    }

    return () => {
      if (schemaScriptRef.current) {
        schemaScriptRef.current.remove();
        schemaScriptRef.current = null;
      }
    };
  }, [schema]);

  return null;
}
