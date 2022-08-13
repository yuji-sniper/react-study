import { validators } from "./validator"

// 入力値の型
type ValidateValue = string|number|[]|undefined

// バリデーションルールの型
export type Rules = {[key: string]: {param?: string|number|[], message: string}}

// パラメータが不要なバリデーション
const noParamValidations: string[] = [
    'required',
    'email'
]

// パラメータが必要なバリデーション
const requireParamValidations: string[] = [
    'min',
    'max',
    'regex'
]

// バリデーションを実行してエラーメッセージを返す
export const executeValidate = (value: ValidateValue, rules: Rules): string|undefined => {
    for (const ruleName in rules) {
        const rule = rules[ruleName]
        let msg: string|undefined = 
            (noParamValidations.includes(ruleName)) ?
                validators[ruleName](value, rule.message)
            : (requireParamValidations.includes(ruleName)) ?
                validators[ruleName](value, rule.param, rule.message)
            : undefined
        if (msg) return msg
    }
}
