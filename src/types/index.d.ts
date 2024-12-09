export interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  deadline: string;
  completed: boolean;
}
