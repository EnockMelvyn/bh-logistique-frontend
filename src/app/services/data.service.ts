import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../models/commande';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  commande:Commande = {} 
  userConnected: User ={}
  // = JSON.parse(localStorage.getItem('userConnected')!)
  
  

  constructor() { }

  setCommande(commande: Commande) {
    this.commande= commande
  }
   getCommande(): Commande {
    return this.commande
  }

  setUserConnected (user:User) {
    console.log("user setted in data service !")
    console.log(user)
    this.userConnected = user
  }

  getUserConnected () : User {
    console.log("user gettied in data service !")
    console.log(this.userConnected)
    return this.userConnected
  }
}