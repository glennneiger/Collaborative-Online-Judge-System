import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProblemListComponent } from './Components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './Components/problem-detail/problem-detail.component';

// Service import 
import { DataService } from './Services/data.service';

// routing import 
import { routing } from './app.routes';
import { NavbarComponent } from './Components/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ProblemListComponent,
    ProblemDetailComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [
    {
      provide: 'data',
      useClass: DataService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
