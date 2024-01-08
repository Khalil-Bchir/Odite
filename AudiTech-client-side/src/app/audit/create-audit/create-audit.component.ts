import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuditService } from '../../services/api/audit/audit.service';
import { QuestionService } from '../../services/api/questions/questions.service';
import { HeadingService } from '../../services/api/heading/heading.service';
import { SharedService } from '../../services/shared/shared.service';
import { CompanyService } from '../../services/api/company/company.service';
import { ActivatedRoute } from '@angular/router';
import { CompanyRepresentaion } from '../../services/api/models/company-representaion';
import { HeadingRepresentaion } from '../../services/api/models/heading-representation';
import { QuestionRepresentaion } from '../../services/api/models/question-representation';
import { Answer, AuditRepresentaion } from '../../services/api/models/audit-representation';


@Component({
  selector: 'app-create-audit',
  templateUrl: './create-audit.component.html',
  styleUrls: ['./create-audit.component.css']
})
export class CreateAuditComponent implements OnInit {
  headings: HeadingRepresentaion[] = [];
  selectedHeading: HeadingRepresentaion[] = [];
  companies: CompanyRepresentaion[] = [];
  questions: QuestionRepresentaion[] = [];
  selectedQuestions: QuestionRepresentaion[] = [];
  answers: { [questionId: string]: string } = {};
  userID: string | null = null;
  selectedCompany: CompanyRepresentaion[] = [];
  savedAuditResults: AuditRepresentaion[] = [];
  auditId: string | null = null;

  constructor(
    private auditService: AuditService,
    private route: ActivatedRoute,
    private questionService: QuestionService,
    private headingService: HeadingService,
    private sharedService: SharedService,
    private companyService: CompanyService,
  ) { }

  ngOnInit(): void {
    this.getAllHeadings();
    this.getAllCompanies();
    this.userID = this.sharedService.getUserID();
  }

  getAllHeadings() {
    this.headingService.getAllHeadings().subscribe(
      (headings: HeadingRepresentaion[]) => {
        this.headings = headings;
      },
      (error) => {
        console.error('Error fetching headings:', error);
      }
    );
  }

  getAllCompanies() {
    this.companyService.getAllCompanies().subscribe(
      (companies: CompanyRepresentaion[]) => {
        this.companies = companies;
        console.log('Companies:', companies);
      },
      (error) => {
        console.error('Error fetching companies:', error);
      }
    );
  }

  selectCompany(company: CompanyRepresentaion) {
    this.selectedCompany = [company];
    this.selectedHeading = [];
    this.selectedQuestions = [];
  }

  getQuestionsByHeading(headingId: string) {
    this.questionService.getQuestionsByHeading(headingId).subscribe(
      (questions: QuestionRepresentaion[]) => {
        this.questions = questions;
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  selectHeading(heading: HeadingRepresentaion) {
    this.selectedHeading = [heading];
    this.getQuestionsByHeading(heading.headingID);
  }

  toggleQuestionSelection(question: QuestionRepresentaion) {
    const index = this.selectedQuestions.findIndex(q => q.questionID === question.questionID);
    if (index === -1) {
      this.selectedQuestions.push(question);
    } else {
      this.selectedQuestions.splice(index, 1);
    }
    console.log('Selected Questions:', this.selectedQuestions);
  }

  saveAudit(auditForm: NgForm) {
    if (this.selectedQuestions.length === 0) {
      console.error('Please select at least one question.');
      return;
    }

    const auditData = {
      user: this.userID,
      companySheet: "CS001",
      answers: this.selectedQuestions.map(question => ({
        questionId: question.questionID,
        answer: this.answers[question.questionID],
      })),
    };

    this.auditService.createAudit(auditData).subscribe(
      (response) => {
        console.log('Audit saved successfully:', response);
      },
      (error) => {
        console.error('Error saving audit. Audit data:', auditData, 'Error:', error);
      }
    );
  }

  isSelectedCompany(company: CompanyRepresentaion): boolean {
    return this.selectedCompany.length > 0 && this.selectedCompany[0].companySheetId === company.companySheetId;
  }

  isSelectedHeading(heading: HeadingRepresentaion): boolean {
    return this.selectedHeading.length > 0 && this.selectedHeading[0].headingID === heading.headingID;
  }
}
