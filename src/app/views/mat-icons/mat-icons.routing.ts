import { Routes } from '@angular/router';

import { MatIconsComponent } from './mat-icons.component';
import { UILibIconsComponent } from './uilib-icons/uilib-icons.component';

export const MatIconsRoutes: Routes = [
  { path: '', component: MatIconsComponent, data: { title: 'Material icons' } },
  {
    path: 'ui-lib-icons',
    component: UILibIconsComponent,
    data: { title: 'UI Lib icons', breadcrumb: 'UI Lib icons' },
  },
];
