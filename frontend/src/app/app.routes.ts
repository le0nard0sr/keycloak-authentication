import { inject, Component } from '@angular/core';
import { CanActivateFn, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from "./authentication/auth.guard";
import { SecuredComponent } from './pages/secured/secured.component';

const isAuthenticated: CanActivateFn = (route, state) => {
  return inject(AuthGuard).isAccessAllowed(route, state);
}

export const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "secured",
    canActivate: [isAuthenticated],
    component: SecuredComponent
  }
];
