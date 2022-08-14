// バリデーションエラーメッセージの置換関数
export const messageReplacers: {[key: string]: Function} = {
    min: (message: string, min: number): string => {
        return message.split(':min').join(min.toString())
    },
    max: (message: string, max: number): string => {
        return message.split(':max').join(max.toString())
    },
}
