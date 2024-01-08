import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/api/questions/questions.service';
import { SharedService } from '../../services/shared/shared.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css'],
})
export class QuestionDetailsComponent implements OnInit {
  @Input() questionID: string | undefined;
  @Output() tabActivated: EventEmitter<string> = new EventEmitter<string>();

  question: any;

  constructor(
    private questionService: QuestionService,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    if (this.questionID) {
      this.questionService.getQuestionById(this.questionID).subscribe(
        (question) => {
          this.question = question;
          console.log('Loaded Question Data:', this.question);

          // Emit the event when the tab is activated
          this.tabActivated.emit(this.questionID);

          // Store the current questionID in the SharedService for updates
          this.sharedService.setSelectedQuestionID(this.questionID !== undefined ? this.questionID : null);

          // Use the questionID as needed for updating the question
          console.log('QuestionID from SharedService:', this.questionID);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }
}
