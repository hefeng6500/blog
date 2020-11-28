// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'C:/workplace/dumi-doc/node_modules/_@umijs_runtime@3.2.24@@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/",
    "component": (props) => require('react').createElement(require('../../node_modules/_@umijs_preset-dumi@1.0.34@@umijs/preset-dumi/lib/themes/default/layout.js').default, {
      ...{"menus":{"*":{"/getting-started":[{"path":"/getting-started","title":"快速上手","meta":{}}],"*":[{"path":"/","title":"Index","meta":{}}],"/algorithm":[{"path":"/algorithm/leecode","title":"🔥LeetCode 热题 HOT 100","meta":{}}],"/design-patterns":[{"path":"/design-patterns","title":"设计模式","meta":{}},{"path":"/design-patterns/adapter-mode","title":"适配器模式","meta":{}},{"path":"/design-patterns/decorator-mode","title":"装饰器模式","meta":{}},{"path":"/design-patterns/factory-mode","title":"简单工厂模式","meta":{}},{"path":"/design-patterns/observer-mode","title":"观察者模式","meta":{}},{"path":"/design-patterns/prototype-mode","title":"原型模式","meta":{}},{"path":"/design-patterns/publish-subscribe-mode","title":"发布订阅模式","meta":{}},{"path":"/design-patterns/singleton-mode","title":"单例模式","meta":{}},{"path":"/design-patterns/strategy-mode","title":"策略模式","meta":{}}],"/interview":[{"path":"/interview","title":"面试题","meta":{}},{"path":"/interview/html","title":"html","meta":{}}],"/javascript":[{"path":"/javascript/higher-order function","title":"高阶函数","meta":{}},{"path":"/javascript/prototype","title":"原型、原型链和继承","meta":{}}],"/performance":[{"path":"/performance","title":"性能优化总括","meta":{}},{"path":"/performance/time-slice","title":"如何高性能的渲染十万条数据(时间分片)","meta":{}},{"path":"/performance/virtual-scroll","title":"如何高性能的渲染十万条数据(虚拟列表)","meta":{}}],"/react":[{"path":"/react","title":"React 进阶","meta":{}},{"path":"/react/react-source","title":"React 源码","meta":{}}],"/vue":[{"path":"/vue/virtual-dom","title":"虚拟 DOM","meta":{}},{"path":"/vue/vue-i18n","title":"vue-i18n","meta":{}},{"path":"/vue/vue3","title":"vue3-app","meta":{}}]}},"locales":[],"navs":{"*":[{"title":"快速上手","order":1,"path":"/getting-started"},{"path":"/vue","title":"Vue"},{"path":"/react","title":"React"},{"title":"力扣","path":"/algorithm"},{"path":"/interview","title":"面试题"},{"path":"/javascript","title":"Javascript"},{"title":"性能优化","path":"/performance"},{"path":"/design-patterns","title":"设计模式"}]},"title":"hefeng6500 的博客","desc":"hefeng6500 的博客","mode":"site"},
      ...props,
    }),
    "routes": [
      {
        "path": "/getting-started",
        "component": require('../../docs/getting-started.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/getting-started.md",
          "updatedTime": 1606223323000,
          "nav": {
            "title": "快速上手",
            "order": 1,
            "path": "/getting-started"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "快速上手",
              "heading": "快速上手"
            }
          ],
          "title": "快速上手"
        },
        "title": "快速上手"
      },
      {
        "path": "/",
        "component": require('../../docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1606315224000,
          "hero": {
            "title": "高级前端进阶",
            "desc": "<div class=\"markdown\"><p>🍙 To be an overflow stack engineer</p></div>",
            "actions": [
              {
                "text": "Fire →",
                "link": "/getting-started"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "Javascript 语言进阶",
              "desc": "<div class=\"markdown\"><p>涵盖 Javascript 语言底层原理，作用域、调用栈、堆、事件循环，ES6+，性能优化</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "html、css 高级进阶",
              "desc": "<div class=\"markdown\"><p>html5特性研究、css3高级用法、布局、动画</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "服务端及运维技术",
              "desc": "<div class=\"markdown\"><p>Node.js、服务端渲染，持续集成/部署</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2020<br />Powered by <a href=\"https://d.umijs.org\" target=\"_blank\" rel=\"noopener noreferrer\">dumi<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [],
          "title": "Index"
        },
        "title": "Index"
      },
      {
        "path": "/algorithm/leecode",
        "component": require('../../docs/algorithm/leecode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/algorithm/leecode.md",
          "updatedTime": 1606536115000,
          "nav": {
            "title": "力扣",
            "path": "/algorithm"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "🔥LeetCode 热题 HOT 100",
              "heading": "leetcode-热题-hot-100"
            },
            {
              "depth": 2,
              "value": "1、两数之和",
              "heading": "1、两数之和"
            },
            {
              "depth": 3,
              "value": "暴力解法",
              "heading": "暴力解法"
            },
            {
              "depth": 3,
              "value": "哈希表",
              "heading": "哈希表"
            },
            {
              "depth": 2,
              "value": "7. 整数反转",
              "heading": "7-整数反转"
            },
            {
              "depth": 3,
              "value": "反转字符串",
              "heading": "反转字符串"
            },
            {
              "depth": 3,
              "value": "取余法",
              "heading": "取余法"
            },
            {
              "depth": 3,
              "value": "数学法",
              "heading": "数学法"
            },
            {
              "depth": 2,
              "value": "20、有效的括号",
              "heading": "20、有效的括号"
            },
            {
              "depth": 3,
              "value": "Stack 方法",
              "heading": "stack-方法"
            },
            {
              "depth": 3,
              "value": "Stack + 哈希表",
              "heading": "stack--哈希表"
            }
          ],
          "title": "🔥LeetCode 热题 HOT 100"
        },
        "title": "🔥LeetCode 热题 HOT 100"
      },
      {
        "path": "/design-patterns/adapter-mode",
        "component": require('../../docs/design-patterns/adapter-mode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/adapter-mode.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "适配器模式",
              "heading": "适配器模式"
            }
          ],
          "title": "适配器模式",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          }
        },
        "title": "适配器模式"
      },
      {
        "path": "/design-patterns/decorator-mode",
        "component": require('../../docs/design-patterns/decorator-mode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/decorator-mode.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "装饰器模式",
              "heading": "装饰器模式"
            },
            {
              "depth": 1,
              "value": "**装饰函数**",
              "heading": "装饰函数"
            }
          ],
          "title": "装饰器模式",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          }
        },
        "title": "装饰器模式"
      },
      {
        "path": "/design-patterns/factory-mode",
        "component": require('../../docs/design-patterns/factory-mode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/factory-mode.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "简单工厂模式",
              "heading": "简单工厂模式"
            },
            {
              "depth": 2,
              "value": "应用场景",
              "heading": "应用场景"
            }
          ],
          "title": "简单工厂模式",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          }
        },
        "title": "简单工厂模式"
      },
      {
        "path": "/design-patterns",
        "component": require('../../docs/design-patterns/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/index.md",
          "updatedTime": 1606315224000,
          "nav": {
            "title": "设计模式",
            "path": "/design-patterns"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "设计模式",
              "heading": "设计模式"
            }
          ],
          "title": "设计模式"
        },
        "title": "设计模式"
      },
      {
        "path": "/design-patterns/observer-mode",
        "component": require('../../docs/design-patterns/observer-mode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/observer-mode.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "观察者模式",
              "heading": "观察者模式"
            }
          ],
          "title": "观察者模式",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          }
        },
        "title": "观察者模式"
      },
      {
        "path": "/design-patterns/prototype-mode",
        "component": require('../../docs/design-patterns/prototype-mode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/prototype-mode.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "原型模式",
              "heading": "原型模式"
            }
          ],
          "title": "原型模式",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          }
        },
        "title": "原型模式"
      },
      {
        "path": "/design-patterns/publish-subscribe-mode",
        "component": require('../../docs/design-patterns/publish-subscribe-mode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/publish-subscribe-mode.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "发布订阅模式",
              "heading": "发布订阅模式"
            },
            {
              "depth": 3,
              "value": "JavaScript 实现发布-订阅模式的便利性",
              "heading": "javascript-实现发布-订阅模式的便利性"
            }
          ],
          "title": "发布订阅模式",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          }
        },
        "title": "发布订阅模式"
      },
      {
        "path": "/design-patterns/singleton-mode",
        "component": require('../../docs/design-patterns/singleton-mode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/singleton-mode.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "单例模式",
              "heading": "单例模式"
            }
          ],
          "title": "单例模式",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          }
        },
        "title": "单例模式"
      },
      {
        "path": "/design-patterns/strategy-mode",
        "component": require('../../docs/design-patterns/strategy-mode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/strategy-mode.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "策略模式",
              "heading": "策略模式"
            },
            {
              "depth": 2,
              "value": "策略模式的优缺点",
              "heading": "策略模式的优缺点"
            }
          ],
          "title": "策略模式",
          "nav": {
            "path": "/design-patterns",
            "title": "设计模式"
          }
        },
        "title": "策略模式"
      },
      {
        "path": "/interview/html",
        "component": require('../../docs/interview/html.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/interview/html.md",
          "updatedTime": 1606224318000,
          "slugs": [
            {
              "depth": 1,
              "value": "html",
              "heading": "html"
            }
          ],
          "title": "html",
          "nav": {
            "path": "/interview",
            "title": "面试题"
          }
        },
        "title": "html"
      },
      {
        "path": "/interview",
        "component": require('../../docs/interview/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/interview/index.md",
          "updatedTime": 1606315224000,
          "nav": {
            "title": "面试题",
            "path": "/interview"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "面试题",
              "heading": "面试题"
            }
          ],
          "title": "面试题"
        },
        "title": "面试题"
      },
      {
        "path": "/javascript/higher-order function",
        "component": require('../../docs/javascript/higher-order function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/javascript/higher-order function.md",
          "updatedTime": 1606313561925,
          "slugs": [
            {
              "depth": 1,
              "value": "高阶函数",
              "heading": "高阶函数"
            },
            {
              "depth": 1,
              "value": "高阶函数",
              "heading": "高阶函数-1"
            },
            {
              "depth": 2,
              "value": "1、AOP 切片编程",
              "heading": "1、aop-切片编程"
            },
            {
              "depth": 1,
              "value": "2、函数柯里化",
              "heading": "2、函数柯里化"
            },
            {
              "depth": 2,
              "value": "2.1 最基本的柯里化拆分",
              "heading": "21-最基本的柯里化拆分"
            },
            {
              "depth": 2,
              "value": "2.2、柯里化通用式",
              "heading": "22、柯里化通用式"
            },
            {
              "depth": 2,
              "value": "2.3、柯里化与 bind",
              "heading": "23、柯里化与-bind"
            },
            {
              "depth": 1,
              "value": "3、反柯里化",
              "heading": "3、反柯里化"
            },
            {
              "depth": 2,
              "value": "3.1、反柯里化通用式",
              "heading": "31、反柯里化通用式"
            },
            {
              "depth": 3,
              "value": "2、通过函数调用生成反柯里化函数",
              "heading": "2、通过函数调用生成反柯里化函数"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ],
          "title": "高阶函数",
          "nav": {
            "path": "/javascript",
            "title": "Javascript"
          }
        },
        "title": "高阶函数"
      },
      {
        "path": "/javascript/prototype",
        "component": require('../../docs/javascript/prototype.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/javascript/prototype.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "原型、原型链和继承",
              "heading": "原型、原型链和继承"
            },
            {
              "depth": 1,
              "value": "基本概念",
              "heading": "基本概念"
            },
            {
              "depth": 2,
              "value": "什么是原型？",
              "heading": "什么是原型？"
            },
            {
              "depth": 2,
              "value": "什么式原型链？",
              "heading": "什么式原型链？"
            },
            {
              "depth": 2,
              "value": "类式继承",
              "heading": "类式继承"
            },
            {
              "depth": 2,
              "value": "构造函数继承",
              "heading": "构造函数继承"
            },
            {
              "depth": 2,
              "value": "组合继承",
              "heading": "组合继承"
            },
            {
              "depth": 2,
              "value": "原型继承",
              "heading": "原型继承"
            },
            {
              "depth": 2,
              "value": "寄生式继承",
              "heading": "寄生式继承"
            },
            {
              "depth": 2,
              "value": "寄生组合继承",
              "heading": "寄生组合继承"
            }
          ],
          "title": "原型、原型链和继承",
          "nav": {
            "path": "/javascript",
            "title": "Javascript"
          }
        },
        "title": "原型、原型链和继承"
      },
      {
        "path": "/performance",
        "component": require('../../docs/performance/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/performance/index.md",
          "updatedTime": 1606315224000,
          "nav": {
            "title": "性能优化",
            "path": "/performance"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "性能优化总括",
              "heading": "性能优化总括"
            }
          ],
          "title": "性能优化总括"
        },
        "title": "性能优化总括"
      },
      {
        "path": "/performance/time-slice",
        "component": require('../../docs/performance/time-slice.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/performance/time-slice.md",
          "updatedTime": 1606348572000,
          "slugs": [
            {
              "depth": 1,
              "value": "如何高性能的渲染十万条数据(时间分片)",
              "heading": "如何高性能的渲染十万条数据时间分片"
            },
            {
              "depth": 2,
              "value": "前言",
              "heading": "前言"
            },
            {
              "depth": 2,
              "value": "最粗暴的做法（一次性渲染）",
              "heading": "最粗暴的做法（一次性渲染）"
            },
            {
              "depth": 2,
              "value": "使用定时器",
              "heading": "使用定时器"
            },
            {
              "depth": 3,
              "value": "为什么会出现闪屏现象呢",
              "heading": "为什么会出现闪屏现象呢"
            },
            {
              "depth": 3,
              "value": "简单聊一下 setTimeout 和闪屏现象",
              "heading": "简单聊一下-settimeout-和闪屏现象"
            },
            {
              "depth": 2,
              "value": "使用 requestAnimationFrame",
              "heading": "使用-requestanimationframe"
            },
            {
              "depth": 2,
              "value": "使用 DocumentFragment",
              "heading": "使用-documentfragment"
            },
            {
              "depth": 2,
              "value": "参考",
              "heading": "参考"
            }
          ],
          "title": "如何高性能的渲染十万条数据(时间分片)",
          "nav": {
            "path": "/performance",
            "title": "性能优化"
          }
        },
        "title": "如何高性能的渲染十万条数据(时间分片)"
      },
      {
        "path": "/performance/virtual-scroll",
        "component": require('../../docs/performance/virtual-scroll.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/performance/virtual-scroll.md",
          "updatedTime": 1606348572000,
          "slugs": [
            {
              "depth": 1,
              "value": "如何高性能的渲染十万条数据(虚拟列表)",
              "heading": "如何高性能的渲染十万条数据虚拟列表"
            },
            {
              "depth": 2,
              "value": "前言",
              "heading": "前言"
            },
            {
              "depth": 2,
              "value": "为什么需要使用虚拟列表",
              "heading": "为什么需要使用虚拟列表"
            },
            {
              "depth": 2,
              "value": "什么是虚拟列表",
              "heading": "什么是虚拟列表"
            },
            {
              "depth": 2,
              "value": "实现",
              "heading": "实现"
            },
            {
              "depth": 2,
              "value": "列表项动态高度",
              "heading": "列表项动态高度"
            },
            {
              "depth": 2,
              "value": "面向未来",
              "heading": "面向未来"
            },
            {
              "depth": 2,
              "value": "遗留问题",
              "heading": "遗留问题"
            },
            {
              "depth": 2,
              "value": "参考",
              "heading": "参考"
            }
          ],
          "title": "如何高性能的渲染十万条数据(虚拟列表)",
          "nav": {
            "path": "/performance",
            "title": "性能优化"
          }
        },
        "title": "如何高性能的渲染十万条数据(虚拟列表)"
      },
      {
        "path": "/react",
        "component": require('../../docs/React/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/React/index.md",
          "updatedTime": 1606345851000,
          "slugs": [
            {
              "depth": 1,
              "value": "React 进阶",
              "heading": "react-进阶"
            },
            {
              "depth": 2,
              "value": "JSX语法",
              "heading": "jsx语法"
            },
            {
              "depth": 3,
              "value": "React.createElement()",
              "heading": "reactcreateelement"
            },
            {
              "depth": 2,
              "value": "组件",
              "heading": "组件"
            },
            {
              "depth": 3,
              "value": "函数组件",
              "heading": "函数组件"
            },
            {
              "depth": 3,
              "value": "类组件",
              "heading": "类组件"
            },
            {
              "depth": 3,
              "value": "组件渲染",
              "heading": "组件渲染"
            },
            {
              "depth": 2,
              "value": "state",
              "heading": "state"
            },
            {
              "depth": 3,
              "value": "state 的修改",
              "heading": "state-的修改"
            },
            {
              "depth": 2,
              "value": "refs",
              "heading": "refs"
            },
            {
              "depth": 3,
              "value": "1、为 DOM 元素添加 ref",
              "heading": "1、为-dom-元素添加-ref"
            },
            {
              "depth": 3,
              "value": "2、为 class 组件添加 Ref",
              "heading": "2、为-class-组件添加-ref"
            },
            {
              "depth": 3,
              "value": "3、ref转发",
              "heading": "3、ref转发"
            },
            {
              "depth": 2,
              "value": "React 生命周期",
              "heading": "react-生命周期"
            },
            {
              "depth": 3,
              "value": "旧版本生命周期",
              "heading": "旧版本生命周期"
            },
            {
              "depth": 4,
              "value": "mounting 阶段",
              "heading": "mounting-阶段"
            },
            {
              "depth": 4,
              "value": "update 阶段",
              "heading": "update-阶段"
            },
            {
              "depth": 3,
              "value": "新版生命周期  React v 16.x.x",
              "heading": "新版生命周期--react-v-16xx"
            },
            {
              "depth": 4,
              "value": "mounting阶段",
              "heading": "mounting阶段"
            },
            {
              "depth": 4,
              "value": "更新阶段",
              "heading": "更新阶段"
            },
            {
              "depth": 4,
              "value": "getDerivedStateFromProps",
              "heading": "getderivedstatefromprops"
            },
            {
              "depth": 4,
              "value": "getSnapshotBeforeUpdate",
              "heading": "getsnapshotbeforeupdate"
            },
            {
              "depth": 2,
              "value": "Context",
              "heading": "context"
            },
            {
              "depth": 2,
              "value": "高阶组件 （HOC Component）",
              "heading": "高阶组件-（hoc-component）"
            },
            {
              "depth": 4,
              "value": "高阶组件的应用：",
              "heading": "高阶组件的应用："
            },
            {
              "depth": 2,
              "value": "render props",
              "heading": "render-props"
            },
            {
              "depth": 3,
              "value": "1、原生实现",
              "heading": "1、原生实现"
            },
            {
              "depth": 3,
              "value": "2、children",
              "heading": "2、children"
            },
            {
              "depth": 3,
              "value": "3、render属性",
              "heading": "3、render属性"
            },
            {
              "depth": 3,
              "value": "4、HOC",
              "heading": "4、hoc"
            }
          ],
          "title": "React 进阶",
          "nav": {
            "path": "/react",
            "title": "React"
          }
        },
        "title": "React 进阶"
      },
      {
        "path": "/react/react-source",
        "component": require('../../docs/React/react-source.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/React/react-source.md",
          "updatedTime": 1606348572000,
          "slugs": [
            {
              "depth": 1,
              "value": "React 源码",
              "heading": "react-源码"
            },
            {
              "depth": 2,
              "value": "Day01",
              "heading": "day01"
            },
            {
              "depth": 3,
              "value": "实现 createElement()",
              "heading": "实现-createelement"
            },
            {
              "depth": 3,
              "value": "实现 createDOM()、render()",
              "heading": "实现-createdom、render"
            },
            {
              "depth": 4,
              "value": "前置知识",
              "heading": "前置知识"
            },
            {
              "depth": 4,
              "value": "createDOM()、render() 源码实现",
              "heading": "createdom、render-源码实现"
            },
            {
              "depth": 2,
              "value": "Day02",
              "heading": "day02"
            },
            {
              "depth": 3,
              "value": "实现合成事件",
              "heading": "实现合成事件"
            },
            {
              "depth": 3,
              "value": "实现 setState()",
              "heading": "实现-setstate"
            },
            {
              "depth": 4,
              "value": "同步更新",
              "heading": "同步更新"
            },
            {
              "depth": 4,
              "value": "异步更新",
              "heading": "异步更新"
            },
            {
              "depth": 3,
              "value": "实现createRef()",
              "heading": "实现createref"
            },
            {
              "depth": 3,
              "value": "实现生命周期函数",
              "heading": "实现生命周期函数"
            }
          ],
          "title": "React 源码",
          "nav": {
            "path": "/react",
            "title": "React"
          }
        },
        "title": "React 源码"
      },
      {
        "path": "/vue/virtual-dom",
        "component": require('../../docs/Vue/virtualDOM.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/Vue/virtualDOM.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "虚拟 DOM",
              "heading": "虚拟-dom"
            },
            {
              "depth": 2,
              "value": "什么是虚拟 DOM",
              "heading": "什么是虚拟-dom"
            },
            {
              "depth": 3,
              "value": "真实 DOM",
              "heading": "真实-dom"
            },
            {
              "depth": 3,
              "value": "虚拟 DOM",
              "heading": "虚拟-dom-1"
            },
            {
              "depth": 3,
              "value": "虚拟 DOM 库",
              "heading": "虚拟-dom-库"
            }
          ],
          "title": "虚拟 DOM",
          "nav": {
            "path": "/vue",
            "title": "Vue"
          }
        },
        "title": "虚拟 DOM"
      },
      {
        "path": "/vue/vue-i18n",
        "component": require('../../docs/Vue/vue-i18n.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/Vue/vue-i18n.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "vue-i18n",
              "heading": "vue-i18n"
            },
            {
              "depth": 2,
              "value": "快速上手",
              "heading": "快速上手"
            },
            {
              "depth": 3,
              "value": "安装",
              "heading": "安装"
            },
            {
              "depth": 3,
              "value": "基于组件的本地化",
              "heading": "基于组件的本地化"
            },
            {
              "depth": 3,
              "value": "需求",
              "heading": "需求"
            },
            {
              "depth": 4,
              "value": "语言环境变更",
              "heading": "语言环境变更"
            },
            {
              "depth": 4,
              "value": "延迟加载翻译",
              "heading": "延迟加载翻译"
            },
            {
              "depth": 2,
              "value": "源码分析",
              "heading": "源码分析"
            }
          ],
          "title": "vue-i18n",
          "nav": {
            "path": "/vue",
            "title": "Vue"
          }
        },
        "title": "vue-i18n"
      },
      {
        "path": "/vue/vue3",
        "component": require('../../docs/Vue/vue3.0-1.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/Vue/vue3.0-1.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "vue3-app",
              "heading": "vue3-app"
            },
            {
              "depth": 2,
              "value": "v-model 指令",
              "heading": "v-model-指令"
            },
            {
              "depth": 2,
              "value": "setup 函数",
              "heading": "setup-函数"
            },
            {
              "depth": 2,
              "value": "reactive 函数",
              "heading": "reactive-函数"
            },
            {
              "depth": 2,
              "value": "ref 函数",
              "heading": "ref-函数"
            },
            {
              "depth": 2,
              "value": "toRefs 函数",
              "heading": "torefs-函数"
            },
            {
              "depth": 2,
              "value": "watch 函数",
              "heading": "watch-函数"
            },
            {
              "depth": 2,
              "value": "computed 函数",
              "heading": "computed-函数"
            },
            {
              "depth": 2,
              "value": "effect 函数",
              "heading": "effect-函数"
            },
            {
              "depth": 2,
              "value": "data 函数",
              "heading": "data-函数"
            },
            {
              "depth": 2,
              "value": "Global API & Composition API",
              "heading": "global-api--composition-api"
            },
            {
              "depth": 2,
              "value": "teleport 传送",
              "heading": "teleport-传送"
            }
          ],
          "title": "vue3-app",
          "nav": {
            "path": "/vue",
            "title": "Vue"
          }
        },
        "title": "vue3-app"
      },
      {
        "path": "/algorithm",
        "meta": {},
        "exact": true,
        "redirect": "/algorithm/leecode"
      },
      {
        "path": "/javascript",
        "meta": {},
        "exact": true,
        "redirect": "/javascript/higher-order function"
      },
      {
        "path": "/vue",
        "meta": {},
        "exact": true,
        "redirect": "/vue/virtual-dom"
      }
    ],
    "title": "hefeng6500 的博客"
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
