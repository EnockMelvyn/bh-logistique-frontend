
import { Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/models/demande';
import { User } from 'src/app/models/user';
import { Direction } from 'src/app/models/direction';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeService } from 'src/app/services/demande.service';
import { DirectionService } from 'src/app/services/direction.service';

@Component({
  selector: 'app-list-demande-direction',
  templateUrl: './list-demande-direction.component.html',
  styleUrls: ['./list-demande-direction.component.css']
})
export class ListDemandeDirectionComponent implements OnInit {
  
  demandesToShow: any [] = []
  demandes:Demande[] = []
  allUsers : User[] = []
  directions: Direction[] = []
  colonnes = ['direction', 'nombre']
  // directions = [
  //   {
  //     "id_direction" : 1,
  //     "code_direction" : "DG",
  //     "libelle_direction" : "DIRECTION GENERALE",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 2,
  //     "code_direction" : "PMO",
  //     "libelle_direction" : "PROJECT MANAGEMENT OFFICE",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 3,
  //     "code_direction" : "DSI",
  //     "libelle_direction" : "DIRECTION DES SYSTEMES D'INFORMATION",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 4,
  //     "code_direction" : "CMC",
  //     "libelle_direction" : "CELLULE MARKETING & COMMUNICATION",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 5,
  //     "code_direction" : "DAII",
  //     "libelle_direction" : "DIRECTION DE L'AUDIT INTERNE ET DE L'INSPECTION",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 6,
  //     "code_direction" : "DC",
  //     "libelle_direction" : "DIRECTION DE LA CONFORMITE",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 7,
  //     "code_direction" : "DIBE",
  //     "libelle_direction" : "DIRECTION DE L'IMMOBILIER ET BANQUE D'ENTREPRISES",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 8,
  //     "code_direction" : "DCP",
  //     "libelle_direction" : "DIRECTION DU CONTRÔLE PERMANENT",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 9,
  //     "code_direction" : "DFC",
  //     "libelle_direction" : "DIRECTION DES FINANCES ET DE LA COMPTABILITE",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 10,
  //     "code_direction" : "DGR",
  //     "libelle_direction" : "DIRECTION GESTION DES RISQUES",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 11,
  //     "code_direction" : "DDC",
  //     "libelle_direction" : "DIRECTION DU CREDIT",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 12,
  //     "code_direction" : "DJR",
  //     "libelle_direction" : "DIRECTION JURIDIQUE & DU RECOUVREMENT",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 13,
  //     "code_direction" : "DMG",
  //     "libelle_direction" : "DIRECTION DES MOYENS GENERAUX",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 14,
  //     "code_direction" : "DOB",
  //     "libelle_direction" : "DIRECTION DES OPERATIONS BACK OFFICE",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 15,
  //     "code_direction" : "DBD",
  //     "libelle_direction" : "DIRECTION BANQUE DE DETAIL",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 16,
  //     "code_direction" : "DRH",
  //     "libelle_direction" : "DIRECTION DES RESSOURCES HUMAINES",
  //     "isactive" : 1,
  //     "created_at" : "2020-07-22 08:45:47",
  //     "created_by" : 1,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   },
  //   {
  //     "id_direction" : 18,
  //     "code_direction" : "TD",
  //     "libelle_direction" : "TEST DIRECTION",
  //     "isactive" : 1,
  //     "created_at" : "2020-09-23 18:29:55",
  //     "created_by" : 237,
  //     "modiifed_at" : null,
  //     "modified_by" : null
  //   }
  // ]
  constructor(private demandeService: DemandeService, private authService: AuthService,
    private directionService: DirectionService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }
  
  public getAllUsers():void {
    this.authService.getAllUsers().subscribe(
      (response : any) => {
        this.allUsers = response.items
        this.allUsers.forEach((element,index) => {
          if (index%2 ===0){
            element.directionId = 2
          } else {
            element.directionId = 1
          }
        })
        console.log(this.allUsers)
      }
    )
  }

  public getDirections() {
    this.directionService.getAllDirections().subscribe(
      (response: Direction[]) => {
        this.directions = response
      }
    )
  }

  public getDemande(): void {
    this.demandeService.getAllDemandes().subscribe(
      (response: Demande[]) => {
        this.demandes = response
      }
    )
  }

  public getDemandeParDirection(): void {
    this.getDirections()
    this.getDemande()
    this.directions.forEach(element => {
      let n = 0
      this.demandes.forEach(element2 => {
        if (element2.directionId === element.idDirection && element2.statutDemande==="EN_ATTENTE"){
          n++
        }
      })
      this.demandesToShow.push({direction: element.libelleDirection, nombre: n})
    })
  }
}
