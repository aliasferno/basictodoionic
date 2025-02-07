import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { TareasService } from '../services/tareas.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-tarea',
  templateUrl: './detalle-tarea.page.html',
  styleUrls: ['./detalle-tarea.page.scss'],
  standalone: false
})
export class DetalleTareaPage implements OnInit {

  tareaDetalle: any; // Variable para almacenar el detalle de la tarea
  txt_tareaId:number=0;
  txt_nombre:string='';
  txt_descripcion:string='';
  txt_fecha:string='';

  constructor(
    private route: ActivatedRoute, // Inyectar ActivatedRoute
    private navCtrl: NavController, // Inyectar NavController
    private tarea: TareasService, // Inyectar servicio de tareas
    private router: Router // Inyectar Router para la navegación
  ) {
    this.tarea.getSession('tareaId').then((res:any)=>{
      this.txt_tareaId = res;
      this.cargarDatos();
    });
  }

  ngOnInit() {
  }

  cargarDatos(){
    let datos = {
      "action":"dtarea",
      "idtarea":this.txt_tareaId
    }

    this.tarea.postData(datos).subscribe((res:any)=>{

      console.log(res);
      if(res.estado){
        this.tareaDetalle = res.data;
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }


  eliminarTarea(){
    let datos = {
      "action":"etarea",
      "idtarea":this.txt_tareaId
    }
    this.tarea.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.tarea.showToast(res.mensaje, 2000);
        this.navCtrl.navigateRoot('/home');
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }

  // Función para completar la tarea
  async completarTarea() {
    this.tareaDetalle.completado = !this.tareaDetalle.completado;
    // Actualizar la tarea en Preferences
    await Preferences.set({ key: this.tareaDetalle.idtarea, value: JSON.stringify(this.tareaDetalle) });
    // Recargar los datos de la tarea
    console.log(this.tareaDetalle);
  }

  // Función para editar la tarea (redirigir a la vista de edición)
  editarTarea() {
    // Navegar a la vista de edición y pasar la tarea actual
    this.router.navigate(['/editar-tarea'], {
      queryParams: { tarea: JSON.stringify(this.tareaDetalle) }
    });
  }
}
