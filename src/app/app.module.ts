import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FamilleComponent } from './famille/famille.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FamilleFormComponent } from './famille-form/famille-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SousfamilleListComponent } from './sousfamille-list/sousfamille-list.component';
import { SousfamilleFormComponent } from './sousfamille-form/sousfamille-form.component';
import { ArticleFormComponent } from './article-form/article-form.component';
import { ArticleListComponent } from './article-list/article-list.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { DemandeFormComponent } from './demande-form/demande-form.component';
import { DemandeListComponent } from './demande-list/demande-list.component';

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
    MatButtonModule,
    MatOptionModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
