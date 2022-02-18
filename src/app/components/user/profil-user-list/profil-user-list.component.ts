import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profil-user-list',
  templateUrl: './profil-user-list.component.html',
  styleUrls: ['./profil-user-list.component.css']
})
export class ProfilUserListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  users : User [] = []

  dataSource : MatTableDataSource<any> = new MatTableDataSource<any>()
  colonnes = ["emailUser", "lastnameUser", "nameUser", "login", "actions"]
  constructor(private authService : AuthService, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getAllUsers(){
    this.authService.getAllUsers().subscribe(
      (response: any) => {
        console.log(response.items)
        this.users = response.items
        this.dataSource.data = response.items
      }
    )
  }

  goToFormUser(user: User) {
    this.dataService.user = user
    this.router.navigateByUrl('/content/parametre/utilisateur/create')
  }
}
