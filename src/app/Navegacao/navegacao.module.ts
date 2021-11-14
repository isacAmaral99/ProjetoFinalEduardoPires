import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import {RouterModule} from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from "./menu/menu.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { NotFoundComponent } from "./notfound/notfound.component";
import { MenuLoginComponent } from "./menu-login/menu-login.component";


@NgModule({
  declarations:[
     MenuComponent,
     MenuLoginComponent,
    HomeComponent,
    FooterComponent,
    NotFoundComponent
  ],
  imports:[
    CommonModule,
    RouterModule,
    NgbModule

  ],
  exports :[
    MenuComponent,
        HomeComponent,
        MenuLoginComponent,
        FooterComponent,
        NotFoundComponent
  ]
})
export class NavegacaoModule{}
