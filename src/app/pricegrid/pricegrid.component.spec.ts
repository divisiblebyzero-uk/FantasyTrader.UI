import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricegridComponent } from './pricegrid.component';

describe('PricegridComponent', () => {
  let component: PricegridComponent;
  let fixture: ComponentFixture<PricegridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricegridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricegridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
