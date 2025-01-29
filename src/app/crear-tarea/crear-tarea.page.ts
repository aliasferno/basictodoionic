import { Component, OnInit } from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular';
import { TareasService } from '../services/tareas.service';
import { NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-crear-tarea',
  templateUrl: './crear-tarea.page.html',
  styleUrls: ['./crear-tarea.page.scss'],
  standalone: false
})
export class CrearTareaPage implements OnInit {

  txt_tarea: string = '';
  txt_descripcion: string = '';
  fechaSeleccionada: IonDatetime | undefined;
  clave_tarea: string = '';
  tareaNueva: object = {};

  constructor(
    private tarea : TareasService,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  async guardarTarea(){ 
    const nextId = await this.tarea.getNextTaskId(); // <- Aquí se usa Preferences bajo el capó
    this.clave_tarea = nextId.toString();
    this.tareaNueva = {
      idtarea: this.clave_tarea,
      tarea: this.txt_tarea,
      descripcionTarea: this.txt_descripcion,
      fechaTarea: this.fechaSeleccionada,
      completado: false
    };
    this.tarea.crearTarea("tarea " + this.clave_tarea, this.tareaNueva);
    this.navCtrl.navigateRoot('/home');
  }

}
