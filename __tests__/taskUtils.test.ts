import { Task } from "../src/store/types";
import { filterTasksByPriority } from "../src/utils/taskUtils";


const tasks: Task[] = [
    { id: '1', title: 'Task 1', dueDate: '2025-11-08', priority: 'high', completed: false },
    { id: '2', title: 'Task 2', dueDate: '2025-11-09', priority: 'medium', completed: true },
    { id: '3', title: 'Task 3', dueDate: '2025-11-10', priority: 'low', completed: false },
];

describe('Task Utils', () => {
    test('filterTasksByPriority returns correct tasks', () => {
        expect(filterTasksByPriority(tasks, 'high')).toEqual([tasks[0]]);
        expect(filterTasksByPriority(tasks, 'medium')).toEqual([tasks[1]]);
        expect(filterTasksByPriority(tasks, 'all')).toEqual(tasks);
    });
});
