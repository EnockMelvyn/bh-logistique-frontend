import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Commande } from '../models/commande';
import { Demande } from '../models/demande';
import { User } from '../models/user';
import * as XLSX from 'xlsx';
import { Direction } from '../models/direction';
import { DemandeDirection } from '../models/demande-direction';
import { Inventaire } from '../models/inventaire';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private article: Article = {}
  direction: Direction = {}
  commande:Commande = {} 
  demande : Demande = {}
  inventaire: Inventaire = {}
  user: User ={}
  userConnected: User ={}
  demandeDirection: DemandeDirection = {}
  // = JSON.parse(localStorage.getItem('userConnected')!)

  constructor() { }

  getArticle(): Article {
    return this.article
  }
  
  setArticle(article : Article) {
    this.article = article
  }

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

  setDirection(direction: Direction) {
    this.direction = direction
  }

  getDirection() {
    return this.direction
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
