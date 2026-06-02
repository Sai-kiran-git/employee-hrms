import { Routes } from '@angular/router';
import { Attendence } from './components/attendence/attendence';
import { Dashboard } from './components/dashboard/dashboard';
import { Login } from './components/login/login';
import { Payroll } from './components/payroll/payroll';
import { Profile } from './components/profile/profile';

export const routes: Routes = [

  // Default Route
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  // Login Route
  {
    path: 'login',
    component: Login
  },

  // Dashboard Route
  {
    path: 'dashboard',
    component: Dashboard,

    children: [

      {
        path: 'attendance',
        component: Attendence
      },

      {
        path: 'payroll',
        component: Payroll
      },

      {
        path: 'profile',
        component: Profile
      }

    ]
  }

];