import { NgModule } from '@angular/core';
import { addNavMenuItem, SharedModule } from '@vendure/admin-ui/core';

/**
 * This module adds the webhook-sections to existing nav
 */
@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuItem(
      {
        id: 'simple-cms',
        label: 'Content',
        routerLink: [window.location.search],
        icon: 'scroll',
      },
      'marketing'
    ),
  ],
})
export class AdminUiNavModule {}
