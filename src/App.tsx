import { Text } from "./components/text";
import { Icon } from "./components/icon";
import TrashIcon from "./assets/icons/trash.svg?react"
import CheckIcon from "./assets/icons/check.svg?react"
import PencilIcon from "./assets/icons/pencil.svg?react"
import PlusIcon from "./assets/icons/plus.svg?react"
import SpinnerIcon from "./assets/icons/spinner.svg?react"
import XIcon from "./assets/icons/x.svg?react"
import { Badge } from "./components/badge";
import { Button } from "./components/button";
import { ButtonIcon } from "./components/button-icon";
import { InputText } from "./components/input-text";
import { InputCheckbox } from "./components/input-checkbox";
import { Card } from "./components/card";
import { Container } from "./components/container";
import { Skeleton } from "./components/skeleton";

export function App() {
  return (
    <Container>
      <div className="grid gap-10">
        <div className="flex flex-col gap-2">
          <Text variant="body-md" className="text-pink-base">Hello world!</Text>
          <Text variant="body-md-bold" className="text-gray-400">Hello world!</Text>
          <Text variant="body-sm-bold" className="text-green-dark">Hello world!</Text>
        </div>

        <div className="flex gap-1">
          <Icon svg={TrashIcon} className="fill-pink-base" animate />
          <Icon svg={CheckIcon} className="fill-pink-base" animate />
          <Icon svg={PencilIcon} className="fill-pink-base" animate />
          <Icon svg={PlusIcon} className="fill-pink-base" animate />
          <Icon svg={SpinnerIcon} className="fill-pink-base" animate />
          <Icon svg={XIcon} className="fill-pink-base" animate />
        </div>

        <div className="flex gap-1">
          <Badge variant="primary">2 de 5</Badge>
          <Badge variant="secondary">5</Badge>

          <Badge loading>5</Badge>
        </div>

        <div>
          <Button icon={PlusIcon}>Nova tarefa</Button>
        </div>

        <div className="flex gap-1">
          <ButtonIcon variant="primary" icon={TrashIcon} />
          <ButtonIcon variant="secondary" icon={TrashIcon} />
          <ButtonIcon variant="tertiary" icon={TrashIcon} />

          <ButtonIcon icon={TrashIcon} loading />
        </div>

        <div>
          <InputText />
        </div>

        <div>
          <InputCheckbox />

          <InputCheckbox loading />
        </div>

        <div>
          <Card size="md">Olá mundo</Card>
        </div>

        <div className="space-y-2">
          <Skeleton className="h-6" />
          <Skeleton className="h-8" />
          <Skeleton className="h-10 w-96" />
        </div>
      </div>
    </Container>
  )
}
