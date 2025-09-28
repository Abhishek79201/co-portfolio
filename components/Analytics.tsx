'use client';

import { useEffect } from 'react';
import { analyticsConfig } from '@/config/analytics';

declare global {
  interface Window {
    gtag: any;
    dataLayer: any[];
    fbq: any;
  }
}

export const AnalyticsProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    if (!analyticsConfig.enabled) return;

    // Google Analytics
    if (analyticsConfig.googleAnalyticsId) {
      const script1 = document.createElement('script');
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.googleAnalyticsId}`;
      document.head.appendChild(script1);

      const script2 = document.createElement('script');
      script2.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${analyticsConfig.googleAnalyticsId}', {
          page_title: document.title,
          page_location: window.location.href,
        });
      `;
      document.head.appendChild(script2);
    }

    // Meta Pixel
    if (analyticsConfig.metaPixelId) {
      const script = document.createElement('script');
      script.innerHTML = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${analyticsConfig.metaPixelId}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(script);
    }

    // LinkedIn Insight Tag
    if (analyticsConfig.linkedinInsightId) {
      const script = document.createElement('script');
      script.innerHTML = `
        _linkedin_partner_id = "${analyticsConfig.linkedinInsightId}";
        window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
        window._linkedin_data_partner_ids.push(_linkedin_partner_id);
      `;
      document.head.appendChild(script);

      const script2 = document.createElement('script');
      script2.async = true;
      script2.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';
      document.head.appendChild(script2);
    }
  }, []);

  return <>{children}</>;
};

// Utility functions for tracking events
export const trackEvent = (eventName: string, parameters?: any) => {
  if (!analyticsConfig.enabled) return;

  // Google Analytics
  if (analyticsConfig.googleAnalyticsId && window.gtag) {
    window.gtag('event', eventName, parameters);
  }

  // Meta Pixel
  if (analyticsConfig.metaPixelId && window.fbq) {
    window.fbq('track', eventName, parameters);
  }
};

export const trackPageView = (url: string) => {
  if (!analyticsConfig.enabled) return;

  // Google Analytics
  if (analyticsConfig.googleAnalyticsId && window.gtag) {
    window.gtag('config', analyticsConfig.googleAnalyticsId, {
      page_path: url,
    });
  }
};