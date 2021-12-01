import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullWidthPlainComponent } from './full-width-plain.component';

describe('FullWidthPlainComponent', () => {
  let component: FullWidthPlainComponent;
  let fixture: ComponentFixture<FullWidthPlainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullWidthPlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullWidthPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
