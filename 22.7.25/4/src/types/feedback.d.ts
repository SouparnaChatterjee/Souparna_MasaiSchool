export enum Rating {
  Excellent = 5,
  Good = 4,
  Average = 3,
  Poor = 2,
  Terrible = 1,
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  visitDate: string;
  rating: Rating;
  comments: string;
}
