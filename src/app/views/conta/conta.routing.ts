import { Routes } from '@angular/router';
import { ContaListagemComponent } from './listagem/conta-listagem/conta-listagem.component';

export const ContaRoutes: Routes = [
  { 
    path: 'conta-listagem', 
    component: ContaListagemComponent, 
    data: { title: 'Listagem Conta', breadcrumb: 'Listagem de Contas' } 
  }
];