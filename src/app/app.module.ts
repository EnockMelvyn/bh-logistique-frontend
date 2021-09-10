import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { DemandeFormComponent } from './components/demande-form/demande-form.component';
import { DemandeListComponent } from './components/demande-list/demande-list.component';
import { FamilleFormComponent } from './components/famille-form/famille-form.component';
import { FamilleComponent } from './components/famille/famille.component';
import { FournisseurFormComponent } from './components/fournisseur-form/fournisseur-form.component';
import { FournisseurListComponent } from './components/fournisseur-list/fournisseur-list.component';
import { SousfamilleFormComponent } from './components/sousfamille-form/sousfamille-form.component';
import { SousfamilleListComponent } from './components/sousfamille-list/sousfamille-list.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlFormComponent } from './components/bl-form/bl-form.component';
import { BlListComponent } from './components/bl-list/bl-list.component';
import { SortieFormComponent } from './components/sortie-form/sortie-form.component';
import { CommandeFormComponent } from './components/commande-form/commande-form.component';
import { CommandeListComponent } from './components/commande-list/commande-list.component';

@NgModule({
  declarations: [
    AppComponent,
    FamilleComponent,
    FamilleFormComponent,
    SousfamilleListComponent,
    SousfamilleFormComponent,
    ArticleFormComponent,
    ArticleListComponent,
    DemandeFormComponent,
    DemandeListComponent,
    FournisseurListComponent,
    FournisseurFormComponent,
    BlFormComponent,
    BlListComponent,
    SortieFormComponent,
    CommandeFormComponent,
    CommandeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatOptionModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
