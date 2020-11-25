# React 进阶

## JSX语法

### React.createElement()

返回一个虚拟DOM对象，用于描述DOM结构，如下：

```jsx
import React from "react";
import ReactDOM from "react-dom";

const ele = React.createElement("h1", {style: {color: "red"}}, "hello");
console.log(JSON.stringify(ele, null, 2))
ReactDOM.render(ele, document.getElementById("root"));
```



```js
{
  "type": "h1",
  "key": null,
  "ref": null,
  "props": {
    "style": {
      "color": "red"
    },
    "children": "hello"
  },
  "_owner": null,
  "_store": {}
}
```



## 组件 

### 函数组件

```jsx
import React from "react";
import ReactDOM from "react-dom";

function Welcome (props) {
return <h1>{props.name}</h1>
}

ReactDOM.render(<Welcome name="hefeng6500"/>, document.getElementById("root"));
```

### 类组件

```jsx
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
    // this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState((state) => ({ number: state.number + 1 }));
  }

  render() {
    const { number } = this.state;
    const { name } = this.props;
    return (
      <div>
        <h1>Hello</h1>
        <div>
          <h2>{name}</h2>
          <h2>{number}</h2>
          <button onClick={this.handleClick.bind(this)}>Click</button>
        </div>
      </div>
    );
  }
}
```

### 组件渲染

- React元素不但可以是DOM标签，还可以是用户自定义的组件
- 当 React 元素为用户自定义组件时，它会将 JSX 所接收的属性（attributes）转换为单个对象传递给组件，这个对象被称之为 `props`
- 组件名称必须以大写字母开头
- 组件必须在使用的时候定义或引用它
- 组件的返回值只能有一个根元素



## state

- 组件的数据来源有两个地方，分别是属性对象和状态对象
- 属性是父组件传递过来的(默认属性，属性校验)
- 状态是自己内部的,改变状态唯一的方式就是`setState`
- 属性和状态的变化都会影响视图更新

### state 的修改

方式一：

```jsx
this.setState({ number: state.number + 1 });
```

方式二：

- 出于性能考虑，React 可能会把多个 ` setState()` 调用合并成一个调用
- 因为 `this.props` 和 `this.state` 可能会异步更新，所以你不要依赖他们的值来更新下一个状态
- 可以让 `setState()` 接收一个函数而不是一个对象。这个函数用上一个 `state` 作为第一个参数

```jsx
this.setState((state) => ({ number: state.number + 1 }));
```



## refs

- Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素
- 在 React 渲染生命周期时，表单元素上的 value 将会覆盖 DOM 节点中的值，在非受控组件中，你经常希望 React 能赋予组件一个初始值，但是不去控制后续的更新。 在这种情况下, 你可以指定一个 `defaultValue ` 属性，而不是 `value`

### 1、为 DOM 元素添加 ref

- 可以使用 ref 去存储 DOM 节点的引用
- 当 ref 属性用于 HTML 元素时，构造函数中使用 `React.createRef()` 创建的 ref 接收底层 DOM 元素，`current ` 属性作为该DOM元素

```jsx
import React from "react";
import ReactDOM from "react-dom";
class Sum extends React.Component {
  constructor(props) {
    super(props);
    this.a = React.createRef();
    this.b = React.createRef();
    this.result = React.createRef();
  }
  handleAdd = () => {
    let a = this.a.current.value;
    debugger
    let b = this.b.current.value;
    this.result.current.value = parseInt(a) + parseInt(b);
  };
  render() {
    return (
      <>
        <input ref={this.a} />+<input ref={this.b} />
        <button onClick={this.handleAdd}>=</button>
        <input ref={this.result} />
      </>
    );
  }
}
ReactDOM.render(<Sum />, document.getElementById("root"));

```



### 2、为 class 组件添加 Ref

- 当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性

```jsx
import React from "react";
import ReactDOM from "react-dom";
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.getFocus();
  };
  render() {
    return (
      <>
        <TextInput ref={this.input} />
        <button onClick={this.getFocus}>获得焦点</button>
      </>
    );
  }
}
class TextInput extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus = () => {
    this.input.current.focus();
  };
  render() {
    return <input ref={this.input} />;
  }
}

ReactDOM.render(<Form />, document.getElementById("root"));

```



### 3、ref转发

- 向下传递 `ref` 给子组件

