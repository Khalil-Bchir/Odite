export interface UserRepresentaion {
  userId: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  userType: 'AD';
  file?: string; // Change the type to string
}
