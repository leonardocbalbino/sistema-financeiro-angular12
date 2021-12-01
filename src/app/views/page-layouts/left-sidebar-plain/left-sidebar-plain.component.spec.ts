import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LeftSidebarPlainComponent } from './left-sidebar-plain.component';

describe('LeftSidebarPlainComponent', () => {
  let component: LeftSidebarPlainComponent;
  let fixture: ComponentFixture<LeftSidebarPlainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftSidebarPlainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftSidebarPlainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
