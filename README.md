# mall

## 一、首页

### 1. tabControl

- 三个`div`，点击每个之后发生：
  1. 切换样式。
  2. 切换`Home`组件中`data`中的`currentType`的值，便于上拉加载时的请求对应数据。

### 2. goodList

传入的对象是自定义数据结构。

![1664878031866](D:\a202206\vue2.0\mall\assets\1664878031866.png)

### 3. backTop

- 监听组件的点击事件：加上`native`修饰符。
- `v-show`中的变量`isShowBackTop`根据监听滑动事件后`position.y`是否大于某个值来决定。

### 4. 难点

- tabControl组件的吸顶效果。

  需要通过保存tabControl组件初始位置来实现。

  然后监听滚动，当`y`方向滚动距离超过了初始位置的`y`值之后，设置另一个tabControl显示。

> 组件路由使用了`Keep-alive`标签，所以tabControl每次距离顶部的距离是不一样的。

- backTop组件的显示与隐藏。

  也需要通过监听滚动事件来实现。

## 二、详情页

### 1. 路由传参

使用`params`类型传递。

> 在路由配置中直接配置。

### 2. backTop组件

（同首页）

### 3. 重点

- 点击顶部导航栏的`item`页面滚到相应位置。

  > 1. 在导航栏组件中触发点击事件的时候传入`currentIndex`。
  > 2. 在`Detail`组件中使用`this.$refs.scroll`调用`Scroll`组件的`scrollTo`方法，将滚动区域滚动到该滚动到的位置。

- 当页面滚到相应位置的时候导航栏对应的`item`的样式变化。

> 在`contentScroll`事件中监听`scroll`组件的滚动：
>
> (`contentScroll`事件是`Scroll`组件滚动的时候会被调用的)
>
> 形参`position`由`Scroll`组件子传父传过来。

![1665113199578](D:\a202206\vue2.0\mall\assets\1665113199578.png)

#### 1. 导航栏结构

(在父组件(Detail组件)中)

![1665051106562](D:\a202206\vue2.0\mall\assets\1665051106562.png)

自身组件结构：

- 返回按钮*1 —— 使用`this.$router.back()`进行路由回退。
- `item`按钮*4，分别显示四个类型。
- `data`：`currentIndex`记录当前组件哪一个`item`按钮是`'active'`状态，默认值是0。

#### 2. `scroll`组件结构

(在父组件(Detail组件)中的结构)

![1665051689951](D:\a202206\vue2.0\mall\assets\1665051689951.png)

> `contentScroll`事件用于监听`scroll`组件的滚动。

#### 3. `Detail`组件中四个`item`点击后对应位置的获取

- 使用`themeTopYs`数组保存四个`item`点击后对应的位置，初始化为空数组。
- 在`mounted`中给`themeTopYs`赋值，**会存在问题**：
  - 问题存在的**原因**：`mounted`生命周期之后，虽然组件的`html`结构已经被挂载上去了，但是由于该页面图片较多，所以此时拿到的`position`值并没有算上图片的高度。
  - **解决方法**：监听图片的加载事件。
    - 具体做法：

（Deatil组件中）

![1665052345535](D:\a202206\vue2.0\mall\assets\1665052345535.png)

![1665052408736](D:\a202206\vue2.0\mall\assets\1665052408736.png)

（DetailGoodsInfo中）

![1665052452405](D:\a202206\vue2.0\mall\assets\1665052452405.png)

![1665052478013](D:\a202206\vue2.0\mall\assets\1665052478013.png)

防抖函数处理：(在`mounted`中)

![1665060075917](D:\a202206\vue2.0\mall\assets\1665060075917.png)

## 三、购物车

### 1. 使用`Vuex`状态管理

```js
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  mutations: {
    addCounter(state, payload) {
      payload.count++
    },
    addToCart(state, payload) {
      state.cartList.unshift(payload)
    }
  },
  actions: {
    addCart(context, payload) {
      let oldProduct = null
      oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit('addCounter', oldProduct)
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
      }
    }
  },
  getters: {
    cartListLength(state) {
      return state.cartList.length
    }
  }
})

```

### 2. CheckBox组件

- 含参数`isChecked`：标记该`CheckBox`是否被选中。
- `isChecked`参数可以修改`CheckBox`组件中相应的样式，如√的显示和隐藏。

### 3. 购物车商品的数据结构

![1665116080368](D:\a202206\vue2.0\mall\assets\1665116080368.png)

### 4. 全选的双向绑定

![1665116431934](D:\a202206\vue2.0\mall\assets\1665116431934.png)

> ES6的`find`方法会遍历数组的所有元素，返回满足条件的第一个元素的值，否则返回`undefined`。