export {}

type EnvironmentBindings = { binding: string }

declare global {
  interface GuardrailRegistry {
    title: string
  }
  interface GuardrailRegistry {
    count: number
  }
  interface GuardrailEnvironment extends EnvironmentBindings {}
}

declare module 'effect' {
  interface GuardrailOptions {
    title: string
  }
  interface GuardrailOptions {
    count: number
  }
}
