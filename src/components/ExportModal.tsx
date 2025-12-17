import { Step } from "../types/maestro"
import { Button } from "./ui/button"
import { Download, X } from "lucide-react"
import { formatYaml } from "../utils/yamlFormatter"

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  steps: Step[]
}

export function ExportModal({ isOpen, onClose, steps }: ExportModalProps) {
  const yamlContent = formatYaml(steps)

  const handleDownload = () => {
    const blob = new Blob([yamlContent], { type: 'text/yaml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'maestro-test.yaml'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Export Maestro YAML</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-sm text-slate-600 mb-2">
              Generated YAML file with {steps.length} test step{steps.length !== 1 ? 's' : ''}:
            </p>
            <pre className="bg-slate-900 text-slate-100 p-4 rounded overflow-x-auto text-sm font-mono max-h-96">
              <code>{yamlContent}</code>
            </pre>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleDownload} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download YAML
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}