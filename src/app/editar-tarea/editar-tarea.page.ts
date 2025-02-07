import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importar ActivatedRoute y Router
import { Preferences } from '@capacitor/preferences'; // Importar Preferences
import { TareasService } from '../services/tareas.service';
import { IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.page.html',
  styleUrls: ['./editar-tarea.page.scss'],
  standalone: false
})
export class EditarTareaPage implements OnInit {

  tareaEditar: any; // Variable para almacenar la tarea a editar
  proyectosFiltrados: any[] = [];
  proyecto:any;
  proyectoSeleccionado: string = '';
  txt_nombre: string = '';
  txt_descripcion: string = '';
  txt_codigoTarea: string = '';
  fechaSeleccionada: IonDatetime | undefined;

  constructor(
    private route: ActivatedRoute, // Inyectar ActivatedRoute
    private router: Router,
    private tarea : TareasService,
    private navCtrl: NavController,
  ) {}

  ngOnInit() {
    // Obtener los parámetros queryParams de la URL
    this.lproyectos();
    this.route.queryParams.subscribe((params) => {
      if (params && params['tarea']) {
        // Parsear la tarea desde el JSON string
        this.tareaEditar = JSON.parse(params['tarea']);
        this.txt_nombre = this.tareaEditar.nombre;
        this.txt_descripcion = this.tareaEditar.descripcion;
        this.proyectoSeleccionado = this.tareaEditar.proyecto;
        this.txt_codigoTarea = this.tareaEditar.codigo;
      }
    });
  }


  async guardarCambios(){

    let datos = {
      "action": 'atarea',
      "nombre": this.txt_nombre,
      "descripcion": this.txt_descripcion,
      "fecha": this.fechaSeleccionada,
      "proyecto": this.proyectoSeleccionado,
      "completado": 0,
      "idTareas": this.txt_codigoTarea
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
