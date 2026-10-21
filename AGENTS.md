# AGENTS.md

# Data Analyst Showcase — Agent SOP

This file defines durable workflow and release-safety rules for agents working in this repository.

It intentionally avoids maintaining a hard-coded inventory of routes, models, embeds, scripts, build outputs, or integrations. Discover the current application state from the repository before acting.

---

## 1. Production Safety

Current known production flow:

`GitHub production branch -> Vercel Production -> https://ruipushi.com`

Current known production branch:

`main`

Treat the production branch as protected.

If repository or Vercel configuration indicates a production branch other than `main`, stop and report the discrepancy. Do not guess which value is authoritative.

Do not merge or push to the production branch without explicit user authorization.

A successful PR or Preview does not authorize a production merge.

---

## 2. Source of Truth and No-Guessing Rule

Before changing or validating any technical detail, inspect the repository and use the exact current value.

Do not infer or normalize:

- branch names
- routes
- identifiers
- paths
- environment variables
- config fields
- dependency names
- package-manager commands
- build outputs
- deployment settings
- iframe/embed URLs
- external-service names

Use the current repository/configuration as the source of truth.

Discover current application state from the repository rather than from this document.

Examples:

- routes -> inspect the current router/config
- scripts -> inspect the current package manifest
- package manager -> inspect lockfiles/config
- build output -> inspect current build/deployment config and generated output
- external embeds/models -> inspect current source/config
- deployment settings -> inspect current Vercel/project config
- assets -> inspect current imports/public files

If the repository does not establish an exact value, stop and ask the user instead of guessing.

---

## 3. Mandatory Git Preflight

Before making any source, config, dependency, content, or asset change:

```bash
git status
git branch --show-current
git remote -v
git fetch origin
```

Then inspect relevant local and remote branches.

If unrelated working-tree changes exist, stop and report them before proceeding.

Never discard, reset, overwrite, or stash unrelated user changes merely to continue the task.

---

## 4. Branch Workflow

Never develop directly on the production branch.

If currently on the production branch:

1. Confirm the working tree is clean.
2. Update it safely:

```bash
git pull --ff-only origin <production-branch>
```

3. Create a dedicated task branch before editing.

Example naming patterns:

- `feat/...`
- `fix/...`
- `chore/...`
- `docs/...`

Before creating a branch, inspect existing local and remote branch names.

If the user specifies an exact branch name, use that exact name. Do not rename, normalize, or create a similar alternative.

### Prohibited without explicit authorization

- edit directly on the production branch
- commit directly to the production branch
- push to the production branch
- merge into the production branch
- force-push
- rewrite published history
- delete branches
- reset or discard user changes
- create empty commits only to trigger deployment

---

## 5. Scope Control

Modify only files required for the requested task.

Do not perform unrelated:

- refactors
- dependency upgrades
- broad formatting
- UI redesigns
- SEO changes
- deployment-setting changes
- architecture cleanup
- removal of dormant code
- asset replacement

Do not clean up historical or unused code unless cleanup is explicitly part of the task.

Before committing, review:

```bash
git status
git diff
```

Check for:

- unrelated changes
- generated files
- secrets
- local environment files
- local deployment metadata
- temporary debug code
- commented-out experiments
- accidental lockfile changes

---

## 6. Development and Repository Scripts

Use the repository's existing tooling.

Before running development, test, lint, type-check, or build commands, inspect the current package manager and configured scripts.

Do not invent replacement commands or add tooling unless necessary.

For final verification, run all relevant configured checks, including where present:

- dependency installation/reproducibility
- type/static checks
- automated tests
- lint
- production build

If dependencies or the lockfile changed, perform a clean install using the repository's current package manager and lockfile.

Do not suppress real errors merely to make checks pass.

---

## 7. Production Build Verification

A development-server success is not sufficient for release readiness.

For every PR, verify the current production build succeeds.

Then confirm the actual generated production artifact/output using current repository configuration.

Do not rely on a hard-coded output path from this document.

If build/deployment configuration changed, inspect the generated output and verify required entry files and assets are present.

---

## 8. Dynamic Route Regression Testing

Do not maintain a fixed route list in this file.

Before browser regression testing:

1. Inspect the current router and route-defining configuration.
2. Build an inventory of current user-facing routes relevant to the task.
3. Identify shared-layout, navigation, dynamic-route, and fallback behavior.

### For narrow changes

Test:

- every directly affected route
- representative unaffected critical routes
- at least one relevant dynamic/detail route where applicable

### For shared or high-impact changes

If the task affects routing, navigation, shared layout, global styles, build config, deployment config, or app bootstrapping, test all discoverable user-facing route categories and all directly affected routes.

For each tested route verify:

- direct navigation
- browser refresh
- visible application rendering
- required JavaScript/CSS
- required local assets
- client-side navigation where applicable

