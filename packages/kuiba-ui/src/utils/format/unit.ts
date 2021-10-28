import { CSSProperties } from 'vue'
import { isDef, isNumeric } from '../validate'

export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined
  }

  return isNumeric(value) ? `${value}px` : String(value)
}

export function getSizeStyle(originSize?: string | number): CSSProperties | undefined {
    if (isDef(originSize)) {
        const size = addUnit(originSize)
        return {
            width: size,
            height: size
        }
    }
}