import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

    dashboardClass: string = 'active';
    aboutClass: string = '';

    constructor(private _router: Router) {
    }

    changeTabs() {
        if (this._router.url === '/') {
            this.dashboardClass = 'active';
            this.aboutClass = '';
        } else {
            this.dashboardClass = '';
            this.aboutClass = 'active';
        }
    }
}