import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importar ActivatedRoute y Router
import { Preferences } from '@capacitor/preferences'; // Importar Preferences

@Component({
  selector: 'app-editar-tarea',
  templateUrl: './editar-tarea.page.html',
  styleUrls: ['./editar-tarea.page.scss'],
  standalone: false
})
export class EditarTareaPage implements OnInit {

  tareaEditar: any; // Variable para almacenar la tarea a editar

  constructor(
    private route: ActivatedRoute, // Inyectar ActivatedRoute
    private router: Router // Inyectar Router
  ) {}

  ngOnInit() {
    // Obtener los parámetros queryParams de la URL
    this.route.queryParams.subscribe((params) => {
      if (params && params['tarea']) {
        // Parsear la tarea desde el JSON string
        this.tareaEditar = JSON.parse(params['tarea']);
        console.log(this.tareaEditar); // Muestra la tarea en consola
      }
    });
  }

  // Función para guardar los cambios en la tarea
  async guardarCambios() {
    // Actualizar la tarea en Preferences
    await Preferences.set({ key: this.tareaEditar.idtarea, value: JSON.stringify(this.tareaEditar) });
    // Volver a la página principal
    this.router.navigate(['/home']);
  }
}
