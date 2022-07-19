import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerPlateComponent } from './container-plate.component';

describe('ContainerPlateComponent', () => {
  let component: ContainerPlateComponent;
  let fixture: ComponentFixture<ContainerPlateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerPlateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
