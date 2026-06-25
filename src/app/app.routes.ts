import { Routes } from '@angular/router';
import { ListaDeCategorias } from '../components/features/categorias/lista-de-categorias/lista-de-categorias';
import { CategoriaForm } from '../components/features/categorias/categoria-form/categoria-form';
import { Home } from '../shared/home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'listaCategorias', component: ListaDeCategorias },
  { path: 'categoriaForm', component: CategoriaForm },
  { path: 'categoriaForm/:id', component: CategoriaForm }
];
