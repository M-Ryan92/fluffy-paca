import { Routes } from '@angular/router';
import { TransactionDetailsViewComponent } from './components/transaction-details/transactionDetailsView.component';
import { TransactionsViewComponent } from './components/transactions/transactionsView.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/transactions',
    pathMatch: 'full',
  },
  {
    path: 'transactions',
    component: TransactionsViewComponent,
  },
  {
    path: '1',
    redirectTo: '/transaction-details/2023-01-01/1',
    pathMatch: 'full',
  },
  {
    path: 'transaction-details/:day/:id',
    component: TransactionDetailsViewComponent,
  },
];