```jsx
import React from "react";
import ReactDOM from "react-dom";

const TextInput = React.forwardRef((props, ref) => <input ref={ref} />);

class Form extends React.Component {
  input;
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }
  getFocus = () => {
    console.log(this.input.current);

    this.input.current.focus();
  };
  render() {
    return (
      <>
        <TextInput ref={this.input} />
        <button onClick={this.getFocus}>获得焦点</button>
      </>
    );
  }
}

ReactDOM.render(<Form />, document.getElementById("root"));

```



## React 生命周期

### 旧版本生命周期

![react-life-cycle](../assets/react-life-cycle.jpg)

```jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";
class Counter extends React.Component {
  // 他会比较两个状态相等就不会刷新视图 PureComponent是浅比较
  static defaultProps = {
    name: "hefeng6500",
  };
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
    console.log("1.[parent] constructor is running.");
  }
  componentWillMount() {
    // 取本地的数据 同步的方式：采用渲染之前获取数据，只渲染一次
    console.log("2.[parent] componentWillMount hook in running.");
  }
  componentDidMount() {
    console.log("4.[parent] componentDidMount hook in running.");
  }
  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };
  // react可以shouldComponentUpdate方法中优化 PureComponent 可以帮我们做这件事
  shouldComponentUpdate(nextProps, nextState) {
    // 代表的是下一次的属性 和 下一次的状态
    console.log("5.[parent] shouldComponentUpdate hook in running.");
    return nextState.number % 2 == 0;
    // return nextState.number!==this.state.number; //如果此函数种返回了false 就不会调用render方法了
  } //不要随便用setState 可能会死循环
  componentWillUpdate() {
    console.log("6.[parent] componentWillUpdate hook in running.");
  }
  componentDidUpdate() {
    console.log("7.[parent] componentDidUpdate hook in running.");
  }
  render() {
    console.log("3.[parent] render function in running.");
    return (
      <div>
        <p>{this.state.number}</p>
        {this.state.number > 3 ? null : <ChildCounter n={this.state.number} />}
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }
}
class ChildCounter extends Component {
  componentWillUnmount() {
    console.log("[child component] componentWillUnmount hook in running.");
  }
  componentWillMount() {
    console.log("child componentWillMount hook in running.");
  }
  render() {
    console.log("[child component] render function in running.");
    return <div>{this.props.n}</div>;
  }
  componentDidMount() {
    console.log("[child component] componentDidMount hook in running.");
  }
  componentWillReceiveProps(newProps) {
    // 第一次不会执行，之后属性更新时才会执行
    console.log("[child component] componentWillReceiveProps hook in running.");
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.n % 3 == 0; //子组件判断接收的属性 是否满足更新条件 为true则更新
  }
}
ReactDOM.render(<Counter />, document.getElementById("root"));

```

#### mounting 阶段

```shell
1.[parent] constructor is running.
index.js:17 2.[parent] componentWillMount hook in running.
index.js:39 3.[parent] render function in running.
index.js:54 child componentWillMount hook in running.
index.js:57 [child component] render function in running.
[child component] componentDidMount hook in running.
index.js:20 4.[parent] componentDidMount hook in running.
```

#### update 阶段

```shell
5.[parent] shouldComponentUpdate hook in running.
5.[parent] shouldComponentUpdate hook in running.
index.js:33 6.[parent] componentWillUpdate hook in running.
index.js:39 3.[parent] render function in running.
index.js:65 [child component] componentWillReceiveProps hook in running.
index.js:36 js7.[parent] componentDidUpdate hook in running.
```



### 新版生命周期  React v 16.x.x

![](../assets/react16-life-cycle.jpg)



```jsx
import React from "react";
import ReactDOM from "react-dom";

class Counter extends React.Component {
  static defaultProps = {
    name: "hefeng6500",
  };
  constructor(props) {
    super(props);
    this.state = { number: 0 };
    console.log("[parent] constructor is running.");
  }

  handleClick = () => {
    this.setState({ number: this.state.number + 1 });
  };

  shouldComponentUpdate(nextProps, nextState){
    console.log("[parent] shouldComponentUpdate hook is running.");
    return nextState.number % 2 == 0;
  }

  render() {
    console.log("[parent] render function is running.");
    return (
      <div>
        <p>{this.state.number}</p>
        <ChildCounter number={this.state.number} />
        <button onClick={this.handleClick}>+</button>
      </div>
    );
  }

  componentDidMount(){
    console.log("[parent] child componentDidMount is running.");
  }
}
class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    console.log("[child] child constructor is running.");
    this.state = { number: 0 };
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("[child] child getDerivedStateFromProps is running.");
    const { number } = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (number % 2 === 0) {
      return { number: number * 2 };
    } else {
      return { number: number * 3 };
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    console.log("[child] shouldComponentUpdate hook is running.");
    return nextState.number % 2 == 0;
  }

  render() {
    console.log("[child] child render is running.");
    return <div>{this.state.number}</div>;
  }

  componentDidMount(){
    console.log("[child] child componentDidMount is running.");
  }
}

ReactDOM.render(<Counter />, document.getElementById("root"));

```



