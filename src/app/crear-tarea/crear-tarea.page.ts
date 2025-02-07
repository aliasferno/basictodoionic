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
  idProyectos: number = 0;
  proyectoSeleccionado: string = '';
  tareaNueva: object = {};
  proyectosFiltrados: any[] = [];
  proyecto:any;

  constructor(
    private tarea : TareasService,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef
  ) { 
    this.lproyectos();
  }

  ngOnInit() {
  }

  async guardarTarea(){

    let datos = {
      "action": 'nuevat',
      "nombre": this.txt_tarea,
      "descripcion": this.txt_descripcion,
      "fecha": this.fechaSeleccionada,
      "proyecto": this.proyectoSeleccionado,
      "completado": 0
    }
    this.tarea.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.navCtrl.navigateRoot('/home');
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }

  lproyectos(){
    let datos = {
      "action": 'lproyectos'
    }

    this.tarea.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.proyectosFiltrados = res.data;
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }
}
