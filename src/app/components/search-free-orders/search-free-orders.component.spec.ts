import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFreeOrdersComponent } from './search-free-orders.component';

describe('SearchFreeOrdersComponent', () => {
  let component: SearchFreeOrdersComponent;
  let fixture: ComponentFixture<SearchFreeOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFreeOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchFreeOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
