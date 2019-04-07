import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-test-page',
    templateUrl: './test-page.component.html',
    styleUrls: ['./test-page.component.less']
})
export class TestPageComponent implements OnInit {

    constructor() { }

    obj = {
        a: {
            label: 'A',
            inputType: 'number',
            value: 1
        },
        b: {
            label: 'B',
            inputType: 'checkbox',
            value: true
        },
        c: {
            label: 'C',
            inputType: 'checkbox',
            value: false
        },
    };

    obj2 = {
        checkbox2: true
    }

    objArray = Object.keys(this.obj);

    obj2Array = Object.keys(this.obj2);
    someInfo = '';
    ngOnInit() {
    }

    onChange(event) {
        this.someInfo += event;
    }

}
