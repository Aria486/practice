# NPM

### 1、node_modules目录结构的管理

----

项目有A、B、C三个模块：
```javascript
"dependencies": {
    A: "1.0.0",
    B: "1.0.0",
    C: "1.0.0"
}
```
A、B、C三个模块又有如下依赖：
```javascript
A @1.0.0 -> D @1.0.0
B @1.0.0 -> D @2.0.0
C @1.0.0 -> D @1.0.0
```
D可能也有依赖

#### npm 2.x - 嵌套结构

npm 2.x安装依赖方式比较简单直接，以递归的方式按照包依赖的树形结构下载填充本地目录结构，也就是说每个包都会将该包的依赖安装到当前包所在的`node_modules`目录中。
执行`npm install`后，项目的`node_modules`会变成如下目录结构：

```javascript
├── node_modules
│   ├── A@1.0.0
│   │   └── node_modules
│   │   │   └── D@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
│   └── C@1.0.0
│   │   └── node_modules
│   │   │   └── D@1.0.0
```
优点：
```
层级结构明显
简单的实现了多版本兼容
保证了对依赖包无论是安装还是删除都会有统一的行为和结构
```
缺点：
```
可能造成相同模块的大量冗余问题
可能造成目录结构嵌套比较深
```
#### npm 3.x - 扁平结构

`npm 3.x`则采用了扁平化的结构来安装组织`node_modules`。也就是在执行`npm install`的时候，按照`package.json` 里依赖的顺序依次解析，遇到新的包就把它安装在第一级目录，后续安装如果遇到一级目录已经存在的包，会先按照约定版本判断版本，如果符合版本约定则忽略，否则会按照npm 2.x的方式依次挂在依赖包目录下。

```javascript
├── node_modules
│   ├── A@1.0.0
│   ├── D@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
│   └── C@1.0.0
```

再在项目中安装模块`E@1.0.0`（依赖于模块`D@2.0.0`），目录结构变为：

```javascript
├── node_modules
│   ├── A@1.0.0
│   ├── D@1.0.0
│   ├── B@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
│   └── C@1.0.0
│   ├── E@1.0.0
│   │   └── node_modules
│   │   │   └── D@2.0.0
```

为了解决目录中存在很多副本的情况，（在`A`、`C`模块的依赖模块`D`升级到`2.0.0`前提下）可以通过**`npm dedupe`**指令把所有二级的依赖模块`D@2.0.0`重定向到一级目录下：

```javascript
├── node_modules
│   ├── A@1.0.0
│   ├── D@2.0.0
│   ├── B@1.0.0
│   └── C@1.0.0
│   ├── E@1.0.0
│   └── F@1.0.0
```

#### npm 5.x - package-lock.json

