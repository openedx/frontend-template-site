frontend-template-site
######################

|license-badge| |status-badge| |ci-badge| |codecov-badge|


Purpose
*******

This repository is a template for Open edX frontend sites. It is flagged as a
Template Repository, meaning it can be used as a basis for new GitHub
repositories by clicking the green "Use this template" button above.

Getting Started
***************

After copying the template repository, you'll want to do a find-and-replace to
replace all instances of ``frontend-template-site`` with the name of your new
repository.  Also edit index.html to replace "Template Site" with a friendly
name for this site that users will see in their browser tab.

Cloning and Startup
===================

In the following steps, replace "[PLACEHOLDER]" with the name of the repo you
created when copying this template above.

1. Clone your new repo:

  ``git clone https://github.com/openedx/frontend-site-[PLACEHOLDER].git``

2. Use node v20.x.

   The current version of the micro-frontend build scripts support node 20.
   Using other major versions of node *may* work, but this is unsupported.  For
   convenience, this repository includes an .nvmrc file to help in setting the
   correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

3. Install npm dependencies:

  ``cd frontend-site-[PLACEHOLDER] && npm install``

4. Update the application port to use for local development:

   Default port is 8080. If this does not work for you, update the line
   `PORT=8080` to your port in ``site.config.dev.tsx``.

5. Start the dev server:

  ``npm run dev``

The dev server is running at `http://apps.local.openedx.io:8080 <http://apps.local.openedx.io:8080>`_
or whatever port you setup.

Internationalization
====================

Please see refer to the `frontend-base i18n howto`_ for documentation on
internationalization.

.. _frontend-base i18n howto: https://github.com/openedx/frontend-base/blob/master/docs/how_tos/i18n.rst

License
*******

The code in this repository is licensed under the AGPLv3 unless otherwise
noted.

Please see `LICENSE <LICENSE>`_ for details.

Contributing
************

Contributions are very welcome.  Please read `How To Contribute`_ for details.

.. _How To Contribute: https://openedx.org/r/how-to-contribute

This project is currently accepting all types of contributions, bug fixes,
security fixes, maintenance work, or new features.  However, please make sure
to have a discussion about your new feature idea with the maintainers prior to
beginning development to maximize the chances of your change being accepted.
You can start a conversation by creating a new issue on this repo summarizing
your idea.

The Open edX Code of Conduct
****************************

All community members are expected to follow the `Open edX Code of Conduct`_.

.. _Open edX Code of Conduct: https://openedx.org/code-of-conduct/

People
******

The assigned maintainers for this component and other project details may be
found in `Backstage`_. Backstage pulls this data from the ``catalog-info.yaml``
file in this repo.

.. _Backstage: https://open-edx-backstage.herokuapp.com/catalog/default/component/frontend-template-site

Reporting Security Issues
*************************

Please do not report security issues in public, and email security@openedx.org instead.

.. |license-badge| image:: https://img.shields.io/github/license/openedx/frontend-template-application.svg
    :target: https://github.com/openedx/frontend-template-application/blob/main/LICENSE
    :alt: License

.. |status-badge| image:: https://img.shields.io/badge/Status-Maintained-brightgreen

.. |ci-badge| image:: https://github.com/openedx/frontend-template-application/actions/workflows/ci.yml/badge.svg
    :target: https://github.com/openedx/frontend-template-application/actions/workflows/ci.yml
    :alt: Continuous Integration

.. |codecov-badge| image:: https://codecov.io/github/openedx/frontend-template-application/coverage.svg?branch=main
    :target: https://codecov.io/github/openedx/frontend-template-application?branch=main
    :alt: Codecov
