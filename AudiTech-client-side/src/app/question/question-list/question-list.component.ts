import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/api/questions/questions.service';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
})
export class QuestionListComponent implements OnInit {
  questions: any[] = [];
  selectedQuestionID: string | undefined;
  isChoicesCollapsed: { [key: string]: boolean } = {};
  updatedQuestionText: string = '';
  @Output() updateQuestionClicked: EventEmitter<string> = new EventEmitter<string>();


  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    public sharedService: SharedService
  ) { }

  ngOnInit(): void {
    this.sharedService.selectedHeadingID$.subscribe((headingID) => {
      console.log('Retrieved HeadingID:', headingID);
      this.loadQuestions(headingID);
    });
  }

  loadQuestions(headingId: string | null): void {
    const effectiveHeadingId: string = headingId || '';

    this.questionService.getQuestionsByHeading(effectiveHeadingId).subscribe(
      (questions) => {
        this.questions = questions;

        // Initialize isChoicesCollapsed object based on the question IDs
        this.questions.forEach((question, index) => {
          this.isChoicesCollapsed[index] = true;
        });

        // Log the initial state of collapse
        console.log('Initial Collapse State:', this.isChoicesCollapsed);

        console.log(questions);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onQuestionDataLoaded(questionData: any) {
    const index = this.questions.findIndex((q) => q.questionID === questionData.questionID);

    if (index !== -1) {
      this.questions[index] = questionData;
    } else {
      this.questions.push(questionData);
      this.isChoicesCollapsed[questionData.questionID] = true;
    }
  }

  onUpdateClick(questionID: string) {
    this.selectedQuestionID = questionID;
    this.sharedService.setSelectedQuestionID(questionID); // Save the questionID in the shared service
    this.isChoicesCollapsed[questionID] = !this.isChoicesCollapsed[questionID];
    localStorage.setItem(`collapseState_${questionID}`, JSON.stringify(this.isChoicesCollapsed[questionID]));

    // Emit the selectedQuestionID to the parent component or service
    this.updateQuestionClicked.emit(questionID);

    // Log the selectedQuestionID
    console.log('Selected Question ID:', this.selectedQuestionID);
  }
}

