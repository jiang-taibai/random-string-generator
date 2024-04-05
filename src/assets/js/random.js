import {LowercaseLetters, Numbers, SpecialCharacters, UppercaseLetters} from "./base-data.js";

export const getRandomString = (
    enabledNumbers,
    enabledLowercaseLetters,
    enabledUppercaseLetters,
    enabledSpecialCharacters,
    length,
) => {
    let characters = [];
    if (enabledNumbers) characters = [...characters, ...enabledNumbers];
    if (enabledLowercaseLetters) characters = [...characters, ...enabledLowercaseLetters];
    if (enabledUppercaseLetters) characters = [...characters, ...enabledUppercaseLetters];
    if (enabledSpecialCharacters) characters = [...characters, ...enabledSpecialCharacters];
    if (characters.length === 0) {
        return '';
    }
    let randomString = '';
    if (length instanceof Array) {
        length = Math.floor(Math.random() * (length[1] - length[0] + 1) + length[0]);
    }
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    return randomString;
};
// 创建一个字典，用于检查字符是否是数字、字母、小写字母、大写字母或特殊字符
const characterTypes = {}
for (let i = 0; i < Numbers.length; i++) {
    characterTypes[Numbers[i]] = 'number';
}
for (let i = 0; i < LowercaseLetters.length; i++) {
    characterTypes[LowercaseLetters[i]] = 'lowercaseLetter';
}
for (let i = 0; i < UppercaseLetters.length; i++) {
    characterTypes[UppercaseLetters[i]] = 'uppercaseLetter';
}
for (let i = 0; i < SpecialCharacters.length; i++) {
    characterTypes[SpecialCharacters[i]] = 'specialCharacter';
}
const isNumber = (char) => characterTypes[char] === 'number';
const isLowercaseLetter = (char) => characterTypes[char] === 'lowercaseLetter';
const isUppercaseLetter = (char) => characterTypes[char] === 'uppercaseLetter';
const isLetter = (char) => isLowercaseLetter(char) || isUppercaseLetter(char);
const isSpecialCharacter = (char) => characterTypes[char] === 'specialCharacter';

export const characterIs = {
    number: isNumber,
    letter: isLetter,
    lowercaseLetter: isLowercaseLetter,
    uppercaseLetter: isUppercaseLetter,
    specialCharacter: isSpecialCharacter
}
