import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plan, PlanState } from './types';

const BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

export const usePlanStore = create<PlanState>()(
    persist(
        (set, get) => ({
            plan: null,
            loading: false,
            error: null,

            createPlan: async (goal, horizon) => {
                try {
                    set({ loading: true, error: null });
                    const response = await fetch(`${BASE_URL}/plan`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ goal, horizon }),
                    });
                    if (!response.ok) {
                        const err = await response.json().catch(() => ({}));
                        throw new Error(err.error ?? 'Failed to create plan');
                    }
                    const data: Plan = await response.json();
                    set({ plan: data });
                } catch (err: any) {
                    set({ error: err.message });
                } finally {
                    set({ loading: false });
                }
            },

            toggleTaskCompletion: (taskId) => {
                const { plan } = get();
                if (!plan) return;
                const updatedTasks = plan.tasks.map((task) =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                );
                set({ plan: { ...plan, tasks: updatedTasks } });
            },
        }),
        {
            name: 'plan-storage',
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);
