import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestPageComponent } from './test-page/test-page.component';
import { UtilPageComponent } from './util-page/util-page.component';

const routes: Routes = [


    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: UtilPageComponent },
    { path: 'testPage', component: TestPageComponent }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
