import { Routes } from '@angular/router';
import { Board } from './pages/board/board';
import { Login } from './pages/login/login';

export const routes: Routes = [
  { path: 'board', component: Board },
  { path: 'login', component: Login },
  { path: '', redirectTo: '/board', pathMatch: 'full' },
];