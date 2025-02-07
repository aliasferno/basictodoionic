import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  private lastIdKey = 'lastTaskId';
  server: string = "http://localhost/ionic/TareasWS/tareas.php";

  constructor(
    public toastCtrl: ToastController,
    public http: HttpClient
  ) { }

  async showToast(mensaje: string, tiempo: number){
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: tiempo,
      position: 'top'
    });
    toast.present();
  }
  async crearTarea(id: string, tarea: object) {
    const idTarea = (tarea as any).idtarea;
    const tareaString = JSON.stringify(tarea);
    await Preferences.set({ key: idTarea, value: tareaString });
  }

  async obtenerTarea(id: string): Promise<any> {
    const { value } = await Preferences.get({ key: id });
    return value ? JSON.parse(value) : null; // Devuelve el objeto o null si no existe
  }

  async obtenerTodasLasTareas(): Promise<any[]> {
    const { keys } = await Preferences.keys(); // Obtiene todas las claves almacenadas
    const tareas: any[] = [];
  
    for (const key of keys) {
      const { value } = await Preferences.get({ key });
  
      if (value !== null && value !== undefined) { // Verifica que no sea null o undefined
        try {
          const tarea = JSON.parse(value); // Intenta convertirlo a objeto
          if (typeof tarea === 'object') {
            tareas.push(tarea);
          }
        } catch (error) {
          console.error(`Error al parsear la tarea con clave ${key}:`, error);
        }
      }
    }
    return tareas;
  }

  async limpiarTarea(){
    await Preferences.clear();
  }

  async getNextTaskId(): Promise<number> {
    // Leer el valor actual
    const { value } = await Preferences.get({ key: this.lastIdKey });
    const lastId = value ? parseInt(value, 10) : 0;

    // Incrementar y guardar
    const newId = lastId + 1;
    await Preferences.set({ key: this.lastIdKey, value: newId.toString() });

    return newId;
  }
  postData(body:any){
    let head = new HttpHeaders({'Content-Type':'application/json, charset:utf8'});
    let options = {
      headers: head
    };
    return this.http.post(this.server, JSON.stringify(body), options);
  }

  async createSesion(id: string, valor: string){
    await Preferences.set({key: id, value: valor});
  }

  async getSession(id:string){
    const item = await Preferences.get({key: id});
    return item.value;
  }

  async closeSession(){
    await Preferences.clear();
  }
}
