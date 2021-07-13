import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FamilleComponent } from './famille/famille.component';

const routes: Routes = [
  { path: 'parametre/famille', component: FamilleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
