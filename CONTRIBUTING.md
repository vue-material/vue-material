# vue-material 贡献指南

借鉴vue:

欢迎你为vue-material贡献,在贡献之前,请先确保了解下面的指南.

## Pull Request Guidelines

- 使用[GitHub Flow](http://githubflow.github.io/)
- 遵守代码风格
- 确保 npm test passes
- 如果添加新功能
    - 添加测试用例
- 如果修正bug
    - 在PR中添加详细的bug描述,有在线例子更好
    - 添加覆盖此bug的测试用例
    
## 代码风格

- [非必须的情况下,不使用分号](http://inimino.org/~inimino/blog/javascript_semicolons)
- 使用JSDOC 
- 2空格缩进
- 多个var声明
- function和function names后面留一个空格
- 参数间留一个空格,括号之间不留
- 三目运算符的条件部分过长时请换行

``` js
var a = superLongConditionalStatement
    ? 'yep'
    : 'nope'
```
  
- 对上述有疑问,请读源码

你的代码风格必须通过 eslint，你可以运行 $ npm run lint 本地测试。

## Commit提交规范

根据 [angular 规范](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format) 提交 commit

```xml
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

（1）type

提交 commit 的类型，包括以下几种

- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式，不影响代码逻辑
- refactor: 重构代码，理论上不影响现有功能
- perf: 提升性能
- test: 增加修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等）
- deps: 升级依赖

（2）scope

修改文件的范围

（3）subject

用一句话清楚的描述这次提交做了什么

（4）body

补充 subject，适当增加原因、目的等相关因素，也可不写。

（5）footer

- ___当有非兼容修改(Breaking Change)时必须在这里描述清楚___
- 关联相关 issue，如 `Closes #1, Closes #2, #3`

示例

```
fix($compile): [BREAKING_CHANGE] couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.


Closes #392

BREAKING CHANGE:

  Breaks foo.bar api, foo.baz should be used instead
```

查看具体[文档](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit)

## 发布管理

vue-material 基于 [semver](http://semver.org/lang/zh-CN/) 语义化版本号进行发布。

## 搭建开发环境

npm如果有问题,可以使用[cnpm](http://npm.taobao.org/)替代

``` bash
$ npm install
```

执行构建:

``` bash
$ npm build
```


运行测试:

``` bash
$ npm test
```

单元测试用[Karma](http://karma-runner.github.io/0.13/index.html)运行
