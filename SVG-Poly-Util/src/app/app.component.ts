
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

    constructor() { }

    polyObj = {
        canvasWidth: 400,
        canvasHeight: 200,
        edgeCount: 3,
        width: 10,
        height: 3,
        rotationDeg: 30,
        strokeWidth: 3,
        rotate: false,
        transformOriginY: 0,
    };
    rectPath = '0 0, 0 ' + this.polyObj.canvasHeight + ', ' + this.polyObj.canvasWidth + ' ' + this.polyObj.canvasHeight + ', ' + this.polyObj.canvasWidth + ' ' + 0;
    generatedPoints = '';

    ngOnInit() {
        this.calculatePointsFromCenter();
    }


    onChange(event) {
        this.rectPath = '0 0, 0 ' + this.polyObj.canvasHeight + ', ' + this.polyObj.canvasWidth + ' ' + this.polyObj.canvasHeight + ', ' + this.polyObj.canvasWidth + ' ' + 0;
        this.calculatePointsFromCenter();
        this.getTransformOrigin();
    }


    getTransformOrigin() {
        return '' + this.polyObj.canvasWidth / 2 + 'px ' + this.polyObj.transformOriginY + 'px';
    }

    calculatePointsFromCenter() {

        const centerAngle = 2 / this.polyObj.edgeCount * Math.PI;

        const r = this.polyObj.edgeCount % 2 === 0 ? (this.polyObj.canvasHeight - 2 * this.polyObj.strokeWidth) / 2 : (this.polyObj.canvasHeight - 2 * this.polyObj.strokeWidth) / (1 + Math.cos(centerAngle / 2));
        this.polyObj.transformOriginY = r + this.polyObj.strokeWidth;
        const centerX: number = this.polyObj.canvasWidth / 2;
        const centerY: number = this.polyObj.edgeCount % 2 === 0 ? this.polyObj.canvasHeight / 2 : r + this.polyObj.strokeWidth;
        let leftPointPath = '' + this.polyObj.canvasWidth / 2 + ' ' + this.polyObj.strokeWidth;
        let rightPointPath = '';

        for (let i = 0; i < Math.floor((this.polyObj.edgeCount - 1) / 2); i++) {
            const nextAngle = (i + 1) * centerAngle;
            const pointX = centerX - r * Math.sin(nextAngle);
            const pointY = centerY - r * Math.cos(nextAngle);
            leftPointPath += ', ' + pointX + ' ' + pointY;
            rightPointPath = ', ' + (centerX * 2 - pointX) + ' ' + pointY + '' + rightPointPath;
        }
        if (this.polyObj.edgeCount % 2 === 0) {
            leftPointPath += ', ' + this.polyObj.canvasWidth / 2 + ' ' + (this.polyObj.canvasHeight - this.polyObj.strokeWidth);
        }
        this.generatedPoints = leftPointPath + rightPointPath;
    }
}
