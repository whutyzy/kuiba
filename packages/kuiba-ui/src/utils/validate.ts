export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null
}


export function isNumeric(val: string | number): val is string {
  return typeof val === 'number' || /^\d+(\.\d+)?$/.test(val)
}