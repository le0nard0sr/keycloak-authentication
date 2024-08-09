import { APP_INITIALIZER, ApplicationConfig, Provider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { KeycloakBearerInterceptor, KeycloakService } from "keycloak-angular";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";

function initializeKeycloak(keycloak: KeycloakService) {
  return () => {
    return keycloak.init({
      config: {
        url: 'http://localhost:9999',
        realm: 'TRT17-Dev',
        clientId: 'frontend'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
        checkLoginIframe: false
      }
    });
  };
}

const KeycloakBearerInterceptorProvider: Provider = {
 provide: HTTP_INTERCEPTORS,
 useClass: KeycloakBearerInterceptor,
 multi: true
};

const KeycloakInitializerProvider: Provider = {
 provide: APP_INITIALIZER,
 useFactory: initializeKeycloak,
 multi: true,
 deps: [KeycloakService]
}

export const appConfig: ApplicationConfig = {
 providers: [
   provideHttpClient(withInterceptorsFromDi()), // Provides HttpClient with interceptors
   KeycloakInitializerProvider, // Initializes Keycloak
   KeycloakBearerInterceptorProvider, // Provides Keycloak Bearer Interceptor
   KeycloakService, // Service for Keycloak
   provideRouter(routes) // Provides routing for the application
 ]
};
