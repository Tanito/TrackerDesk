import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'trackerDesk';

  
  listado: Chofer [] = [];
  lat : number;
  lon : number;
  init = false;
  following: Chofer;
  followName: string;
  followClave: string;


  constructor(public db: AngularFirestore) {
   db.collection('usuarios').valueChanges()
   .subscribe( ( data: Chofer[]) => {
    this.listado = data;

    if ( !this.init ) {

      this.lat = this.listado[0].lat;
      this.lon = this.listado[0].lon;
      this.init = true;
    }

    data.forEach ( chofer => {
      if ( chofer.clave === this.followClave ) {
        console.log(chofer.lat)
        this.lat = chofer.lat;
        this.lon = chofer.lon;
      }
    })


   
   });
  }

  seguir( chofer ) {
    this.following = chofer;
    this.followName = this.following.Nombre;
    this.followClave = this.following.clave;
    console.log("clave 1",this.followClave)

    if ( this.followClave ) {

      this.listado.forEach ( chofer => {
        if ( chofer.clave === this.followClave ) {
          console.log(chofer.lat)
          this.lat = chofer.lat;
          this.lon = chofer.lon;
        }
      })
    }
  }


  dejarDeSeguir() {
    this.followName = null;
    this.followClave = null;
    this.following = null;
  }
  
  
}

interface Chofer{
  Nombre: string;
  clave: string;
  lat: number;
  lon: number;
}