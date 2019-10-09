import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  isMobile = true;

  constructor(private platform: Platform) {
    if (this.platform.is('desktop')) {
      this.isMobile = false;
    }
    console.log(this.platform.platforms());
  }
}
