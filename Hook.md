函数在状态改变后会再次调用函数
***
* useState  
   
    useState(any):  

    参数：任意数据也可以是回调函数，回调函数无参数。  

    返回值：一个数组。
```js
 // 声明一个叫 "count" 的 state 变量
  const [count, setCount] = useState(0);
  //setCount(参数)
  //参数：可以是需要改变的新值，也可以是回调函数，回调函数的参数为上一次的count值
  //例：setCount(count+1)
  //    setCount(preCount=>{
  //    return preCount+1
  //   })
 ```
 ***
*  useEffect  
  
 1.  `useEffect(()=>{})`:第二个参数不写，挂载和任意数据更新时执行。
2.  `useEffect(()=>{},[])`:第二个参数为空数组，挂载时执行一次。
 3.  `useEffect(()=>{},[a])`:第二个参数为监听的某个状态值，挂载和该状态值更新是执行。  
   
`需求：为了去掉初次挂载时执行`  

利用useRef 立一个flag，这里不用声明普通变量let 变量因为每一更新函数会被调用声明的普通变量将会被初始化，也不使用useState因为当更新是组件又回重新渲染一次
```js
 const mounting = useRef(true);
        useEffect(() => {
            if (mounting.current) {
                console.log("初次")
                mounting.current = false;
                return 
            } 

             console.log("DidUpdated")
            
});

```
componentDidMount 和 componentWillUnmount 

componentDidUpdate(preProps,preState)
```js

useEffect(() => {
  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
  return () => {
    ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
  };//这里的props为上一次的preProps
}, [props.friend.id]); // 仅在 props.friend.id 发生变化时，重新订阅 只执行下图中间更新部分
```
当第二个参数不写时执行过程![alt 第二个参数不写时执行过程](../admin/img/屏幕快照%202022-08-08%2023.10.44.png)