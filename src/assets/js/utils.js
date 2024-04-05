import {getRandomString} from "./random.js";

/**
 * 根据给定的配置生成随机字符串
 *
 * @param config    {object} 配置
 * @returns {string|string} 随机字符串
 */
export const generateByConfig = (config) => {
    const parameter = calculateGenerateByConfigParameter(config);
    return getRandomString(
        parameter.enabledNumbers,
        parameter.enabledLowercaseLetters,
        parameter.enabledUppercaseLetters,
        parameter.enabledSpecialCharacters,
        parameter.length
    );
}

/**
 * 根据配置计算生成随机字符串函数的参数
 *
 * @param config    {object}    配置
 * @returns {{enabledSpecialCharacters: any[], length: *, enabledLowercaseLetters: any[], enabledNumbers: any[], enabledUppercaseLetters: any[]}}
 */
export const calculateGenerateByConfigParameter = (config) => {
    const enabledNumbers = config.enabledNumbers.filter(item => item.checked).map(item => item.key);
    const enabledLowercaseLetters = config.enabledLowercaseLetters.filter(item => item.checked).map(item => item.key);
    const enabledUppercaseLetters = config.enabledUppercaseLetters.filter(item => item.checked).map(item => item.key);
    const enabledSpecialCharacters = config.enabledSpecialCharacters.filter(item => item.checked).map(item => item.key);
    const length = config.length;
    return {
        enabledNumbers,
        enabledLowercaseLetters,
        enabledUppercaseLetters,
        enabledSpecialCharacters,
        length,
    }
}

/**
 * 创建一个防抖函数
 * // 使用示例
 * const myDebouncedFunction = debounce(() => {
 *   console.log('函数执行了！');
 * }, 2000);
 * // 模拟频繁调用的情况，只有最后一次调用会在2秒后执行
 * myDebouncedFunction();
 * myDebouncedFunction();
 * myDebouncedFunction();
 *
 * @param {Function}    func 需要防抖处理的函数
 * @param {number}      wait 等待时间，单位毫秒
 * @param {boolean}     immediate 是否立即执行
 * @return {Function}   防抖处理后的函数
 */
export const debounce = (func, wait, immediate = false) => {
    let timeout;
    return function (...args) {
        const context = this; // 保留调用时的this上下文
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args); // 如果不是立即执行，则延迟调用
        };
        const callNow = immediate && !timeout; // 如果立即执行且当前没有在等待中，则立即调用
        if (!timeout) {
            // clearTimeout(timeout); // 清除之前的定时器
            timeout = setTimeout(later, wait); // 重新设置定时器，延迟执行
        }
        if (callNow) func.apply(context, args); // 根据callNow判断是否立即调用
    };
}

/**
 * // 使用示例
 * const myFunction = () => {
 *   console.log('函数执行了！');
 * };
 *
 * const debouncedMyFunction = new Debounce(myFunction, 2000);
 *
 * // 模拟频繁调用
 * debouncedMyFunction.call();
 * debouncedMyFunction.call();
 * debouncedMyFunction.call();
 * // 只有第一次调用会立即执行，后续调用在2秒内被忽略
 *
 * @param func  需要防抖处理的函数
 * @param wait  等待时间，单位毫秒
 * @constructor  防抖处理后的函数
 */
export function Debounce(func, wait) {
    this.timeout = null; // 用来保存定时器
    this.func = func; // 需要防抖处理的函数
    this.wait = wait; // 延迟执行的时间

    this.call = function (...args) {
        const context = this; // 保存调用时的上下文
        if (this.timeout === null) {
            // 首次调用时立即执行
            this.func.apply(context, args);
        }

        // 清除上一个定时器，并设置一个新的定时器
        clearTimeout(this.timeout)
        this.timeout = setTimeout(function () {
            context.timeout = null;
        }, this.wait);
    };
}