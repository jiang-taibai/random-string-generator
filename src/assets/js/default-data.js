import {LowercaseLetters, Numbers, SpecialCharacters, UppercaseLetters} from "./base-data.js";

// 默认配置
export const defaultConfig = {
    length: 16,
    maxLength: 64,
    minLength: 1,
    enabledNumbers: Numbers.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledLowercaseLetters: LowercaseLetters.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledUppercaseLetters: UppercaseLetters.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledSpecialCharacters: SpecialCharacters.split('').map((char) => ({key: char, label: char, checked: true})),
}