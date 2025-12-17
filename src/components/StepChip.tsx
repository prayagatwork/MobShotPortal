import { Step } from "../types/maestro"
import { Card, CardContent } from "./ui/card"
import { X } from "lucide-react"
import { Button } from "./ui/button"

interface StepChipProps {
  step: Step
  index: number
  onRemove: () => void
}

export function StepChip({ step, index, onRemove }: StepChipProps) {
  const getStepDescription = () => {
    switch (step.type) {
      case 'tapOn':
        return `Tap on "${step.params.selector}"`
      case 'inputText':
        return `Input "${step.params.text}" into "${step.params.selector}"`
      case 'scroll':
        return `Scroll ${step.params.direction}`
      case 'assertVisible':
        return `Assert "${step.params.selector}" is visible`
      case 'assertText':
        return `Assert "${step.params.selector}" contains "${step.params.text}"`
      default:
        return step.type
    }
  }

  const getStepColor = () => {
    if (step.type.startsWith('assert')) return 'bg-green-50 border-green-200'
    return 'bg-blue-50 border-blue-200'
  }

  return (
    <Card className={`${getStepColor()} border`}>
      <CardContent className="p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono bg-slate-100 px-2 py-1 rounded">
            {index + 1}
          </span>
          <span className="text-sm">{getStepDescription()}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onRemove}
          className="text-slate-500 hover:text-red-600"
        >
          <X className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  )
}