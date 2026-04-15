import { App } from '@openedx/frontend-base';
import GoogleAnalyticsLoader from './GoogleAnalyticsLoader';

const app: App = {
  appId: 'org.openedx.frontend.app.googleAnalytics',
  externalScripts: [GoogleAnalyticsLoader],
};

export default app;