A plain HTTP `200` is not sufficient when browser validation is available.

---

## 9. Dynamic External Integration Regression

Do not assume the number, provider, route, component, or URL of external integrations.

Before testing integration-sensitive changes, inspect the repository and identify current external runtime integrations, such as:

- iframes
- embedded model demos
- hosted apps
- external APIs
- external media/widgets
- downloadable externally hosted resources

For each relevant integration, verify as applicable:

- integration element/component exists
- configured URL/value matches repository source
- external request is initiated
- remote UI/data visibly loads
- no CSP error
- no frame/X-Frame-Options restriction
- no mixed-content error
- no relevant browser Console error

If an external service has a normal cold-start/loading state, distinguish that from an integration failure.

If a change affects shared routing, layout, CSP, deployment, embed components, or global app configuration, test all currently discovered affected integrations.

---

## 10. Console and Network Checks

Before PR approval, inspect representative affected pages in a browser.

There must be no unexplained:

- uncaught JavaScript errors
- framework/runtime errors
- routing errors
- failed JS/CSS chunks
- broken required assets
- CSP violations
- mixed-content failures
- unexpected localhost requests
- unexpected requests to retired/legacy hosting providers
- unexpected backend/API requests

Trace unexpected requests to their exact repository source before classifying them.

Do not treat harmless warnings as blockers without evidence.

---

## 11. Static Assets and SEO-Sensitive Files

For changes that can affect assets, metadata, routing, or public files, verify the relevant current resources discovered from the repository.

Examples may include:

- project images
- favicons
- OpenGraph assets
- downloadable files
- `robots.txt`
- `sitemap.xml`
- canonical metadata
- page descriptions

Do not rewrite production URLs to temporary Preview URLs.

Current known production domain:

`https://ruipushi.com`

If repository/deployment configuration indicates a different production domain, stop and report the discrepancy.

---

## 12. Preview Deployment Workflow

Push task branches to their own remote branch for Preview validation.

Do not merge to the production branch merely to test deployment.

Use the current Vercel/Git integration to create Preview deployments for non-production branches when available.

If deployment protection blocks agent/browser access:

- report the exact blocker
- use an authorized temporary/shareable mechanism if the user provides or approves it
- do not weaken or disable protection without explicit authorization

Do not create production deployments solely for Preview testing.

---

## 13. Preview Validation

Before recommending merge, validate the actual Preview deployment.

Test:

- every directly affected route
- representative core route categories discovered from the current router
- relevant dynamic/detail routes
- all external integrations affected by the change

Verify:

- direct load
- refresh
- client-side navigation
- visual rendering
- required assets
- Console
- Network
- external integrations

Expand to full-route regression when the change is shared/global/high-impact.

---

## 14. PR Readiness Report

Before creating or recommending a PR, report:

### Git
- task branch
- base branch
- working-tree status
- commits included

### Changed files
- each changed file
- reason for the change

### Automated checks
- clean install, if required
- type/static checks
- tests, if configured/relevant
- lint, if configured/relevant
- production build

### Browser validation
- route inventory used
- routes tested
- direct load / refresh / navigation results

### Console / Network
- meaningful issues found, or explicitly state none observed

### External integrations
- integrations discovered
- regression results for those affected

### Remaining risks
- only evidence-backed unresolved issues

Finish with exactly one:

`READY FOR PR`

or

`NOT READY FOR PR`

---

## 15. Merge and Production Safety

Creating a PR does not authorize merging it.

Passing Preview validation does not authorize merging it.

Do not merge or push to the production branch without explicit user authorization.

Before an authorized merge:

1. confirm the PR branch and production branch state
2. confirm required checks passed
3. confirm Preview validation passed
4. confirm no new unrelated changes appeared

After an authorized merge/push, verify the resulting Vercel Production deployment corresponds to the expected production branch and commit.

---

## 16. Production Smoke Test

After an authorized production deployment, perform a focused smoke test.

Discover the current route inventory first.

At minimum test:

- the home/root route
- representative major navigation destinations
- every route directly affected by the release
- relevant dynamic/detail routes
- every external integration affected by the release

Verify:

- visible render
- direct load
- refresh
- navigation
- required assets
- Console
- relevant Network requests
- affected external integrations

Report the exact production branch, commit, and deployment being tested.

Do not perform unrelated production changes during smoke testing.

---

## 17. Durable Principle

This SOP defines **how agents must work**, not a permanent inventory of **what the application currently contains**.

When the application evolves:

- new routes should be discovered from the router
- new models/demos should be discovered from source/config
- new embeds should be discovered from source/config
- new tests/lint scripts should be discovered from package configuration
- new build outputs should be discovered from current build/deployment config
- new deployment settings should be read from the deployment platform

Do not require this file to be manually updated every time application inventory changes.
