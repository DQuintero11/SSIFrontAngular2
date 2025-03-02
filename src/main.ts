import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  ...appConfig, // <- Esto expande la configuración de `appConfig`
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    ...(appConfig.providers || []) // <- Evita sobrescribir los providers de `appConfig`
  ]
}).catch(err => console.error(err));