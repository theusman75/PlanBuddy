import { Priority, Task } from "../store/types";


export function filterTasksByPriority(tasks: Task[], priority: Priority | 'all'): Task[] {
    if (priority === 'all') return tasks;
    return tasks.filter(task => task.priority === priority);
}
