export enum Priority {
  Low = 'Low',
  Medium = 'Medium',
  High = 'High'
}

export interface Task {
  id: number;
  description: string;
  priority: Priority;
  completed: boolean;
}
