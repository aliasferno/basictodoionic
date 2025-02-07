import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importar ActivatedRoute y Router
import { TareasService } from '../services/tareas.service';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.page.html',
  styleUrls: ['./editar-proyecto.page.scss'],
  standalone: false
})
export class EditarProyectoPage implements OnInit {

  tareaEditar: any; // Variable para almacenar la tarea a editar
  txt_idProyecto:number=0;
  txt_nombre:string='';
  txt_descripcion:string='';
  proyecto:any = [];

  constructor(
    private route: ActivatedRoute, // Inyectar ActivatedRoute
    private router: Router,
    private tarea: TareasService,
    private navCtrl: NavController,
  ) { 
    this.tarea.getSession('idproyecto').then((res:any)=>{
      console.log(res);
      this.txt_idProyecto = res;
      this.cargarDatos();
    });
  }

  ngOnInit() {
  }

  guardarCambios(){
    let datos = {
      "action": 'aproyecto',
      "idproyecto":this.txt_idProyecto,
      "nombre": this.txt_nombre,
      "descripcion": this.txt_descripcion
    }

    this.tarea.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.tarea.showToast(res.mensaje, 2000);
        this.navCtrl.navigateRoot('proyectos');
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }

  cargarDatos(){
    let datos = {
      "action":"dproyecto",
      "idproyecto":this.txt_idProyecto
    }

    this.tarea.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.proyecto = res.data;
        this.txt_nombre = this.proyecto.nombre;
        this.txt_descripcion = this.proyecto.descripcion;
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }

  eliminarProyecto(){
    let datos = {
      "action":"eproyecto",
      "idproyecto":this.txt_idProyecto
    }
    this.tarea.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.tarea.showToast(res.mensaje, 2000);
        this.navCtrl.navigateRoot('proyectos');
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }

  cancelar(){
    this.navCtrl.navigateRoot('proyectos');
  }

}
