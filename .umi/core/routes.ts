// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from 'D:/workplace/blog/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/~demos/:uuid",
    "layout": false,
    "wrappers": [require('../dumi/layout').default],
    "component": (props) => {
        const { default: getDemoRenderArgs } = require('D:/workplace/blog/node_modules/@umijs/preset-dumi/lib/plugins/features/demo/getDemoRenderArgs');
        const { default: Previewer } = require('dumi-theme-default/es/builtins/Previewer.js');
        const { usePrefersColor, context } = require('dumi/theme');

        
      const { demos } = React.useContext(context);
      const renderArgs = getDemoRenderArgs(props, demos);

      // for listen prefers-color-schema media change in demo single route
      usePrefersColor();

      switch (renderArgs.length) {
        case 1:
          // render demo directly
          return renderArgs[0];

        case 2:
          // render demo with previewer
          return React.createElement(
            Previewer,
            renderArgs[0],
            renderArgs[1],
          );

        default:
          return `Demo ${props.match.params.uuid} not found :(`;
      }
    
        }
  },
  {
    "path": "/_demos/:uuid",
    "redirect": "/~demos/:uuid"
  },
  {
    "__dumiRoot": true,
    "layout": false,
    "path": "/",
    "wrappers": [require('../dumi/layout').default, require('D:/workplace/blog/node_modules/dumi-theme-default/es/layout.js').default],
    "routes": [
      {
        "path": "/",
        "component": require('D:/workplace/blog/docs/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/index.md",
          "updatedTime": 1655287147000,
          "hero": {
            "title": "阿里 P6 进阶之路",
            "desc": "<div class=\"markdown\"><p>🍙 To be an overflow stack engineer</p></div>",
            "actions": [
              {
                "text": "开始 →",
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
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2022<br />Powered by <a href=\"https://d.umijs.org/zh-CN\" target=\"_blank\">dumi<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"\" x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [],
          "title": "Index"
        },
        "title": "Index - 高级前端进阶"
      },
      {
        "path": "/algorithm/1-删除排序数组中的重复项",
        "component": require('D:/workplace/blog/docs/algorithm/1-删除排序数组中的重复项.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/algorithm/1-删除排序数组中的重复项.md",
          "updatedTime": 1628171938000,
          "slugs": [
            {
              "depth": 1,
              "value": "1-删除排序数组中的重复项",
              "heading": "1-删除排序数组中的重复项"
            }
          ],
          "title": "1-删除排序数组中的重复项",
          "nav": {
            "path": "/algorithm",
            "title": "力扣"
          }
        },
        "title": "1-删除排序数组中的重复项 - 高级前端进阶"
      },
      {
        "path": "/algorithm/2-买卖股票的最佳时机",
        "component": require('D:/workplace/blog/docs/algorithm/2-买卖股票的最佳时机.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/algorithm/2-买卖股票的最佳时机.md",
          "updatedTime": 1617716611000,
          "slugs": [
            {
              "depth": 1,
              "value": "2-买卖股票的最佳时机 II",
              "heading": "2-买卖股票的最佳时机-ii"
            }
          ],
          "title": "2-买卖股票的最佳时机 II",
          "nav": {
            "path": "/algorithm",
            "title": "力扣"
          }
        },
        "title": "2-买卖股票的最佳时机 II - 高级前端进阶"
      },
      {
        "path": "/algorithm/3-旋转数组",
        "component": require('D:/workplace/blog/docs/algorithm/3-旋转数组.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/algorithm/3-旋转数组.md",
          "updatedTime": 1617890525000,
          "slugs": [
            {
              "depth": 1,
              "value": "3-旋转数组",
              "heading": "3-旋转数组"
            }
          ],
          "title": "3-旋转数组",
          "nav": {
            "path": "/algorithm",
            "title": "力扣"
          }
        },
        "title": "3-旋转数组 - 高级前端进阶"
      },
      {
        "path": "/algorithm/algorithm-complexity",
        "component": require('D:/workplace/blog/docs/algorithm/algorithm-complexity.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/algorithm/algorithm-complexity.md",
          "updatedTime": 1606547000000,
          "slugs": [
            {
              "depth": 1,
              "value": "算法的时间与空间复杂度",
              "heading": "算法的时间与空间复杂度"
            },
            {
              "depth": 2,
              "value": "一、时间复杂度",
              "heading": "一时间复杂度"
            },
            {
              "depth": 3,
              "value": "常数阶O(1)",
              "heading": "常数阶o1"
            },
            {
              "depth": 3,
              "value": "线性阶O(n)",
              "heading": "线性阶on"
            },
            {
              "depth": 3,
              "value": "对数阶O(logN)",
              "heading": "对数阶ologn"
            },
            {
              "depth": 3,
              "value": "平方阶O(n²)",
              "heading": "平方阶on"
            },
            {
              "depth": 3,
              "value": "立方阶O(n³)、K次方阶O(n^k)",
              "heading": "立方阶onk次方阶onk"
            },
            {
              "depth": 2,
              "value": "二、空间复杂度",
              "heading": "二空间复杂度"
            },
            {
              "depth": 3,
              "value": "空间复杂度 O(1)",
              "heading": "空间复杂度-o1"
            },
            {
              "depth": 3,
              "value": "空间复杂度 O(n)",
              "heading": "空间复杂度-on"
            }
          ],
          "title": "算法的时间与空间复杂度",
          "nav": {
            "path": "/algorithm",
            "title": "力扣"
          }
        },
        "title": "算法的时间与空间复杂度 - 高级前端进阶"
      },
      {
        "path": "/algorithm/leecode",
        "component": require('D:/workplace/blog/docs/algorithm/leecode.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/algorithm/leecode.md",
          "updatedTime": 1606544679000,
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
              "heading": "1两数之和"
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
              "heading": "20有效的括号"
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
        "title": "🔥LeetCode 热题 HOT 100 - 高级前端进阶"
      },
      {
        "path": "/articles/article1",
        "component": require('D:/workplace/blog/docs/articles/article1.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/articles/article1.md",
          "updatedTime": 1636286458000,
          "nav": {
            "title": "博客",
            "order": 1,
            "path": "/articles"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "使用 GitHub Actions 实现 Dumi 博客自动化部署",
              "heading": "使用-github-actions-实现-dumi-博客自动化部署"
            },
            {
              "depth": 2,
              "value": "一、创建静态站点脚手架",
              "heading": "一创建静态站点脚手架"
            },
            {
              "depth": 2,
              "value": "二、创建 github 仓库",
              "heading": "二创建-github-仓库"
            },
            {
              "depth": 3,
              "value": "1、创建 blog 仓库",
              "heading": "1创建-blog-仓库"
            },
            {
              "depth": 3,
              "value": "2、创建 gh-pages 分支",
              "heading": "2创建-gh-pages-分支"
            },
            {
              "depth": 2,
              "value": "三、配置 github Actions 流水线",
              "heading": "三配置-github-actions-流水线"
            }
          ],
          "title": "使用 GitHub Actions 实现 Dumi 博客自动化部署"
        },
        "title": "使用 GitHub Actions 实现 Dumi 博客自动化部署 - 高级前端进阶"
      },
      {
        "path": "/articles/docker",
        "component": require('D:/workplace/blog/docs/articles/docker.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/articles/docker.md",
          "updatedTime": 1611412749000,
          "slugs": [
            {
              "depth": 1,
              "value": "[手把手系列之]Docker 部署 vue 项目",
              "heading": "手把手系列之docker-部署-vue-项目"
            },
            {
              "depth": 2,
              "value": "Docker 部署 vue 项目",
              "heading": "docker-部署-vue-项目"
            },
            {
              "depth": 2,
              "value": "1.写在前面：",
              "heading": "1写在前面"
            },
            {
              "depth": 2,
              "value": "2.具体实现：",
              "heading": "2具体实现"
            },
            {
              "depth": 2,
              "value": "3 创建 vue 应用",
              "heading": "3-创建-vue-应用"
            },
            {
              "depth": 3,
              "value": "3.1 vue cli 创建一个vue项目",
              "heading": "31-vue-cli-创建一个vue项目"
            },
            {
              "depth": 3,
              "value": "3.2 改写",
              "heading": "32-改写"
            },
            {
              "depth": 3,
              "value": "3.3 构建vue项目",
              "heading": "33-构建vue项目"
            },
            {
              "depth": 2,
              "value": "4 构建vue应用镜像",
              "heading": "4-构建vue应用镜像"
            },
            {
              "depth": 3,
              "value": "4.1 获取 nginx 镜像",
              "heading": "41-获取-nginx-镜像"
            },
            {
              "depth": 3,
              "value": "4.2 创建 nginx config配置文件",
              "heading": "42-创建-nginx-config配置文件"
            },
            {
              "depth": 3,
              "value": "4.3 创建 Dockerfile 文件",
              "heading": "43-创建-dockerfile-文件"
            },
            {
              "depth": 3,
              "value": "4.4 基于该Dockerfile构建vue应用镜像",
              "heading": "44-基于该dockerfile构建vue应用镜像"
            },
            {
              "depth": 3,
              "value": "4.5 启动 vue app 容器",
              "heading": "45-启动-vue-app-容器"
            },
            {
              "depth": 2,
              "value": "5 接口服务",
              "heading": "5-接口服务"
            },
            {
              "depth": 3,
              "value": "5.1 express 服务",
              "heading": "51-express-服务"
            },
            {
              "depth": 3,
              "value": "5.2 获取 node 镜像",
              "heading": "52-获取-node-镜像"
            },
            {
              "depth": 3,
              "value": "5.3 编写 Dockerfile 将 express 应用 docker 化",
              "heading": "53-编写-dockerfile-将-express-应用-docker-化"
            },
            {
              "depth": 3,
              "value": "5.4 构建 nodewebserver 镜像",
              "heading": "54-构建-nodewebserver-镜像"
            },
            {
              "depth": 3,
              "value": "5.5 启动 nodeserver 容器",
              "heading": "55-启动-nodeserver-容器"
            },
            {
              "depth": 2,
              "value": "6. 跨域转发",
              "heading": "6-跨域转发"
            },
            {
              "depth": 3,
              "value": "6.1 查看 nodeserver 容器的 ip 地址：",
              "heading": "61-查看-nodeserver-容器的-ip-地址"
            },
            {
              "depth": 3,
              "value": "6.2 修改 nginx 配置",
              "heading": "62-修改-nginx-配置"
            },
            {
              "depth": 2,
              "value": "7. 改进",
              "heading": "7-改进"
            },
            {
              "depth": 3,
              "value": "7.1 修改 Dockerfile 文件",
              "heading": "71-修改-dockerfile-文件"
            },
            {
              "depth": 3,
              "value": "7.2 重新运行vue应用容器",
              "heading": "72-重新运行vue应用容器"
            },
            {
              "depth": 3,
              "value": "7.3 配置负载均衡",
              "heading": "73-配置负载均衡"
            },
            {
              "depth": 2,
              "value": "8. 写在后面",
              "heading": "8-写在后面"
            },
            {
              "depth": 2,
              "value": "9 总结",
              "heading": "9-总结"
            }
          ],
          "title": "[手把手系列之]Docker 部署 vue 项目",
          "nav": {
            "path": "/articles",
            "title": "博客"
          }
        },
        "title": "[手把手系列之]Docker 部署 vue 项目 - 高级前端进阶"
      },
      {
        "path": "/articles/front-end-knowledge-system-map",
        "component": require('D:/workplace/blog/docs/articles/front-end-knowledge-system-map.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/articles/front-end-knowledge-system-map.md",
          "updatedTime": 1610805953000,
          "slugs": [
            {
              "depth": 1,
              "value": "前端知识体系图谱",
              "heading": "前端知识体系图谱"
            }
          ],
          "title": "前端知识体系图谱",
          "nav": {
            "path": "/articles",
            "title": "博客"
          }
        },
        "title": "前端知识体系图谱 - 高级前端进阶"
      },
      {
        "path": "/articles/interview-knowledge",
        "component": require('D:/workplace/blog/docs/articles/interview-knowledge.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/articles/interview-knowledge.md",
          "updatedTime": 1614178744000,
          "slugs": [
            {
              "depth": 1,
              "value": "面试知识点",
              "heading": "面试知识点"
            },
            {
              "depth": 2,
              "value": "计算机基础",
              "heading": "计算机基础"
            },
            {
              "depth": 2,
              "value": "前端基础 HTML",
              "heading": "前端基础-html"
            },
            {
              "depth": 2,
              "value": "前端技术 CSS",
              "heading": "前端技术-css"
            },
            {
              "depth": 3,
              "value": "浏览器页面渲染",
              "heading": "浏览器页面渲染"
            },
            {
              "depth": 2,
              "value": "前端技术 javaScript",
              "heading": "前端技术-javascript"
            },
            {
              "depth": 2,
              "value": "基础 javaScript",
              "heading": "基础-javascript"
            },
            {
              "depth": 2,
              "value": "高阶 javaScript",
              "heading": "高阶-javascript"
            },
            {
              "depth": 2,
              "value": "算法",
              "heading": "算法"
            },
            {
              "depth": 2,
              "value": "设计模式",
              "heading": "设计模式"
            },
            {
              "depth": 2,
              "value": "前端工程化",
              "heading": "前端工程化"
            },
            {
              "depth": 2,
              "value": "webpack",
              "heading": "webpack"
            },
            {
              "depth": 2,
              "value": "Vue",
              "heading": "vue"
            },
            {
              "depth": 3,
              "value": "Vue 源码分析",
              "heading": "vue-源码分析"
            }
          ],
          "title": "面试知识点",
          "nav": {
            "path": "/articles",
            "title": "博客"
          }
        },
        "title": "面试知识点 - 高级前端进阶"
      },
      {
        "path": "/articles/learning-plan",
        "component": require('D:/workplace/blog/docs/articles/learning-plan.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/articles/learning-plan.md",
          "updatedTime": 1610805904000,
          "slugs": [
            {
              "depth": 1,
              "value": "学习计划",
              "heading": "学习计划"
            },
            {
              "depth": 2,
              "value": "2021.01",
              "heading": "202101"
            },
            {
              "depth": 2,
              "value": "2020.02",
              "heading": "202002"
            }
          ],
          "title": "学习计划",
          "nav": {
            "path": "/articles",
            "title": "博客"
          }
        },
        "title": "学习计划 - 高级前端进阶"
      },
      {
        "path": "/articles/observer vs pub-sub pattern",
        "component": require('D:/workplace/blog/docs/articles/Observer vs Pub-Sub pattern.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/articles/Observer vs Pub-Sub pattern.md",
          "updatedTime": 1655277933501,
          "slugs": [
            {
              "depth": 1,
              "value": "观察者模式 和 发布-订阅 模式",
              "heading": "观察者模式-和-发布-订阅-模式"
            },
            {
              "depth": 2,
              "value": "观察者模式",
              "heading": "观察者模式"
            },
            {
              "depth": 2,
              "value": "发布-订阅模式",
              "heading": "发布-订阅模式"
            },
            {
              "depth": 2,
              "value": "总结",
              "heading": "总结"
            }
          ],
          "title": "观察者模式 和 发布-订阅 模式",
          "nav": {
            "path": "/articles",
            "title": "博客"
          }
        },
        "title": "观察者模式 和 发布-订阅 模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns/adapter-mode",
        "component": require('D:/workplace/blog/docs/design-patterns/adapter-mode.md').default,
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
        "title": "适配器模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns/decorator-mode",
        "component": require('D:/workplace/blog/docs/design-patterns/decorator-mode.md').default,
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
        "title": "装饰器模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns/factory-mode",
        "component": require('D:/workplace/blog/docs/design-patterns/factory-mode.md').default,
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
        "title": "简单工厂模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns",
        "component": require('D:/workplace/blog/docs/design-patterns/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/design-patterns/index.md",
          "updatedTime": 1612518169000,
          "nav": {
            "title": "设计模式",
            "path": "/design-patterns"
          },
          "slugs": [
            {
              "depth": 1,
              "value": "设计模式",
              "heading": "设计模式"
            },
            {
              "depth": 2,
              "value": "面向对象",
              "heading": "面向对象"
            }
          ],
          "title": "设计模式"
        },
        "title": "设计模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns/observer-mode",
        "component": require('D:/workplace/blog/docs/design-patterns/observer-mode.md').default,
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
        "title": "观察者模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns/prototype-mode",
        "component": require('D:/workplace/blog/docs/design-patterns/prototype-mode.md').default,
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
        "title": "原型模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns/publish-subscribe-mode",
        "component": require('D:/workplace/blog/docs/design-patterns/publish-subscribe-mode.md').default,
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
        "title": "发布订阅模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns/singleton-mode",
        "component": require('D:/workplace/blog/docs/design-patterns/singleton-mode.md').default,
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
        "title": "单例模式 - 高级前端进阶"
      },
      {
        "path": "/design-patterns/strategy-mode",
        "component": require('D:/workplace/blog/docs/design-patterns/strategy-mode.md').default,
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
        "title": "策略模式 - 高级前端进阶"
      },
      {
        "path": "/interview/html",
        "component": require('D:/workplace/blog/docs/interview/html.md').default,
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
        "title": "html - 高级前端进阶"
      },
      {
        "path": "/interview",
        "component": require('D:/workplace/blog/docs/interview/index.md').default,
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
        "title": "面试题 - 高级前端进阶"
      },
      {
        "path": "/javascript/higher-order function",
        "component": require('D:/workplace/blog/docs/javascript/higher-order function.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/javascript/higher-order function.md",
          "updatedTime": 1655277933511,
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
              "heading": "1aop-切片编程"
            },
            {
              "depth": 1,
              "value": "2、函数柯里化",
              "heading": "2函数柯里化"
            },
            {
              "depth": 2,
              "value": "2.1 最基本的柯里化拆分",
              "heading": "21-最基本的柯里化拆分"
            },
            {
              "depth": 2,
              "value": "2.2、柯里化通用式",
              "heading": "22柯里化通用式"
            },
            {
              "depth": 2,
              "value": "2.3、柯里化与 bind",
              "heading": "23柯里化与-bind"
            },
            {
              "depth": 1,
              "value": "3、反柯里化",
              "heading": "3反柯里化"
            },
            {
              "depth": 2,
              "value": "3.1、反柯里化通用式",
              "heading": "31反柯里化通用式"
            },
            {
              "depth": 3,
              "value": "2、通过函数调用生成反柯里化函数",
              "heading": "2通过函数调用生成反柯里化函数"
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
        "title": "高阶函数 - 高级前端进阶"
      },
      {
        "path": "/javascript/prototype",
        "component": require('D:/workplace/blog/docs/javascript/prototype.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/javascript/prototype.md",
          "updatedTime": 1606315224000,
          "slugs": [
            {
              "depth": 1,
              "value": "原型、原型链和继承",
              "heading": "原型原型链和继承"
            },
            {
              "depth": 1,
              "value": "基本概念",
              "heading": "基本概念"
            },
            {
              "depth": 2,
              "value": "什么是原型？",
              "heading": "什么是原型"
            },
            {
              "depth": 2,
              "value": "什么式原型链？",
              "heading": "什么式原型链"
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
        "title": "原型、原型链和继承 - 高级前端进阶"
      },
      {
        "path": "/javascript/write",
        "component": require('D:/workplace/blog/docs/javascript/write.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/javascript/write.md",
          "updatedTime": 1655287147000,
          "slugs": [
            {
              "depth": 1,
              "value": "JavaScript 高级之手写系列",
              "heading": "javascript-高级之手写系列"
            },
            {
              "depth": 2,
              "value": "1、forEach",
              "heading": "1foreach"
            },
            {
              "depth": 2,
              "value": "2、map",
              "heading": "2map"
            },
            {
              "depth": 2,
              "value": "3、reduce",
              "heading": "3reduce"
            },
            {
              "depth": 2,
              "value": "4、new",
              "heading": "4new"
            },
            {
              "depth": 2,
              "value": "5、call",
              "heading": "5call"
            }
          ],
          "title": "JavaScript 高级之手写系列",
          "nav": {
            "path": "/javascript",
            "title": "Javascript"
          }
        },
        "title": "JavaScript 高级之手写系列 - 高级前端进阶"
      },
      {
        "path": "/learning/2021learning-plan",
        "component": require('D:/workplace/blog/docs/learning/2021learning-plan.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/learning/2021learning-plan.md",
          "updatedTime": 1610803064000,
          "slugs": [
            {
              "depth": 1,
              "value": "2021 年学习记录",
              "heading": "2021-年学习记录"
            }
          ],
          "title": "2021 年学习记录",
          "nav": {
            "path": "/learning",
            "title": "Learning"
          }
        },
        "title": "2021 年学习记录 - 高级前端进阶"
      },
      {
        "path": "/learning/collection",
        "component": require('D:/workplace/blog/docs/learning/collection.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/learning/collection.md",
          "updatedTime": 1610803064000,
          "slugs": [
            {
              "depth": 1,
              "value": "收集的学习资料",
              "heading": "收集的学习资料"
            },
            {
              "depth": 2,
              "value": "Vue 系列",
              "heading": "vue-系列"
            },
            {
              "depth": 2,
              "value": "React 系列",
              "heading": "react-系列"
            },
            {
              "depth": 2,
              "value": "博客系列",
              "heading": "博客系列"
            }
          ],
          "title": "收集的学习资料",
          "nav": {
            "path": "/learning",
            "title": "Learning"
          }
        },
        "title": "收集的学习资料 - 高级前端进阶"
      },
      {
        "path": "/learning",
        "component": require('D:/workplace/blog/docs/learning/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/learning/index.md",
          "updatedTime": 1610803064000,
          "slugs": [
            {
              "depth": 1,
              "value": "Learning",
              "heading": "learning"
            }
          ],
          "title": "Learning",
          "nav": {
            "path": "/learning",
            "title": "Learning"
          }
        },
        "title": "Learning - 高级前端进阶"
      },
      {
        "path": "/micro-frontends",
        "component": require('D:/workplace/blog/docs/Micro-frontends/index.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/Micro-frontends/index.md",
          "updatedTime": 1610618242000,
          "slugs": [],
          "nav": {
            "path": "/micro-frontends",
            "title": "Micro-frontends"
          },
          "title": "Micro-frontends"
        },
        "title": "Micro-frontends - 高级前端进阶"
      },
      {
        "path": "/micro-frontends/system-js",
        "component": require('D:/workplace/blog/docs/Micro-frontends/SystemJS.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/Micro-frontends/SystemJS.md",
          "updatedTime": 1610618242000,
          "slugs": [
            {
              "depth": 1,
              "value": "SystemJS 实战教程",
              "heading": "systemjs-实战教程"
            },
            {
              "depth": 2,
              "value": "amd-code",
              "heading": "amd-code"
            },
            {
              "depth": 2,
              "value": "systemjs use in react app",
              "heading": "systemjs-use-in-react-app"
            },
            {
              "depth": 2,
              "value": "webpack-externals",
              "heading": "webpack-externals"
            },
            {
              "depth": 2,
              "value": "basic-webpack",
              "heading": "basic-webpack"
            },
            {
              "depth": 2,
              "value": "webpack-code-splits",
              "heading": "webpack-code-splits"
            },
            {
              "depth": 2,
              "value": "import-map-scopes",
              "heading": "import-map-scopes"
            }
          ],
          "title": "SystemJS 实战教程",
          "nav": {
            "path": "/micro-frontends",
            "title": "Micro-frontends"
          }
        },
        "title": "SystemJS 实战教程 - 高级前端进阶"
      },
      {
        "path": "/performance",
        "component": require('D:/workplace/blog/docs/performance/index.md').default,
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
        "title": "性能优化总括 - 高级前端进阶"
      },
      {
        "path": "/performance/time-slice",
        "component": require('D:/workplace/blog/docs/performance/time-slice.md').default,
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
              "heading": "最粗暴的做法一次性渲染"
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
        "title": "如何高性能的渲染十万条数据(时间分片) - 高级前端进阶"
      },
      {
        "path": "/performance/virtual-scroll",
        "component": require('D:/workplace/blog/docs/performance/virtual-scroll.md').default,
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
        "title": "如何高性能的渲染十万条数据(虚拟列表) - 高级前端进阶"
      },
      {
        "path": "/react",
        "component": require('D:/workplace/blog/docs/React/index.md').default,
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
              "heading": "1为-dom-元素添加-ref"
            },
            {
              "depth": 3,
              "value": "2、为 class 组件添加 Ref",
              "heading": "2为-class-组件添加-ref"
            },
            {
              "depth": 3,
              "value": "3、ref转发",
              "heading": "3ref转发"
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
              "heading": "高阶组件-hoc-component"
            },
            {
              "depth": 4,
              "value": "高阶组件的应用：",
              "heading": "高阶组件的应用"
            },
            {
              "depth": 2,
              "value": "render props",
              "heading": "render-props"
            },
            {
              "depth": 3,
              "value": "1、原生实现",
              "heading": "1原生实现"
            },
            {
              "depth": 3,
              "value": "2、children",
              "heading": "2children"
            },
            {
              "depth": 3,
              "value": "3、render属性",
              "heading": "3render属性"
            },
            {
              "depth": 3,
              "value": "4、HOC",
              "heading": "4hoc"
            }
          ],
          "title": "React 进阶",
          "nav": {
            "path": "/react",
            "title": "React"
          }
        },
        "title": "React 进阶 - 高级前端进阶"
      },
      {
        "path": "/react/react-source",
        "component": require('D:/workplace/blog/docs/React/react-source.md').default,
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
              "heading": "实现-createdomrender"
            },
            {
              "depth": 4,
              "value": "前置知识",
              "heading": "前置知识"
            },
            {
              "depth": 4,
              "value": "createDOM()、render() 源码实现",
              "heading": "createdomrender-源码实现"
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
        "title": "React 源码 - 高级前端进阶"
      },
      {
        "path": "/vue/virtual-dom",
        "component": require('D:/workplace/blog/docs/Vue/virtualDOM.md').default,
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
        "title": "虚拟 DOM - 高级前端进阶"
      },
      {
        "path": "/vue/vue-i18n",
        "component": require('D:/workplace/blog/docs/Vue/vue-i18n.md').default,
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
        "title": "vue-i18n - 高级前端进阶"
      },
      {
        "path": "/vue/vue-router",
        "component": require('D:/workplace/blog/docs/Vue/vue-router.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/Vue/vue-router.md",
          "updatedTime": 1618730221000,
          "slugs": [
            {
              "depth": 1,
              "value": "Vue-Router 源码解析",
              "heading": "vue-router-源码解析"
            },
            {
              "depth": 2,
              "value": "介绍",
              "heading": "介绍"
            },
            {
              "depth": 2,
              "value": "Vue.use()",
              "heading": "vueuse"
            },
            {
              "depth": 2,
              "value": "install 方法",
              "heading": "install-方法"
            },
            {
              "depth": 2,
              "value": "创建匹配器",
              "heading": "创建匹配器"
            },
            {
              "depth": 2,
              "value": "创建历史管理",
              "heading": "创建历史管理"
            }
          ],
          "title": "Vue-Router 源码解析",
          "nav": {
            "path": "/vue",
            "title": "Vue"
          }
        },
        "title": "Vue-Router 源码解析 - 高级前端进阶"
      },
      {
        "path": "/vue/vue3",
        "component": require('D:/workplace/blog/docs/Vue/vue3.0-1.md').default,
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
        "title": "vue3-app - 高级前端进阶"
      },
      {
        "path": "/algorithm",
        "meta": {},
        "exact": true,
        "redirect": "/algorithm/1-删除排序数组中的重复项"
      },
      {
        "path": "/articles",
        "meta": {
          "order": 1
        },
        "exact": true,
        "redirect": "/articles/article1"
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
    "title": "高级前端进阶",
    "component": (props) => props.children
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
