import { Step } from "../types/maestro"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { formatYaml } from "../utils/yamlFormatter"

interface FlowPreviewProps {
  steps: Step[]
}

export function FlowPreview({ steps }: FlowPreviewProps) {
  const yamlContent = formatYaml(steps)

  return (
    <div className="p-6 h-full overflow-y-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">YAML Preview</CardTitle>
        </CardHeader>
        <CardContent>
          {steps.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <p>No steps added yet</p>
              <p className="text-sm mt-2">Add steps from the left panel to see the generated YAML</p>
            </div>
          ) : (
            <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
              <code>{yamlContent}</code>
            </pre>
          )}
        </CardContent>
      </Card>
    </div>
  )
}