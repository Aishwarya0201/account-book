import { Routes } from '@angular/router';
import { LayoutComponent } from './Pages/layout/layout.component';
import { LoginComponent } from './Pages/login/login.component';
import { ListComponent } from './Pages/list/list.component';
import { TransactionComponent } from './Pages/transaction/transaction.component';
import { EditComponent } from './Pages/edit/edit.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'list',
        component: ListComponent,
      },
      {
        path: 'transaction',
        component: TransactionComponent,
      },
      {
        path: 'edit/:id',
        component: EditComponent,
      },
      // {
      //   path: 'comment/:id',
      //   component: CommentComponent,
      // },
      // {
      //   path: 'addnew',
      //   component: AddnewarticleComponent,
      // },
    ],
  },
];
