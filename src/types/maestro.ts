export interface Step {
  id: string
  type: 'tapOn' | 'inputText' | 'scroll' | 'assertVisible' | 'assertText'
  params: Record<string, string | number>
}

export interface ActionStep extends Step {
  type: 'tapOn' | 'inputText' | 'scroll'
}

export interface AssertionStep extends Step {
  type: 'assertVisible' | 'assertText'
}