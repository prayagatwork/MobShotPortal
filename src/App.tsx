import { useState } from "react"
import { StepBuilder } from "./components/StepBuilder"
import { FlowPreview } from "./components/FlowPreview"
import { ExportModal } from "./components/ExportModal"
import { Step } from "./types/maestro"
import { Button } from "./components/ui/button"
import { Play, Download } from "lucide-react"

export default function App() {
  const [steps, setSteps] = useState<Step[]>([])
  const [showExportModal, setShowExportModal] = useState(false)
  const [mockResult, setMockResult] = useState<string | null>(null)

  const handleRunTest = () => {
    // Simulate test execution
    setTimeout(() => {
      setMockResult("Test executed successfully. JUnit report generated.")
      setTimeout(() => setMockResult(null), 3000)
    }, 1000)
  }

  const handleExport = () => {
    setShowExportModal(true)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Maestro Test Builder</h1>
            <p className="text-sm text-slate-600 mt-1">Visually build mobile automation tests</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={handleRunTest} className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Run Test
            </Button>
            <Button onClick={handleExport} variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export YAML
            </Button>
          </div>
        </div>
      </header>

      <main className="flex h-[calc(100vh-73px)]">
        <div className="w-full lg:w-1/2 border-r border-slate-200 bg-white">
          <StepBuilder steps={steps} setSteps={setSteps} />
        </div>
        <div className="w-full lg:w-1/2 bg-slate-50">
          <FlowPreview steps={steps} />
        </div>
      </main>

      {mockResult && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-3 rounded-lg shadow-lg animate-pulse">
          {mockResult}
        </div>
      )}

      <ExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        steps={steps}
      />
    </div>
  )
}