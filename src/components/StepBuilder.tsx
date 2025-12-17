import { useState } from "react"
import { Step } from "../types/maestro"
import { Button } from "./ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Plus, X } from "lucide-react"
import { StepChip } from "./StepChip"

interface StepBuilderProps {
  steps: Step[]
  setSteps: (steps: Step[]) => void
}

export function StepBuilder({ steps, setSteps }: StepBuilderProps) {
  const [selectedType, setSelectedType] = useState<string>('')
  const [params, setParams] = useState<Record<string, string>>({})

  const actionTypes = [
    { value: 'tapOn', label: 'Tap on Element', category: 'Actions' },
    { value: 'inputText', label: 'Input Text', category: 'Actions' },
    { value: 'scroll', label: 'Scroll', category: 'Actions' },
    { value: 'assertVisible', label: 'Assert Visible', category: 'Assertions' },
    { value: 'assertText', label: 'Assert Text', category: 'Assertions' },
  ]

  const handleTypeChange = (type: string) => {
    setSelectedType(type)
    setParams({})
  }

  const handleParamChange = (key: string, value: string) => {
    setParams(prev => ({ ...prev, [key]: value }))
  }

  const addStep = () => {
    if (!selectedType) return

    const newStep: Step = {
      id: Date.now().toString(),
      type: selectedType as Step['type'],
      params: { ...params }
    }

    setSteps([...steps, newStep])
    setSelectedType('')
    setParams({})
  }

  const removeStep = (id: string) => {
    setSteps(steps.filter(step => step.id !== id))
  }

  const renderParamInputs = () => {
    switch (selectedType) {
      case 'tapOn':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="selector">Element Selector</Label>
              <Input
                id="selector"
                placeholder="e.g., button#login"
                value={params.selector || ''}
                onChange={(e) => handleParamChange('selector', e.target.value)}
              />
            </div>
          </div>
        )
      case 'inputText':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="selector">Element Selector</Label>
              <Input
                id="selector"
                placeholder="e.g., input#email"
                value={params.selector || ''}
                onChange={(e) => handleParamChange('selector', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="text">Text to Input</Label>
              <Input
                id="text"
                placeholder="e.g., user@example.com"
                value={params.text || ''}
                onChange={(e) => handleParamChange('text', e.target.value)}
              />
            </div>
          </div>
        )
      case 'scroll':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="direction">Direction</Label>
              <Select value={params.direction || ''} onValueChange={(value) => handleParamChange('direction', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="up">Up</SelectItem>
                  <SelectItem value="down">Down</SelectItem>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )
      case 'assertVisible':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="selector">Element Selector</Label>
              <Input
                id="selector"
                placeholder="e.g., text=Welcome"
                value={params.selector || ''}
                onChange={(e) => handleParamChange('selector', e.target.value)}
              />
            </div>
          </div>
        )
      case 'assertText':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="selector">Element Selector</Label>
              <Input
                id="selector"
                placeholder="e.g., h1.title"
                value={params.selector || ''}
                onChange={(e) => handleParamChange('selector', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="text">Expected Text</Label>
              <Input
                id="text"
                placeholder="e.g., Dashboard"
                value={params.text || ''}
                onChange={(e) => handleParamChange('text', e.target.value)}
              />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-6 h-full overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Test Step</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="actionType">Action Type</Label>
            <Select value={selectedType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select an action" />
              </SelectTrigger>
              <SelectContent>
                {actionTypes.map((action) => (
                  <SelectItem key={action.value} value={action.value}>
                    <div>
                      <div className="font-medium">{action.label}</div>
                      <div className="text-xs text-slate-500">{action.category}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedType && renderParamInputs()}

          {selectedType && (
            <Button onClick={addStep} className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>
          )}
        </CardContent>
      </Card>

      {steps.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Test Steps ({steps.length})</h3>
          <div className="space-y-2">
            {steps.map((step, index) => (
              <StepChip
                key={step.id}
                step={step}
                index={index}
                onRemove={() => removeStep(step.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}