import { Button } from "../components/button"
import PlusIcon from "../assets/icons/plus.svg?react"
import { TaskItem } from "./task-item"
import { useTasks } from "../hooks/use-tasks"
import { useTask } from "../hooks/use-task"
import { TaskState, type Task } from "../models/task"
import { DragDropContext, Droppable } from '@hello-pangea/dnd'
import type { DropResult } from '@hello-pangea/dnd'

export const TasksList = () => {
  const { tasks, isLoadingTasks } = useTasks()
  const { onDragEnd, prepareTask } = useTask()

  const handleNewTask = () => {
    prepareTask()
  }

  const handleDragEnd = (result: DropResult) => {
    onDragEnd(result)
  }

  return (
    <>
      <section>
        <Button
          icon={PlusIcon}
          className="w-full"
          onClick={handleNewTask}
          disabled={tasks.some((task) => task.state === TaskState.Creating) || isLoadingTasks}
        >
          Nova tarefa
        </Button>
      </section>
      <section className="space-y-2">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="tasks" type="list" direction="vertical">
            {(provided) => (
              <div
                className="flex flex-col gap-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {!isLoadingTasks ? tasks.map((task, index) => {
                  return (
                    <TaskItem key={task.id} task={task} index={index} />
                  )
                }) : (
                  <>
                    <TaskItem task={{} as Task} loading index={0} />
                    <TaskItem task={{} as Task} loading index={1} />
                    <TaskItem task={{} as Task} loading index={2} />
                  </>
                )}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </>
  )
}