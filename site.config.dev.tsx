import { EnvironmentTypes, SiteConfig, footerApp, headerApp, shellApp } from '@openedx/frontend-base';
import { accountApp } from '@openedx/frontend-app-account';
import { adminConsoleApp } from '@openedx/frontend-app-admin-console';
import { authnApp } from '@openedx/frontend-app-authn';
import { catalogApp } from '@openedx/frontend-app-catalog';
import { gradebookApp } from '@openedx/frontend-app-gradebook';
import { instructorDashboardApp } from '@openedx/frontend-app-instructor-dashboard';
import { learnerDashboardApp } from '@openedx/frontend-app-learner-dashboard';
import { notificationsApp } from '@openedx/frontend-app-notifications';
import { profileApp } from '@openedx/frontend-app-profile';

import '@openedx/frontend-base/shell/style';
import '@edx/brand/core.min.css';
import '@edx/brand/light.min.css';

const siteConfig: SiteConfig = {
  siteId: 'frontend-template-dev',
  siteName: 'Frontend Template Dev',
  baseUrl: 'http://apps.local.openedx.io:8080',
  lmsBaseUrl: 'http://local.openedx.io:8000',
  cmsBaseUrl: 'http://studio.local.openedx.io:8001',
  loginUrl: 'http://local.openedx.io:8000/login',
  logoutUrl: 'http://local.openedx.io:8000/logout',
  commonAppConfig: {
    SUPPORT_URL: 'https://example.com/help/',
  },

  environment: EnvironmentTypes.DEVELOPMENT,
  apps: [
    shellApp,
    headerApp,
    footerApp,
    accountApp,
    adminConsoleApp,
    authnApp,
    catalogApp,
    gradebookApp,
    learnerDashboardApp,
    {
      ...instructorDashboardApp,
      config: {
        ...instructorDashboardApp.config,
        SUPPORT_URL: 'https://example.com/help/instructor',
      },
    },
    notificationsApp,
    profileApp,
  ],
  externalRoutes: [
    {
      role: 'org.openedx.frontend.role.logout',
      url: 'http://local.openedx.io:8000/logout'
    },
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
