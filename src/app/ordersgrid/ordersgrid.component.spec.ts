import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersgridComponent } from './ordersgrid.component';

describe('OrdersgridComponent', () => {
  let component: OrdersgridComponent;
  let fixture: ComponentFixture<OrdersgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersgridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
