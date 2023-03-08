module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  ecmaFeatures: {
    // lambda表达式
    arrowFunctions: true,
    // 解构赋值
    destructuring: true,
    // class
    classes: true,
    // http://es6.ruanyifeng.com/#docs/function#函数参数的默认值
    defaultParams: true,
    // 块级作用域，允许使用let const
    blockBindings: true,
    // 允许使用模块，模块内默认严格模式
    modules: true,
    // 允许字面量定义对象时，用表达式做属性名
    // http://es6.ruanyifeng.com/#docs/object#属性名表达式
    objectLiteralComputedProperties: true,
    // 允许对象字面量方法名简写
    objectLiteralShorthandMethods: true,

    objectLiteralShorthandProperties: true,
    // http://es6.ruanyifeng.com/#docs/function#rest参数
    restParams: true,
    // http://es6.ruanyifeng.com/#docs/function#扩展运算符
    spread: true,
    // http://es6.ruanyifeng.com/#docs/iterator#for---of循环
    forOf: true,
    // http://es6.ruanyifeng.com/#docs/generator
    generators: true,
    // http://es6.ruanyifeng.com/#docs/string#模板字符串
    templateStrings: true,
    superInFunctions: true,
    // http://es6.ruanyifeng.com/#docs/object#对象的扩展运算符
    experimentalObjectRestSpread: true
  },
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': 0,
    'no-undef': 0
  }
}
