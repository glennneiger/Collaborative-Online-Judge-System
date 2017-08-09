import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// for angular material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdPaginatorModule, MdSelectModule } from '@angular/material';
import 'hammerjs';

// Component import
import { AppComponent } from './app.component';
import { ProblemListComponent } from './Components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './Components/problem-detail/problem-detail.component';

// Service import 
import { AuthService } from './Services/auth.service';
import { DataService } from './Services/data.service';
import { CollaborationService } from './Services/collaboration.service';

// routing import 
import { routing } from './app.routes';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { NewProblemComponent } from './Components/new-problem/new-problem.component';
import { EditorComponent } from './Components/editor/editor.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NavbarComponent,
    NewProblemComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdPaginatorModule,
    MdInputModule,
    MdSelectModule,
    routing
  ],
  providers: [
    AuthService,
    {
      provide: 'data',
      useClass: DataService
    },
    CollaborationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
