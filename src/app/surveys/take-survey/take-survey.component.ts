import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { QuestionResponse } from 'src/app/model/response';
import { Survey } from 'src/app/model/survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss'],
})
export class TakeSurveyComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private service: SurveyService,
    private fb: FormBuilder
  ) {}
  survey!: Survey | null;
  surveyResponse!: FormGroup;

  ngOnInit(): void {
    this.survey = this.service.getSurveyDetails(
      this.route.snapshot.params['id']
    );
    this.initializeForm();
  }

  initializeForm() {
    this.surveyResponse = this.fb.group({
      userEmail: this.fb.control('', [Validators.required, Validators.email]),
    });

    this.survey?.questions.forEach((question) => {
      if (question.answerType == 'multiple-choice') {
        this.surveyResponse.addControl(
          question.id,
          this.fb.array([], Validators.required)
        );
      } else
        this.surveyResponse.addControl(
          question.id,
          this.fb.control('', Validators.required)
        );
    });
  }

  addControlToArray(
    controlName: string,
    value: string,
    event: MatCheckboxChange
  ) {
    this.surveyResponse.get(controlName)?.markAsTouched();
    if (event.checked) {
      const control = this.fb.control(value);
      (<FormArray>this.surveyResponse.get(controlName)).push(control);
    } else {
      const index = (<FormArray>(
        this.surveyResponse.get(controlName)
      )).controls.findIndex((control) => control.value == value);
      (<FormArray>this.surveyResponse.get(controlName)).removeAt(index);
    }
  }

  handleSaveResponse() {
    const responseArray: QuestionResponse[] = [];
    Object.entries(this.surveyResponse.controls).forEach(([id, control]) => {
      responseArray.push({
        questionId: id,
        answer: control.value,
      });
    });
    if (this.survey?.id)
      this.service.saveResponse(
        this.survey?.id,
        this.surveyResponse.get('userEmail')?.value,
        responseArray
      );
    // console.log(this.surveyResponse.controls);
    // this.service.saveResponse(this.survey?.id,)
  }
}
