import { useState } from "react"
import { ButtonIcon } from "../components/button-icon"
import { Card } from "../components/card"
import { InputCheckbox } from "../components/input-checkbox"
import { Text } from "../components/text"
import { InputText } from "../components/input-text"
import TrashIcon from "../assets/icons/trash.svg?react"
import PencilIcon from "../assets/icons/pencil.svg?react"
import XIcon from "../assets/icons/x.svg?react"
import CheckIcon from "../assets/icons/check.svg?react"

export const TaskItem = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isChecked, setIsChecked] = useState<boolean>(false)

  const handleEditTask = () => {
    setIsEditing(true)
  }

  const handleCancelEditTask = () => {
    setIsEditing(false)
  }

  const handleCheckTask = () => {
    setIsChecked(!isChecked)
  }

  return (
    <Card size="md" className="flex items-center gap-4">
      {!isEditing ? (
        <>
          <InputCheckbox onClick={handleCheckTask} />
          <Text className={isChecked ? "flex-1 line-through" : "flex-1"}>🛒 Fazer compras da semana</Text>
          <div className="flex gap-1">
            <ButtonIcon icon={TrashIcon} variant="tertiary" />
            <ButtonIcon icon={PencilIcon} variant="tertiary" onClick={handleEditTask} />
          </div>
        </>
      ) : (
        <>
          <InputText className="flex-1" />
          <div className="flex gap-1">
            <ButtonIcon icon={XIcon} variant="secondary" onClick={handleCancelEditTask} />
            <ButtonIcon icon={CheckIcon} variant="primary" />
          </div>
        </>
      )}
    </Card>
  )
}