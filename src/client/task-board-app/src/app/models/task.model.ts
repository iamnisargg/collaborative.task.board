export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: string;
}

export interface BoardColumn {
  id: string;
  name: string;
  tasks: Task[];
}