#### mounting阶段

```shell
[parent] constructor is running.
index.js:19 [parent] render function is running.
index.js:36 [child] child constructor is running.
index.js:40 [child] child getDerivedStateFromProps is running.
index.js:51 [child] child render is running.
index.js:56 [child] child componentDidMount is running.
index.js:30 [parent] child componentDidMount is running.
```

#### 更新阶段

```shell
index.js:19 [parent] shouldComponentUpdate hook is running.
index.js:24 [parent] render function is running.
index.js:45 [child] child getDerivedStateFromProps is running.
index.js:56 [child] shouldComponentUpdate hook is running.
index.js:61 [child] child render is running.
index.js:70 [child] child getSnapshotBeforeUpdate is running.
index.js:75 [child] child componentDidUpdate is running.
```



#### getDerivedStateFromProps 

- `static getDerivedStateFromProps(props, state)` 这个生命周期的功能实际上就是将传入的 `props ` 映射到 `state`上面

#### getSnapshotBeforeUpdate

- `getSnapshotBeforeUpdate()` 被调用于  `render` 之后，可以读取但无法使用 DOM 的时候。它使您的组件可以在可能更改之前从 DOM 捕获一些信息（例如滚动位置）。此生命周期返回的任何值都将作为参数传递给 `componentDidUpdate()`



## Context

- 在某些场景下，你想在整个组件树中传递数据，但却不想手动地在每一层传递属性。你可以直接在 React 中使用强大的 `context` API解决上述问题
- 在一个典型的 React 应用中，数据是通过 `props ` 属性自上而下（由父及子）进行传递的，但这种做法对于某些类型的属性而言是极其繁琐的（例如：地区偏好，UI 主题），这些属性是应用程序中许多组件都需要的。Context 提供了一种在组件之间共享此类值的方式，而不必显式地通过组件树的逐层传递 `props`

```jsx
import React, { Component } from "react";
import ReactDOM from "react-dom";

let ThemeContext = React.createContext(null);
let root = document.querySelector("#root");
class Header extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => (
          <div style={{ border: `5px solid ${value.color}`, padding: "5px" }}>
            header
            <Title />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
class Title extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => (
          <div style={{ border: `5px solid ${value.color}` }}>title</div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
class Main extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => (
          <div
            style={{
              border: `5px solid ${value.color}`,
              margin: "5px",
              padding: "5px",
            }}
          >
            main
            <Content />
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}
class Content extends Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {(value) => (
          <div style={{ border: `5px solid ${value.color}`, padding: "5px" }}>
            Content
            <button
              onClick={() => value.changeColor("red")}
              style={{ color: "red" }}
            >
              红色
            </button>
            <button
              onClick={() => value.changeColor("green")}
              style={{ color: "green" }}
            >
              绿色
            </button>
          </div>
        )}
      </ThemeContext.Consumer>
    );
  }
}

class Page extends Component {
  constructor(props) {
    super(props);
    this.state = { color: "red" };
  }
  changeColor = (color) => {
    this.setState({ color });
  };
  render() {
    let contextVal = { changeColor: this.changeColor, color: this.state.color };
    return (
      <ThemeContext.Provider value={contextVal}>
        <div
          style={{
            margin: "10px",
            border: `5px solid ${this.state.color}`,
            padding: "5px",
            width: 200,
          }}
        >
          page
          <Header />
          <Main />
        </div>
      </ThemeContext.Provider>
    );
  }
}
ReactDOM.render(<Page />, root);

```

![contextapi](../assets/contextapi.gif)







## 高阶组件 （HOC Component）

- 高阶组件就是一个函数，传给它一个组件，它返回一个新的组件
- 高阶组件的作用其实就是为了组件之间的代码复用

```jsx
const NewComponent = higherOrderComponent(OldComponent)
```



#### 高阶组件的应用：

**属性代理：**

- 基于属性代理：操作组件的props

