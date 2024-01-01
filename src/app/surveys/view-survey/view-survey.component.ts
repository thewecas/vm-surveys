import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Survey } from 'src/app/model/survey';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-view-survey',
  templateUrl: './view-survey.component.html',
  styleUrls: ['./view-survey.component.scss'],
})
export class ViewSurveyComponent implements OnInit {
  survey!: Survey | null;

  constructor(private route: ActivatedRoute, private service: SurveyService) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.survey = this.service.getSurveyDetails(Object(res).id);
    });
  }

  handleExportResponses() {
    if (this.survey) this.service.exportData(this.survey?.id);
  }
}
