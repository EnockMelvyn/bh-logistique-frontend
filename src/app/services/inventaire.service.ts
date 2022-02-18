import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Inventaire } from '../models/inventaire';

@Injectable({
  providedIn: 'root'
})
export class InventaireService {

  private apiServerUrl = environment.apiBaseUrl+'/api'
  constructor(private http: HttpClient) { 

  }

  public getAllInventaire() {
    return this.http.get<any>(this.apiServerUrl+"/inventaires")
  }

  public generateInventaire(inventaire: Inventaire) {
    return this.http.post<any>(this.apiServerUrl+"/inventaires/generate", inventaire)
  }
  
  public majInventaire(inventaire: Inventaire) {
    return this.http.put<any>(this.apiServerUrl+"/inventaires/maj", inventaire)
  }
  public validerInventaire(inventaire: Inventaire) {
    return this.http.put<any>(this.apiServerUrl+"/inventaires/validate", inventaire)
  }
}
