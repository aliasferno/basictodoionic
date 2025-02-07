import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TareasService } from '../services/tareas.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {

  tareasRecuperadas: any[] = [];
  tareaSeleccionada: any;
  tareas: any[] = []; // Array para todas las tareas
  tareasFiltradas: any[] = []; // Array para las tareas filtradas
  searchText: string = '';

  constructor(
    private navCtrl: NavController,
    private tarea: TareasService
  ) {}

  ngOnInit() {
    this.ltareas(); // Cargar tareas al iniciar la página
  }

  // Método para navegar a la página de creación de tareas
  irCrearTarea() {
    this.navCtrl.navigateForward('/crear-tarea');
  }

  // Seleccionar una tarea y navegar a la página de detalles
  async seleccionarTarea(tareaId: any) {
    console.log(tareaId);
    this.navCtrl.navigateRoot(['detalle-tarea']);
    this.tarea.createSesion('tareaId', tareaId);;
  }

  // Filtrar las tareas según el texto del buscador
  filtrarTareas() {
    if (this.searchText.trim() === '') {
      this.tareasFiltradas = [...this.tareas];
    } else {
      this.tareasFiltradas = this.tareas.filter(tarea =>
        tarea.nombre.toLowerCase().includes(this.searchText.toLowerCase()) ||
        tarea.descripcion.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  // Limpiar las preferencias (si tienes alguna lógica de limpieza)
  limpiarPreferencias() {
    this.tarea.limpiarTarea();
  }

  // Actualizar el estado de una tarea
  async actualizarEstadoTarea(tarea: any) {
    await this.tarea.crearTarea(tarea.idtarea, tarea);
  }

  // Recargar las tareas cuando se regresa a la vista
  ionViewWillEnter() {
    this.ltareas();
  }

  irAProyectos(){

    this.navCtrl.navigateForward('proyectos');

  }
  irATareas(){
    this.navCtrl.navigateForward('home');
  }

  ltareas(){
    let datos = {
      "action": 'ltareas'
    }

    this.tarea.postData(datos).subscribe((res:any)=>{
      if(res.estado){
        this.tareasFiltradas = res.data;
        this.tareas = res.data;
      }else{
        this.tarea.showToast(res.mensaje, 2000);
      }
    })
  }

}
