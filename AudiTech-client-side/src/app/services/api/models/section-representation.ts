import { HeadingRepresentaion } from "./heading-representation";

export interface SectionRepresentaion{
  sectionID: string;
  heading: HeadingRepresentaion;
  name: string;
  description?: string;
}
