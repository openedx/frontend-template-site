import { AppConfig, ExternalScriptLoader } from '@openedx/frontend-base';

export default class GoogleAnalyticsLoader implements ExternalScriptLoader {
  analyticsId: string;

  constructor({ config }: { config: AppConfig }) {
    this.analyticsId = config.GOOGLE_ANALYTICS_4_ID as string;
  }

  loadScript() {
    if (!this.analyticsId) {
      return;
    }

    global.googleAnalytics = global.googleAnalytics || [];
    // @ts-expect-error We just added googleAnalytics to global, it's there.
    const { googleAnalytics } = global;

    if (googleAnalytics.invoked) {
      return;
    }

    googleAnalytics.invoked = true;

    googleAnalytics.load = (key, options) => {
      const scriptSrc = document.createElement('script');
      scriptSrc.type = 'text/javascript';
      scriptSrc.async = true;
      scriptSrc.src = `https://www.googletagmanager.com/gtag/js?id=${key}`;

      const scriptGtag = document.createElement('script');
      scriptGtag.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${key}');
      `;

      const first = document.getElementsByTagName('script')[0];
      if (first?.parentNode === null) {
        throw new Error('No script to insert Google analytics script before.');
      }
      first.parentNode.insertBefore(scriptSrc, first);
      first.parentNode.insertBefore(scriptGtag, first);
      googleAnalytics._loadOptions = options;
    };

    googleAnalytics.load(this.analyticsId);
  }
}
