export interface Userprops {
  _id: string;
  no: number;
  name: string;
  email: string;
  role: string;
  photoUrl?: string;
  // optional created timestamp fields (some backends use different names)
  createdAt?: string;
  created_at?: string;
  created?: string;
  createdAtTimestamp?: number;
}
