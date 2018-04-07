angular
  .module("ngTree", [])
  .value("config", {
    label: "name",
    childrenName: "children"
  })
  .service("treeDataFormatt", function(config) {
    var treeConfig = config;
    function findChilrenHasChecked(rootNodes, list, treeConfig, state) {
      if (state === 0) {
        state = "isChecked";
      } else if (state === 1) {
        state = "selected";
      } else {
        state = "isChecked";
      }
      angular.forEach(rootNodes, function(node, index) {
        var currentNode = angular.copy(node);
        if (node[treeConfig.childrenName].length > 0) {
          findChilrenHasChecked(
            node[treeConfig.childrenName],
            list,
            treeConfig,
            state
          );
        }
        if (node[state] && !node.halfChecked) {
          delete currentNode[treeConfig.childrenName];
          list.push(currentNode);
        }
      });
    }
    this.toList = function(data, state) {
      var treeData = angular.copy(data);
      var list = [];
      findChilrenHasChecked(treeData, list, treeConfig, state);
      return list;
    };
  })
  .controller("treeCtrl", function($scope, config) {
    var treeConfig = {
      label: "name",
      childrenName: "children",
      multiSelect: false,
      showCheckbox: false,
      showFileIcon: false,
      showToolGroup: false,
      showRenameIcon: false,
      showRemoveIcon: false,
      showAppendIcon: false,
      injectClass: {
        unexpandIcon: "fa fa-plus",
        expandIcon: "fa fa-minus",

        checkedIcon: "fa fa-check-square-o",
        halfcheckedIcon: "fa fa-minus-square-o",
        uncheckedIcon: "fa fa-square-o",

        noChildIcon: "fa fa-file",
        fileOpenIcon: "fa fa-folder-open",
        fileCloseIcon: "fa fa-folder",

        removeIcon: "fa fa-trash ",
        renameIcon: "fa fa-pencil-square-o",
        appendchildIcon: "fa fa-plus"
      },
      style: {
        expand: {},
        checkbox: {},
        fileIcon: {},
        rename: {},
        remove: {},
        append: {},
        loading: {},
        label: {
          color: "gray"
        },
        selected: {
          background: "grey"
        }
      }
    };
    if ($scope.setting) {
      treeConfig = angular.merge(treeConfig, $scope.setting);
    }
    // 配置节点名称字段与子节点字段
    config.label = treeConfig.label;
    config.childrenName = treeConfig.childrenName;

    // 获取各级作用域
    var $curNodeScope = $scope.$parent;
    var $parentScope = $curNodeScope.$parent;
    var $parentNodes = $parentScope.treenodes;

    // 自定义名称节点名称与子节点名称
    $scope.labelName = treeConfig.label;
    $scope.childrenName = treeConfig.childrenName;
    //用于控制是否处于重命名状态
    $curNodeScope.isInRename = false;
    //用于控制当前节点是否展开子节点
    $curNodeScope.isOpen = false;
    // 控制是否使用复选框
    $scope.showCheckbox = treeConfig.showCheckbox;
    //是否显示文件图标
    $scope.showFileIcon = treeConfig.showFileIcon;
    // 默认显示增删改工具栏
    $curNodeScope.showToolGroup = treeConfig.showToolGroup;
    // 控制单个工具元素的显示开关
    $curNodeScope.showRename = treeConfig.showRenameIcon;
    $curNodeScope.showRemove = treeConfig.showRemoveIcon;
    $curNodeScope.showAppendchild = treeConfig.showAppendIcon;
    /**
     * 图标配置
     */
    $scope.expandIcon = treeConfig.injectClass.expandIcon;
    $scope.unexpandIcon = treeConfig.injectClass.unexpandIcon;
    // 选中样式
    $scope.checkedIcon = treeConfig.injectClass.checkedIcon;
    $scope.halfcheckedIcon = treeConfig.injectClass.halfcheckedIcon;
    $scope.uncheckedIcon = treeConfig.injectClass.uncheckedIcon;

    // 文件图标样式
    $scope.noChildIcon = treeConfig.injectClass.noChildIcon;
    $scope.fileOpenIcon = treeConfig.injectClass.fileOpenIcon;
    $scope.fileCloseIcon = treeConfig.injectClass.fileCloseIcon;
    //  增删改图标配置
    $scope.removeIcon = treeConfig.injectClass.removeIcon;
    $scope.renameIcon = treeConfig.injectClass.renameIcon;
    $scope.appendchildIcon = treeConfig.injectClass.appendchildIcon;

    /**
     * 图标颜色大小
     */
    $curNodeScope.inputbox = treeConfig.style.input;
    $scope.expandStyle = treeConfig.style.expand;
    $scope.checkboxStyle = treeConfig.style.checkbox;
    $scope.labelStyle = treeConfig.style.label.color;
    $scope.fileStyle = treeConfig.style.fileIcon;
    $scope.loadingStyle = treeConfig.style.loading;
    $curNodeScope.renameStyle = treeConfig.style.rename;
    $curNodeScope.removeStyle = treeConfig.style.remove;
    $curNodeScope.appendStyle = treeConfig.style.append;
    // 阻止默认鼠标右键事件
    document.oncontextmenu = function(e) {
      e.preventDefault();
    };

    // 展开子节点
    $curNodeScope.expand = function(node) {
      // 如果子节点存在，则直接展开
      if (node.children.length > 0) {
        $curNodeScope.isOpen = !$curNodeScope.isOpen;
      } else if (angular.isFunction($scope.onExpand)) {
        $scope.onExpand(node, $curNodeScope);
        node.isLoading = true;
        var cancelWatch = $curNodeScope.$watch(
          function() {
            return node[treeConfig.childrenName].length;
          },
          function(newLength) {
            if (newLength > 0) {
              delete node.isLoading;
              angular.forEach(node[treeConfig.childrenName], function(item) {
                item.isChecked = node.isChecked;
              });
              $curNodeScope.isOpen = !$curNodeScope.isOpen;

              cancelWatch(); //取消监听
            }
          }
        );
      } else {
        alert("请确保您的回调函数正确");
      }
    };
    // 当前节点文字选中
    $scope.select = function(node, $this) {
      node.selected = !node.selected;
      if (node.selected) {
        $this.slecteColor = treeConfig.style.selected.background;
        if (!treeConfig.multiSelect) {
          $this.$emit("select");
        }
      } else {
        delete $this.slecteColor;
      }
    };

    $curNodeScope.$on("select", function(event, data) {
      // 根作用域接收子作用域消息,向所有子节点作用域广播
      // console.log("event.currentScope", event.currentScope);
      if (!event.currentScope.$$ChildScope) {
        event.currentScope.$broadcast("removeSlecteState", {
          $id: event.targetScope.$id
        });
      }
    });

    $curNodeScope.$on("removeSlecteState", function(event, data) {
      if (event.currentScope.node) {
        if (event.currentScope.$id != data.$id) {
          event.currentScope.node.selected = false;
          // console.log("移除当前选中样式");
          delete event.currentScope.slecteColor;
        }
      } else {
        return;
      }
    });

    // 添加子节点
    $curNodeScope.appendChild = function(node) {
      var children = node[treeConfig.childrenName];
      if (angular.isFunction($scope.onAppendchild)) {
        $scope.onAppendchild(node, $curNodeScope);

        var cancelWatch = $curNodeScope.$watch(
          function() {
            return children.length;
          },
          function(newLength, oldLength) {
            if (newLength > oldLength) {
              angular.forEach(node[treeConfig.childrenName], function(
                item,
                index
              ) {
                if (index > oldLength) {
                  item.isChecked = node.isChecked;
                }
              });
              $curNodeScope.isOpen = !$curNodeScope.isOpen;
              cancelWatch(); //取消监听
            }
          }
        );
      } else {
        var childNode = {};
        childNode[treeConfig.label] = "子节点";
        childNode[treeConfig.childrenName] = [];
        var newNode = angular.copy(childNode);
        newNode.name = newNode.name + children.length;
        newNode.isChecked = node.isChecked;
        children.push(newNode);
      }
      //  向子域传递消息
      $curNodeScope.$broadcast("appendChild");
      // 添加子节点是自身展开
      $curNodeScope.isOpen = true;
    };
    //  监听添加子节点事件,使得子节点处于相同的选中状态
    $curNodeScope.$on("appendChild", function(event, data) {
      event.currentScope.node.isChecked = event.targetScope.node.isChecked;
    });
    // 删除节点
    $curNodeScope.remove = function(node, $index) {
      //  执行删除回调
      if (angular.isFunction($scope.onRemove)) {
        $scope.onRemove(node, $curNodeScope);
      }
      // 删除
      $parentNodes.splice($index, 1);
    };
    // 节点重命名
    $curNodeScope.rename = function(node) {
      $curNodeScope.isInRename = !$curNodeScope.isInRename;
    };

    // 失去焦点时恢复不可编辑状态
    $curNodeScope.blur = function(node) {
      //  判断节点名称是否为空
      if (node[treeConfig.label]) {
        $curNodeScope.isInRename = false;
      }
      if (angular.isFunction($scope.onRename)) {
        $scope.onRename(node, $curNodeScope);
      }
    };

    // 按下enter键恢复不可编辑状态
    $curNodeScope.enter = function(node, e) {
      var keycode = window.event ? e.keyCode : e.which;
      if (keycode === 13 && node[treeConfig.label]) {
        $curNodeScope.isInRename = false;
        if (angular.isFunction($scope.onRename)) {
          $scope.onRename(node, $curNodeScope);
        }
      }
    };

    // 复选框回调
    $curNodeScope.checkbox = function(node, $this) {
      if (angular.isFunction($scope.onCheckbox)) {
        $scope.onCheckbox(node, $this);
      }
      //   console.log("$this", $this);
      node.halfChecked = false;
      node.isChecked = !node.isChecked;
      // 向父级节点传递消息
      $curNodeScope.$emit("childCheck", { node: node });
      // 向子级节点传递消息
      $curNodeScope.$broadcast("parentCheck", { node: node });
    };

    //  接收子级节点checkbox事件消息,控制自身的处于何种选中状态
    $curNodeScope.$on("childCheck", function(event, data) {
      if (event.currentScope.node) {
        //  过滤掉发消息的节点
        if (event.currentScope.$id != event.targetScope.$id) {
          //该变量用于存储当前节点选中子节点个数
          var numOfChildrenisChecked = 0;
          //该变量用于存储当前节点半选子节点个数
          var numOfChildrenHalfChecked = 0;
          // 获取当前节点的子元素对象
          var children = event.currentScope.node[treeConfig.childrenName];
          // 获取当前节点的子元素数组长度，亦即对象个数
          var length = children.length;
          // 遍历求取子元素中已选中节点个数
          angular.forEach(children, function(node, index) {
            if (node.isChecked) {
              numOfChildrenisChecked++;
            }
            if (node.halfChecked) {
              numOfChildrenHalfChecked++;
            }
          });
          // 判断当子元素中已选中节点个数域长度是否相等，相等即子元素为全部选中
          if (numOfChildrenHalfChecked > 0) {
            event.currentScope.node.halfChecked = true;
            event.currentScope.node.isChecked = false;
          } else if (numOfChildrenisChecked === length) {
            event.currentScope.node.isChecked = true;
            event.currentScope.node.halfChecked = false;
          } else if (numOfChildrenisChecked === 0) {
            event.currentScope.node.halfChecked = false;
            event.currentScope.node.isChecked = false;
          } else if (numOfChildrenisChecked != length) {
            event.currentScope.node.halfChecked = true;
            event.currentScope.node.isChecked = false;
          }
        }
      }
    });

    //  接收父作用域checkbox事件消息
    $curNodeScope.$on("parentCheck", function(event, data) {
      event.currentScope.node.halfChecked = false;
      event.currentScope.node.isChecked = event.targetScope.node.isChecked;
    });
  })
  .directive("ngTree", function() {
    return {
      restrict: "EA",
      templateUrl: "./angular-ngTree/ngTree.html",
      replace: false,
      controller: "treeCtrl",
      scope: {
        treenodes: "=",
        selectData: "=?",
        setting: "=?",
        onExpand: "=?",
        onCheckbox: "=?",
        onRename: "=?",
        onRemove: "=?",
        onAppendchild: "=?",
        onSelect: "=?"
      }
    };
  });
