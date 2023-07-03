import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlackBoxOpenComponent } from './black-box-open.component';

describe('BlackBoxOpenComponent', () => {
  let component: BlackBoxOpenComponent;
  let fixture: ComponentFixture<BlackBoxOpenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlackBoxOpenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlackBoxOpenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
