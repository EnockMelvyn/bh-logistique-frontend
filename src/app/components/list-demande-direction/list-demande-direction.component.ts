
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Demande } from 'src/app/models/demande';
import { User } from 'src/app/models/user';
import { Direction } from 'src/app/models/direction';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeService } from 'src/app/services/demande.service';
import { DirectionService } from 'src/app/services/direction.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list-demande-direction',
  templateUrl: './list-demande-direction.component.html',
  styleUrls: ['./list-demande-direction.component.css']
})
export class ListDemandeDirectionComponent implements OnInit, AfterViewInit {
  
  demandesToShow: any [] = []
  demandes:Demande[] = []
  allUsers : User[] = []
  directions: Direction[] = []
  colonnes = ['direction', 'nombre']
  
  constructor(private demandeService: DemandeService, private authService: AuthService,
    private directionService: DirectionService) { }

  ngOnInit(): void {
    // this.getAllUsers()
    this.directions = this.getDirections();
    alert(this.directions[0])
    // this.getDemande()
    
  }

  ngAfterViewInit(): void{
    
    this.getDemandeParDirection()
    console.log(this.demandesToShow);
    
  }
  
  public getAllUsers():void {
    this.authService.getAllUsers().toPromise().then(
      (response : any) => {
        this.allUsers = response.items
        this.allUsers.forEach((element,index) => {
          if (index%2 ===0){
            element.directionId = 2
          } else {
            element.directionId = 1
          }
        })
        // console.log(this.allUsers)
      }
    )
  }

  public getDirections(): Direction[] {
    this.directionService.getAllDirections().toPromise().then(
      (response: Direction[]) => {
        return response
        // console.log(this.directions)
      },
      (error: HttpErrorResponse) => {
        console.log("erreur direction")
        console.log(error.message)
    }
    )
    return []
  }

  public getDemande(): void {
    this.demandeService.getAllDemandes().toPromise().then(
      (response: Demande[]) => {
        this.demandes = response
        // console.log(this.demandes)
      },
      (error: HttpErrorResponse) => {
        console.log("erreur demande")
        console.log(error.message)
    }
    )
  }

  public getDemandeParDirection(): void {
    console.log('Demande par direction')
    this.directions.forEach((element,index,array) => {
      console.log('etape 1')
      let n = 0
      this.demandes.forEach(element2 => {
        console.log('etape 2')
        if (element2.directionId === element.idDirection && element2.statutDemande==="EN_ATTENTE"){
          console.log('ajout: n ='+n)
          n++
          console.log('n devient:'+n)
        }
      })
      this.demandesToShow.push({direction: element.libelleDirection, nombre: n})
    })
  }
    // console.log('Demande par direction')
    // this.directionService.getAllDirections().forEach(element => {
    //   console.log('etape 1')
    //   let n = 0
    //   this.demandeService.getAllDemandes().forEach(element2 => {
    //     console.log('etape 2')
    //     console.log(element2)
    //     if (element2.directionId === element.idDirection){
    //       console.log('ajout: n ='+n)
    //       n++
    //       console.log('n devient:'+n)
    //     }
    //   })
    //   this.demandesToShow.push({direction: element.libelleDirection, nombre: n})
    //   // console.log(element)
    // })
  
}