```jsx
import React from "react";
import ReactDOM from "react-dom";
const loading = (message) => (OldComponent) => {
  return class extends React.Component {
    render() {
      const state = {
        show: () => {
          let div = document.createElement("div");
          div.innerHTML = `<p id="loading" style="position:absolute;top:100px;z-index:10;background-color:black">${message}</p>`;
          document.body.appendChild(div);
        },
        hide: () => {
          document.getElementById("loading").remove();
        },
      };
      return (
        <OldComponent
          {...this.props}
          {...state}
          {...{ ...this.props, ...state }}
        />
      );
    }
  };
};
@loading("正在加载中")
class Hello extends React.Component {
  render() {
    return (
      <div>
        hello<button onClick={this.props.show}>show</button>
        <button onClick={this.props.hide}>hide</button>
      </div>
    );
  }
}
let LoadingHello = loading("正在加载")(Hello);

ReactDOM.render(<LoadingHello />, document.getElementById("root"));

```



**反向继承：**

- 基于反向继承：拦截生命周期、state、渲染过程

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
class Button extends React.Component{
    state = {name:'张三'}
    componentDidMount(){
        console.log('Button componentDidMount');
    }
    render(){
        console.log('Button render');
        return <button name={this.state.name} title={this.props.title}/>
    }
}
const wrapper = OldComponent =>{
    return class NewComponent extends OldComponent{
        state = {number:0}
        componentWillMount(){
            console.log('WrapperButton componentWillMount');
             super.componentWillMount();
        }
        componentDidMount(){
            console.log('WrapperButton componentDidMount');
             super.componentDidMount();
        }
        handleClick = ()=>{
            this.setState({number:this.state.number+1});
        }
        render(){
            console.log('WrapperButton render');
            let renderElement = super.render();
            let newProps = {
                ...renderElement.props,
                ...this.state,
                onClick:this.handleClick
            }
            return  React.cloneElement(
                renderElement,
                newProps,
                this.state.number
            );
        }
    }
}
let WrappedButton = wrapper(Button);
ReactDOM.render(
    <WrappedButton title="标题"/>, document.getElementById('root'));
```



## render props

- [render-props](https://zh-hans.reactjs.org/docs/render-props.html)
- `render prop` 是指一种在 React 组件之间使用一个值为函数的 prop 共享代码的简单技术
- 具有 render prop 的组件接受一个函数，该函数返回一个 React 元素并调用它而不是实现自己的渲染逻辑
- render prop 是一个用于告知组件需要渲染什么内容的函数 prop
- 这也是逻辑复用的一种方式



> 需求：实现一个组件，鼠标在组件是移动时，显示鼠标在屏幕 X 、Y 的位置

### 1、原生实现

```jsx
import React from "react";
import ReactDOM from "react-dom";

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}
ReactDOM.render(
  <MouseTracker>
    {(props) => (
      <div>
        <h1>移动鼠标!</h1>
        <p>
          当前的鼠标位置是 ({props.x}, {props.y})
        </p>
      </div>
    )}
  </MouseTracker>,
  document.getElementById("root")
);

```



### 2、children

```jsx
import React from "react";
import ReactDOM from "react-dom";

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.children(this.state)}
      </div>
    );
  }
}
ReactDOM.render(
  <MouseTracker>
    {(props) => (
      <div>
        <h1>移动鼠标!</h1>
        <p>
          当前的鼠标位置是 ({props.x}, {props.y})
        </p>
      </div>
    )}
  </MouseTracker>,
  document.getElementById("root")
);

```



### 3、render属性

```jsx
import React from "react";
import ReactDOM from "react-dom";
class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {this.props.render(this.state)}
      </div>
    );
  }
}

ReactDOM.render(
  <MouseTracker
    render={(params) => (
      <>
        <h1>移动鼠标!</h1>
        <p>
          当前的鼠标位置是 ({params.x}, {params.y})
        </p>
      </>
    )}
  />,
  document.getElementById("root")
);

```



### 4、HOC

```jsx
import React from "react";
import ReactDOM from "react-dom";

function withTracker(OldComponent) {
  return class MouseTracker extends React.Component {
    constructor(props) {
      super(props);
      this.state = { x: 0, y: 0 };
    }
    handleMouseMove = (event) => {
      this.setState({
        x: event.clientX,
        y: event.clientY,
      });
    };
    render() {
      return (
        <div onMouseMove={this.handleMouseMove}>
          <OldComponent {...this.state} />
        </div>
      );
    }
  };
}
//render
function Show(props) {
  return (
    <React.Fragment>
      <h1>请移动鼠标</h1>
      <p>
        当前鼠标的位置是: x:{props.x} y:{props.y}
      </p>
    </React.Fragment>
  );
}
let HighShow = withTracker(Show);
ReactDOM.render(<HighShow />, document.getElementById("root"));
```














