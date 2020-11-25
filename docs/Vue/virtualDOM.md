# 虚拟 DOM

## 什么是虚拟 DOM

- Virtual DOM(虚拟 DOM)，是由普通的 JS 对象来描述 DOM 对象，因为不是真实的 DOM 对象，所以叫 Virtual DOM
- 真实 DOM

```javascript
let element = document.querySelector('#app');
let s = '';
for (var key in element) {
  s += key + ',';
}
console.log(s);
```

```
// 打印结果
align,title,lang,translate,dir,hidden,accessKey,draggable,spellcheck,aut
ocapitalize,contentEditable,isContentEditable,inputMode,offsetParent,off
setTop,offsetLeft,offsetWidth,offsetHeight,style,innerText,outerText,onc
opy,oncut,onpaste,onabort,onblur,oncancel,oncanplay,oncanplaythrough,onc
hange,onclick,onclose,oncontextmenu,oncuechange,ondblclick,ondrag,ondrag
end,ondragenter,ondragleave,ondragover,ondragstart,ondrop,ondurationchan
ge,onemptied,onended,onerror,onfocus,oninput,oninvalid,onkeydown,onkeypr
ess,onkeyup,onload,onloadeddata,onloadedmetadata,onloadstart,onmousedown
,onmouseenter,onmouseleave,onmousemove,onmouseout,onmouseover,onmouseup,
onmousewheel,onpause,onplay,onplaying,onprogress,onratechange,onreset,on
resize,onscroll,onseeked,onseeking,onselect,onstalled,onsubmit,onsuspend
,ontimeupdate,ontoggle,onvolumechange,onwaiting,onwheel,onauxclick,ongot
pointercapture,onlostpointercapture,onpointerdown,onpointermove,onpointe
rup,onpointercancel,onpointerover,onpointerout,onpointerenter,onpointerl
eave,onselectstart,onselectionchange,onanimationend,onanimationiteration
,onanimationstart,ontransitionend,dataset,nonce,autofocus,tabIndex,click
,focus,blur,enterKeyHint,onformdata,onpointerrawupdate,attachInternals,n
amespaceURI,prefix,localName,tagName,id,className,classList,slot,part,at
tributes,shadowRoot,assignedSlot,innerHTML,outerHTML,scrollTop,scrollLef
t,scrollWidth,scrollHeight,clientTop,clientLeft,clientWidth,clientHeight
,attributeStyleMap,onbeforecopy,onbeforecut,onbeforepaste,onsearch,eleme
ntTiming,previousElementSibling,nextElementSibling,children,firstElement
Child,lastElementChild,childElementCount,onfullscreenchange,onfullscreen
error,onwebkitfullscreenchange,onwebkitfullscreenerror,setPointerCapture
,releasePointerCapture,hasPointerCapture,hasAttributes,getAttributeNames
,getAttribute,getAttributeNS,setAttribute,setAttributeNS,removeAttribute
,removeAttributeNS,hasAttribute,hasAttributeNS,toggleAttribute,getAttrib
uteNode,getAttributeNodeNS,setAttributeNode,setAttributeNodeNS,removeAtt
ributeNode,closest,matches,webkitMatchesSelector,attachShadow,getElement
sByTagName,getElementsByTagNameNS,getElementsByClassName,insertAdjacentE
lement,insertAdjacentText,insertAdjacentHTML,requestPointerLock,getClien
tRects,getBoundingClientRect,scrollIntoView,scroll,scrollTo,scrollBy,scr
ollIntoViewIfNeeded,animate,computedStyleMap,before,after,replaceWith,re
move,prepend,append,querySelector,querySelectorAll,requestFullscreen,web
kitRequestFullScreen,webkitRequestFullscreen,createShadowRoot,getDestina
tionInsertionPoints,ELEMENT_NODE,ATTRIBUTE_NODE,TEXT_NODE,CDATA_SECTION_
NODE,ENTITY_REFERENCE_NODE,ENTITY_NODE,PROCESSING_INSTRUCTION_NODE,COMME
NT_NODE,DOCUMENT_NODE,DOCUMENT_TYPE_NODE,DOCUMENT_FRAGMENT_NODE,NOTATION
_NODE,DOCUMENT_POSITION_DISCONNECTED,DOCUMENT_POSITION_PRECEDING,DOCUMEN
T_POSITION_FOLLOWING,DOCUMENT_POSITION_CONTAINS,DOCUMENT_POSITION_CONTAI
NED_BY,DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC,nodeType,nodeName,baseU
RI,isConnected,ownerDocument,parentNode,parentElement,childNodes,firstCh
ild,lastChild,previousSibling,nextSibling,nodeValue,textContent,hasChild
Nodes,getRootNode,normalize,cloneNode,isEqualNode,isSameNode,compareDocu
mentPosition,contains,lookupPrefix,lookupNamespaceURI,isDefaultNamespace
,insertBefore,appendChild,replaceChild,removeChild,addEventListener,remo
veEventListener,dispatchEvent
```

### 真实 DOM

