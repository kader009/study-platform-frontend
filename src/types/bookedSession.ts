export interface BookedSession {
  _id: string;
  sessionId: string;
  studentEmail: string;
  tutorEmail: string;
  registrationFee: string;
  status: string;
  bookedAt: string;
}

export interface SessionInfo {
  _id: string;
  sessionTitle: string;
}
