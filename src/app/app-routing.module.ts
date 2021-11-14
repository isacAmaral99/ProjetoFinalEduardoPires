import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Navegacao/home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'fornecedores',
    loadChildren: () => import('./fornecedor/fornecedor.module')
      .then(m => m.FornecedorModule)
  },
  {path: 'conta',
        loadChildren: () => import('./conta/conta.module')
        .then(m=> m.ContaModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
