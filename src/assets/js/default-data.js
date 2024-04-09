import {LengthTypeKeys, LowercaseLetters, Numbers, SpecialCharacters, UppercaseLetters} from "./base-data.js";

const defaultConfigV2 = {
    fixedLength: 16,
    rangeLength: [8, 32],
    lengthType: LengthTypeKeys.Fixed,
    maxLength: 64,
    minLength: 1,
    enabledNumbers: Numbers.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledLowercaseLetters: LowercaseLetters.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledUppercaseLetters: UppercaseLetters.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledSpecialCharacters: SpecialCharacters.split('').map((char) => ({key: char, label: char, checked: true})),
}

const defaultConfigV1 = {
    length: 16,
    maxLength: 64,
    minLength: 1,
    enabledNumbers: Numbers.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledLowercaseLetters: LowercaseLetters.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledUppercaseLetters: UppercaseLetters.split('').map((char) => ({key: char, label: char, checked: true})),
    enabledSpecialCharacters: SpecialCharacters.split('').map((char) => ({key: char, label: char, checked: true})),
}

// 默认配置
export const defaultConfig = defaultConfigV2;