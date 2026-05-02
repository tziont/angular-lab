# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start          # Dev server (HTTPS, with proxy)
npm run build      # Production build → dist/senior-angular-lab
npm run watch      # Dev build in watch mode
npm test           # Run unit tests (Karma + Jasmine)
```

Run a single test file:
```bash
npx ng test --include='src/app/path/to/file.spec.ts'
```

## Architecture

Angular 19, **module-based** (not standalone), lazy-loaded feature modules.

### Module Layout

```
src/app/
├── core/          # Singleton services, guards, interceptors
├── features/      # Lazy-loaded feature modules
├── shared/        # Shared validators, directives
└── types/         # Global TypeScript interfaces
```

### Routing Structure

- `/` → `AuthModule` (login)
- `/home/**` → `LayoutModule` shell with nested child routes per feature

All feature routes live under `/home/` as children of the layout. The `LayoutComponent` provides the nav shell (navbar + breadcrumb). Advanced sub-routes (NgRx, state management, feature flags) are further nested under `/home/advanced/`.

### State Management (Three Patterns — Educational)

This project intentionally shows multiple approaches side by side:

1. **NgRx** — root store with `counter` and `ui` slices. Actions/reducers/selectors/effects live in `src/app/features/advanced/ngrx/store/`.
2. **Signals** — `AppStateService` exposes read-only signals for user and theme state.
3. **RxJS BehaviorSubject** — `AuthService`, `FeatureFlagService` use `BehaviorSubject` streams.

### Key Services (core/)

| Service | Responsibility |
|---|---|
| `AuthService` | Login/logout, token storage, user$ stream |
| `AppStateService` | Signal-based global state (user, theme) |
| `ThemeService` | Light/dark toggle; persisted in localStorage via `data-theme` |
| `FeatureFlagService` | HTTP-fetched flags with role-based filtering and cache refresh |

### Guards & Interceptors

- **RoleGuard** — checks `data.roles` on route against current user roles
- **AuthInterceptor** — attaches auth headers
- **LoggingInterceptor** — logs request/response timing
- **ErrorHandlingInterceptor** — handles HTTP errors; forwards to Sentry backend at `https://localhost:3001/api/sentry-event`

### Feature Flags

`IfFeatureDirective` (`*ifFeature`) is a structural directive in `shared/` that conditionally renders based on flag name. The `FeatureFlagService` combines an enabled boolean with role-based filtering.

## Styling

- SCSS throughout; Angular schematic default prefix: `app-`
- Global style load order: `tokens.css` → `variables.scss` → `themes.css` → `styles.scss`

## Notable Config

- Dev server runs over **HTTPS** (certs in `ssl/`)
- API proxy via `proxy.conf.json` → backend at `https://localhost:3001`
- Strict TypeScript: `strict`, `strictTemplates`, `noImplicitOverride`
- Angular Material v19 used for UI components
