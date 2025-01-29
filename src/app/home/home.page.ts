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
    this.loadTareas(); // Cargar tareas al iniciar la página
  }

  // Método para navegar a la página de creación de tareas
  irCrearTarea() {
    this.navCtrl.navigateForward('/crear-tarea');
  }

  // Seleccionar una tarea y navegar a la página de detalles
  async seleccionarTarea(tarea: any) {
    console.log(tarea);

    const tareaGuardada = await Preferences.get({ key: tarea.idtarea });
    if (tareaGuardada.value) {
      const tareaObj = JSON.parse(tareaGuardada.value);
      this.navCtrl.navigateForward(['/detalle-tarea'], {
        queryParams: {
          tarea: JSON.stringify(tareaObj),
        },
      });
    }
  }

  // Cargar todas las tareas desde el servicio y actualizar las tareas filtradas
  async loadTareas() {
    this.tareas = await this.tarea.obtenerTodasLasTareas();
    this.tareasFiltradas = [...this.tareas]; // Inicializar las tareas filtradas con todas las tareas
  }

  // Filtrar las tareas según el texto del buscador
  filtrarTareas() {
    if (this.searchText.trim() === '') {
      this.tareasFiltradas = [...this.tareas]; // Si no hay texto, mostrar todas las tareas
    } else {
      this.tareasFiltradas = this.tareas.filter(tarea =>
        tarea.tarea.toLowerCase().includes(this.searchText.toLowerCase()) ||
        tarea.descripcionTarea.toLowerCase().includes(this.searchText.toLowerCase())
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
    this.loadTareas();
  }

}
