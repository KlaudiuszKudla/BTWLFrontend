import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderTransportComponent } from './order-transport.component';

describe('OrderTransportComponent', () => {
  let component: OrderTransportComponent;
  let fixture: ComponentFixture<OrderTransportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderTransportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
