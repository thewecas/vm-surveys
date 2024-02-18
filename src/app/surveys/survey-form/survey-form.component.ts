import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Survey } from 'src/app/model/survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
})
export class SurveyFormComponent implements OnInit {
  title = 'Create Survey';
  surveyData!: Survey | null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SurveyFormComponent>,
    private service: SurveyService,
    @Inject(MAT_DIALOG_DATA) public surveyId: string
  ) {}
  surveyForm!: FormGroup;

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
    if (this.surveyId) {
      this.initializeForm();
      this.title = 'Edit Survey';
    }
  }

  initializeForm() {
    this.surveyData = this.service.getSurveyDetails(this.surveyId);
    this.surveyForm.setValue({
      name: this.surveyData?.name,
      description: this.surveyData?.description,
    });
  }

  handleCreateSurvey() {
    this.service.postSurvey(
      {
        id: this.surveyId ?? crypto.randomUUID(),
        name: this.surveyForm.get('name')?.value,
        description: this.surveyForm.get('description')?.value,
        questions: [],
        createdOn: new Date(),
      },
      this.surveyId
    );
    this.dialogRef.close('hi');
  }
}
