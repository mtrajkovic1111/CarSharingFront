import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRentedCarsComponent } from './admin-rented-cars.component';

describe('AdminRentedCarsComponent', () => {
  let component: AdminRentedCarsComponent;
  let fixture: ComponentFixture<AdminRentedCarsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRentedCarsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRentedCarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
