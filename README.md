# Світло — Svitlo Monorepo

Svitlo is a modular interactive-learning project. The repository contains textbook packages, application hosts, shared libraries, and editorial documentation. The current package layout and commands are defined by the workspace manifests; [Studio architecture](studio/docs/architecture/README.md) records the product direction and implementation notes.

## Repository map

| Directory                         | Contents                                                                       |
| --------------------------------- | ------------------------------------------------------------------------------ |
| `apps/web`                        | Next.js host for a build-selected textbook; currently uses Playground          |
| `apps/platform`                   | Next.js platform and external textbook catalog                                 |
| `apps/mobile`, `apps/desktop`     | Mobile and desktop host workspaces                                             |
| `content/playground`              | React DOM textbook package with authored data, Scenes, and generated resources |
| `content/math`, other `content/*` | Subject-specific textbook packages and scaffolds                               |
| `shared/contracts`                | Shared content, localization, and state contracts                              |
| `shared/engine`                   | Content builders, validation, generation, and assessment-method data           |
| `shared/indexdb`                  | Browser persistence                                                            |
| `shared/ui-kit`                   | Shared React UI and assets                                                     |
| `shared/adapters/nextjs`          | Next.js integration for textbook hosts                                         |
| `backend/server`                  | Backend placeholder                                                            |
| `studio`                          | Architecture, entity, and workflow documentation                               |

The root [package.json](package.json) defines npm workspaces and scripts. `package-lock.json` is the npm lockfile.

## Getting started

```bash
npm ci
npm run repo:check:packages
npm run code:check:types
npm test
```

Start the Web host with `npm run app:start:dev --workspace @svitlo/web`, or the Platform with `npm run app:start:dev --workspace @svitlo/platform`. Other checks and build commands are listed in the root `package.json`.

## Documentation

- [Architecture and package boundaries](studio/docs/architecture/monorepo-and-textbook.md)
- [Architecture index](studio/docs/architecture/README.md)
- [Playground](content/playground/README.md)
- [Math](content/math/README.md)
- [Platform](apps/platform/README.md)
- [Engine](shared/engine/README.md)
