import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from '../shared/common.service';
import { Question } from './models/question.model';
import { QuestionsService } from './services/questions.service';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {

  questionsList: Question[];
  filteredQuestionsList: Question[];

  searchSub: Subscription;
  initialSubscribed = false;

  constructor(
    private questionService: QuestionsService,
    private router: Router,
    private route: ActivatedRoute,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.questionsList = this.questionService.getQuestions();
    this.setFilteredQuestionsList('');
    this.searchSub = this.commonService.searchQuery.pipe(debounceTime(300)).subscribe((query) => {
      if (this.initialSubscribed) {
        this.setFilteredQuestionsList(query);
      }
      this.initialSubscribed = true;
    });
  }

  setFilteredQuestionsList(query: string) {
    this.filteredQuestionsList = [];

    if (!query) {
      this.filteredQuestionsList = this.questionsList.slice();
      return;
    }

    query = query.trim().toLowerCase();

    for (let question of this.questionsList) {
      if (question.question_text.toLowerCase().includes(query)) {
        this.filteredQuestionsList.push(question);
      }
    }
  }

  handleQuestionClick(id: number) {
    this.router.navigate(['question-details', id], {relativeTo: this.route});
  }

  ngOnDestroy() {
    if (this.searchSub) {
      this.searchSub.unsubscribe();
    }
  }

}
