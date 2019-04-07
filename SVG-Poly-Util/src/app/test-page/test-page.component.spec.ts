import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestPageComponent } from './test-page.component';
import { FormsModule } from '@angular/forms';

describe('TestPageComponent', () => {
    let component: TestPageComponent;
    let fixture: ComponentFixture<TestPageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestPageComponent],
            imports: [FormsModule],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestPageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
