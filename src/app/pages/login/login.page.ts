import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as firebaseui from 'firebaseui';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {

    ui: firebaseui.auth.AuthUI;

    constructor(private afAuth: AngularFireAuth,
                private router: Router,
                private ngZone: NgZone) {

    }

    ngOnInit() {

        const uiConfig = {
          signInOptions: [
            firebase.auth.FacebookAuthProvider.PROVIDER_ID,
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID
          ],
          callbacks: {
            signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this)
          }
        };

        this.ui = new firebaseui.auth.AuthUI(this.afAuth.auth);

        this.ui.start('#firebaseui-auth-container', uiConfig);


    }

    ngOnDestroy() {
        this.ui.delete();
    }

    onLoginSuccessful(result) {

        console.log('Firebase UI result:', result);

        this.ngZone.run(() => this.router.navigateByUrl('/tabs/events'));

    }
}

// {
//   constructor() {}

  // login: UserOptions = { username: '', password: '' };
  // submitted = false;

  // constructor(public userData: UserData, public router: Router) {}

  // onLogin(form: NgForm) {
  //   this.submitted = true;

  //   if (form.valid) {
  //     this.userData.login(this.login.username);
  //     this.router.navigateByUrl('/app/tabs/schedule');
  //   }
  // }

  // onSignup() {
  //   this.router.navigateByUrl('/signup');
  // }
// }
