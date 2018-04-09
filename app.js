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
   
  .controller("treeController1", function($scope, $http, url, treeDataFormatt ) {
    $scope.setting1 = {
      multiSelect: true,
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
      data  = treeDataFormatt.toList($scope.treeRootNodes1,1);
      console.log("data1", data );
    };
  })
  .controller("treeController2", function($scope, $http, url, treeDataFormatt ) {
    $scope.setting2 = {
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

    

    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes2 = res.data;
    });

    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_100).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };

    // 最终提交的数据
    $scope.submit = function(flag) {
      data  = treeDataFormatt.toList($scope.treeRootNodes2,1);
      console.log("data2",  data );
    };
  })
  .controller("treeController3", function($scope, $http, url, treeDataFormatt ) {
    $scope.setting3 = {
      checkboxEnable: true,
      injectClass: {
        unexpandIcon: "fa fa-caret-right",
        expandIcon: "fa fa-caret-down"
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
        },
        fileIcon:{
          color: "blue"
        },
        checkbox:{
          color: "blue"
        }
      }
    };
    // 初始化根节点
    $http.get(url.data_5).then(function(res) {
      $scope.treeRootNodes3 = res.data;
    });
    // 点击展开加载子节点
    $scope.onExpand = function(node, scope) {
      $http.get(url.data_5).then(function(res) {
        var child = res.data;
        node.children = child;
      });
    };
    // 最终提交的数据
    $scope.submit3 = function() {
      data  = treeDataFormatt.toList($scope.treeRootNodes3);
      console.log("data3", data );
    };
  })
  .controller("treeController4", function($scope, $http, url, treeDataFormatt ) {
    $scope.setting4 = {
      injectClass: {
        
        unexpandIcon: "fa fa-plus-square",
        expandIcon: "fa fa-minus-square"
      },
      style: {
        expand: {
          color: "green",
        },
        selected: {
          background: "purple"
        },
        checkbox:{
          color: "green"
        },
        label: {
          color: "green"
        },
        rename: {
          color: "green"
        },
        remove: {
          color: "red"
        },
        append: {
          color: "blue"
        },
        fileIcon: {
          color: "green"
        }
      },
      fileWithIcon: true,
      toolGroupEnable: true,
    };

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
      data  = treeDataFormatt.toList($scope.treeRootNodes4);
      console.log("data4", data );
    };
  })
    
 