import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { DemandeListComponent } from './demande-list/demande-list.component';
import { FamilleFormComponent } from './famille-form/famille-form.component';
import { FamilleComponent } from './famille/famille.component';
import { SousfamilleFormComponent } from './sousfamille-form/sousfamille-form.component';
import { SousfamilleListComponent } from './sousfamille-list/sousfamille-list.component';

const routes: Routes = [
  { path: 'parametre/famille', component: FamilleComponent },
  { path: 'parametre/famille/creer', component: FamilleFormComponent },
  { path: 'parametre/sousFamille', component: SousfamilleListComponent },
  { path: 'parametre/sousFamille/creer', component: SousfamilleFormComponent },
  { path: 'parametre/article', component: ArticleListComponent },
  { path: 'parametre/article/creer', component: ArticleFormComponent },
  { path: 'demande', component: DemandeListComponent },
  { path: 'demande/creer', component: DemandeFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
