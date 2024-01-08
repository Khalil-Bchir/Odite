import { CompanyRepresentaion } from "./company-representaion";
import { QuestionRepresentaion } from "./question-representation";
import { UserRepresentaion } from "./user-representaion";

export interface Answer {
  question: QuestionRepresentaion;
  answer: string;
}

export interface AuditRepresentaion {
  auditSheetId: string;
  user: UserRepresentaion;
  companySheet: CompanyRepresentaion;
  answers: Answer[];
}
