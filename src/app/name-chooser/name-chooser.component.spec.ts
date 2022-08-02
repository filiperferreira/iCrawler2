import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameChooserComponent } from './name-chooser.component';

describe('NameChooserComponent', () => {
  let component: NameChooserComponent;
  let fixture: ComponentFixture<NameChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
