import React, { useState } from "react"
import { ButtonIcon } from "../components/button-icon"
import { Card } from "../components/card"
import { InputCheckbox } from "../components/input-checkbox"
import { Text } from "../components/text"
import { InputText } from "../components/input-text"
import TrashIcon from "../assets/icons/trash.svg?react"
import PencilIcon from "../assets/icons/pencil.svg?react"
import XIcon from "../assets/icons/x.svg?react"
import CheckIcon from "../assets/icons/check.svg?react"
import { TaskState, type Task } from "../models/task"
import { cx } from "class-variance-authority"
import { useTask } from "../hooks/use-task"
import { Skeleton } from "../components/skeleton"

interface TaskItemProps {
  task: Task,
  loading?: boolean
}

export const TaskItem = ({ task, loading }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState<boolean>(task?.state === TaskState.Creating)
  const [taskTitle, setTaskTitle] = useState<string>(task.title || "")
  const { updateTask, deleteTask, isUpdatingTask, isDeletingTask, updateTaskStatus } = useTask()

  const handleEditTask = () => {
    setIsEditing(true)
  }

  const handleCancelEditTask = () => {
    if (task.state === TaskState.Creating) {
      deleteTask(task.id)
    }

    setIsEditing(false)
  }

  const handleChangeTaskTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.target.value || "")
  }

  const handleSaveTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await updateTask(task.id, { title: taskTitle })

    setIsEditing(false)
  }

  const handleChangeTaskStatus = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked

    updateTaskStatus(task.id, checked)
  }

  const handleDeleteTask = async () => {
    await deleteTask(task.id)
  }

  return (
    <Card size="md" >
      {!isEditing ? (
        <div className="flex items-center gap-4">
          <InputCheckbox
            checked={task?.concluded}
            onChange={handleChangeTaskStatus}
            loading={loading}
          />
          {!loading ? <Text
            className={cx("flex-1", {
              "line-through": task?.concluded
            })}
          >
            {task?.title}
          </Text> : <Skeleton className="flex-1 h-6" />
          }
          <div className="flex gap-1">
            <ButtonIcon
              icon={TrashIcon}
              loading={loading}
              variant="tertiary"
              handling={isDeletingTask}
              onClick={handleDeleteTask}
            />
            <ButtonIcon
              icon={PencilIcon}
              loading={loading}
              variant="tertiary"
              onClick={handleEditTask}
            />
          </div>
        </div>
      ) : (
        <form onSubmit={handleSaveTask} className="flex items-center gap-4">
          <InputText
            required
            autoFocus
            value={taskTitle}
            className="flex-1"
            onChange={handleChangeTaskTitle}
          />
          <div className="flex gap-1">
            <ButtonIcon
              type="button"
              icon={XIcon}
              variant="secondary"
              onClick={handleCancelEditTask}
            />
            <ButtonIcon
              type="submit"
              icon={CheckIcon}
              variant="primary"
              handling={isUpdatingTask}
            />
          </div>
        </form>
      )}
    </Card>
  )
}
