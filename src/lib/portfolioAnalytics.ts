import { Analytics, PostHogProvider } from '@entity-builders/analytics';

type PageType =
  | 'home'
  | 'about'
  | 'case_studies_index'
  | 'case_study'
  | 'writing_index'
  | 'article'
  | 'app_detail'
  | 'unknown';

type ReferrerType = 'organic' | 'social' | 'direct' | 'referral' | 'unknown';
type DestinationType =
  | 'email'
  | 'linkedin'
  | 'github'
  | 'x'
  | 'cv'
  | 'case_study'
  | 'article'
  | 'about'
  | 'home'
  | 'app_detail'
  | 'assistant'
  | 'external'
  | 'unknown';

type AssistantTopic =
  | 'case_studies'
  | 'experience'
  | 'stack'
  | 'availability'
  | 'hiring_fit'
  | 'language'
  | 'location'
  | 'compensation'
  | 'contact'
  | 'unknown';

type AnalyticsConfig = {
  posthogKey?: string;
  posthogHost?: string;
  environment: string;
  route: string;
  pageType: PageType;
  slug?: string;
  title: string;
};

type SafeEventProperties = {
  route?: string;
  page_type?: PageType;
  slug?: string;
  surface?: string;
  action?: string;
  destination_type?: DestinationType;
  referrer_type?: ReferrerType;
  question_topic?: AssistantTopic;
  message_length_bucket?: string;
  assistant_outcome?: string;
  [key: string]: string | number | boolean | undefined;
};

declare global {
  interface Window {
    portfolioAnalytics?: {
      track: (
        event: string,
        properties?: SafeEventProperties,
      ) => void;
      trackAssistant: (
        event: string,
        properties?: SafeEventProperties,
      ) => void;
      classifyQuestionTopic: (text: string) => AssistantTopic;
      messageLengthBucket: (text: string) => string;
      getSourceMetadata: () => SafeEventProperties;
    };
  }
}

const analytics = new Analytics(new PostHogProvider());
let initialized = false;
let clickTrackingAttached = false;
let config: AnalyticsConfig | null = null;

function readConfig(): AnalyticsConfig | null {
  const el = document.getElementById('portfolio-analytics-config');
  if (!el?.textContent) return null;

  try {
    return JSON.parse(el.textContent) as AnalyticsConfig;
  } catch {
    return null;
  }
}

function sanitize(value: string | undefined, fallback = 'unknown'): string {
  const safe = value?.trim();
  if (!safe) return fallback;
  return safe.slice(0, 120);
}

function getReferrerType(): ReferrerType {
  if (!document.referrer) return 'direct';

  try {
    const host = new URL(document.referrer).hostname.replace(/^www\./, '');
    if (host === window.location.hostname.replace(/^www\./, '')) return 'direct';
    if (
      host.includes('google.') ||
      host.includes('bing.') ||
      host.includes('duckduckgo.') ||
      host.includes('yahoo.')
    ) {
      return 'organic';
    }
    if (
      host.includes('linkedin.') ||
      host.includes('twitter.') ||
      host.includes('x.com') ||
      host.includes('github.') ||
      host.includes('facebook.')
    ) {
      return 'social';
    }
    return 'referral';
  } catch {
    return 'unknown';
  }
}

function baseProperties(): SafeEventProperties {
  return {
    route: config?.route ?? window.location.pathname,
    page_type: config?.pageType ?? 'unknown',
    slug: config?.slug,
    referrer_type: getReferrerType(),
  };
}

function viewEventName(pageType: PageType): string {
  if (pageType === 'case_study') return 'case_study_view';
  if (pageType === 'article') return 'article_view';
  if (pageType === 'app_detail') return 'app_detail_view';
  return 'portfolio_page_view';
}

