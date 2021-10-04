export const GTAG_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID as string;

export function isAnalyticsEnabled(): boolean {
  return !!GTAG_ANALYTICS_ID;
}

// log the pageview with their URL
export const pageview = (url: string) => {
  if (window.gtag) {
    window.gtag('config', GTAG_ANALYTICS_ID, {
      page_path: url,
    });
  }
}

// log specific events happening.
export const event = (action: string, params?: any) => {
  if (window.gtag) {
    window.gtag('event', action, params);
  }
}