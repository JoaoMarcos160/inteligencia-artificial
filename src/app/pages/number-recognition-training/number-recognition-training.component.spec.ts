import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberRecognitionTrainingComponent } from './number-recognition-training.component';

describe('TrainingComponent', () => {
  let component: NumberRecognitionTrainingComponent;
  let fixture: ComponentFixture<NumberRecognitionTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NumberRecognitionTrainingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberRecognitionTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
