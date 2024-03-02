import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { WildCardComponent } from './wild-card/wild-card.component';

const routes: Routes = [
  {path:"home",component:HomePageComponent},
  {path:"register",component:RegisterPageComponent},
  {path:"",component:HomePageComponent},
  {path:"**",component:WildCardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
