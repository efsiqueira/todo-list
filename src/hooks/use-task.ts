import useLocalStorage from "use-local-storage"
import { TASKS_KEY, TaskState, type Task } from "../models/task"
import { delay } from "../helpers/utils"
import { useState } from "react"
import type { DropResult } from "@hello-pangea/dnd"

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

  const reorder: <T>(list: T[], startIndex: number, endIndex: number) => T[] = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = reorder(tasks, result.source.index, result.destination.index)

    setTasks(items)
  }

  return {
    onDragEnd,
    updateTask,
    deleteTask,
    prepareTask,
    isUpdatingTask,
    isDeletingTask,
    updateTaskStatus
  }
}