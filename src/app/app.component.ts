import { Component, OnInit } from '@angular/core';

import { Platform, MenuController, ToastController, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  isInstallMessageShown = false;
  isMobile = true;
  dark = false;

  isLoggedIn$: Observable<boolean>;
  pictureUrl$: Observable<string>;
  displayName$: Observable<string>;

  appPages = [
    {
      title: 'Events',
      url: '/tabs/events',
      icon: 'calendar'
    },
    {
      title: 'Registered',
      url: '/tabs/registered',
      icon: 'list'
    },
    {
      title: 'Scores',
      url: '/tabs/scores',
      icon: 'document'
    },
    {
      title: 'About',
      url: '/tabs/about',
      icon: 'information-circle'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menu: MenuController,
    private router: Router,
    private swUpdate: SwUpdate,
    private storage: Storage,
    private toastController: ToastController,
    private alertController: AlertController,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.isLoggedIn$ = this.afAuth.authState.pipe(map(user => !!user));
    this.pictureUrl$ = this.afAuth.authState.pipe(map(user => (user ? user.photoURL : null)));
    this.displayName$ = this.afAuth.authState.pipe(map(user => (user ? user.displayName : null)));

    // this.checkLoginStatus();
    // this.listenForLoginEvents();
    await this.showIosInstallBanner();
    this.handleAppUpdate();
  }

  handleAppUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(async (event: UpdateAvailableEvent) => {
        const alert = await this.alertController.create({
          header: `App update!`,
          message: `Newer version - v${(event.available.appData as any).version} is available.
                    Change log: ${(event.available.appData as any).changelog}`,
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary'
            },
            {
              text: 'Refresh',
              handler: () => {
                window.location.reload();
              }
            }
          ]
        });

        await alert.present();
      });
    }
  }

  async showIosInstallBanner() {
    // Detects if device is on iOS
    const isIos = () => {
      return /iphone|ipad|ipod/.test(window.navigator.userAgent.toLowerCase());
    };

    // Detects if device is in standalone mode
    const isInStandaloneMode = () => 'standalone' in (window as any).navigator && (window as any).navigator.standalone;

    // Show the banner once
    const isBannerShown = await this.storage.get('isBannerShown');

    // Checks if it should display install popup notification
    if (isIos() && !isInStandaloneMode() && isBannerShown == null) {
      const toast = await this.toastController.create({
        showCloseButton: true,
        closeButtonText: 'OK',
        cssClass: 'custom-toast',
        position: 'bottom',
        message: `To install the app, tap "Share" icon below and select "Add to Home Screen".`
      });
      toast.present();
      this.storage.set('isBannerShown', true);
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('desktop')) {
        this.isMobile = false;
      }
      // this.statusBar.styleDefault();
      // this.splashScreen.hide();
    });

    // this.router.events.subscribe((event: RouterEvent) => {
    //   if (event instanceof NavigationEnd && event.url === '/login') {
    //     this.menuCtrl.enable(false);
    //   }
    // });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
