import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { BlFormComponent } from './components/bl-form/bl-form.component';
import { BlListComponent } from './components/bl-list/bl-list.component';
import { DemandeFormComponent } from './components/demande-form/demande-form.component';
import { DemandeListComponent } from './components/demande-list/demande-list.component';
import { FamilleFormComponent } from './components/famille-form/famille-form.component';
import { FamilleComponent } from './components/famille/famille.component';
import { FournisseurFormComponent } from './components/fournisseur-form/fournisseur-form.component';
import { FournisseurListComponent } from './components/fournisseur-list/fournisseur-list.component';
import { SousfamilleFormComponent } from './components/sousfamille-form/sousfamille-form.component';
import { SousfamilleListComponent } from './components/sousfamille-list/sousfamille-list.component';

const routes: Routes = [
  { path: 'parametre/famille', component: FamilleComponent },
  { path: 'parametre/famille/creer', component: FamilleFormComponent },
  { path: 'parametre/sousFamille', component: SousfamilleListComponent },
  { path: 'parametre/sousFamille/creer', component: SousfamilleFormComponent },
  { path: 'parametre/article', component: ArticleListComponent },
  { path: 'parametre/article/creer', component: ArticleFormComponent },
  { path: 'parametre/fournisseur', component: FournisseurListComponent},
  { path: 'parametre/fournisseur/creer', component: FournisseurFormComponent},
  { path: 'demande', component: DemandeListComponent },
  { path: 'demande/creer', component: DemandeFormComponent },
  { path: 'livraison/enregistrer', component: BlFormComponent },
  { path: 'livraison', component: BlListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
