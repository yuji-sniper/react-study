// バリデータの型
interface Validators {
    [key: string]: Function
}

// 入力値の型
type ValidateValue = string|number|[]|undefined

// バリデーションルールの型
export type Rules = {[key in keyof Validators]: {[s: string]: string|number}}

// パラメータが不要なバリデーションルール
const noParamValidations: string[] = [
    'required',
]

// パラメータが１つ必要なバリデーションルール
const oneParamValidations: string[] = [
    'min',
    'max',
]

// バリデータ
const validators: Validators = {
    'required': (value: ValidateValue, message: string) => {
        return !value ? message : undefined
    },
    'min': (value: ValidateValue, min: number, message: string) => {
        if (typeof value === 'string' || typeof value === 'object') {
            return (value && value.length < min) ? message : undefined
        } else if (typeof value === 'number') {
            return (value && value < min) ? message : undefined
        }
    },
    'max': (value: ValidateValue, max: number, message: string) => {
        if (typeof value === 'string' || typeof value === 'object') {
            return (value && value.length > max) ? message : undefined
        } else if (typeof value === 'number') {
            return (value && value > max) ? message : undefined
        }
    },
}

// バリデーションを実行してエラーメッセージを返す
export const executeValidate = (value: ValidateValue, rules: Rules): string|undefined => {
    for (const ruleName in rules) {
        const rule = rules[ruleName]
        let msg: string|undefined = 
            (noParamValidations.includes(ruleName)) ?
                validators[ruleName](value, rule.message)
            : (oneParamValidations.includes(ruleName)) ?
                validators[ruleName](value, rule[ruleName], rule.message)
            : undefined
        if (msg) return msg
    }
}