import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFindComponent } from './order-find.component';

describe('OrderFindComponent', () => {
  let component: OrderFindComponent;
  let fixture: ComponentFixture<OrderFindComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFindComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderFindComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
