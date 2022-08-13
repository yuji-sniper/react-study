// バリデータの型
interface Validators {
    [key: string]: Function
}

// 入力値の型
type ValidateValue = string|number|[]|undefined

// バリデータ
export const validators: Validators = {
    required: (value: ValidateValue, message: string) => {
        return !value ? message : undefined
    },
    min: (value: ValidateValue, min: number, message: string) => {
        if (typeof value === 'string' || typeof value === 'object') {
            return (value && value.length < min) ? message : undefined
        } else if (typeof value === 'number') {
            return (value && value < min) ? message : undefined
        }
    },
    max: (value: ValidateValue, max: number, message: string) => {
        if (typeof value === 'string' || typeof value === 'object') {
            return (value && value.length > max) ? message : undefined
        } else if (typeof value === 'number') {
            return (value && value > max) ? message : undefined
        }
    },
    regex: (value: ValidateValue, regex: string, message: string) => {
        if (typeof value === 'string') {
            return !value.match(regex) ? message : undefined
        }
        return message
    },
    email: (value: ValidateValue, message: string) => {
        if (typeof value === 'string') {
            return validators.regex(value, /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i, message)
        }
        return message
    }
}