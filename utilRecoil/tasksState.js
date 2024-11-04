import { atom, selector, selectorFamily } from 'recoil';

export const tasksState = atom({
  key: 'tasksState',
  default: [],
});

export const fetchTasksSelector = selector({
  key: 'fetchTasksSelector',
  get: async ({ get }) => {
    try {
      const response = await fetch('https://671891927fc4c5ff8f49fcac.mockapi.io/test');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      return [];
    }
  },
  set: ({ set }, newTasks) => {
    set(tasksState, newTasks);
  },
});

export const createTaskSelector = selectorFamily({
  key: 'createTaskSelector',
  get: (task) => async ({ get }) => {
    try {
      const response = await fetch('https://671891927fc4c5ff8f49fcac.mockapi.io/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to create task:', error);
      return null;
    }
  },
  set: (param) => ({ set, get }, newTask) => {
    if (newTask) {
      const tasks = get(tasksState);
      set(tasksState, [...tasks, newTask]);
    }
  },
});

export const updateTaskSelector = selectorFamily({
  key: 'updateTaskSelector',
  get: (task) => async ({ get }) => {
    try {
      const response = await fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to update task:', error);
      return null;
    }
  },
  set: (task) => ({ set, get }, updatedTask) => {
    if (updatedTask) {
      const tasks = get(tasksState);
      const index = tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        tasks[index] = updatedTask;
        set(tasksState, [...tasks]);
      }
    }
  },
});

export const deleteTaskSelector = selectorFamily({
  key: 'deleteTaskSelector',
  get: (taskId) => async ({ get }) => {
    try {
      const response = await fetch(`https://671891927fc4c5ff8f49fcac.mockapi.io/test/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return taskId;
    } catch (error) {
      console.error('Failed to delete task:', error);
      return null;
    }
  },
  set: (taskId) => ({ set, get }, deletedTaskId) => {
    if (deletedTaskId) {
      const tasks = get(tasksState);
      set(tasksState, tasks.filter(task => task.id !== deletedTaskId));
    }
  },
});

