import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss'],
})
export class QuestionFormComponent implements OnInit {
  title = 'Add Question';
  questionForm!: FormGroup;
  isOptionsAvailable: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: SurveyService,
    private _dialogRef: MatDialogRef<QuestionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public surveyId: string
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.maxLength(150)]],
      instrctions: ['', Validators.maxLength(250)],
      answerType: ['', Validators.required],
    });

    this.questionForm.get('answerType')?.valueChanges.subscribe((value) => {
      if (value == 'free-text') {
        this.isOptionsAvailable = false;
        this.removeOptionsControl();
      } else {
        this.isOptionsAvailable = true;
        this.addOptionsControl();
      }
    });
  }
  addOptionsControl() {
    this.questionForm.addControl(
      'options',
      this.fb.array([this.fb.control('', [Validators.required])])
    );
  }
  removeOptionsControl() {
    this.questionForm.removeControl('options');
  }

  getOptionsArray() {
    return (<FormArray>this.questionForm.get('options')).controls;
  }

  addOption() {
    const control = this.fb.control('', [Validators.required]);
    (<FormArray>this.questionForm.get('options')).push(control);
  }
  removeOption(index: number) {
    (<FormArray>this.questionForm.get('options')).removeAt(index);
  }

  handleCreateQuestion() {
    this.service.addQuestionToSurvey(this.surveyId, {
      id: crypto.randomUUID(),
      question: this.questionForm.get('question')?.value,
      answerType: this.questionForm.get('answerType')?.value,
      instrctions: this.questionForm.get('instrctions')?.value ?? null,
      options: this.questionForm.get('options')?.value ?? null,
    });

    this._dialogRef.close();
  }
}
