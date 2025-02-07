import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TareasService } from '../services/tareas.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.page.html',
  styleUrls: ['./proyectos.page.scss'],
  standalone: false
})
export class ProyectosPage implements OnInit {

  tareasRecuperadas: any[] = [];
  tareaSeleccionada: any;
  tareas: any[] = []; // Array para todas las tareas
  proyectosFiltrados: any[] = []; // Array para las tareas filtradas
  searchText: string = '';

  constructor(
    private navCtrl: NavController,
    private tarea: TareasService
  ) {
    this.lproyectos();
  }

  ngOnInit() {
  }

  async seleccionarProyecto(idproyecto: any) {
    console.log(idproyecto);
    this.navCtrl.navigateRoot(['editar-proyecto']);
    this.tarea.createSesion('idproyecto', idproyecto);;
    }

  irCrearProyecto() {
    this.navCtrl.navigateForward('/crear-proyecto');
  }

  irAProyectos(){
    this.navCtrl.navigateBack('proyectos');
  }
  irATareas(){
    this.navCtrl.navigateForward('/home');
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
  ionViewWillEnter() {
    this.lproyectos();
  }

}
