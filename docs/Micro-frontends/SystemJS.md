# SystemJS 实战教程

运行时实现模块的异步加载，解决模块只能在构建时加载的问题。

简单的视频介绍：[https://www.bilibili.com/video/BV1PJ411n7QX?from=search&seid=8357070269812094694](https://www.bilibili.com/video/BV1PJ411n7QX?from=search&seid=8357070269812094694)

SystemJS 仓库[ https://github.com/systemjs/systemjs](https://github.com/systemjs/systemjs)

SystemJS-examples[ https://github.com/systemjs/systemjs-examples]()

## amd-code

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>AMD Modules - SystemJS Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="systemjs-importmap">
      {
        "imports": {
          "saturn": "./lib/saturn.js"
        }
      }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/amd.js"></script>
    <script>
      System.import('saturn');
    </script>
  </head>
  <body></body>
</html>
```

## systemjs use in react app

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>SystemJS AMD Modules from CDN Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="systemjs-importmap">
      {
        "imports": {
          "react": "https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js",
          "react-dom": "https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
        }
      }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.min.js"></script>
  </head>
  <body>
    <div id="react-root"></div>
    <script type="systemjs-module" src="./dist/react-hello-world.js"></script>
  </body>
</html>
```

注意在构建环境需要使用 @babel/plugin-transform-modules-systemjs，打包后的 dist 文件才会 SystemJS 编译源代码

```json
"devDependencies": {
  "@babel/plugin-transform-modules-systemjs": "^7.5.0"
},
```

## webpack-externals

从 bundle.js 不难看出 Vue 没有打进包中，而是通过外部形式引入。具体是通过 System.register(["vue"] 在 System 中注册 Vue 模块，通过 systemjs-importmap 寻找 Vue CDN 的地址

```html
<!DOCTYPE html>
<html lang="en-US">
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>Webpack Externals - SystemJS Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="systemjs-importmap">
      {
        "imports": {
          "vue": "https://cdn.jsdelivr.net/npm/vue",
          "jupiter": "./dist/bundle.js"
        }
      }
    </script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/extras/amd.js"></script>
  </head>
  <body>
    <div id="vue-container"></div>
    <script>
      System.import('jupiter');
    </script>
  </body>
</html>
```

```json
// package.json
{
  "name": "webpack-externals",
  "scripts": {
    "build": "webpack"
  },
  "license": "MIT",
  "devDependencies": {
    "clean-webpack-plugin": "^3.0.0",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  },
  "dependencies": {}
}
```

```js
// webpack.config.js
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/entry.js'),
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'system',
  },
  devtool: 'sourcemap',
  plugins: [new CleanWebpackPlugin()],
  // Webpack externals will be shared across bundles and come from the import map and systemjs
  externals: ['vue', 'vue-router'],
};
```

```jsx | pure
// bundle.js
System.register(['vue'], function(__WEBPACK_DYNAMIC_EXPORT__) {
  var __WEBPACK_EXTERNAL_MODULE_vue__;
  return {
    setters: [
      function(module) {
        __WEBPACK_EXTERNAL_MODULE_vue__ = module;
      },
    ],
    execute: function() {
      __WEBPACK_DYNAMIC_EXPORT__(
        /******/ (function(modules) {
          // webpackBootstrap
          /******/ // The module cache
          /******/ var installedModules = {}; // The require function
          /******/
          /******/ /******/ function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/ if (installedModules[moduleId]) {
              /******/ return installedModules[moduleId].exports;
              /******/
            } // Create a new module (and put it into the cache)
            /******/ /******/ var module = (installedModules[moduleId] = {
              /******/ i: moduleId,
              /******/ l: false,
              /******/ exports: {},
              /******/
            }); // Execute the module function
            /******/
            /******/ /******/ modules[moduleId].call(
              module.exports,
              module,
              module.exports,
              __webpack_require__,
            ); // Flag the module as loaded
            /******/
            /******/ /******/ module.l = true; // Return the exports of the module
            /******/
            /******/ /******/ return module.exports;
            /******/
          } // expose the modules object (__webpack_modules__)
          /******/
          /******/
          /******/ /******/ __webpack_require__.m = modules; // expose the module cache
          /******/
          /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
          /******/
          /******/ /******/ __webpack_require__.d = function(
            exports,
            name,
            getter,
          ) {
            /******/ if (!__webpack_require__.o(exports, name)) {
              /******/ Object.defineProperty(exports, name, {
                enumerable: true,
                get: getter,
              });
              /******/
            }
            /******/
          }; // define __esModule on exports
          /******/
          /******/ /******/ __webpack_require__.r = function(exports) {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
              /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                value: 'Module',
              });
              /******/
            }
            /******/ Object.defineProperty(exports, '__esModule', {
              value: true,
            });
            /******/
          }; // create a fake namespace object // mode & 1: value is a module id, require it // mode & 2: merge all properties of value into the ns // mode & 4: return value when already ns object // mode & 8|1: behave like require
          /******/
          /******/ /******/ /******/ /******/ /******/ /******/ __webpack_require__.t = function(
            value,
            mode,
          ) {
            /******/ if (mode & 1) value = __webpack_require__(value);
            /******/ if (mode & 8) return value;
            /******/ if (
              mode & 4 &&
              typeof value === 'object' &&
              value &&
              value.__esModule
            )
              return value;
            /******/ var ns = Object.create(null);
            /******/ __webpack_require__.r(ns);
            /******/ Object.defineProperty(ns, 'default', {
              enumerable: true,
              value: value,
            });
            /******/ if (mode & 2 && typeof value != 'string')
              for (var key in value)
                __webpack_require__.d(
                  ns,
                  key,
                  function(key) {
                    return value[key];
                  }.bind(null, key),
                );
            /******/ return ns;
            /******/
          }; // getDefaultExport function for compatibility with non-harmony modules
          /******/
          /******/ /******/ __webpack_require__.n = function(module) {
            /******/ var getter =
              module && module.__esModule
                ? /******/ function getDefault() {
                    return module['default'];
                  }
                : /******/ function getModuleExports() {
                    return module;
                  };
            /******/ __webpack_require__.d(getter, 'a', getter);
            /******/ return getter;
            /******/
          }; // Object.prototype.hasOwnProperty.call
          /******/
          /******/ /******/ __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
          }; // __webpack_public_path__
          /******/
          /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
          /******/
          /******/
          /******/ /******/ return __webpack_require__(
            (__webpack_require__.s = './src/entry.js'),
          );
          /******/
        })(
          /************************************************************************/
          /******/ {
            /***/ './src/entry.js':
              /*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
              /*! no exports provided */
              /***/ function(module, __webpack_exports__, __webpack_require__) {
                'use strict';
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
                  /*! vue */ 'vue',
                );
                /* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(
                  vue__WEBPACK_IMPORTED_MODULE_0__,
                );

                console.log('Vue', vue__WEBPACK_IMPORTED_MODULE_0___default.a);

                const App = vue__WEBPACK_IMPORTED_MODULE_0___default.a.default.extend(
                  {
                    template: '<p>Jupiter has {{numMoons}} moons',
                    data: () => ({
                      numMoons: 79,
                    }),
                  },
                );

                new App().$mount('#vue-container');

                /***/
              },

            /***/ vue:
              /*!**********************!*\
  !*** external "vue" ***!
  \**********************/
              /*! no static exports found */
              /***/ function(module, exports) {
                module.exports = __WEBPACK_EXTERNAL_MODULE_vue__;

                /***/
              },

            /******/
          },
        ),
      );
    },
  };
});
//# sourceMappingURL=bundle.js.map
```

## basic-webpack

在 webpack 中出口属性中配置了 `libraryTarget: 'system'`,详见 [模块定义系统](https://webpack.docschina.org/configuration/output/#module-definition-systems), 

> libraryTarget: 'system' —— 这将暴露你的 library 作为一个由 System.register 的模块。此特性首次发布于 webpack 4.30.0。当 webpack bundle 被执行时，系统模块依赖全局的变量 System。编译为 System.register 形式后，你可以使用 System.import('/bundle.js') 而无需额外配置，并会将你的 webpack bundle 包加载到系统模块注册表中。

```jsx | pure
// webpack.config.js
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist'),
  libraryTarget: 'system',
}

```

## webpack-code-splits
实现代码分割： 点击按钮异步加载特定模块

```jsx | pure
<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>SystemJS Example - Webpack Code Splits</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    * {
      font-family: monospace;
    }
  </style>
  <script type="systemjs-importmap">
    {
      "imports": {
        "mars": "./dist/bundle.js"
      }
    }
  </script>
  <script type="systemjs-module" src="import:mars"></script>
  <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
</head>
<body>
</body>
</html>
```

点击按钮异步加载特定模块
```jsx | pure
import './set-public-path'

document.body.appendChild(Object.assign(document.createElement('div'), {textContent: "Are there aliens on Mars?"}))
document.body.appendChild(Object.assign(document.createElement('button'), {textContent: "Click to find out", onclick: findAliens}))

/* This function can be called with the following code:
System.import('mars').then(marsModule => {
  marsModule.findAlens();
})
*/
export function findAliens() {
  import('./sentient-aliens.js')
}
```

## import-map-scopes

SystemJS 的引入作用域

```jsx | pure
<!DOCTYPE html>
<html lang="en-US">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Import Map Scopes SystemJS Example</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="systemjs-importmap">
    {
      "imports": {
        "main": "./main/main.js",
        "dep": "./dep-v1.js"
      },
      "scopes": {
        "./main/": {
          "dep": "./dep-v2.js"
        }
      }
    }
  </script>
  <!-- load SystemJS itself from CDN -->
  <script src="https://cdn.jsdelivr.net/npm/systemjs/dist/system.js"></script>
  <script>
    System.import('main').then(main => {
      console.log('main module was loaded', main);
    });

    System.import('dep').then(dep => {
      console.log('dep, loaded as top level module', dep);
    });

    // prepareImport simply waits for all import maps to be processed
    // You must do so before calling System.resolve()
    System.prepareImport().then(function () {
      System.import('dep', System.resolve('main')).then(dep => {
        console.log('dep, loaded relative to main module', dep);
      });
    });
  </script>
</head>
<body>
  <h1>Check browser console for details</h1>
</body>
</html>
```

```jsx | pure
// main.js
System.register(['dep'], function (_export) {
  let dep;

  return {
    setters: [
      function (ns) {
        dep = ns;
      }
    ],
    execute: function () {
      console.log('main is executing. dep version is', dep.version);
      _export('default', 'main');
    }
  }
})
```

```jsx | pure
// dep-v1.js
System.register([], function (_export) {
  return {
    execute: function() {
      _export('version', 'v1');
    }
  };
});
```

```jsx | pure
// dep-v2.js
System.register([], function (_export) {
  return {
    execute: function() {
      _export('version', 'v2');
    }
  };
});
```

控制台输出如下：
```jsx | pure
dep, loaded as top level module Module {version: "v1", Symbol(Symbol.toStringTag): "Module"}
dep, loaded relative to main module Module {version: "v2", Symbol(Symbol.toStringTag): "Module"}
main is executing. dep version is v2
main module was loaded Module {default: "main", Symbol(Symbol.toStringTag): "Module"}
```


