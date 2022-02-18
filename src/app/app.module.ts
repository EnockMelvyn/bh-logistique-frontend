import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
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
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { ContentComponent } from './components/content/content.component';
import { TemplateAdminLTEComponent } from './components/template-admin-lte/template-admin-lte.component';
import { CommandeRecapComponent } from './components/commande-recap/commande-recap.component';
import { SortieListComponent } from './components/sortie-list/sortie-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DemandeRecapComponent } from './components/demande-recap/demande-recap.component';
import { ListDemandeDirectionComponent } from './components/list-demande-direction/list-demande-direction.component';
import { VueValidateurComponent } from './components/vue-validateur/vue-validateur.component';
import { VueDmgComponent } from './components/vue-dmg/vue-dmg.component';
import { VueDmgDemandeDirComponent } from './components/vue-dmg-demande-dir/vue-dmg-demande-dir.component';
import { SortieDmgComponent } from './components/sortie-dmg/sortie-dmg.component';
import { InventaireFormComponent } from './components/inventaire/inventaire-form/inventaire-form.component';
import { InventaireListComponent } from './components/inventaire/inventaire-list/inventaire-list.component';
import { DemandeurDemandeListComponent } from './components/demandeur-demande-list/demandeur-demande-list.component';
import { ProfilUserListComponent } from './components/user/profil-user-list/profil-user-list.component';
import { CreateComponent } from './components/user/create/create.component';
import {MatSortModule} from '@angular/material/sort';
import { DashboardDmgComponent } from './components/dashboard-dmg/dashboard-dmg.component';

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
    CommandeListComponent,
    AuthFormComponent,
    ContentComponent,
    TemplateAdminLTEComponent,
    CommandeRecapComponent,
    SortieListComponent,
    DashboardComponent,
    DemandeRecapComponent,
    ListDemandeDirectionComponent,
    VueValidateurComponent,
    VueDmgComponent,
    VueDmgDemandeDirComponent,
    SortieDmgComponent,
    InventaireListComponent,
    InventaireFormComponent,
    DemandeurDemandeListComponent,
    ProfilUserListComponent,
    CreateComponent,
    DashboardDmgComponent,
    
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
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSortModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
