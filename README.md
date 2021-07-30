# 简介

> 这是一个定制化的工具库，不断补充工具函数，工具类，原生类拓展等
> 仅支持 `ES6` `import` 语法使用
> 推荐配合 typescript 下使用
> bug 反馈 Email:984512789@qq.com

[TOC]
# 更新日志

#### v0.0.1

- **2021-7-29** 初始化项目 新增 `GMap` 和 `GMath` 类

#### v0.0.2

- **2021-7-29** 修改打包入口和导出路径，使得更便捷的引入

#### v0.0.3

- **2021-7-30** 新增 `gType` 和 `gObj` 工具函数

#### v0.0.4

- **2021-7-30** 完成文档自动化生成构建和注释补充

# api 文档
### GMap
**类型** `class`
**继承** `Map`
##### array
> 静态方法
- **参数** map 接收GMap或者Map类型
- **返回值** {key,value}[]
##### getKeys
> 静态方法
- **参数** map 接收GMap或者Map类型
- **返回值** key[]
##### getKeys
- **返回值** key[]
##### getValues
- **返回值** value[]
##### getEntrues
- **返回值** '[key,value]'[]  `此处单引号是为了防止markdown转变为超链接`
##### map
- **参数** callback (value,key,index)=>T
- **返回值** T[]
##### filter
- **参数** callback (value,key,index)=>boolean
- **返回值** value[]
### GMath
**类型** `class`
> 注意！该类下的方法皆为静态方法
##### randomLenNum
> 随机长度数字
- **参数** length
- **参数** isNumber
- **返回值** string|number
##### randomStr
> 随机字符串
- **返回值** string
##### randomBoolean
> 随机布尔值
- **参数** float
- **返回值** boolean
##### randomRange
> 随机数字范围
- **参数** min
- **参数** max
- **参数** float
- **返回值** number
##### randomArray
> 随机返回数组中的一项
- **参数** arr T[]
- **返回值** T
##### randomLength
> 随机长度范围内的整值（多适用于随机取数组索引）
- **参数** length
- **返回值** number
##### precision
> 精度控制
- **参数** num 浮点数
- **参数** precision 精度 默认=2 保留2位小数
- **返回值** number
##### between
> 判断两数或日期之间
- **参数** source  T 判断目标 可以是number|string|Date
- **参数** target  T[]判断范围
- **参数** border 是否含边界 默认false 含左侧
- **返回值** boolean
### gObj
**类型** `function tools`
> 针对对象的一些工具函数
##### keys
> 获取keys 等同于Object.keys
- **参数** data object
- **返回值** (keyof data)[]
##### omitBy
> 忽略某些属性
- **参数** origin object 需要操作的对象
- **参数** callback (origin[key])=>boolean 忽略的方法 类似数组filter 用法
- **返回值** object
##### intersection
> 获取数组交集 后续版本将迁移至gArray 但引入方式相同 不影响历史代码
- **参数** arrT []数组1
- **参数** arrR []数组2
- **返回值** []两数组同栈集合
##### pick
> 挑选某些属性
- **参数** origin 被操作对象
- **参数** propList 需要挑选的字段数组
- **返回值** object
##### clone
> 浅拷贝
- **参数** origin 拷贝对象
- **返回值** new origin
##### deepClone
> 深拷贝
- **参数** data 拷贝对象 可以是正则/日期对象
- **返回值** new origin
##### extend
> 合并对象 基于Object.assign
- **参数** target 源对象
- **参数** args 其余对象
- **返回值** target
##### filterKeys
> 根据保留/删除(keep/remove)类型过滤字段 柯里化函数
- **参数** type "keep"|"remove"
- **参数** obj
- **参数** keys  string[] 保留或者删除的数组
- **返回值** object
- **示例**
```
import {filterKeys} from "gems-tools"; filterKeys("keep")({a:1,b:2},['a']);
```
##### keepKeys
> 保留给定字段 filterKeys("keep")
- **参数** obj
- **参数** keys  string[] 保留或者删除的数组
- **返回值** object
##### removeKeys
> 删除给定字段 filterKeys("remove")
- **参数** obj
- **参数** keys  string[] 保留或者删除的数组
- **返回值** object
##### replaceKeys
> 替换对象字段名
- **参数** obj
- **参数** rules {[key in obj]:newKey}
- **返回值** object
##### mergeProperties
> 覆盖对象属性 以初始化对象为基准 去除新对象多余字段，为缺失字段填充默认值，浅操作，仅对第一层字段有效
- **参数** distObject 初始化对象
- **参数** srcObject 传递过来新对象
- **返回值** object
### gType
**类型** `function tools`
##### isType
> 判断类型的基础方法 柯里化函数
- **参数** type string 类型字符串
- **参数** val 判断的值
- **返回值** boolean
- **示例**
```
import {isType} from "gems-tools"; isType('String')('测试用例');
```
##### isObject
- **参数** val
- **返回值** boolean
##### isEmptyObject
- **参数** val
- **返回值** boolean
##### isArray
- **参数** val
- **返回值** boolean
##### isArguments
- **参数** val
- **返回值** boolean
##### isNull
- **参数** val
- **返回值** boolean
##### isNumber
- **参数** val
- **返回值** boolean
##### isString
- **参数** val
- **返回值** boolean
##### isBoolean
- **参数** val
- **返回值** boolean
##### isFunction
- **参数** val
- **返回值** boolean
##### isPromise
- **参数** val
- **返回值** boolean
##### isDate
- **参数** val
- **返回值** boolean
##### isRegExp
- **参数** val
- **返回值** boolean
##### isMap
- **参数** val
- **返回值** boolean
##### isSet
- **参数** val
- **返回值** boolean
##### isSymbol
- **参数** val
- **返回值** boolean
##### isError
- **参数** val
- **返回值** boolean
##### isUndefined
- **参数** val
- **返回值** boolean
##### isEmpty
- **参数** val
- **返回值** boolean
##### isNaN
- **参数** val
- **返回值** boolean
##### isElement
- **参数** val
- **返回值** boolean