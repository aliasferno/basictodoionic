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

  constructor(
    private route: ActivatedRoute, // Inyectar ActivatedRoute
    private navCtrl: NavController, // Inyectar NavController
    private tareaService: TareasService, // Inyectar servicio de tareas
    private router: Router // Inyectar Router para la navegación
  ) {}

  ngOnInit() {
    // Obtener los parámetros queryParams de la URL
    this.route.queryParams.subscribe((params) => {
      if (params && params['tarea']) {
        // Parsear la tarea desde el JSON string
        this.tareaDetalle = JSON.parse(params['tarea']);
        console.log(this.tareaDetalle); // Muestra la tarea en consola
      }
    });
  }

  // Función para eliminar la tarea
  async eliminarTarea() {
    // Eliminar la tarea de Preferences
    await Preferences.remove({ key: this.tareaDetalle.idtarea });
    // Redirigir a la página principal (home)
    this.navCtrl.navigateRoot('/home');
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
