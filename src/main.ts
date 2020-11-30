import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  const useHttps = environment.useHttps;
  const scheme = useHttps ? "https" : "http";
  const port = useHttps ? environment.apiHttpsPort : environment.apiHttpPort;
  return environment.baseUrl.replace("{scheme}", scheme).replace("{port}", port);
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.error(err));
