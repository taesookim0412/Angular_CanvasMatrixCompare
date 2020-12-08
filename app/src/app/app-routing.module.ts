import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P1DataComponent } from './p1-data/p1-data.component';
import { P2DataComponent } from './p2-data/p2-data.component';

const routes: Routes = [{path: '01', component: P1DataComponent},
{path: '02', component: P2DataComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
