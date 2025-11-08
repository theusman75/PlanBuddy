export type Priority = 'low' | 'medium' | 'high';

export type Task = {
    id: string;
    title: string;
    dueDate: string; // YYYY-MM-DD
    priority: Priority;
    notes?: string;
    emoji?: string;
    completed?: boolean;
};

export type Plan = { tasks: Task[] };

export interface PlanState {
    plan: Plan | null;
    loading: boolean;
    error: string | null;
    createPlan: (goal: string, horizon: 'today' | 'week') => Promise<void>;
    toggleTaskCompletion: (taskId: string) => void;
}