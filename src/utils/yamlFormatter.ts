import { Step } from "../types/maestro"

export function formatYaml(steps: Step[]): string {
  if (steps.length === 0) return '# No steps defined'

  const yamlLines = steps.map((step) => {
    switch (step.type) {
      case 'tapOn':
        return `- tapOn: "${step.params.selector}"`
      case 'inputText':
        return `- inputText:\n    selector: "${step.params.selector}"\n    text: "${step.params.text}"`
      case 'scroll':
        return `- scroll:\n    direction: "${step.params.direction}"`
      case 'assertVisible':
        return `- assertVisible: "${step.params.selector}"`
      case 'assertText':
        return `- assertText:\n    selector: "${step.params.selector}"\n    text: "${step.params.text}"`
      default:
        return `# Unknown step type: ${step.type}`
    }
  })

  return yamlLines.join('\n')
}