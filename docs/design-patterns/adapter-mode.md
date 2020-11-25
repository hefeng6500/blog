# 适配器模式

> 解决两个软件实体间的接口不兼容的问题。使用适配器模式之后，原本 由于接口不兼容而不能工作的两个软件实体可以一起工作。

```js
var googleMap = {
  show: function() {
    console.log('开始渲染google地图');
  },
};

var baiduMap = {
  show: function() {
    console.log('开始渲染baidu地图');
  },
};

var renderMap = function(map) {
  if (map.show instanceof Function) {
    map.show();
  }
};

renderMap(googleMap);
renderMap(baiduMap);
```

如果 baiduMap 提供的方法名并不是 show 而是 display 呢？使用适配器模式可以在符合**开发-封闭原则**的设计原则下达到目的

```js
var googleMap = {
  show: function () {
    console.log('开始渲染google地图')
  }
}

var baiduMap = {
  display: function () {
    console.log('开始渲染baidu地图')
  }
}

var baiduMapAdapter = {
  show: function () {
    return baiduMap.display()
  }
}
var renderMap = function (map) {
  if (map.show instanceof Function) {
    map.show()
  }
}
renderMap(googleMap)
renderMap(baiduMapAd
```
