import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarProyectoPage } from './editar-proyecto.page';

const routes: Routes = [
  {
    path: '',
    component: EditarProyectoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarProyectoPageRoutingModule {}
