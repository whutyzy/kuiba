import { isDef, isNumeric } from '../validate'

export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined
  }

  return isNumeric(value) ? `${value}px` : String(value)
}
