import useLocalStorage from "use-local-storage"
import { TASKS_KEY, TaskState, type Task } from "../models/task"
import { delay } from "../helpers/utils"
import { useState } from "react"

export const useTask = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(TASKS_KEY, [])
  const [isUpdatingTask, setIsUpdatingTask] = useState<boolean>(false)
  const [isDeletingTask, setIsDeletingTask] = useState<boolean>(false)

  const prepareTask = () => {
    setTasks([...tasks, {
      id: Math.random().toString(36).substring(2, 9),
      title: "",
      state: TaskState.Creating
    }])
  }

  const updateTask = async (id: string, payload: { title: Task["title"] }) => {
    setIsUpdatingTask(true)

    await delay(1000)

    setTasks(
      tasks.map((task) => task.id === id ? {
        ...task, state: TaskState.Created, ...payload
      } : task)
    )

    setIsUpdatingTask(false)
  }

  const updateTaskStatus = (id: string, concluded: boolean) => {
    setTasks(
      tasks.map((task) => task.id === id ? { ...task, concluded } : task)
    )
  }

  const deleteTask = async (id: string) => {
    setIsDeletingTask(true)

    await delay(1000)

    setTasks(
      tasks.filter((task) => task.id !== id)
    )

    setIsDeletingTask(false)
  }

  return {
    updateTask,
    deleteTask,
    prepareTask,
    isUpdatingTask,
    isDeletingTask,
    updateTaskStatus
  }
}