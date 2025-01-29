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
    private router: Router // Inyectar Router para la navegaci�n
  ) {}

  ngOnInit() {
    // Obtener los par�metros queryParams de la URL
    this.route.queryParams.subscribe((params) => {
      if (params && params['tarea']) {
        // Parsear la tarea desde el JSON string
        this.tareaDetalle = JSON.parse(params['tarea']);
        console.log(this.tareaDetalle); // Muestra la tarea en consola
      }
    });
  }

  // Funci�n para eliminar la tarea
  async eliminarTarea() {
    // Eliminar la tarea de Preferences
    await Preferences.remove({ key: this.tareaDetalle.idtarea });
    // Redirigir a la p�gina principal (home)
    this.navCtrl.navigateRoot('/home');
  }

  // Funci�n para completar la tarea
  async completarTarea() {
    this.tareaDetalle.completado = !this.tareaDetalle.completado;
    // Actualizar la tarea en Preferences
    await Preferences.set({ key: this.tareaDetalle.idtarea, value: JSON.stringify(this.tareaDetalle) });
    // Recargar los datos de la tarea
    console.log(this.tareaDetalle);
  }

  // Funci�n para editar la tarea (redirigir a la vista de edici�n)
  editarTarea() {
    // Navegar a la vista de edici�n y pasar la tarea actual
    this.router.navigate(['/editar-tarea'], {
      queryParams: { tarea: JSON.stringify(this.tareaDetalle) }
    });
  }
}
