import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-util-page',
    templateUrl: './util-page.component.html',
    styleUrls: ['./util-page.component.less']
})
export class UtilPageComponent implements OnInit {

    constructor() { }

    polyObj = {
        canvasWidth: {
            label: 'Canvas Width',
            inputType: 'number',
            value: 400
        },
        canvasHeight: {
            label: 'Canvas Height',
            inputType: 'number',
            value: 200
        },
        edgeCount: {
            label: 'Edge Count',
            inputType: 'number',
            value: 5
        },
        strokeWidth: {
            label: 'Stroke Width',
            inputType: 'number',
            value: 2
        },
        strokeColor: {
            label: 'Stroke Color',
            inputType: 'color',
            value: '#EFEFEF'
        },
        fillColor: {
            label: 'Fill Color',
            inputType: 'color',
            value: '#BCBCBC'
        },
        canvasColor: {
            label: 'Canvas Color',
            inputType: 'color',
            value: '#454545'
        },
        rotate: {
            label: 'Rotate Poly',
            // Checkbox not working with nested obj model binding, use number 0, 1 to represent True False.
            inputType: 'number',
            value: 1
        },
        rotationDeg: {
            label: 'Rotate Transform Degree',
            inputType: 'number',
            value: 222
        },
        fitInAll: {
            label: 'Fit Poly in Canvas',
            inputType: 'number',
            value: 1
        },
        transformOriginY: {
            label: 'Transform Origin Y',
            inputType: 'number',
            value: 222
        },
    };

    polyObjArr = Object.keys(this.polyObj);


    rectPath = '0 0, 0 200, 400 200, 400 0';
    generatedPoints = '';

    ngOnInit() {
        // this.polyObj.rotate.value = true;
        this.loadLocalStorageSave();
        this.calculatePointsFromCenter();
        this.getTransformOrigin();
    }

    private loadLocalStorageSave() {
        try {
            const storedData = localStorage.getItem('poly_data');
            this.polyObj = JSON.parse(storedData);
            this.rectPath = '0 0, 0 ' + this.polyObj.canvasHeight.value + ', ' + this.polyObj.canvasWidth.value + ' ' + this.polyObj.canvasHeight.value + ', ' + this.polyObj.canvasWidth.value + ' ' + 0;
        } catch (err) {
            console.log('Read JSON saved failed: ', err);
            this.saveObjToLocalStorage();
        }
    }

    private saveObjToLocalStorage() {
        try {
            localStorage.setItem('poly_data', JSON.stringify(this.polyObj));
        } catch (err) {
            console.log('Save JSON string failed: ', err);
        }
    }

    private onChange(event) {
        console.log(event);
        this.saveObjToLocalStorage();
        this.rectPath = '0 0, 0 ' + this.polyObj.canvasHeight.value + ', ' + this.polyObj.canvasWidth.value + ' ' + this.polyObj.canvasHeight.value + ', ' + this.polyObj.canvasWidth.value + ' ' + 0;
        this.calculatePointsFromCenter();
        this.getTransformOrigin();
    }


    getTransformOrigin() {
        return '' + this.polyObj.canvasWidth.value / 2 + 'px ' + this.polyObj.transformOriginY.value + 'px';
    }

    private calculatePointsFromCenter() {

        const centerAngle = 2 / this.polyObj.edgeCount.value * Math.PI;
        let r = (this.polyObj.canvasHeight.value - 2 * this.polyObj.strokeWidth.value) / 2;
        if (this.polyObj.fitInAll.value <= 0 && this.polyObj.edgeCount.value % 2 !== 0) {
            r = (this.polyObj.canvasHeight.value - 2 * this.polyObj.strokeWidth.value) / (1 + Math.cos(centerAngle / 2));
        } else if (this.polyObj.fitInAll.value <= 0 && this.polyObj.edgeCount.value % 2 === 0) {
            r = Math.sin(Math.PI / 2) * ((this.polyObj.canvasHeight.value - 2 * this.polyObj.strokeWidth.value) / 2) / Math.sin(Math.PI / 2 - centerAngle / 2)
        }
        const centerX: number = this.polyObj.canvasWidth.value / 2;
        const centerY: number = this.polyObj.edgeCount.value % 2 === 0 ? this.polyObj.canvasHeight.value / 2 : r + this.polyObj.strokeWidth.value;
        this.polyObj.transformOriginY.value = centerY;
        let leftPointPath = '' + centerX + ' ' + (centerY - r);
        let rightPointPath = '';

        for (let i = 0; i < Math.floor((this.polyObj.edgeCount.value - 1) / 2); i++) {
            const nextAngle = (i + 1) * centerAngle;
            const pointX = centerX - r * Math.sin(nextAngle);
            const pointY = centerY - r * Math.cos(nextAngle);
            leftPointPath += ', ' + pointX + ' ' + pointY;
            rightPointPath = ', ' + (centerX * 2 - pointX) + ' ' + pointY + '' + rightPointPath;
        }
        if (this.polyObj.edgeCount.value % 2 === 0) {
            leftPointPath += ', ' + centerX + ' ' + (centerY + r);
        }
        this.generatedPoints = leftPointPath + rightPointPath;
    }

}
