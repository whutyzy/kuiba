export const isNumber = function (value: any): value is number {
    return Object.prototype.toString.call(value) === '[object Number]'
}  