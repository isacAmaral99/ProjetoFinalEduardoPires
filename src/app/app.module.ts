

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavegacaoModule } from './Navegacao/navegacao.module';
import { MenuComponent } from './Navegacao/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NavegacaoModule,

  ],
  providers: [],
  bootstrap: [AppComponent,MenuComponent]
})
export class AppModule { }
