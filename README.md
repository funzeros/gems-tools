# 简介

> 这是一个定制化的工具库，不断补充工具函数，工具类，原生类拓展等
> 仅支持 `ES6` `import` 语法使用
> 推荐配合 typescript 下使用
> bug 反馈 Email:984512789@qq.com

# 更新日志

## v0.0.1

- **2021-7-29** 初始化项目 新增 `GMap` 和 `GMath` 类

## v0.0.2

- **2021-7-29** 修改打包入口和导出路径，使得更便捷的引入

## v0.0.3

- **2021-7-30** 新增 `gType` 和 `gObj` 工具函数

## v0.0.4

- **2021-7-30** 完成文档自动化生成构建和注释补充

## v0.0.5

- **2021-8-3** 优化文档目录
- **2021-8-3** 新增 `gArray` 工具函数

# api 文档
- [gArray](#garray)
  - [forEachType](#foreachtype)
  - [forEach](#foreach)
  - [forEachRight](#foreachright)
  - [isArrayLike](#isarraylike)
  - [flatten](#flatten)
  - [deepFlatten](#deepflatten)
  - [unique](#unique)
  - [intersection](#intersection)
  - [intersectionAll](#intersectionall)
  - [union](#union)
  - [difference](#difference)
  - [differenceAll](#differenceall)
  - [array2Tree](#array2tree)
  - [tree2Array](#tree2array)
  - [array2Object](#array2object)
  - [getTreeChains](#gettreechains)
  - [arrayLike2Array](#arraylike2array)
  - [chunk](#chunk)
  - [compact](#compact)
  - [countBy](#countby)
  - [countByValue](#countbyvalue)
  - [indexOfAll](#indexofall)
  - [shuffe](#shuffe)
  - [sample](#sample)
- [GMap](#gmap)
  - [array](#array)
  - [getKeys](#getkeys)
  - [getKeys](#getkeys-1)
  - [getValues](#getvalues)
  - [getEntrues](#getentrues)
  - [map](#map)
  - [filter](#filter)
- [GMath](#gmath)
  - [randomLenNum](#randomlennum)
  - [randomStr](#randomstr)
  - [randomBoolean](#randomboolean)
  - [randomRange](#randomrange)
  - [randomArray](#randomarray)
  - [randomLength](#randomlength)
  - [precision](#precision)
  - [between](#between)
- [gObj](#gobj)
  - [keys](#keys)
  - [omitBy](#omitby)
  - [pick](#pick)
  - [clone](#clone)
  - [deepClone](#deepclone)
  - [extend](#extend)
  - [filterKeys](#filterkeys)
  - [keepKeys](#keepkeys)
  - [removeKeys](#removekeys)
  - [replaceKeys](#replacekeys)
  - [mergeProperties](#mergeproperties)
- [gType](#gtype)
  - [isType](#istype)
  - [isObject](#isobject)
  - [isEmptyObject](#isemptyobject)
  - [isArray](#isarray)
  - [isArguments](#isarguments)
  - [isNull](#isnull)
  - [isNumber](#isnumber)
  - [isString](#isstring)
  - [isBoolean](#isboolean)
  - [isFunction](#isfunction)
  - [isPromise](#ispromise)
  - [isDate](#isdate)
  - [isRegExp](#isregexp)
  - [isMap](#ismap)
  - [isSet](#isset)
  - [isSymbol](#issymbol)
  - [isError](#iserror)
  - [isUndefined](#isundefined)
  - [isEmpty](#isempty)
  - [isNaN](#isnan)
  - [isElement](#iselement)
## gArray
**类型** `function tools`
> 针对数组的一些工具函数
### forEachType
> 从左/右（left/right）遍历数组 柯里化函数
- **参数** type "left" | "right"
- **参数** arr T[]
- **参数** cb (value: T, index: number, array: T[]) => void
- **返回值** array T[]
- **示例**
```
forEachType("right")([1,2,3],(v,k,arr)=>console.log(v,k,arr)]);
```
### forEach
> 左遍历
- **参数** arr T[]
- **参数** cb (value: T, index: number, array: T[]) => void
- **返回值** array T[]
### forEachRight
> 右遍历
- **参数** arr T[]
- **参数** cb (value: T, index: number, array: T[]) => void
- **返回值** array T[]
### isArrayLike
> 判断是否类数组
- **参数** val any
- **返回值** boolean
### flatten
> 拉平数组
- **参数** arr array
- **参数** depth depth 最多拉平的层级 默认1
- **返回值** array
### deepFlatten
> 深度拉平数组
- **参数** arr array
- **返回值** array
### unique
> 数组去重
- **参数** arr array
- **返回值** array
### intersection
> 获取数组交集
- **参数** arrT []数组1
- **参数** arrR []数组2
- **返回值** []两数组同栈集合
### intersectionAll
> 取多个数组的交集
- **参数** ...arr [][]多个数组
- **返回值** 数组交集
### union
> 多个元素的并集(去重)
- **参数** ...arr [][]多个数组
- **返回值** 数组并集
### difference
> 两个数组的差集
- **参数** arrT []数组1
- **参数** arrR []数组2
- **返回值** 数组差集
### differenceAll
> 多个数组的差集
- **参数** ...arr [][]多个数组
- **返回值** 数组差集
### array2Tree
> 将单层级数组转化为树形结构
> parentId为父元素的唯一标识，id为元素的唯一标识，默认为'id', pid为元素的父元素标识，默认为'pid'，children为要生成多层级子元素的字段名，默认为'children'
- **参数** arr 扁平数组
- **参数** parentId
- **参数** options <{ id = "id", pid = "pid", children = "children" }>
- **返回值** 树形数组
### tree2Array
> 树状结构转为一维数组
> id为每个元素的唯一标识，默认为'id'，children为多层级的子元素列表字段，默认为'children'
- **参数** arr 扁平数组
- **参数** parentId
- **参数** options <{ id = "id", children = "children" }>
- **返回值** 一维数组
### array2Object
> 数组转为对象
> 如果数组元素为对象时指定对象的某个唯一字段为 key 值，没有指定则默认为下标索引值
- **参数** arr 数组
- **参数** key
- **返回值** object
### getTreeChains
>  根据标识获取树状结构的数据链
- **参数** id  number|string
- **参数** tree  <{children:[]}>[]
- **参数** options  <{ id: "id", pId: "pId", children: "children" }>
- **返回值** array
### arrayLike2Array
> 类数组转为数组
- **参数** obj Iterable<T> | ArrayLike<T>
- **返回值** T[]
### chunk
> 根据给定长度进行分组
- **参数** arr T[]
- **参数** size number
- **返回值** T[][]
### compact
> 过滤列表中的空数据
- **参数** arr T[]
- **返回值** T[]
### countBy
> 根据条件获取元素的出现次数
- **参数** arr T[]
- **返回值** T[]
### countByValue
> 获取指定元素的出现次数
- **参数** arr
- **参数** val
- **返回值** number
### indexOfAll
> 获取指定元素的下标值
- **参数** arr
- **参数** val
- **返回值** number[]
### shuffe
> 随机排序
- **参数** arr
- **返回值** number[]
### sample
> 随机取数组中数据
> size为取出元素的个数
- **参数** arr any[]
- **参数** size number
- **返回值** any[]
- **示例**
```
sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 3) 结果=>[4, 6, 8]
```
## GMap
**类型** `class`
**继承** `Map`
### array
> 静态方法
- **参数** map 接收GMap或者Map类型
- **返回值** {key,value}[]
### getKeys
> 静态方法
- **参数** map 接收GMap或者Map类型
- **返回值** key[]
### getKeys
- **返回值** key[]
### getValues
- **返回值** value[]
### getEntrues
- **返回值** <[key,value]>[]
### map
- **参数** callback (value,key,index)=>T
- **返回值** T[]
### filter
- **参数** callback (value,key,index)=>boolean
- **返回值** value[]
## GMath
**类型** `class`
> 注意！该类下的方法皆为静态方法
### randomLenNum
> 随机长度数字
- **参数** length
- **参数** isNumber
- **返回值** string|number
### randomStr
> 随机字符串
- **返回值** string
### randomBoolean
> 随机布尔值
- **参数** float
- **返回值** boolean
### randomRange
> 随机数字范围
- **参数** min
- **参数** max
- **参数** float
- **返回值** number
### randomArray
> 随机返回数组中的一项
- **参数** arr T[]
- **返回值** T
### randomLength
> 随机长度范围内的整值（多适用于随机取数组索引）
- **参数** length
- **返回值** number
### precision
> 精度控制
- **参数** num 浮点数
- **参数** precision 精度 默认=2 保留2位小数
- **返回值** number
### between
> 判断两数或日期之间
- **参数** source  T 判断目标 可以是number|string|Date
- **参数** target  T[]判断范围
- **参数** border 是否含边界 默认false 含左侧
- **返回值** boolean
## gObj
**类型** `function tools`
> 针对对象的一些工具函数
### keys
> 获取keys 等同于Object.keys
- **参数** data object
- **返回值** (keyof data)[]
### omitBy
> 忽略某些属性
- **参数** origin object 需要操作的对象
- **参数** callback (origin[key])=>boolean 忽略的方法 类似数组filter 用法
- **返回值** object
### pick
> 挑选某些属性
- **参数** origin 被操作对象
- **参数** propList 需要挑选的字段数组
- **返回值** object
### clone
> 浅拷贝
- **参数** origin 拷贝对象
- **返回值** new origin
### deepClone
> 深拷贝
- **参数** data 拷贝对象 可以是正则/日期对象
- **返回值** new origin
### extend
> 合并对象 基于Object.assign
- **参数** target 源对象
- **参数** args 其余对象
- **返回值** target
### filterKeys
> 根据保留/删除(keep/remove)类型过滤字段 柯里化函数
- **参数** type "keep"|"remove"
- **参数** obj
- **参数** keys  string[] 保留或者删除的数组
- **返回值** object
- **示例**
```
filterKeys("keep")({a:1,b:2},['a']);
```
### keepKeys
> 保留给定字段 filterKeys("keep")
- **参数** obj
- **参数** keys  string[] 保留或者删除的数组
- **返回值** object
### removeKeys
> 删除给定字段 filterKeys("remove")
- **参数** obj
- **参数** keys  string[] 保留或者删除的数组
- **返回值** object
### replaceKeys
> 替换对象字段名
- **参数** obj
- **参数** rules {[key in obj]:newKey}
- **返回值** object
### mergeProperties
> 覆盖对象属性 以初始化对象为基准 去除新对象多余字段，为缺失字段填充默认值，浅操作，仅对第一层字段有效
- **参数** distObject 初始化对象
- **参数** srcObject 传递过来新对象
- **返回值** object
## gType
**类型** `function tools`
### isType
> 判断类型的基础方法 柯里化函数
- **参数** type string 类型字符串
- **参数** val 判断的值
- **返回值** boolean
- **示例**
```
isType('String')('测试用例');
```
### isObject
- **参数** val
- **返回值** boolean
### isEmptyObject
- **参数** val
- **返回值** boolean
### isArray
- **参数** val
- **返回值** boolean
### isArguments
- **参数** val
- **返回值** boolean
### isNull
- **参数** val
- **返回值** boolean
### isNumber
- **参数** val
- **返回值** boolean
### isString
- **参数** val
- **返回值** boolean
### isBoolean
- **参数** val
- **返回值** boolean
### isFunction
- **参数** val
- **返回值** boolean
### isPromise
- **参数** val
- **返回值** boolean
### isDate
- **参数** val
- **返回值** boolean
### isRegExp
- **参数** val
- **返回值** boolean
### isMap
- **参数** val
- **返回值** boolean
### isSet
- **参数** val
- **返回值** boolean
### isSymbol
- **参数** val
- **返回值** boolean
### isError
- **参数** val
- **返回值** boolean
### isUndefined
- **参数** val
- **返回值** boolean
### isEmpty
- **参数** val
- **返回值** boolean
### isNaN
- **参数** val
- **返回值** boolean
### isElement
- **参数** val
- **返回值** boolean