import { Component, OnInit } from '@angular/core';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular';
import { TareasService } from '../services/tareas.service';
import { NavController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-crear-proyecto',
  templateUrl: './crear-proyecto.page.html',
  styleUrls: ['./crear-proyecto.page.scss'],
  standalone: false
})
export class CrearProyectoPage implements OnInit {

  txt_proyecto:string='';
  txt_descripcion:string='';

  constructor(
    private tarea : TareasService,
    private navCtrl: NavController,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

  async guardarProyecto(){

    let datos = {
      "action": 'nuevop',
      "nombre": this.txt_proyecto,
      "descripcion": this.txt_descripcion
    }
    this.tarea.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.navCtrl.navigateRoot('proyectos');
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }

}