```javascript
import $ from 'jquery';

let heroes = [
  { name: '剑圣', age: 80, offsetTop: 0, elmHeight: 20 },
  { name: '盲僧', age: 30, offsetTop: 0, elmHeight: 20 },
  { name: '暗夜猎手', age: 50, offsetTop: 0, elmHeight: 20 },
  { name: '寒冰射手', age: 20, offsetTop: 0, elmHeight: 20 },
  { name: '赏金猎人', age: 40, offsetTop: 0, elmHeight: 20 },
];

function render() {
  let html = '';
  heroes.forEach(hero => {
    html += `
    <li class="hero" style="opacity: 0; transform: translateX(0px) translateY(${hero.offsetTop}px)">
      <div>
        <span class="left">姓名：${hero.name}</span>
        <span class="left l30">年龄：${hero.age}</span>
        <span class="right close">x</span>
      </div>
    </li>
  `;
  });
  $('.content > ul').html(html);

  $('.content > ul > li').each((index, li) => {
    heroes[index].elmHeight = $(li).height();
  });

  heroes = heroes.reduce((arr, hero) => {
    let last = arr[arr.length - 1];
    hero.offsetTop = last ? last.elmHeight + last.offsetTop + 10 : 10;
    return arr.concat(hero);
  }, []);

  nextFrame();

  // 删除
  $('.close').click(function() {
    let $li = $(this)
      .parent()
      .parent();
    let index = $li.index();
    heroes.splice(index, 1);
    render();
  });
}

render();

// 设置动画
function nextFrame() {
  requestAnimationFrame(function() {
    let list = $('.content>ul>li');
    heroes.forEach((hero, index) => {
      let li = list.get(index);
      $(li).css({
        opacity: 1,
        transform: `translateX(0px) translateY(${hero.offsetTop}px)`,
      });
    });
  });
}

// 排序
$('.sort').click(function() {
  heroes = heroes.sort(function(a, b) {
    return a.age - b.age;
  });
  render();
});

// 添加
$('.add').click(function() {
  heroes.unshift({
    name: Math.random()
      .toString(36)
      .substr(2),
    age: 18,
  });
  render();
});
```

**真实 DOM 不能够记录前后两次变化的状态，在 render 的时候是覆盖式的更新列表进而刷新视图，所以会出现整体列表闪烁的原因。**

### 虚拟 DOM

```javascript
import snabbdomBuddle from 'snabbdom/snabbdom.bundle';

let { patch, h } = snabbdomBuddle;
let heroes = [
  { id: 1, name: '剑圣', age: 80, elmHeight: 0, offsetTop: 0 },
  { id: 2, name: '盲僧', age: 30, elmHeight: 0, offsetTop: 0 },
  { id: 3, name: '暗夜猎手', age: 50, elmHeight: 0, offsetTop: 0 },
  { id: 4, name: '寒冰射手', age: 20, elmHeight: 0, offsetTop: 0 },
  { id: 5, name: '赏金猎人', age: 40, elmHeight: 0, offsetTop: 0 },
];

let lastId = heroes[heroes.length - 1] ? heroes[heroes.length - 1].id + 1 : 1;

let oldVnode = null;
function render(data) {
  data.reduce((arr, hero) => {
    let last = arr[arr.length - 1];
    hero.offsetTop = last ? last.offsetTop + last.elmHeight + 10 : 10;
    return arr.concat(hero);
  }, []);

  oldVnode = patch(oldVnode, view(heroes));
}

function view(data) {
  return h('div.main', [
    h('div.btn-group', [
      h('div.btn.add', { on: { click: add } }, '增加'),
      h('div.btn.sort', { on: { click: sort } }, '排序'),
    ]),
    h('div.content', [
      h(
        'ul',
        heroes.map(hero => {
          return h(
            'li.hero',
            {
              key: hero.id,
              hook: {
                insert: vnode => {
                  hero.elmHeight = vnode.elm.offsetHeight;
                },
              },
              style: {
                opacity: 0,
                transform: `translateY(0px)`,
                delayed: {
                  opacity: 1,
                  transform: `translateY(${hero.offsetTop}px)`,
                },
                remove: {
                  opacity: 0,
                  transform: `translateX(0px)`,
                },
              },
            },
            [
              h('div', [
                h(
                  'span.left',
                  {
                    style: {
                      destroy: {
                        color: 'red',
                      },
                    },
                  },
                  '姓名：' + hero.name,
                ),
                h(
                  'span.left.l30',
                  {
                    style: {
                      destroy: {
                        color: 'blue',
                      },
                    },
                  },
                  '年龄：' + hero.age,
                ),
                h(
                  'span.right.close',
                  { on: { click: [closeX, hero.id] } },
                  'x',
                ),
              ]),
            ],
          );
        }),
      ),
    ]),
  ]);
}

function add() {
  lastId++;
  heroes.unshift({
    name: Math.floor(Math.random() * 10000)
      .toString(16)
      .substr(0, 2),
    age: Math.floor(Math.random() * 100),
    id: lastId,
    elmHeight: 42,
    offsetTop: 10,
  });
  render(heroes);
}
function sort() {
  heroes = heroes.sort((a, b) => {
    return a.age - b.age;
  });
  render(heroes);
}
function closeX(id) {
  heroes = heroes.filter(hero => {
    if (hero.id !== id) {
      return hero;
    }
    return null;
  });
  render(heroes);
}

let app = document.querySelector('#app');
oldVnode = patch(app, view(heroes));
render(heroes);
```

### 虚拟 DOM 库

[virtual-dom](https://github.com/Matt-Esch/virtual-dom)

[snabbdom](https://github.com/snabbdom/snabbdom)

- Vue 2.x 内部使用的 Virtual DOM 就是改造的 Snabbdom
- 大约 200 SLOC（single line of code）
- 通过模块可扩展
- 源码使用 TypeScript 开发
- 最快的 Virtual DOM 之一
