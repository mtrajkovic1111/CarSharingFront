import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRentalsDetailsComponent } from './user-rentals-details.component';

describe('UserRentalsDetailsComponent', () => {
  let component: UserRentalsDetailsComponent;
  let fixture: ComponentFixture<UserRentalsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRentalsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRentalsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
