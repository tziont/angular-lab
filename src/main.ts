// import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
// import { AppModule } from './app/app.module';
// import * as Sentry from '@sentry/angular';

// Sentry.init({
//   dsn: 'https://1f6323b05a2d0bff6663f2338c24a253@o4510334718312448.ingest.us.sentry.io/4510334723424256',
//   sendDefaultPii: true,
//   integrations: [], // optional, just keep it valid
//   beforeSend(event) {
//     console.log('📡 beforeSend triggered with event:', event);

//     fetch('http://localhost:3001/api/sentry-event', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(event),
//     }).catch(err => console.error('❌ Failed to send event to backend:', err));

//     return event; // still send to Sentry cloud
//   },
// });

// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .catch(err => console.error('Angular bootstrap error:', err));

  // src/main.ts
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import * as Sentry from '@sentry/angular';

// optionally provide a DSN via environment during development/production builds
// e.g. set SENTRY_DSN in your environment if you want cloud uploads.
// If absent, SDK still works locally (captures errors) and we forward to backend.
const SENTRY_DSN = (window as any).__env?.SENTRY_DSN || undefined;

Sentry.init({
  dsn: SENTRY_DSN,        // undefined -> no cloud upload
  sendDefaultPii: false,  // change if you want PII
  // beforeSend will run for every captured event. We forward to backend here.
  beforeSend(event) {
    try {
      // send event to your local backend for OpenAI analysis
      // keep it fire-and-forget so UI isn't blocked
      fetch('http://localhost:3001/api/sentry-event', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(event),
      }).catch(err => {
        // don't throw; just log locally
        // eslint-disable-next-line no-console
        console.error('Failed to forward event to backend', err);
      });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('beforeSend failed', err);
    }

    // Return the event. If SENTRY_DSN is undefined nothing is uploaded to Sentry cloud.
    return event;
  },
});

// Bootstrap app once
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error('Angular bootstrap error:', err));
