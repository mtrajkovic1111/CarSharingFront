import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersCarComponent } from './admin-users-car.component';

describe('AdminUsersCarComponent', () => {
  let component: AdminUsersCarComponent;
  let fixture: ComponentFixture<AdminUsersCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminUsersCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminUsersCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
