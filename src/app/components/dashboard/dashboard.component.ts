import { TiempoService } from './../../services/tiempo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  // png obtenido desde el site https://www.freeiconspng.com/images/weather-icon-png
 // srcImgDashboard ='https://www.pngall.com/wp-content/uploads/11/Weather-No-Background.png';
  ciudad = '';
  temperaturaMax = 0;
  temperaturaMin = 0;
  velViento = 0;
  dirViento = 0;
  humedad = 0;
  presion=0;
  tiempo='';
  query= false;   //inicialmente falso para que no se renderice la tarjeta con los datos recibidos de la API
  loading = false; //inicialmente falso para que no se renderice el spinner
  error = false;
  constructor(private _tiempoService:TiempoService) {}

  ngOnInit(): void {}

  getTiempo() {
    this.query=false;  //false para que no se renderice la tarjeta para mostrar los datos todavía
    this.loading = true;  //true para que se renderice el spinner mientras se gestione la petición http

    this._tiempoService.getAPIdata(this.ciudad).subscribe(data=>{
      console.log(data.main);
      this.loading = false;  // false para que deje de renderizarse el spinner
      this.query = true;//true para que se visualice la tarjeta para mostrar los datos obtenidos

      this.temperaturaMax = data.main.temp_max - 273.15;  //paso los grados kelvin a celsius restando 273.15
      this.temperaturaMin = data.main.temp_min - 273.15;
      this.velViento = data.wind.speed;
      this.dirViento = data.wind.deg;

      this.presion = data.main.pressure;
      this.tiempo = data.weather[0].main;
      //si cambio icon por main podreo mostrar el icono correspondiente al tiempo (habría que crear
      //un array de imagenes y setear el src segun codigo recibido de la API)

    }, error =>{
      this.loading=false;
      this.setError();
    })
  }
  setError(){
    this.error = true;
    setTimeout(() => {
      this.error = false;
      this.ciudad='';
    }, 3000);
  }
}
