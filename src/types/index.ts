export interface TodoItem {
  id: string;
  title: string;
  details: string;
  dueDate: string;
  completed: boolean;
  }
  
  export type TodoState = {
    todos: TodoItem[];
  };

  export type Task = {
    id: string;
    title: string;
    details: string;
    dueDate: string;
    completed: boolean;
  };

  export type GroupedTasks = {
    dueDate: string;
    data: Task[];
  };