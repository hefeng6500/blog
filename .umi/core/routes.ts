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
      ...{
        "menus": {
          "*": {
            "/getting-started": [
              { "path": "/getting-started", "title": "快速上手", "meta": {} }
            ],
            "*": [{ "path": "/", "title": "Hello dumi!", "meta": {} }],
            "/interview": [
              { "path": "/interview", "title": "面试题", "meta": {} },
              { "path": "/interview/html", "title": "html", "meta": {} }
            ]
          }
        },
        "locales": [],
        "navs": {
          "*": [
            { "title": "快速上手", "order": 1, "path": "/getting-started" },
            { "path": "/interview", "title": "Interview" }
          ]
        },
        "title": "Site Name",
        "mode": "site",
        "base": '/blog/',
        "description": "hefeng6500的博客"
      },
      ...props,
    }),
    "routes": [
      {
        "path": "/getting-started",
        "component": require('../../docs/getting-started.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/getting-started.md",
          "updatedTime": 1606223050083,
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
          "updatedTime": 1606223070061,
          "hero": {
            "title": "Site Name",
            "desc": "<div class=\"markdown\"><p>dumi site app 脚手架</p></div>",
            "actions": [
              {
                "text": "快速上手",
                "link": "/getting-started"
              }
            ]
          },
          "features": [
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/881dc458-f20b-407b-947a-95104b5ec82b/k79dm8ih_w144_h144.png",
              "title": "特性 1",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d60657df-0822-4631-9d7c-e7a869c2f21c/k79dmz3q_w126_h126.png",
              "title": "特性 2",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            },
            {
              "icon": "https://gw.alipayobjects.com/zos/bmw-prod/d1ee0c6f-5aed-4a45-a507-339a4bfe076c/k7bjsocq_w144_h144.png",
              "title": "特性 3",
              "desc": "<div class=\"markdown\"><p>Balabala</p></div>"
            }
          ],
          "footer": "<div class=\"markdown\"><p>Open-source MIT Licensed | Copyright © 2020<br />Powered by <a href=\"https://d.umijs.org\" target=\"_blank\" rel=\"noopener noreferrer\">dumi<svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden x=\"0px\" y=\"0px\" viewBox=\"0 0 100 100\" width=\"15\" height=\"15\" class=\"__dumi-default-external-link-icon\"><path fill=\"currentColor\" d=\"M18.8,85.1h56l0,0c2.2,0,4-1.8,4-4v-32h-8v28h-48v-48h28v-8h-32l0,0c-2.2,0-4,1.8-4,4v56C14.8,83.3,16.6,85.1,18.8,85.1z\"></path><polygon fill=\"currentColor\" points=\"45.7,48.7 51.3,54.3 77.2,28.5 77.2,37.2 85.2,37.2 85.2,14.9 62.8,14.9 62.8,22.9 71.5,22.9\"></polygon></svg></a></p></div>",
          "slugs": [
            {
              "depth": 2,
              "value": "Hello dumi!",
              "heading": "hello-dumi"
            }
          ],
          "title": "Hello dumi!"
        },
        "title": "Hello dumi!"
      },
      {
        "path": "/interview/html",
        "component": require('../../docs/interview/html.md').default,
        "exact": true,
        "meta": {
          "filePath": "docs/interview/html.md",
          "updatedTime": 1606223623955,
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
            "title": "Interview"
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
          "updatedTime": 1606223529261,
          "slugs": [
            {
              "depth": 1,
              "value": "面试题",
              "heading": "面试题"
            }
          ],
          "title": "面试题",
          "nav": {
            "path": "/interview",
            "title": "Interview"
          }
        },
        "title": "面试题"
      }
    ],
    "title": "Site Name"
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
