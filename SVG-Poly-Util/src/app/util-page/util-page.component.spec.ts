import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilPageComponent } from './util-page.component';
import { FormsModule } from '@angular/forms';



describe('UtilPageComponent', () => {
    let component: UtilPageComponent;
    let fixture: ComponentFixture<UtilPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UtilPageComponent],
            imports: [FormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UtilPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
