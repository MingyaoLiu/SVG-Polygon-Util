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


    rectPath = '0 0, 0 ' + this.polyObj.canvasHeight.value + ', ' + this.polyObj.canvasWidth.value + ' ' + this.polyObj.canvasHeight.value + ', ' + this.polyObj.canvasWidth.value + ' ' + 0;
    generatedPoints = '';

    ngOnInit() {
        this.calculatePointsFromCenter();
        // this.polyObj.rotate.value = true;
    }


    onChange(event) {
        console.log(event)
        this.rectPath = '0 0, 0 ' + this.polyObj.canvasHeight.value + ', ' + this.polyObj.canvasWidth.value + ' ' + this.polyObj.canvasHeight.value + ', ' + this.polyObj.canvasWidth.value + ' ' + 0;
        this.calculatePointsFromCenter();
        this.getTransformOrigin();
    }


    getTransformOrigin() {
        return '' + this.polyObj.canvasWidth.value / 2 + 'px ' + this.polyObj.transformOriginY.value + 'px';
    }

    calculatePointsFromCenter() {

        const centerAngle = 2 / this.polyObj.edgeCount.value * Math.PI;
        let r = (this.polyObj.canvasHeight.value - 2 * this.polyObj.strokeWidth.value) / 2;
        if (this.polyObj.fitInAll.value <= 0 && this.polyObj.edgeCount.value % 2 !== 0) {
            r = (this.polyObj.canvasHeight.value - 2 * this.polyObj.strokeWidth.value) / (1 + Math.cos(centerAngle / 2));
        }
        this.polyObj.transformOriginY.value = r + this.polyObj.strokeWidth.value;
        const centerX: number = this.polyObj.canvasWidth.value / 2;
        const centerY: number = this.polyObj.edgeCount.value % 2 === 0 ? this.polyObj.canvasHeight.value / 2 : r + this.polyObj.strokeWidth.value;
        let leftPointPath = '' + this.polyObj.canvasWidth.value / 2 + ' ' + this.polyObj.strokeWidth.value;
        let rightPointPath = '';

        for (let i = 0; i < Math.floor((this.polyObj.edgeCount.value - 1) / 2); i++) {
            const nextAngle = (i + 1) * centerAngle;
            const pointX = centerX - r * Math.sin(nextAngle);
            const pointY = centerY - r * Math.cos(nextAngle);
            leftPointPath += ', ' + pointX + ' ' + pointY;
            rightPointPath = ', ' + (centerX * 2 - pointX) + ' ' + pointY + '' + rightPointPath;
        }
        if (this.polyObj.edgeCount.value % 2 === 0) {
            leftPointPath += ', ' + this.polyObj.canvasWidth.value / 2 + ' ' + (this.polyObj.canvasHeight.value - this.polyObj.strokeWidth.value);
        }
        this.generatedPoints = leftPointPath + rightPointPath;
    }
}