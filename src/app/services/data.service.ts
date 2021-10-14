import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../models/commande';
import { Demande } from '../models/demande';
import { User } from '../models/user';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  commande:Commande = {} 
  demande : Demande = {}
  userConnected: User ={}
  // = JSON.parse(localStorage.getItem('userConnected')!)
  
  

  constructor() { }

  setCommande(commande: Commande) {
    this.commande= commande
  }
   getCommande(): Commande {
    return this.commande
  }

  setDemande(demande: Demande) {
    this.demande = demande
  }

  getDemande() {
    return this.demande
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

  public exportToExecl (jsonArry: any, fileName:string) {
    // XLSX.utils.
    const ws: XLSX.WorkSheet =XLSX.utils.json_to_sheet(jsonArry);
  
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
    /* save to file */  
    XLSX.writeFile(wb,fileName);
  }
}
