export interface Session {
  _id: string;
  title?: string;
  sessionTitle?: string;
  subject: string;
  description?: string;
  sessionDescription?: string;
  price?: number;
  fee?: number;
  registrationFee?: number;
  duration?: string;
  sessionDuration?: string;
  date?: string;
  time?: string;
  registrationStart?: string;
  registrationStartDate?: string;
  registrationEnd?: string;
  registrationEndDate?: string;
  classStart?: string;
  classStartDate?: string;
  classEnd?: string;
  classEndDate?: string;
  rating?: number;
  averageRating?: number;
  reviews?: Array<
    string | { text?: string; rating?: number; comment?: string }
  >;
  tutor?: {
    _id?: string;
    name: string;
    email?: string;
  };
  tutorId?: {
    _id?: string;
    name: string;
    email?: string;
  };
  tutorName?: string;
  tutorEmail?: string;
}