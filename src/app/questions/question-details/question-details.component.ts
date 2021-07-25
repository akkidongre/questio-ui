import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/shared/common.service';
import { Question } from '../models/question.model';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})
export class QuestionDetailsComponent implements OnInit, OnDestroy {

  paramSub: Subscription;

  question: Question;
  questionId: number;

  constructor(
    private questionService: QuestionsService,
    private route: ActivatedRoute,
    private router: Router,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe((parameters: Params) => {
      this.questionId = +parameters.id;
      this.getQuestionDetails();
    });
  }

  getQuestionDetails() {
    const questionData = this.questionService.getQuestionById(this.questionId);
    if (questionData) {
      this.question = questionData;
    } else {
      this.commonService.openSnackbar("Invalid question", "Okay");
      this.router.navigate(['/questions']);
    }
  }

  goBack() {
    this.router.navigate(['/questions']);
  }

  ngOnDestroy() {
    if (this.paramSub) {
      this.paramSub.unsubscribe();
    }
  }

}
