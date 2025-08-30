import { useEffect, useState } from "react"
import useLocalStorage from "use-local-storage"
import { TASKS_KEY, TaskState, type Task } from "../models/task"
import { delay } from "../helpers/utils"

export const useTasks = () => {
  const [tasksData] = useLocalStorage<Task[]>(TASKS_KEY, [])
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoadingTasks, setIsLoadingTasks] = useState<boolean>(true)

  const fetchTasks = async () => {
    if (isLoadingTasks) {
      await delay(2000)
    }

    setIsLoadingTasks(false)

    setTasks(tasksData)
  }

  useEffect(() => {
    fetchTasks()
  }, [tasksData])

  return {
    tasks,
    isLoadingTasks,
    concludedTasksCount: tasks.filter((task) => task.concluded).length,
    createdTasksCount: tasks.filter((task) => task.state === TaskState.Created).length,
  }
}