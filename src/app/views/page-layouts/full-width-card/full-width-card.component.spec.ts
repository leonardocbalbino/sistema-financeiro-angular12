import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FullWidthCardComponent } from './full-width-card.component';

describe('FullWidthCardComponent', () => {
  let component: FullWidthCardComponent;
  let fixture: ComponentFixture<FullWidthCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FullWidthCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullWidthCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
