# import-config

[![Travis](https://img.shields.io/travis/xudongcc/import-config.svg)](https://travis-ci.org/xudongcc/import-config)
[![Codecov](https://img.shields.io/codecov/c/github/xudongcc/import-config.svg)](https://codecov.io/gh/xudongcc/import-config)
[![Version](https://img.shields.io/npm/v/import-config.svg)](https://www.npmjs.com/package/import-config)
[![License](https://img.shields.io/npm/l/import-config.svg)](https://www.npmjs.com/package/import-config)
[![Download](https://img.shields.io/npm/dt/import-config.svg)](https://www.npmjs.com/package/import-config)

这是一个 Node.js 配置文件加载器。

支持递归加载文件夹配置文件。
目前支持 `.json`、`.yaml` 格式配置文件。

## 安装

```sh
npm i import-config
```

## 使用

```javascript
const { importConfig } from "import-config";

const config = importConfig(`${__dirname}."/config"`);

console.log(config);
```

## 改进计划

1. 支持 js/ts 格式配置
2. 异步加载配置
