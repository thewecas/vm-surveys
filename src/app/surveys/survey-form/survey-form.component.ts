import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss'],
})
export class SurveyFormComponent implements OnInit {
  title = 'Create Survey';
  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<SurveyFormComponent>,
    private service: SurveyService
  ) {}
  surveyForm!: FormGroup;

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  handleCreateSurvey() {
    this.service.postSurvey({
      id: crypto.randomUUID(),
      name: this.surveyForm.get('name')?.value,
      description: this.surveyForm.get('description')?.value,
      questions: [],
      createdOn: new Date(),
    });
    this.dialogRef.close('hi');
  }
}
