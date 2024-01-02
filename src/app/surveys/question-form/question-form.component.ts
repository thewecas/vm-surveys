import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SurveyQuestion } from 'src/app/model/survey-question';
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
  questionData!: SurveyQuestion | null;

  constructor(
    private fb: FormBuilder,
    private service: SurveyService,
    private _dialogRef: MatDialogRef<QuestionFormComponent>,
    @Inject(MAT_DIALOG_DATA) public obj: any
  ) {}

  ngOnInit(): void {
    this.questionForm = this.fb.group({
      question: ['', [Validators.required, Validators.maxLength(150)]],
      instrctions: ['', Validators.maxLength(250)],
      answerType: ['', Validators.required],
    });

    if (this.obj.questionId) {
      this.initializeForm();
      this.title = 'Edit Question';
    }
    if (this.obj.readOnly) this.title = 'View Question';

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
    this.questionForm.addControl('options', this.fb.array([]));
    if (this.getOptionsArray().length == 0) this.addOption();
  }
  removeOptionsControl() {
    this.questionForm.removeControl('options');
  }

  getOptionsArray() {
    return (<FormArray>this.questionForm.get('options')).controls;
  }

  addOption(value = '') {
    const control = this.fb.control(value, [Validators.required]);
    (<FormArray>this.questionForm.get('options')).push(control);
  }
  removeOption(index: number) {
    (<FormArray>this.questionForm.get('options')).removeAt(index);
  }

  initializeForm() {
    this.removeOptionsControl();

    this.questionData = this.service.getQuestionData(
      this.obj.surveyId,
      this.obj.questionId
    );

    this.questionForm.patchValue({
      question: this.questionData?.question,
      instrctions: this.questionData?.instrctions,
      answerType: this.questionData?.answerType,
    });

    if (this.questionData?.answerType !== 'free-text') {
      this.addOptionsControl();
      this.removeOption(0);
      this.isOptionsAvailable = true;
      this.questionData?.options?.forEach((option) => {
        this.addOption(option);
      });
    }
  }

  enableEdit() {
    this.obj.readOnly = false;
    this.title = 'Edit Question';
  }

  handleCreateQuestion() {
    this.service.addQuestionToSurvey(
      this.obj.surveyId,
      {
        id: this.obj.questionId ?? crypto.randomUUID(),
        question: this.questionForm.get('question')?.value,
        answerType: this.questionForm.get('answerType')?.value,
        instrctions: this.questionForm.get('instrctions')?.value ?? null,
        options: this.questionForm.get('options')?.value ?? null,
      },
      this.obj.questionId
    );

    this._dialogRef.close();
  }
}