function destinationFromHref(href: string): DestinationType {
  if (href.startsWith('mailto:')) return 'email';
  if (href.includes('/CV_Juan_Obrach.pdf')) return 'cv';
  if (href.includes('linkedin.com')) return 'linkedin';
  if (href.includes('github.com')) return 'github';
  if (href.includes('twitter.com') || href.includes('x.com')) return 'x';

  try {
    const url = new URL(href, window.location.href);
    if (url.origin !== window.location.origin) return 'external';
    if (url.pathname === '/') return 'home';
    if (url.pathname === '/about') return 'about';
    if (url.pathname.startsWith('/case-studies/')) return 'case_study';
    if (url.pathname === '/case-studies') return 'case_study';
    if (url.pathname.startsWith('/blog/')) return 'article';
    if (url.pathname === '/blog') return 'article';
    if (url.pathname.startsWith('/apps/')) return 'app_detail';
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

function eventNameFromDestination(destination: DestinationType): string {
  if (destination === 'cv') return 'cv_download';
  if (['email', 'linkedin', 'github', 'x'].includes(destination)) {
    return 'contact_click';
  }
  if (destination === 'case_study') return 'case_study_click';
  if (destination === 'article') return 'article_click';
  if (destination === 'app_detail') return 'app_detail_click';
  return destination === 'external' ? 'outbound_link_click' : 'portfolio_link_click';
}

function closestSurface(link: HTMLAnchorElement): string {
  const explicit = link.dataset.analyticsSurface;
  if (explicit) return sanitize(explicit);

  const parent = link.closest<HTMLElement>('[data-analytics-surface]');
  return sanitize(parent?.dataset.analyticsSurface, 'unknown');
}

export function classifyQuestionTopic(text: string): AssistantTopic {
  const normalized = text.toLowerCase();
  if (/(salary|compensation|rate|pay|sueldo|salario|pretension)/.test(normalized)) {
    return 'compensation';
  }
  if (/(available|availability|open to|disponible|disponibilidad)/.test(normalized)) {
    return 'availability';
  }
  if (/(case study|case studies|project|portfolio|caso|proyecto)/.test(normalized)) {
    return 'case_studies';
  }
  if (/(experience|senior|role|rbi|blockfi|trabajo|experiencia)/.test(normalized)) {
    return 'experience';
  }
  if (/(stack|react native|expo|supabase|ai|gemini|typescript|tech)/.test(normalized)) {
    return 'stack';
  }
  if (/(fit|hire|hiring|founder|cto|manager|contratar|equipo)/.test(normalized)) {
    return 'hiring_fit';
  }
  if (/(english|spanish|language|idioma|ingles|espanol)/.test(normalized)) {
    return 'language';
  }
  if (/(argentina|buenos aires|remote|remoto|timezone|ubicacion)/.test(normalized)) {
    return 'location';
  }
  if (/(contact|email|linkedin|reach|contacto|mensaje)/.test(normalized)) {
    return 'contact';
  }
  return 'unknown';
}

export function messageLengthBucket(text: string): string {
  const length = text.trim().length;
  if (length <= 0) return 'empty';
  if (length <= 80) return 'short';
  if (length <= 240) return 'medium';
  return 'long';
}

export function trackPortfolioEvent(
  event: string,
  properties: SafeEventProperties = {},
): void {
  if (!initialized) return;

  analytics.track(event, {
    app: 'portfolio',
    environment: config?.environment ?? 'unknown',
    ...baseProperties(),
    ...properties,
  });
}

function attachClickTracking(): void {
  if (clickTrackingAttached) return;
  clickTrackingAttached = true;

  document.addEventListener(
    'click',
    (event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const link = target.closest<HTMLAnchorElement>('a[href]');
      if (!link) return;

      const href = link.getAttribute('href') ?? '';
      const destination = (link.dataset.analyticsDestination ??
        destinationFromHref(href)) as DestinationType;
      const eventName =
        link.dataset.analyticsEvent ?? eventNameFromDestination(destination);

      trackPortfolioEvent(eventName, {
        action: link.hasAttribute('download') ? 'download' : 'click',
        destination_type: destination,
        surface: closestSurface(link),
      });
    },
    { capture: true },
  );
}

function exposeWindowApi(): void {
  window.portfolioAnalytics = {
    track: trackPortfolioEvent,
    trackAssistant: (event, properties = {}) => {
      trackPortfolioEvent(event, {
        surface: 'assistant',
        ...properties,
      });
    },
    classifyQuestionTopic,
    messageLengthBucket,
    getSourceMetadata: () => baseProperties(),
  };
}

export function initPortfolioAnalyticsFromDom(): void {
  if (initialized) return;

  config = readConfig();
  if (!config?.posthogKey) return;

  analytics.init({
    apiKey: config.posthogKey,
    apiHost: config.posthogHost || 'https://us.i.posthog.com',
    autocapture: false,
    disableSessionRecording: true,
  });
  analytics.setGlobalProperties({
    app: 'portfolio',
    environment: config.environment,
    site: 'juanobrach.dev',
  });

  initialized = true;
  exposeWindowApi();
  trackPortfolioEvent(viewEventName(config.pageType), {
    action: 'view',
    surface: 'page',
  });
  attachClickTracking();
}
