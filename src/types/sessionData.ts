export interface SessionData {
  _id: string;
  sessionTitle: string;
  sessionDescription: string;
  tutorName: string;
  tutorEmail: string;
  averageRating?: number;
  registrationStartDate: string;
  registrationEndDate: string;
  classStartDate: string;
  classEndDate: string;
  sessionDuration: number;
  registrationFee: string;
  reviews: string[];
}