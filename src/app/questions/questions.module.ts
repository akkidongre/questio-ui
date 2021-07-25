import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuestionsRoutingModule } from './questions-routing.module';

import { SharedModule } from '../shared/shared.module';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';

import { QuestionsComponent } from './questions.component';
import { QuestionComponent } from './question/question.component';
import { QuestionDetailsComponent } from './question-details/question-details.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    QuestionsComponent,
    QuestionComponent,
    QuestionDetailsComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuestionsRoutingModule,
    SharedModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule
  ]
})
export class QuestionsModule { }
