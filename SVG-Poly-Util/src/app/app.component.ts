
import { Component, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    constructor() { }

    version = '';

    title = 'SVG Polygon Utility';

    ngOnInit() {
        this.version = environment.version.toString();

        if (environment.production === true) {
            this.version += '_PROD';
        } else {
            this.version += '_DEV';
        }
        this.getLocalStorageVersion();

    }


    private getLocalStorageVersion() {
        try {
            const appData = localStorage.getItem('app_data');
            if (appData == null || appData === 'null' || JSON.parse(appData).version < environment.version) {
                console.log('new app or old version');
                this.setNewAppData();
            }
        } catch (err) {
            console.log('Read app data JSON failed: ', err);
            this.setNewAppData();
        }
    }

    private setNewAppData() {
        try {
            const newAppData = {
                version: environment.version
            };
            localStorage.setItem('app_data', JSON.stringify(newAppData));
            localStorage.setItem('poly_data', null);
        } catch (err) {
            console.log('Save JSON string failed: ', err);
        }
    }

}
