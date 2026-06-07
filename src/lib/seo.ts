export type JsonLd = Record<string, unknown>;

export const siteName = 'Juan Obrach';
export const siteUrl = 'https://juanobrach.dev';
export const authorName = 'Juan Manuel Obrach';
export const authorUrl = `${siteUrl}/about/`;
export const defaultImageUrl = `${siteUrl}/og-image.png`;

export function absoluteUrl(pathname: string): string {
  return new URL(pathname, siteUrl).href;
}

export function buildPersonJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${authorUrl}#juan-obrach`,
    name: authorName,
    alternateName: 'Juan Obrach',
    url: authorUrl,
    image: defaultImageUrl,
    jobTitle: 'Senior Product Engineer',
    description:
      'Senior Product Engineer and independent creator building mobile, AI, and end-to-end product systems.',
    knowsAbout: [
      'Product Engineering',
      'React Native',
      'Expo',
      'AI Systems',
      'Supabase',
      'TypeScript',
      'Mobile Architecture',
      'Product Strategy',
    ],
    sameAs: [
      'https://github.com/juanobrach',
      'https://linkedin.com/in/jmobrach',
      'https://twitter.com/juan_obrach',
    ],
  };
}

export function buildProfilePageJsonLd(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${authorUrl}#profile-page`,
    url: authorUrl,
    name: 'About Juan Obrach',
    description:
      'Profile for Juan Obrach, Senior Product Engineer and independent creator focused on mobile, AI, and product systems.',
    image: defaultImageUrl,
    mainEntity: buildPersonJsonLd(),
  };
}

export function buildArticleJsonLd({
  title,
  description,
  datePublished,
  dateModified,
  url,
  tags = [],
}: {
  title: string;
  description?: string;
  datePublished: Date;
  dateModified?: Date;
  url: string;
  tags?: string[];
}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: datePublished.toISOString(),
    dateModified: (dateModified ?? datePublished).toISOString(),
    url,
    image: defaultImageUrl,
    keywords: tags,
    author: {
      '@id': `${authorUrl}#juan-obrach`,
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      '@type': 'Person',
      name: authorName,
      url: authorUrl,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; url: string }>,
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
