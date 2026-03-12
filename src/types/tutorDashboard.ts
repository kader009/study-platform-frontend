import { Session } from './routeSession';

export type StudentItem = {
  name: string;
  email: string;
  image?: string;
  totalBookings?: number;
  bookedSessionIds?: string[];
};

export type CourseItem = {
  id: string;
  title: string;
  students: number;
};

export type SessionWithStart = Session & {
  start: Date | null;
  hasTime?: boolean;
};

export type SessionItem = Session;
