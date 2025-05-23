// types/doctor.ts
export interface IDoctor {
  name: string;
  email: string;
  password: string;
  phone: string;
  specialisation: string;
  experience: number;
  fee: number;
  status?: "Approved" | "Rejected" | "Pending";
  isBlocked?: boolean;
  googleVerified?: boolean;
  additionalInfo?: string;
  profilePicture?: string;
  medicalLicence?: string;
}
