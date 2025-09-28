export interface AnalyticsConfig {
  enabled: boolean;
  googleAnalyticsId?: string;
  semrushId?: string;
  metaPixelId?: string;
  linkedinInsightId?: string;
  hotjarId?: string;
  clarityId?: string;
}

export const analyticsConfig: AnalyticsConfig = {
  // Set to true to enable analytics tracking
  enabled: false,
  
  // Google Analytics 4 Tracking ID
  // Example: 'G-XXXXXXXXXX'
  googleAnalyticsId: process.env.NEXT_PUBLIC_GA_ID || '',
  
  // SEMrush Tracking ID (if using SEMrush)
  // Example: 'SEMRUSH-XXXXXXX'
  semrushId: process.env.NEXT_PUBLIC_SEMRUSH_ID || '',
  
  // Meta Pixel ID for Facebook/Instagram tracking
  // Example: '123456789012345'
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
  
  // LinkedIn Insight Tag Partner ID
  // Example: '12345'
  linkedinInsightId: process.env.NEXT_PUBLIC_LINKEDIN_INSIGHT_ID || '',
  
  // Hotjar Site ID for user behavior analytics
  // Example: '12345'
  hotjarId: process.env.NEXT_PUBLIC_HOTJAR_ID || '',
  
  // Microsoft Clarity Project ID
  // Example: 'abcdefghij'
  clarityId: process.env.NEXT_PUBLIC_CLARITY_ID || '',
};

/*
 * SETUP INSTRUCTIONS:
 * 
 * 1. To enable analytics, set `enabled: true` above
 * 
 * 2. Add your tracking IDs either:
 *    - Directly in this file (not recommended for public repos)
 *    - Or via environment variables in .env.local:
 *      NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
 *      NEXT_PUBLIC_META_PIXEL_ID=123456789012345
 *      NEXT_PUBLIC_LINKEDIN_INSIGHT_ID=12345
 *      etc.
 * 
 * 3. The analytics scripts will be automatically loaded
 *    when the app starts and tracking IDs are present
 * 
 * 4. Use the trackEvent() and trackPageView() functions
 *    from components/Analytics.tsx to send custom events
 */