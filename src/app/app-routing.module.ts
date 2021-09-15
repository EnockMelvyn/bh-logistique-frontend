import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import { ArticleListComponent } from './components/article-list/article-list.component';
import { BlFormComponent } from './components/bl-form/bl-form.component';
import { BlListComponent } from './components/bl-list/bl-list.component';
import { CommandeFormComponent } from './components/commande-form/commande-form.component';
import { CommandeListComponent } from './components/commande-list/commande-list.component';
import { DemandeFormComponent } from './components/demande-form/demande-form.component';
import { DemandeListComponent } from './components/demande-list/demande-list.component';
import { FamilleFormComponent } from './components/famille-form/famille-form.component';
import { FamilleComponent } from './components/famille/famille.component';
import { FournisseurFormComponent } from './components/fournisseur-form/fournisseur-form.component';
import { FournisseurListComponent } from './components/fournisseur-list/fournisseur-list.component';
import { SortieFormComponent } from './components/sortie-form/sortie-form.component';
import { SousfamilleFormComponent } from './components/sousfamille-form/sousfamille-form.component';
import { SousfamilleListComponent } from './components/sousfamille-list/sousfamille-list.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthGuard } from './guards/auth.guard';
import { TemplateAdminLTEComponent } from './components/template-admin-lte/template-admin-lte.component';

const routes: Routes = [
  // { path: 'parametre/famille', component: FamilleComponent, canActivate: [AuthGuard] },
  // { path: 'parametre/famille/creer', component: FamilleFormComponent, canActivate: [AuthGuard] },
  // { path: 'parametre/sousFamille', component: SousfamilleListComponent, canActivate: [AuthGuard] },
  // { path: 'parametre/sousFamille/creer', component: SousfamilleFormComponent, canActivate: [AuthGuard] },
  // { path: 'parametre/article', component: ArticleListComponent, canActivate: [AuthGuard] },
  // { path: 'parametre/article/creer', component: ArticleFormComponent, canActivate: [AuthGuard] },
  // { path: 'parametre/fournisseur', component: FournisseurListComponent, canActivate: [AuthGuard]},
  // { path: 'parametre/fournisseur/creer', component: FournisseurFormComponent, canActivate: [AuthGuard]},
  // { path: 'demande', component: DemandeListComponent, canActivate: [AuthGuard] },
  // { path: 'demande/creer', component: DemandeFormComponent, canActivate: [AuthGuard]},
  // { path: 'sortie/creer', component: SortieFormComponent, canActivate: [AuthGuard] },
  // { path: 'livraison/enregistrer', component: BlFormComponent, canActivate: [AuthGuard] },
  // { path: 'livraison', component: BlListComponent, canActivate: [AuthGuard] },
  // { path: 'commande/enregistrer', component: CommandeFormComponent, canActivate: [AuthGuard] },
  // { path: 'commande', component: CommandeListComponent, canActivate: [AuthGuard] },
  { path: 'content', component: TemplateAdminLTEComponent, canActivate: [AuthGuard], 
    children:[
      { path: 'parametre',
        children:[
          { path: 'famille', component: FamilleComponent,
            children:[
              { path: 'creer', component: FamilleFormComponent, canActivate: [AuthGuard] },
            ]
          },
          { path: 'sousFamille', component: SousfamilleListComponent, 
            children:[
              { path: 'creer', component: SousfamilleFormComponent, canActivate: [AuthGuard]},
            ] 
          },
          { path: 'article', component: ArticleListComponent,
            children:[
              { path: 'creer', component: ArticleFormComponent, canActivate: [AuthGuard]}
            ] 
          },
          { path: 'fournisseur', component: FournisseurListComponent,
            children:[
              { path: 'creer', component: FournisseurFormComponent, canActivate: [AuthGuard]}
            ]
          },
        ] 
      },
      { path: 'demande', component: DemandeListComponent, 
        children:[
          { path: 'creer', component: DemandeFormComponent, canActivate: [AuthGuard]},
        ]
      },
      { path: 'sortie/creer', component: SortieFormComponent, canActivate: [AuthGuard] },
      { path: 'livraison', component: BlListComponent,
        children:[
          { path: 'enregistrer', component: BlFormComponent}
        ] 
      },
      { path: 'commande', component: CommandeListComponent, 
        children:[
          { path: 'enregistrer', component: CommandeFormComponent }
        ] 
      }
    ]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: AuthFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
