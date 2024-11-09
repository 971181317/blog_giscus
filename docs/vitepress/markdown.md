---
layout: doc
---

# Markdown

> [参考文档](https://vitepress.yiov.top/markdown.html#title-anchor)
>
> [Github](https://github.com/Yiov/vitepress-doc/blob/main/docs/markdown.md?plain=1)

## 标题锚 {#title-anchor}

代码：
标题会自动应用锚链接

::: tip 说明
`[]` 中括号内文字随便输，`()` 括号里的填一个 `#` 号加标题

无论是几级标题，都是一个 `#` 号
:::

输入：

```markdown
[点我跳转：容器](#容器)
```

输出：

[点我跳转：容器](#容器)

---

自定义锚点，以应对中文无法正确跳转的问题

先再标题后，添加英文锚点

```markdown
### 标题锚 {#title-anchor}
```

输入：

```markdown
[点我跳转：标题锚](#title-anchor)
```

输出：

[点我跳转：标题锚](#title-anchor)

## 折叠语法

输入：

```html

<details>
    <summary>点我展开</summary>
    Markdown默认折叠语法，Vitepress可以使用容器折叠语法，更加美观
</details>
```

输出：

<details>
  <summary>点我展开</summary>
  Markdown默认折叠语法，Vitepress可以使用容器折叠语法，更加美观
</details>

## 目录

```markdown
[[toc]]
```

::: details 点我查看
[[toc]]
:::

## 容器

### 基础使用

容器可以通过其类型、标题和内容来定义

输入：

```markdown
::: info
这是一条info，自定义格式：info+空格+自定义文字
:::

::: tip 提示
这是一个提示，自定义格式：tip+空格+自定义文字
:::

::: warning 警告
这是一条警告，自定义格式：warning+空格+自定义文字
:::

::: danger 危险
这是一个危险警告，自定义格式：danger+空格+自定义文字
:::

::: details 点我查看
这是一条详情，自定义格式：details+空格+自定义文字
:::
```

输出：

::: info
这是一条info，自定义格式：info+空格+自定义文字
:::

::: tip 提示
这是一个提示，自定义格式：tip+空格+自定义文字
:::

::: warning 警告
这是一条警告，自定义格式：warning+空格+自定义文字
:::

::: danger 危险
这是一个危险警告，自定义格式：danger+空格+自定义文字
:::

::: details 点我查看
这是一条详情，自定义格式：details+空格+自定义文字

还可以加入代码块

```md
Hello, VitePress!
```

:::

### GitHub风格警报

你也可以使用 [GitHub 风格的警报](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts)
，只是书写方式不同，使用上是一样的

输入：

```markdown
> [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。
```

输出：

> [!NOTE] 重要
> 强调用户在快速浏览文档时也不应忽略的重要信息。

> [!TIP]
> 有助于用户更顺利达成目标的建议性信息。

> [!IMPORTANT]
> 对用户达成目标至关重要的信息。

> [!WARNING]
> 因为可能存在风险，所以需要用户立即关注的关键内容。

> [!CAUTION]
> 行为可能带来的负面影响。



::: details 如果你是 Typora 的用户，本地不生效

使用下面代码进行配置，本代码由 [Aurorxa](https://github.com/Aurorxa) 提供

```typescript {4-25}
// .vitepress/config.mts
export default defineConfig({

    markdown: {
        config: (md) => {
            // 创建 markdown-it 插件
            md.use((md) => {
                const defaultRender = md.render
                md.render = function (...args) {

                    // 调用原始渲染
                    let defaultContent = defaultRender.apply(md, args)
                    // 替换内容
                    defaultContent = defaultContent
                        .replace(/NOTE/g, '提醒')
                        .replace(/TIP/g, '建议')
                        .replace(/IMPORTANT/g, '重要')
                        .replace(/WARNING/g, '警告')
                        .replace(/CAUTION/g, '注意')
                    // 返回渲染的内容
                    return defaultContent
                }
            })
        }
    },

})
```

:::

### Badge组件

徽章可让您向标题添加状态

输入：

```markdown
* VitePress <Badge type="info" text="default" />
* VitePress <Badge type="tip" text="^1.9.0" />
* VitePress <Badge type="warning" text="beta" />
* VitePress <Badge type="danger" text="caution" />
```

输出：

* VitePress <Badge type="info" text="default" />
* VitePress <Badge type="tip" text="^1.9.0" />
* VitePress <Badge type="warning" text="beta" />
* VitePress <Badge type="danger" text="caution" />

你也可以自定义 `children`

输入：

```markdown
* VitePress <Badge type="info">custom element</Badge>
```

输出：

* VitePress <Badge type="info">custom element</Badge>

## 代码块

### 行高亮

比如我要第2-3行和第5行显示，连续行用 `-` ，不连续行用 `,`

输入：

````markdown
```typescript {2-3,5}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```typescript {2-3,5}
export default defineConfig({
    lang: 'zh-CN',
    title: "VitePress",
    description: "我的vitpress文档教程",
    titleTemplate: '另起标题覆盖title',
})
```

也可以使用 `// [!code highlight]`

输入：

````markdown
```typescript
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程", // [!!code highlight]
})
```
````

输出：

```typescript
export default defineConfig({
    lang: 'zh-CN',
    title: "VitePress",
    description: "我的vitpress文档教程", // [!code highlight]
})
```

也可以通过 `// [!code highlight:<lines>]` 连续行号

输入：

````markdown
```typescript
export default defineConfig({
  lang: 'zh-CN', // [!!code highlight:3]
  title: "VitePress",
  description: "我的vitpress文档教程",
})
```
````

输出：

```typescript
export default defineConfig({
    lang: 'zh-CN', // [!code highlight:3]
    title: "VitePress",
    description: "我的vitpress文档教程",
})
```

### 聚焦代码

在某一行后添加 `// [!code focus]` 注释会聚焦该行，并模糊代码的其他部分

输入：

````markdown
```typescript {4}
export default defineConfig({
  lang: 'zh-CN',
  title: "VitePress",
  description: "我的vitpress文档教程", // [!!code focus]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```typescript {4}
export default defineConfig({
    lang: 'zh-CN',
    title: "VitePress",
    description: "我的vitpress文档教程", // [!code focus]
    titleTemplate: '另起标题覆盖title',
})
```

如果你要聚焦连续多行，可以使用 `// [!code focus:<lines>]`

::: tip 说明
从添加行的位置开始，输入最终聚焦的行号即可

分散的行，请单独添加使用
:::

输入：

````
```typescript {2-5}
export default defineConfig({
  lang: 'zh-CN', // [!!code focus:4]
  title: "VitePress",
  description: "我的vitpress文档教程",
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```typescript {2-5}
export default defineConfig({
    lang: 'zh-CN', // [!code focus:5]
    title: "VitePress",
    description: "我的vitpress文档教程",
    titleTemplate: '另起标题覆盖title',
})
```

### 增减差异

在某一行上添加 `// [!code --]` 或 `// [!code ++]` 注释将创建该行的差异，同时保留代码块的颜色

输入：

````markdown
```typescript {4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress", 
  description: "我的vitpress文档教程", // [!!code --]
  description: "更详细的vitpress中文文档教程", // [!!code ++]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```typescript {4-5}
export default defineConfig({
    lang: 'zh-CN',
    title: "VitePress",
    description: "我的vitpress文档教程", // [!code --]
    description: "更详细的vitpress中文文档教程", // [!code ++]
    titleTemplate: '另起标题覆盖title',
})
```

### 错误和警告

在某一行上添加 `// [!code warning]` 或 `// [!code error]` 注释会相应地为其着色

输入：

````
```typescript {4-5}
export default defineConfig({
  lang: 'zh-CN', 
  title: "VitePress", 
  description: "我的vitpress文档教程", // [!!code error]
  description: "更详细的vitpress中文文档教程", // [!!code warning]
  titleTemplate: '另起标题覆盖title' ,
})
```
````

输出：

```typescript {4-5}
export default defineConfig({
    lang: 'zh-CN',
    title: "VitePress",
    description: "我的vitpress文档教程", // [!code error]
    description: "更详细的vitpress中文文档教程", // [!code warning]
    titleTemplate: '另起标题覆盖title',
})
```

### 代码组

和Vuepress不同，我们用 `code-group` 包裹

```
::: code-group
:::
```

输入：

````
::: code-group

```shell [pnpm]
#查询pnpm版本
pnpm -v
```

```shell [yarn]
#查询yarn版本
yarn -v
```

:::
````

输出：

::: code-group

```shell [pnpm]
#查询pnpm版本
pnpm -v
```

```shell [yarn]
#查询yarn版本
yarn -v
```

:::

### 导入代码

要输出准确的文件路径，可以指定代码的片段和高亮部分

导入片段，我们需要对原文件进行注释 `// #region` 和 `// #endregion`

::: warning 注意
开始和结束都要有，后面的字必须是字母，不能汉字!

可以自定义，比如示例中的 `fav`
:::

原文件修改示例：

```text {1,3}
// #region code // [!code focus]
  你的代码...
// #endregion code // [!code focus]
```

输入：

::: tip 说明
{} 大括号中是高亮的行号
:::

```markdown
<!-- 绝对路径 二选一-->
<<< @/.vitepress/config.mts#code{2}

<!-- 相对路径 二选一-->
<<< ./.vitepress/config.mts#code{2}
```

输出：

<<< @/.vitepress/config.mts#code{2}