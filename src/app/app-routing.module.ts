import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilleFormComponent } from './famille-form/famille-form.component';
import { FamilleComponent } from './famille/famille.component';

const routes: Routes = [
  { path: 'parametre/famille', component: FamilleComponent },
  { path: 'parametre/famille/creer', component: FamilleFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
