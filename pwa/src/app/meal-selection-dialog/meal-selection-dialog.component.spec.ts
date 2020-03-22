import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealSelectionDialogComponent } from './meal-selection-dialog.component';

describe('MealSelectionDialogComponent', () => {
  let component: MealSelectionDialogComponent;
  let fixture: ComponentFixture<MealSelectionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealSelectionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealSelectionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
