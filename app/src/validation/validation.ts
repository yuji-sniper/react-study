import { validators } from "./validator"

// 入力値の型
type ValidateValue = string|number|[]|undefined

// バリデーションルールの型
export type Rules = {[key: string]: {[key: string]: string|number}}

// パラメータが不要なバリデーションルール
const noParamValidations: string[] = [
    'required',
]

// パラメータが１つ必要なバリデーションルール
const oneParamValidations: string[] = [
    'min',
    'max',
]

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
