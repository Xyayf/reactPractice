### react脚手架  

* [create-react-app](https://create-react-app.dev/docs/adding-a-css-modules-stylesheet/)  
  * 1. 引入全局scss文件中定义的变量:  

     npm i sass-resources-loader  

  ``` js
  //webpack.config.js文件中配置
  {
      test: sassRegex,
      exclude: sassModuleRegex,
      use: getStyleLoaders(
        {
          importLoaders: 2,
          sourceMap: isEnvProduction && shouldUseSourceMap,
        },
        'sass-loader'
      ).concat([
           {
               loader: "sass-resources-loader",
               options: {
                   resources: path.join(__dirname, "../src/assets/scss/index.scss")
               }
           }
      ]),
      
      sideEffects: true,
   },
  ```

    ***
  * 2. react 配置less以及全局引入less变量

        yarn add --save less less-loader

    ``` js
    //webpack.config.js 配置less
    const lessRegex=/\.less$/
    const lessMouduleRegex=/\.module\.less$/
    //在默认的sass配置所在的后面配置
     {
              test: lessRegex,
              exclude: cssModuleRegex,
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
                 
                },
                'less-loader'
              ).concat([ //yarn add --save-dev style-resources-loader
         {
             loader: "style-resources-loader",
             options: {
                 resources: path.join(__dirname, "../src/assets/scss/index.less")
             }

         }
    ]),
              sideEffects:true
     }
     {
    test: lessModuleRegex,
    use: getStyleLoaders(
      {
        importLoaders: 3,
        sourceMap: isEnvProduction
                    ? shouldUseSourceMap
                    : isEnvDevelopment,
        modules:{
            getLocalIdent:getCSSModuleLocalIdent
        }
      },
      'less-loader'
    ).concat([ //yarn add --save-dev style-resources-loader
         {
             loader: "style-resources-loader",
             options: {
                 resources: path.join(__dirname, "../src/assets/scss/index.less")
                }

            }
        ]),
    }
    ```

  ***
  * 3. 在开发中代理API请求

      (1).在config>webpackDevserver.config.js文件中配置  

    ```js

    
  proxy: {
  '/api': {
    target: 'http://localhost:3000', // 需要代理的服务器地址，客户端真正需要请求的地址// 我这里是本地启的服务，所以地址为 localhost:3000
    changeOrigin: true, //是否跨域
    pathRewrite: { '^/api': '/' }
  }


   ```

    (2). 使用 http-proxy-middleware 来实现  

    yarn add http-proxy-middleware

    接下来，创建src/setupProxy.js并在其中放置以下内容  

 ``` js
const { createProxyMiddleware } = require('http-proxy-middleware');
 
module.exports = function (app) {
    app.use(
        createProxyMiddleware('/api1', {      
            target: 'http://localhost:3000',  //要代理的服务器
            changeOrigin: true,           
            pathRewrite: { '^/api1': '' }
        }),
 
       //当然也可以配置过个代理
        createProxyMiddleware('/api2', {
            target: 'http://localhost:8000',
            changeOrigin: true,
            pathRewrite: { '^/api2': '' }
        })
    )

```  

* 4. cssModules  

  1. 通过webpack设置css-loader的modules来开启css的模块化

```js  
 {
    loader: 'css-loader',
    options: {
      modules: true, //是否开启
      localIdentName: '[name]__[local]___[hash:base64:5]'  // 转化出来的class名字结构
    }
} 
```

2.或者可以通过 react-css-modules 来更方便的控制class类名  

这样我们就可以通过字符串的方式传入 class类名. 注意: 我们添加时 不再使用 className 了, 而是使用 styleName了

```js
import {Fragment} from 'react'
import {Outlet} from 'react-router-dom'
import {connect} from 'react-redux'
import SideBar from './sideBar'
import Them from '../../component/them'
import style from './index.module.scss'
import CSSModules from 'react-css-modules'
function Layout (props){
    console.log(props,'layout')
    return (
        <Fragment>
            <SideBar/>
            <h2 styleName="name">这里是layout</h2>
            <Them />
                <Outlet/>
        </Fragment>
    )

}

export default connect()(CSSModules(Layout, style, {
    allowMultiple: true //允许多个class一起使用
}))
```

### react相关生态模块

* [react](https://zh-hans.reactjs.org/docs/hello-world.html)
* [react-dom](https://zh-hans.reactjs.org/docs/react-dom.html#gatsby-focus-wrapper)
* [react-router-dom](https://reactrouter.com/docs/en/v6)
* [redux](http://cn.redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers) ： 管理全局状态
* [react-redux](https://react-redux.js.org/api/connect#mapdispatchtoprops-object--dispatch-ownprops--object) : 管理全局状态
* [redux-actions](https://redux-actions.js.org/api/handleaction#handleactiontype-reducermap-defaultstate) : 用来管理创建action和生成reducers
* [redux-thunk](http://cn.redux.js.org/tutorials/fundamentals/part-6-async-logic)  : redux中间件，用来处理异步actions
* [react-transition-group](https://reactcommunity.org/react-transition-group/) : 用来做动画
* [antd](https://ant.design/components/menu-cn/#API) : react-ui 库

### 1. `定义React组件`

* 方法一createReactClass  

``` javascript
  import createReactClass from 'create-react-class'
  var Greeting = createReactClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>
  }
})
```

  1. 声明props默认值：需要在组件中定义getDefaultProps() 函数:  

```js
var Greeting = createReactClass({
  getDefaultProps: function() {
    return {
      name: 'Mary'
    };
  },

  // ...

});
```

   2. 初始化state:
需要提供一个单独的 getInitialState 方法，让其返回初始 state:

```js
var Counter = createReactClass({
  getInitialState: function() {
    return {count: this.props.initialCount};
  },
  // ...
});
```

   3. 如果使用createReactClass() 方法创建组件,组件中的方法会自动绑定至实例降低运行效率

```js
var SayHello = createReactClass({
  getInitialState: function() {
    return {message: 'Hello!'};
  },

  handleClick: function() {
    alert(this.state.message);
  },

  render: function() {
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
});
```

   4. 可以引入mixins

 ****

* 方法2 使用ES6 class关键字定义React组件

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

  1. 声明默认属性props

```js
//定义在函数外部和函数式组件一样
class Greeting extends React.Component {
  // ...
}

Greeting.defaultProps = {
  name: 'Mary'
};
//或者定义在class内部
class Greeting extends React.Component {
  static defaultProps = {
    name: 'stranger'
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}

```

  2. 使用propTypes进行类型检查

```js
import PropTypes from 'prop-types';
//和函数式组件一样定义在外面
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
// 使用静态属性定义在类内部
class Greeting extends React.Component {
  static  propTypes= {
    name: PropTypes.string
  }

  render() {
    return (
      <div>Hello, {this.props.name}</div>
    )
  }
}
```

3. 初始化state

```js
class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: props.initialCount};
  }
  // ...
}
```

4. 处理事件函数需要绑定this，时间处理函数默认this为undefined  

   1. 在构造函数中绑定  

  ```js

  class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // 这一行很重要！
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // 由于 `this.handleClick` 已经绑定至实例，因此我们才可以用它来处理点击事件
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
  ```

   2. 利用箭头函数的class实例方法  

  ```js

  class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // 这一行很重要！
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick=()=> {
    alert(this.state.message);
  }

  render() {
    // 由于 `this.handleClick` 已经绑定至实例，因此我们才可以用它来处理点击事件
    return (
      <button onClick={this.handleClick}>
        Say hello
      </button>
    );
  }
}
  ```

   3. 箭头函数本身没有this由外部决定

```js

  class SayHello extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // 这一行很重要！
    this.handleClick = this.handleClick.bind(this);
  }

  

  render() {
    // 由于 `this.handleClick` 已经绑定至实例，因此我们才可以用它来处理点击事件
    return (
      <button onClick={()=> {
    alert(this.state.message);
  }}>
        Say hello
      </button>
    );
  }
}
  ```

***  

* 方法3 定义函数式组件：定义state，使用周期函数需要用到[hook](Hook.md)，props默认和class组件一样

```js
  function Example() {
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

****

2. 路由导航守卫

     主要注意就是正常跳转和个别情况重定向问题

```js
    const{user,routes}=props
    const {pathname}=useLocation()
    const MenuComponet=routes.find(item=>item.path==='/').component
    
    if(!isExistRoutes(routes,pathname)){
        return <Navigate to="/error/404"></Navigate>
    }else{
        const currRoute=currenRoute(routes,pathname)
        if(currRoute.redirect){
            return <Navigate to={currRoute.redirect}></Navigate>
        }
         if(!isWriteList(writeList,pathname) && !user) { 
        if(pathname!=='/login'){
            return <Navigate to="/login"></Navigate>
        }
    }
    }
     return(
             <Routes>
                <Route element={<MenuComponet/>}
                    path="/"
                >
                   {renderRoutes((routes.filter(item=>item.meta)))} 
                </Route>
                {renderRoutes((routes.filter(item=>!item.meta)))} 
                 </Routes>
         
     ) 
```
3. 路由表集中管理 使用公有路由和私有路由来管理权限问题
```js
 //大类分为公有路由和私有路由来标示带有权限的用户
//小类分为layoout布局页面用meta来标识有meta代表是菜单显示内容和非layout布局页面
export const publicRoutes=[
    {
        path:'/',
        redirect:'user',//redirect=redirect+path 所以不用加/
        component:_import_componet('layout')

    },
    {
        path:'/user',
        redirect:'/message',
        meta:{
            name:'用户',
            icon:''
        },
        children:[
            {
                path:'/message',
                component:'',
                redirect:'/fffj',
                meta:{
                    name:'信息详情',
                    icon:''
                },
                children:[
                    {
                        path:'/fffj',
                        component:_import_componet('fffj'),
                        meta:{
                            name:'fffj'
                        }
                    }
                ]
            }
        ]  
    },
    {
        path:'/hhhh',
        component:_import_componet('login'),
        meta:{
            name:'hhhhh'
        }
    },
    {
       path:'/login',
       component:_import_componet('login')
       
    },
    {
        path:'/error',
        children:[
            {
                path:'/404',
                component:_import_componet('404')
            },
            {
                path:'/401',
                component:''
            }
        ]
    }
]

export const privateRoutes=[
    {
        path:'/auth',
        component:'',
        meta:{
            name:'权限'
        },
        auth:['admin','root']
    },
    {
        path:'/admin',
        component:'',
        meta:{
            name:'管理权限'
        },
        auth:['admin']
    }
]
```
