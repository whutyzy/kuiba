export const isNumeric = function (value: any): value is string {
    return typeof value === 'number' || /^\d+(\.\d+)?$/.test(value)
}  