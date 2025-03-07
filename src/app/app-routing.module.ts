import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'crear-tarea',
    loadChildren: () => import('./crear-tarea/crear-tarea.module').then( m => m.CrearTareaPageModule)
  },
  {
    path: 'detalle-tarea',
    loadChildren: () => import('./detalle-tarea/detalle-tarea.module').then( m => m.DetalleTareaPageModule)
  },
  {
    path: 'editar-tarea',
    loadChildren: () => import('./editar-tarea/editar-tarea.module').then( m => m.EditarTareaPageModule)
  },
  {
    path: 'proyectos',
    loadChildren: () => import('./proyectos/proyectos.module').then( m => m.ProyectosPageModule)
  },
  {
    path: 'crear-proyecto',
    loadChildren: () => import('./crear-proyecto/crear-proyecto.module').then( m => m.CrearProyectoPageModule)
  },
  {
    path: 'editar-proyecto',
    loadChildren: () => import('./editar-proyecto/editar-proyecto.module').then( m => m.EditarProyectoPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
