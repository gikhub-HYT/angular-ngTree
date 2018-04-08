# Angular-ngTree

  **本项目是一个AngularJS树组件模块,具备样式自定义,增删改,异步数据加载,多选功能,能够满足日常开发大部分需求** 
  

####  特点

```
1.使用原生AngularJs实现,不依赖JQuery

2.支持对当前节点添加子节点,删除以及名称修改

3.支持数据同步/异步加载,以及复选/反选,点击选中单个/多个

4.支持各种样式图标自定义,以及支持复选功能  
```

#### 浏览器支持

```
1.chrom

2.firFox

3.360 浏览器

4.IE9+
```

#### 依赖

```
1.fontAwesome 字体图标库

2.AngularJs 1.5+
```


#### 用法
1.下载
```
 - 下载或克隆本项目，将组件angular-ngTree文件夹与fontAwesome文件夹导入AngularJs项目

```
![输入图片说明](https://gitee.com/uploads/images/2018/0408/134052_5882a4bd_1384885.png "屏幕截图.png")

2.加载css与fontAwesome，加载顺序如下：
```
 <link rel="stylesheet" href="./ngTree/ngTree.css">

 <link rel="stylesheet" href="./font-awesome-4.7.0/css/font-awesome.min.css">
```
3.加载script
```
<script src="angular.js "></script>

<script src="./ngTree/ngTree.js "></script>
```
#### 代码
1.将ngTree模块作为依赖加载到项目的主模块，这里示例的主模块为app模块
```
angular.module("app", ["ngTree"])
```
2.html视图引用
```
 <div ng-tree treenodes="treeRootNodes" on-expand="onExpand" setting='setting' on-checkbox="check"> </div>
```

#### API（属性）

```
1.treenodes

说明：树的根节点数据结构

2.on-expand

说明：展开时执行的回调函数

3.on-checkbox

说明：点击复选框执行的回调函数

4.on-rename

说明：节点重命名完成失去焦点时执行的回调函数

5.on-remove

说明：节点删除完成后执行的回调函数

6.on-append

说明：节点添加子节点时触发的回调函数

7.on-select

说明：节点选中时执行的回调函数

8.setting

说明：ng-tree的功能参数配置，完整配置如下

setting= {

 /********************** 名称/功能选择配置项***************************/

      label: "name", //json数据中节点的名称

      childrenName: "children",//json数据中子节点的名称

      multiSelect: false,//是否可以选中多个点击项

      checkboxEnable: false,//复选功能，默认关闭

      FileWithIcon: false,//给文件配置图标，默认无

      toolGroupEnable: false,//控制增删改工具全部开关，默认关闭

      renameEable: false,//重命名功能，默认关闭

      removeEnable: false,//节点删除功能，默认关闭

      appendEnable: false,//添加子节点功能

/********************** 图标样式类名注入配置项***************************/

      injectClass: {
        unexpandIcon: "fa fa-plus",//收起时的按钮图标
        expandIcon: "fa fa-minus",//展开时的按钮图标

        checkedIcon: "fa fa-check-square-o",//checkbox选中时的图标
        halfcheckedIcon: "fa fa-minus-square-o",//checkbox半选时的图标
        uncheckedIcon: "fa fa-square-o",//checkbox未选中时的图标

        noChildIcon: "fa fa-file",//没有子节点时的文件图标样式
        fileOpenIcon: "fa fa-folder-open",//节点展开时的文件图标样式
        fileCloseIcon: "fa fa-folder",//节点收起时的文件图标样式

        removeIcon: "fa fa-trash ",//删除的图标样式
        renameIcon: "fa fa-pencil-square-o",//重命名的图标样式
        appendchildIcon: "fa fa-plus"//添加子节点的图标样式
      },

/************* 图标样式配置，主要为图标配置的颜色，背景色，与字体************/

      style: {
        expand: {},//展开的图标

        checkbox: {},//复选框

        fileIcon: {},//文件图标

        rename: {},//重命名图标

        remove: {},//删除图标

        append: {},//子节点添加图标

        loading: {},//数据加载中动画图标

        label: {   //节点名称字体颜色
          color: "gray"
        },
        selected: { //节点名称点击选中时的背景色
          background: "grey"
        }
      }

9.回调函数说明

每个回调函数都只提供两个参数，第一个参数为当前点节点数据对象，第二个为当前节点的作用域对象。在控制器中写回调函数如下（以删除回调为例）：

$scope.delete=function(node,scope){
    
       //业务代码
    
}

10.在ngTree模块中，我们还提供一个数据treeDataFormatt的服务,该服务有一个toList用于获取复选选中和点击选中的节点数据，

并以数组返回。用法如下：

1. 返回checkbox复选选中的数据

var data = treeDataFormatt.toList($scope.treeRootNodes);

2. 返回点击选中的文本节点数据

var data = treeDataFormatt.toList($scope.treeRootNodes，1);

```

![checkbox](https://gitee.com/uploads/images/2018/0408/164154_8ff18b6d_1384885.png "checkbox.png")
![select](https://gitee.com/uploads/images/2018/0408/164820_21a0b450_1384885.png "select.png")

#### 示例

假设我们现在需要一棵树，需要实现按需异步载，亦即每次点击展开时再去后台请求当前节点的字节点数据，

且我们需要节点删除功能和复选功能。我们用箭头图标来表示展开和收缩的状态。则controller.js代码如下：

```
app.controller("treeController", function($scope, $http, url, treeDataFormatt) {

    $scope.setting = {
      checkboxEnable: true, //开启复选功能
      removeEnable: true, //开启删除功能
      injectClass: {
        unexpandIcon: "fa fa-caret-right",
        expandIcon: "fa fa-caret-down"
      },
      style: {
        expand: {
          color: "grey",
          "font-size": "14px"
        },
        label: {
          color: "red"
        },
        selected: {
          background: "yellow"
        }
      }
    };

    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes = res.data;
    });

    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_10).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };

    // 提交选中数据
    $scope.submit = function() {
      var data = treeDataFormatt.toList($scope.treeRootNodes);
      console.log("data", data);
    };
  })
```

 **html** 
```
 <div ng-tree treenodes="treeRootNodes" on-expand="onExpand" setting='setting'> </div>
```

![效果图](https://gitee.com/uploads/images/2018/0408/170933_6ce6da93_1384885.gif "ngTree.gif")


