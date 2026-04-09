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

Local Development with Workspaces
==================================

This repository supports `npm workspaces`_ to enable local development of
frontend apps (e.g., ``frontend-app-authn``, ``frontend-app-learner-dashboard``)
and ``frontend-base`` itself, all running together in the context of a site.

The ``packages/`` directory (gitignored) holds local checkouts of packages being
developed.  These act as development-only overrides of the npm-published
versions.

Since symlinks cause module resolution failures (Node.js resolves to the real
path, breaking hoisted dependency resolution), local checkouts should either be
made directly under ``packages/`` or made available via bind mounts (or volume
mounts, if running under Docker).  For example, if the checkouts are siblings
of this repository::

  mkdir -p packages/{frontend-base,frontend-app-authn,frontend-app-learner-dashboard}
  cd packages
  for i in *; do sudo mount --bind ../../${i} ${i}; done
  cd ..
  npm install

`bindfs`_ can be used instead of ``sudo mount --bind`` to avoid requiring root
privileges.

.. _bindfs: https://bindfs.org/
.. _npm workspaces: https://docs.npmjs.com/cli/using-npm/workspaces

Version Placeholders
--------------------

The ``@openedx/`` packages use `semantic-release`_ and carry a placeholder
version of ``0.0.0-dev`` in their ``package.json`` until they are published.
Because npm resolves peer dependencies strictly, a workspace checkout at
``0.0.0-dev`` will not satisfy a requirement like ``^1.0.0``.  To work
around this, each ``@openedx/`` dependency in the site's ``package.json``
includes ``|| 0.0.0-dev`` — for example,
``"@openedx/frontend-base": "^1.0.0 || 0.0.0-dev"``.  If you add a new
``@openedx/`` package that will be checked out as a workspace, make sure to
include the same ``|| 0.0.0-dev`` suffix.

.. _semantic-release: https://github.com/semantic-release/semantic-release

Why Turborepo
-------------

Workspace packages must be built in dependency order — for example,
``frontend-base`` before apps that depend on it — but npm is not smart enough
to do this on its own.  `Turborepo`_ handles this automatically via
``dependsOn: ["^build"]`` in ``turbo.json``, building the dependency graph and
running tasks in the correct topological order.

It also enables watch mode without race conditions: the ``clean`` target is
decoupled from ``build`` so that watch rebuilds overwrite in place without
wiping ``dist/``.

Note that Turborepo collects anonymous telemetry by default. To disable it, set
``TURBO_TELEMETRY_DISABLED=1`` in your environment.

.. _Turborepo: https://turbo.build/

Workspace Scripts
-----------------

- ``npm run build:packages`` — Build all workspace packages in dependency order.
- ``npm run clean:packages`` — Run the ``clean`` script in each workspace package.
- ``npm run dev:packages`` — Watch-build all workspace packages and start the
  dev server, so that changes to any local dependency are picked up
  automatically.

Internationalization
====================

For general information on how internationalization works in Open edX frontends,
refer to the `frontend-base i18n howto`_.

.. _frontend-base i18n howto: https://github.com/openedx/frontend-base/blob/master/docs/how_tos/i18n.rst

Pulling Translations
--------------------

Translated strings for each package listed under ``atlasTranslations`` in
``package.json`` are hosted in the `openedx-translations`_ repository. To fetch
them before building the site, run::

  npm run translations:pull

This downloads the message files into ``src/i18n/messages/`` (one subdirectory
per package) and then generates ``src/i18n/messages.ts``, which aggregates
everything for the runtime.  Both the downloaded files and the generated module
are gitignored, so translations must be pulled as part of any build or deploy
pipeline.

If translations have not been pulled, the build still succeeds because the
webpack i18n fallback plugin supplies an empty module at build time.  The site
will simply use the default English strings baked into each component.

.. _openedx-translations: https://github.com/openedx/openedx-translations

Site-level Translation Overrides
--------------------------------

To override or supplement translations provided by packages, add JSON files to
``src/i18n/site-messages/``.  Each file is named after a locale
(e.g., ``es_419.json``, ``fr.json``) and contains key-value pairs where the key
is a message ID and the value is the replacement string::

  src/i18n/site-messages/
    es_419.json
    fr.json

When ``translations:pull`` runs, it regenerates ``src/i18n/messages.ts`` with
site-messages included *last* in the array.  At runtime, all message sources are
merged in order, so site-messages entries take precedence over the corresponding
package translations.

The ``translations:pull`` command never deletes ``src/i18n/site-messages/`` -
only ``src/i18n/messages/`` is cleared and re-fetched each time.

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
