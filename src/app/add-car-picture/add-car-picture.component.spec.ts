import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarPictureComponent } from './add-car-picture.component';

describe('AddCarPictureComponent', () => {
  let component: AddCarPictureComponent;
  let fixture: ComponentFixture<AddCarPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarPictureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
