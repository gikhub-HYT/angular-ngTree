angular
  .module("app", ["ngTree"])
  .constant("url", {
    data_5: "data/data_5.json",
    data_10: "data/data_10.json",
    data_50: "data/data_50.json",
    data_100: "data/data_100.json",
    data_300: "data/data_300.json",
    data_500: "data/data_500.json",
    data_1000: "data/data_1000.json",
    data_2000: "data/data_2000.json",
    data_3000: "data/data_3000.json",
    data_5000: "data/data_5000.json",
    data_10000: "data/data_10000.json"
  })
  .controller("treeController", function(
    $scope,
    $http,
    url,
    treeDataFormatt
  ) {})
  .controller("treeController1", function($scope, $http, url, treeDataFormatt) {
    var setting1 = {
      style: {
        expand: {
          color: "red",
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

    $scope.setting1 = setting1;

    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes1 = res.data;
    });

    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_10).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };

    // 最终提交的数据
    $scope.submit1 = function() {
      var data1 = treeDataFormatt.toList($scope.treeRootNodes1);
      console.log("data1", data1);
    };
  })
  .controller("treeController2", function($scope, $http, url, treeDataFormatt) {
    var setting2 = {
      showFileIcon: false,
      showCheckbox: false,
      injectClass: {
        unexpandIcon: "fa fa-folder",
        expandIcon: "fa fa-folder-open"
      },
      style: {
        expand: {
          color: "grey"
        },
        selected: {
          background: "lightgray"
        }
      }
    };

    $scope.setting2 = setting2;

    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes2 = res.data;
    });

    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_1000).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };

    // 最终提交的数据
    $scope.submit = function(flag) {
      var data2 = treeDataFormatt.toList($scope.treeRootNodes2);
      console.log("data2", data2);
    };
  })
  .controller("treeController3", function($scope, $http, url, treeDataFormatt) {
    var setting3 = {
      multiSelect: true,
      showAppendIcon: true,
      injectClass: {
        unexpandIcon: "fa fa-plus-square-o",
        expandIcon: "fa fa-minus-square-o"
      },
      style: {
        expand: {
          color: "blue"
        },
        selected: {
          background: "yellow"
        },
        label: {
          color: "blue"
        },
        append: {
          color: "blue"
        }
      }
    };

    $scope.setting3 = setting3;

    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes3 = res.data;
    });

    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_50).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };

    // 最终提交的数据
    $scope.submit3 = function() {
      var data3 = treeDataFormatt.toList($scope.treeRootNodes3, 1);
      console.log("data3", data3);
    };
  })
  .controller("treeController4", function($scope, $http, url, treeDataFormatt) {
    var setting4 = {
      injectClass: {
        unexpandIcon: "fa fa-plus-square",
        expandIcon: "fa fa-minus-square"
      },
      style: {
        expand: {
          color: "green"
        },
        selected: {
          background: "purple"
        },
        label: {
          color: "green"
        },
        rename: {
          color: "green"
        },
        remove: {
          color: "green"
        },
        append: {
          color: "green"
        },
        fileIcon: {
          color: "green"
        }
      },
      showCheckbox: false,
      showRenameIcon: true,
      showRemoveIcon: true,
      showFileIcon: true
    };

    $scope.setting4 = setting4;

    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes4 = res.data;
    });

    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_10).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };
    // 最终提交的数据
    $scope.submit = function(flag) {
      var data4 = treeDataFormatt.toList($scope.treeRootNodes4);
      console.log("data4", data4);
    };
  })
  .controller("treeController5", function($scope, $http, url, treeDataFormatt) {
    var setting5 = {
      injectClass: {
        checkedIcon: "fa fa-check-square"
      },
      style: {
        label: {
          color: "gold"
        },
        expand: {
          color: "purple"
        },
        checkbox: {
          color: "gold"
        },
        rename: {
          color: "gold"
        },
        remove: {
          color: "red"
        },
        append: {
          color: "blue"
        }
      },
      showCheckbox: true,
      showToolGroup: true
    };

    $scope.setting5 = setting5;
    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes5 = res.data;
    });
    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_10).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };

    // 最终提交的数据
    $scope.submit5 = function() {
      var data5 = treeDataFormatt.toList($scope.treeRootNodes5);
      console.log("data5", data5);
    };
  })
  .controller("treeController6", function($scope, $http, url, treeDataFormatt) {
    var setting6 = {
      style: {
        expand: {
          color: "GREEN"
        }
      },
      showCheckbox: false
    };

    $scope.setting6 = setting6;

    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes6 = res.data;
    });
    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_10).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };
    // 最终提交的数据
    $scope.submit6 = function(flag) {
      var data6 = treeDataFormatt.toList($scope.treeRootNodes6);
      console.log("data6", data6);
    };
  });
