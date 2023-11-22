import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SingleFarmComponent } from './components/single-farm/single-farm.component';
import { FarmsComponent } from './components/farms/farms.component';
import { EditFarmComponent } from './components/edit-farm/edit-farm.component';
import { AddFarmComponent } from './components/add-farm/add-farm.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "farms",
    component: FarmsComponent
  },
  {
    path: "farms/add",
    component: AddFarmComponent
  },
  {
    path: "farms/:id",
    component: SingleFarmComponent
  },
  {
    path: 'farms/:id/edit',
    component: EditFarmComponent
  },
  {
    path: "**", 
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
