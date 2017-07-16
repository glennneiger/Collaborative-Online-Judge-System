import { Routes, RouterModule } from '@angular/router';
import { ProblemListComponent } from './Components/problem-list/problem-list.component';
import { ProblemDetailComponent } from './Components/problem-detail/problem-detail.component'

const routes: Routes = [
    {
        path: '',
        redirectTo: 'problems',
        pathMatch: 'full'
    },
    {
        path: 'problems',
        component: ProblemListComponent
    },
    {
        path: 'problems/:id',
        component: ProblemDetailComponent
    },
    {
        path: '**',
        redirectTo: 'problems'
    }
];

export const routing = RouterModule.forRoot(routes);