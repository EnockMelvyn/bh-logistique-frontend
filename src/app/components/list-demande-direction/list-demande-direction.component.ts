
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Demande } from 'src/app/models/demande';
import { User } from 'src/app/models/user';
import { Direction } from 'src/app/models/direction';
import { AuthService } from 'src/app/services/auth.service';
import { DemandeService } from 'src/app/services/demande.service';
import { DirectionService } from 'src/app/services/direction.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-demande-direction',
  templateUrl: './list-demande-direction.component.html',
  styleUrls: ['./list-demande-direction.component.css']
})
export class ListDemandeDirectionComponent implements OnInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator : MatPaginator
  loading = false
  demandesToShow: any [] = []
  direction:Direction = {}
  allUsers : User[] = []
  directions: Direction[] = []
  colonnes = ['direction', 'nombre', 'actions']
  dataSource = new MatTableDataSource()
  
  constructor(private demandeService: DemandeService, private authService: AuthService,
    private directionService: DirectionService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.getData()
    
  }

  public getData(): void {
    this.loading = true
    this.directionService.getAllDirections().subscribe(
      (response: Direction[]) => {
        response.forEach(element => {
          this.demandeService.getDemandeByStatusEtDirection(null,element.idDirection!).subscribe(
            (resp: Demande[]) => {
              this.demandesToShow.push({'direction':element, 'nombre': resp.length})
              this.dataSource.data=this.demandesToShow
              this.dataSource.paginator  = this.paginator
              this.table.renderRows()
            }
          )
        })
        this.loading = false
      }
    )
  }

  public goToListeDemandeDirection(direction : Direction):void {
    this.dataService.setDirection(direction)
    this.router.navigateByUrl('/content/demande/list/attente')
  }
}
