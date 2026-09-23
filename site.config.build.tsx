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
  siteId: 'frontend-template-site',
  siteName: 'Frontend Template Site',
  baseUrl: 'http://apps.local.openedx.io',
  lmsBaseUrl: 'http://local.openedx.io',
  cmsBaseUrl: 'http://studio.local.openedx.io',
  loginUrl: 'http://local.openedx.io/login',
  logoutUrl: 'http://local.openedx.io/logout',

  environment: EnvironmentTypes.PRODUCTION,
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
    instructorDashboardApp,
    notificationsApp,
    profileApp,
  ],
  externalRoutes: [
    {
      role: 'org.openedx.frontend.role.logout',
      url: 'http://local.openedx.io/logout'
    },
  ],

  accessTokenCookieName: 'edx-jwt-cookie-header-payload',
};

export default siteConfig;
