
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    constructor() { }

    version = '';
    ngOnInit() {
        if (environment.production === true) {
            this.version = environment.version.toString();
        }
    }
}