从`npm 5.x`开始，安装组织`node_modules`和`npm 3.x`一样采用了扁平化的方式，最大的变化是增加了 [package-lock.json](https://link.juejin.im?target=https%3A%2F%2Fdocs.npmjs.com%2Ffiles%2Fpackage-lock.json) 文件。

`npm`为了让开发者**在安全的前提下使用最新的依赖包**，在`package.json`中通常做了锁定大版本的操作，这样在每次`npm install`的时候都会拉取依赖包大版本下的最新的版本。这种机制最大的一个缺点就是当有依赖包有小版本更新时，可能会出现协同开发者的依赖包不一致的问题。

缓存优化 install速度提升

#### npm 6.x - 

### 2、npm中的依赖包

----

### 依赖包分类

在 `node` 中其实总共有5种依赖：

- **dependencies - 业务依赖**
- **devDependencies - 开发依赖**
- **peerDependencies - 同伴依赖**
- **bundledDependencies / bundleDependencies - 打包依赖**
- **optionalDependencies - 可选依赖**

### 依赖包版本号

| range           | 含义                                      | 例                                              |
| --------------- | ----------------------------------------- | ----------------------------------------------- |
| `^2.2.1`        | 指定的 MAJOR 版本号下, 所有更新的版本     | 匹配 `2.2.3`, `2.3.0`; 不匹配 `1.0.3`, `3.0.1`  |
| `~2.2.1`        | 指定 MAJOR.MINOR 版本号下，所有更新的版本 | 匹配 `2.2.3`, `2.2.9` ; 不匹配 `2.3.0`, `2.4.5` |
| `>=2.1`         | 版本号大于或等于 `2.1.0`                  | 匹配 `2.1.2`, `3.1`                             |
| `<=2.2`         | 版本号小于或等于 `2.2`                    | 匹配 `1.0.0`, `2.2.1`, `2.2.11`                 |
| `1.0.0 - 2.0.0` | 版本号从 1.0.0 (含) 到 2.0.0 (含)         | 匹配 `1.0.0`, `1.3.4`, `2.0.0`                  |

##### 任意两条规则，用空格连接起来，表示“与”逻辑，即两条规则的交集:

如 `>=2.3.1 <=2.8.0` 可以解读为: `>=2.3.1` 且 `<=2.8.0`

- 可以匹配 `2.3.1`, `2.4.5`, `2.8.0`
- 但不匹配 `1.0.0`, `2.3.0`, `2.8.1`, `3.0.0`

##### 任意两条规则，通过 `||` 连接起来，表示“或”逻辑，即两条规则的并集:

如 `^2 >=2.3.1 || ^3 >3.2`

- 可以匹配  `2.3.1`, `2,8.1`, `3.3.1`
- 但不匹配 `1.0.0`, `2.2.0`, `3.1.0`, `4.0.0`

##### 除了这几种，还有如下更直观的表示版本号范围的写法:

- `*` 或 `x` 匹配所有主版本
- `1` 或 `1.x` 匹配 主版本号为 1 的所有版本
- `1.2` 或 `1.2.x` 匹配 版本号为 1.2 开头的所有版本

##### 在常规仅包含数字的版本号之外，semver 还允许在 `MAJOR.MINOR.PATCH` 后追加 `-` 后跟点号分隔的标签，作为预发布版本标签 - [Prerelese Tags](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fnpm%2Fnode-semver%23prerelease-tags)，通常被视为不稳定、不建议生产使用的版本。例如：

1. **alpha(α)：预览版，或者叫内部测试版；一般不向外部发布，会有很多bug；一般只有测试人员使用。** 

2. **beta(β)：测试版，或者叫公开测试版；这个阶段的版本会一直加入新的功能；在alpha版之后推出。** 

3. **rc(release candidate)：最终测试版本；可能成为最终产品的候选版本，如果未出现问题则可发布成为正式版本。**

### 3、npm scripts 脚本

----

`package.json`中的 [scripts](https://link.juejin.im/?target=https%3A%2F%2Fdocs.npmjs.com%2Fmisc%2Fscripts) 字段可以用来自定义脚本命令，它的每一个属性，对应一段脚本。以`creat-react-app`为例：

```javascript
"scripts": {
    "start": "react-scripts start",
     ...
 }
```

### 工作原理

#### package.json 中的 bin 字段

`package.json`中的字段bin表示的是一个**可执行文件到指定文件源的映射**。例如在`react-scripts`的`package.json`中：

```javascript
"bin": {
    "react-scripts": "./bin/react-scripts.js"
 }
```

npm 脚本的原理非常简单。每当执行`npm run`，就会自动新建一个 Shell，在这个 Shell 里面执行指定的脚本命令。因此，只要是 Shell（一般是 Bash）可以运行的命令，就可以写在 npm 脚本里面。

比较特别的是，`npm run`新建的这个 Shell，会将当前目录的`node_modules/.bin`子目录加入`PATH`变量，执行结束后，再将`PATH`变量恢复原样。

### npx

npx 的使用很简单，就是执行 `npx <command>` 即可，这里的 `<command>` 默认就是 `./node_modules` 目录中安装的可执行脚本名。例如本地安装好的 webpack 包，我们可以直接使用 `npx webpack` 执行即可。

[npx 使用教程](http://www.ruanyifeng.com/blog/2019/02/npx.html)

```javascript
npx workin-hard(彩蛋)
```

### 4、发布一个npm包

----

1. 写基础模块代码；
2. 注册npm账号；
3. 配置package.json；
4. 配置webpack；
5. 添加单元测试；
6. 完善README.md；
7. 发布。

```javascript
npm adduser/npm login
npm publish [--access=public]
npm version major/minor/patch
```

```javascript
npm version 

major：主版本号

minor：次版本号

patch：补丁号

premajor：预备主版本

prepatch：预备次版本

prerelease：预发布版本

npm publish
```

版本号格式：主版本号.次版本号.修订号；

主版本号：当你做了不兼容的 API 修改；

次版本号：当你做了向后兼容的功能性新增；

修订号：当你做了向后兼容的问题修正；

#### Scoped Packages 域级包

```javascript
@babel/core
@babel/runtime
@babel/cli
...
```

npm 会在用户注册账号的时候为其自动创建一个与用户名同名的 scope，之后用户也可以创建其他的 Org 作为 scope。 

```javascript
npm config get scope
npm config set scope username

npm init --scoped=[username]
```

### 5、npm 和 yarn

----

##### npm 5.0之前：

yarn缓存强于npm，具有lock特性，并发下载

##### 5.0之后：

npm缓存改善，加入包lock，速度还是慢于yarn

npm更新速度及时，yarn更新较慢





## npm 对于 Web 开发来说至关重要

在 2014 年 npm 刚成立时，一些树通常只包含几十个 JavaScript 包。而到了现在，普通的现代 Web 应用程序通常会有 1000 多个模块，包含超过 2000 个模块的树也并不少见。实际上，现代 Web 应用程序中有 97％的代码来自 npm。

**一个开发者只负责最终的 3％代码，它们是应用程序独有的代码。**