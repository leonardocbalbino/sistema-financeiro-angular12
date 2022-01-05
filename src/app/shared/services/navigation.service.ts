import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface IMenuItem {
  type: string; // Possible values: link/dropDown/icon/separator/extLink
  name?: string; // Used as display text for item and title for separator type
  state?: string; // Router state
  icon?: string; // Material icon name
  svgIcon?: string; // UI Lib icon name
  tooltip?: string; // Tooltip text
  disabled?: boolean; // If true, item will not be appeared in sidenav.
  sub?: IChildItem[]; // Dropdown items
  badges?: IBadge[];
}
interface IChildItem {
  type?: string;
  name: string; // Display text
  state?: string; // Router state
  icon?: string;  // Material icon name
  svgIcon?: string; // UI Lib icon name
  sub?: IChildItem[];
}

interface IBadge {
  color: string; // primary/accent/warn/hex color codes(#fff000)
  value: string; // Display text
}

@Injectable()
export class NavigationService {
  iconMenu: IMenuItem[] = [
    {
      name: 'Conta',
      type: 'dropDown',
      tooltip: 'Dashboard',
      svgIcon: 'ulb_server',
      state: 'conta',
      sub: [
        { name: 'Listagem de Contas', state: 'conta-listagem' },
      ]
    },
    {
      name: 'DASHBOARD',
      type: 'dropDown',
      tooltip: 'Dashboard',
      svgIcon: 'ulb_server',
      state: 'dashboard',
      sub: [
        { name: 'Default', state: 'default' },
        {name: 'Learning Management', state: 'learning-management'},
        { name: 'Analytics', state: 'analytics' },
        { name: 'Analytics Alt', state: 'analytics-alt' },
        { name: 'Cryptocurrency', state: 'crypto' },
        { name: 'Dark Cards', state: 'dark' }
      ]
    }
  ];

  // separatorMenu: IMenuItem[] = [
  //   {
  //     type: 'separator',
  //     name: 'Custom components'
  //   },
  //   {
  //     name: 'DASHBOARD',
  //     type: 'link',
  //     tooltip: 'Dashboard',
  //     icon: 'dashboard',
  //     state: 'dashboard'
  //   },
  //   {
  //     name: 'DIALOGS',
  //     type: 'dropDown',
  //     tooltip: 'Dialogs',
  //     icon: 'filter_none',
  //     state: 'dialogs',
  //     sub: [
  //       { name: 'CONFIRM', state: 'confirm' },
  //       { name: 'LOADER', state: 'loader' }
  //     ]
  //   },
  //   {
  //     name: 'PROFILE',
  //     type: 'dropDown',
  //     tooltip: 'Profile',
  //     icon: 'person',
  //     state: 'profile',
  //     sub: [
  //       { name: 'OVERVIEW', state: 'overview' },
  //       { name: 'SETTINGS', state: 'settings' },
  //       { name: 'BLANK', state: 'blank' }
  //     ]
  //   },
  //   
  // ];

  // plainMenu: IMenuItem[] = [
  //   {
  //     name: 'DASHBOARD',
  //     type: 'link',
  //     tooltip: 'Dashboard',
  //     icon: 'dashboard',
  //     state: 'dashboard'
  //   },
  //   {
  //     name: 'FORMS',
  //     type: 'dropDown',
  //     tooltip: 'Forms',
  //     icon: 'description',
  //     state: 'forms',
  //     sub: [
  //       { name: 'BASIC', state: 'basic' },
  //       { name: 'EDITOR', state: 'editor' },
  //       { name: 'UPLOAD', state: 'upload' },
  //       { name: 'WIZARD', state: 'wizard' }
  //     ]
  //   }
  // ];

  // Icon menu TITLE at the very top of navigation.
  // This title will appear if any icon type item is present in menu.
  iconTypeMenuTitle = 'Frequently Accessed';
  // sets iconMenu as default;
  menuItems = new BehaviorSubject<IMenuItem[]>(this.iconMenu);
  // navigation component has subscribed to this Observable
  menuItems$ = this.menuItems.asObservable();
  constructor() {}

  // Customizer component uses this method to change menu.
  // You can remove this method and customizer component.
  // Or you can customize this method to supply different menu for
  // different user type.
  // publishNavigationChange(menuType: string) {
  //   switch (menuType) {
  //     case 'separator-menu':
  //       this.menuItems.next(this.separatorMenu);
  //       break;
  //     case 'icon-menu':
  //       this.menuItems.next(this.iconMenu);
  //       break;
  //     default:
  //       this.menuItems.next(this.plainMenu);
  //   }
  // }
}
