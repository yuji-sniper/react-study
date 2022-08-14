import { messageReplacers } from "./messageReplacer"
import { validators } from "./validator"

// 各入力値の型
type ValidateValue = string|number|[]|undefined

// 入力値の型
export type InputValues = {[key: string]: ValidateValue}

// バリデーションルールの型
type Rules = {[key: string]: {param?: string|number|[], message: string}}

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

// 全入力値のバリデーションを実行しエラーメッセージを返す
export const validateForm = <T extends InputValues> (
        values: T,
        validationRules: {[key in keyof T]: Rules}): {[key in keyof T]?: string|undefined} => {
    const errors: {[key in keyof T]?: string|undefined} = {}
    for (const form in validationRules) {
        errors[form] = validateEach(values[form], validationRules[form])
    }
    return errors
}

// 各フォームのバリデーションを実行してエラーメッセージを返す
const validateEach = (value: ValidateValue, rules: Rules): string|undefined => {
    for (const ruleName in rules) {
        const rule = rules[ruleName]
        const message = (noParamValidations.includes(ruleName)) ?
                validators[ruleName](value, rule.message)
            : (requireParamValidations.includes(ruleName)) ?
                validators[ruleName](value, rule.param, rule.message)
            : undefined
        if (message) {
            return ruleName in messageReplacers ?
                messageReplacers[ruleName](message, rule.param) : message
        }
    }
}
