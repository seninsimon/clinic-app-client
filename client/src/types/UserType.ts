export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
  gender: "male" | "female";
  isVerified: boolean;
  googleIds?: string | null;
  isBlocked: boolean;
  googleVerified?: boolean;
  role: "admin" | "patient" | "doctor";
  profilePicture: string;
}