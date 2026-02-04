import { Routes } from '@angular/router';

import { Cliente } from './cliente/cliente';
import { NuevoCliente } from './cliente/nuevo-cliente/nuevo-cliente';

export const routes: Routes = [
    {
        path:"**",
        component:Cliente,
        pathMatch:"full"
    },
    {
        path:"cliente",
        component:Cliente
    },
    {
        path:"nuevoCliente",
        component:NuevoCliente
    }
];
