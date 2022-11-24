import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TiempoService {
  //https://openweathermap.org
  //Api call para hacer una llamada por el criterio 'ciudad' es 'https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}'
  //cambio la url quitando q={city name} y {API key} ya que los concatenaré luego
  //ojo para subirlo a un servidor he cambiado http por https para que la request sea segura
  url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  key = '0f1c461a4102be122e87e1ef426e500c';

  //inyecto la clase HttpClient y VSC la importa
  constructor(private http: HttpClient) {}

  //creo el metodo que recibira la ciudad por parametro y devolvera un Observable de tipo any
  //los c se suscribiran a este metodo (una vez inyectado el servicio) que devuelve un observable y así los c podran obtener los D de forma asincrona
  //creo la constante URL concatenando url (sin q={city name} ni {API key}) + {API key} + '&q='+ ciudad (variable alimentada por el banana in box)

  getAPIdata(ciudad: string): Observable<any> {
    const URL = this.url + ciudad + '&lang=es' + '&appid=' + this.key ;

    return this.http.get(URL);
  }
}
