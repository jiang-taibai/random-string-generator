// 可选字符
export const Numbers = '0123456789';
export const LowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
export const UppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const SpecialCharacters = '!@#$%^&*()_+-=[]{}|;:\'",.<>/?';

// 图标
export const Icons = {
    EnableColorful: 'src/img/icon/enable-colorful.png',
    DisableColorful: 'src/img/icon/disable-colorful.png',
    EnableDisplayPassword: 'src/img/icon/enable-display-password.png',
    DisableDisplayPassword: 'src/img/icon/disable-display-password.png',
}

// 本地存储的键
export const StorageKeys = {
    Config: "config-v2",
}

export const LengthTypeKeys = {
    Fixed: "fixed",
    Range: "range",
}

const StorageKeysUpdateLog = {
    'config-v1': {
        time: "2024-04-05",
        logs: [
            "1. 完成基本功能",
        ],
    },
    'config-v2': {
        time: "2024-04-09",
        logs: [
            "1. 添加固定长度和范围长度的配置项: {rangeLength, fixedLength}",
            "1. 添加长度类型的配置: {lengthType}",
        ],
    },
}