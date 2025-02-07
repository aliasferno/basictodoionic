import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarProyectoPageRoutingModule } from './editar-proyecto-routing.module';

import { EditarProyectoPage } from './editar-proyecto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarProyectoPageRoutingModule
  ],
  declarations: [EditarProyectoPage]
})
export class EditarProyectoPageModule {}
