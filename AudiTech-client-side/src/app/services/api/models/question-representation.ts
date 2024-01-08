import { HeadingRepresentaion } from "./heading-representation";
import { SectionRepresentaion } from "./section-representation";

export interface QuestionRepresentaion {
  questionID: string;
  heading: HeadingRepresentaion;
  section?: SectionRepresentaion;
  type: 'multiple' | 'text';
  questionText: string;
  choices?: string[]; 
  comment: string;
}
