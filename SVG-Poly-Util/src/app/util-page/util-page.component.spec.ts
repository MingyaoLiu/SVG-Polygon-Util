import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilPageComponent } from './util-page.component';

describe('UtilPageComponent', () => {
  let component: UtilPageComponent;
  let fixture: ComponentFixture<UtilPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilPageComponent ]
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
