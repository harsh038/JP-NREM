// Import with `import * as Sentry from "@sentry/node"` if you are using ESM
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://0f54ac07f8540567e02f9bbf66d0deb7@o4509200627859456.ingest.us.sentry.io/4509200632184836",
  integrations: [Sentry.mongooseIntegration()],
});
