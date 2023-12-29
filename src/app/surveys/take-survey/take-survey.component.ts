import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/model/survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-take-survey',
  templateUrl: './take-survey.component.html',
  styleUrls: ['./take-survey.component.scss'],
})
export class TakeSurveyComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: SurveyService) {}
  survey!: Survey | null;

  ngOnInit(): void {
    this.survey = this.service.getSurveyDetails(
      this.route.snapshot.params['id']
    );
  }
}
