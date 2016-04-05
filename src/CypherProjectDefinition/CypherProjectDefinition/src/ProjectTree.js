var projectTree = function (psource) {
    var tree, saveButton, editDiv = $("#editDiv");
    var source, oldSource;
    var saveTreeCallback;
    if (typeof psource == "string") {
        source = {
            "项目名称": psource,
            "角色列表": [],
            "服务列表": [],
            "描述": ""
        };
    }
    else if (typeof psource == "object") {
        source = psource;
    }
    else {
        throw "参数类型错误";
    }

    var oldSource = JSON.stringify(source);

    var nodeType = {
        根节点: "根节点",
        角色列表节点: "角色列表节点",
        角色节点: "角色节点",
        服务列表节点: "服务列表节点",
        服务节点: "服务节点",
        数据结构列表节点: "数据结构列表节点",
        数据结构节点: "数据结构节点",
        字段列表节点: "字段列表节点",
        字段节点: "字段节点",
        功能列表节点: "功能列表节点",
        功能节点: "功能节点",
        异常列表节点: "异常列表节点",
        异常节点: "异常节点"
    };

    var treeJSON = {
        "id": "root",
        "text": source.项目名称,
        "state": { "opened": true },
        "nodeType": nodeType.根节点,
        "sourceData": source,
        "children": [
            {
                "id": "角色列表",
                "text": "角色列表",
                "nodeType": nodeType.角色列表节点,
                "sourceData": source.角色列表,
                "state": { "opened": true },
                "children": source.角色列表.map(function (角色) {
                    return {
                        "id": "角色列表_" + 角色.名称,
                        "text": 角色.名称,
                        "nodeType": nodeType.角色节点,
                        "sourceData": 角色,
                        "state": { "opened": true }
                    };
                })
            },
            {
                "id": "服务列表",
                "text": "服务列表",
                "nodeType": nodeType.服务列表节点,
                "sourceData": source.服务列表,
                "state": { "opened": true },
                "children": source.服务列表.map(function (服务) {
                    return {
                        "id": "服务列表_" + 服务.名称,
                        "text": 服务.名称,
                        "nodeType": nodeType.服务节点,
                        "sourceData": 服务,
                        "state": { "opened": true },
                        "children": [
                            {
                                "id": "服务列表_" + 服务.名称 + "_数据结构列表",
                                "text": "数据结构列表",
                                "nodeType": nodeType.数据结构列表节点,
                                "sourceData": 服务.数据结构列表,
                                "state": { "opened": true },
                                "children": 服务.数据结构列表.map(function (数据结构) {
                                    return {
                                        "id": "服务列表_" + 服务.名称 + "_数据结构_" + 数据结构.名称,
                                        "text": 数据结构.名称,
                                        "nodeType": nodeType.数据结构节点,
                                        "sourceData": 数据结构,
                                        "state": { "opened": true },
                                        "children": [
                                            {
                                                "id": "服务列表_" + 服务.名称 + "_数据结构_" + 数据结构.名称 + "_字段列表",
                                                "text": "字段列表",
                                                "nodeType": nodeType.字段列表节点,
                                                "sourceData": 数据结构.字段列表,
                                                "state": { "opened": true },
                                                "children": 数据结构.字段列表.map(function (字段) {
                                                    return {
                                                        "id": "服务列表_" + 服务.名称 + "_数据结构_" + 数据结构.名称 + "_字段列表_" + 字段.名称,
                                                        "text": 字段.名称,
                                                        "nodeType": nodeType.字段节点,
                                                        "sourceData": 字段,
                                                        "state": { "opened": true }
                                                    };
                                                })
                                            }
                                        ]
                                    };
                                })
                            },
                            {
                                "id": "服务列表_" + 服务.名称 + "_功能列表",
                                "text": "功能列表",
                                "nodeType": nodeType.功能列表节点,
                                "sourceData": 服务.功能列表,
                                "state": { "opened": true },
                                "children": 服务.功能列表.map(function (功能) {
                                    return {
                                        "id": "服务列表_" + 服务.名称 + "_功能列表_" + 功能.名称,
                                        "text": 功能.名称,
                                        "nodeType": nodeType.功能节点,
                                        "sourceData": 功能,
                                        "state": { "opened": true },
                                        "children": [
                                            {
                                                "id": "服务列表_" + 服务.名称 + "_功能列表_" + 功能.名称 + "_异常列表",
                                                "text": "异常列表",
                                                "nodeType": nodeType.异常列表节点,
                                                "sourceData": 功能.异常列表,
                                                "state": { "opened": true },
                                                "children": 功能.异常列表.map(function (异常) {
                                                    return {
                                                        "id": "服务列表_" + 服务.名称 + "_功能列表_" + 功能.名称 + "_异常列表_" + 异常.名称,
                                                        "text": 异常.名称,
                                                        "nodeType": nodeType.异常节点,
                                                        "sourceData": 异常,
                                                        "state": { "opened": true }
                                                    };
                                                })
                                            }
                                        ]
                                    };
                                })
                            }
                        ]
                    };
                })
            }
        ]
    };

    var 获取删除menu = function (type, node) {
        return {
            label: "删除" + type.replace("节点", ""),
            action: function () {
                var list = tree.get_node(node.parent).original.sourceData;
                var el = node.original.sourceData;
                list.delete(el);
                tree.delete_node(node);
                editDiv.empty();
                checkChange();
            }
        };
    };

    var 获取新增menu = function (type, node, getNewObj, getNewTreeNode) {
        return {
            label: "新增" + type,
            action: function () {
                var 列表 = node.original.sourceData;
                var name = prompt("输入新" + type + "名称");
                if (name) {
                    if (列表.some(function (item) {
                        return item.名称 == name;
                    })) {
                        alert(type + "已存在");
                    }
                    else {
                        var newObj = getNewObj(name);
                        列表.push(newObj);
                        tree.create_node(node, getNewTreeNode(newObj, node.id));
                    }
                }
                checkChange();
            }
        }
    };

    var contextMenu = function (node) {
        switch (node.original.nodeType) {
            case nodeType.角色节点:
            case nodeType.服务节点:
            case nodeType.数据结构节点:
            case nodeType.字段节点:
            case nodeType.功能节点:
            case nodeType.异常节点:
                return { 删除: 获取删除menu(node.original.nodeType, node) };
            case nodeType.根节点:
                return null;
            case nodeType.角色列表节点:
                return {
                    新增: 获取新增menu("角色", node,
                        function (name) {
                            return {
                                "名称": name,
                                "继承": [],
                                "描述": ""
                            };
                        },
                        function (newObj) {
                            return {
                                "id": "角色列表_" + newObj.名称,
                                "text": newObj.名称,
                                "nodeType": nodeType.角色节点,
                                "sourceData": newObj,
                                "state": { "opened": true }
                            }
                        })
                };
            case nodeType.服务列表节点:
                return {
                    新增: 获取新增menu("服务", node,
                        function (name) {
                            return {
                                "名称": name,
                                "数据结构列表": [],
                                "功能列表": [],
                                "描述": ""
                            };
                        },
                        function (newObj, pid) {
                            return {
                                "id": pid + "_" + newObj.名称,
                                "text": newObj.名称,
                                "nodeType": nodeType.服务节点,
                                "sourceData": newObj,
                                "state": { "opened": true },
                                "children": [
                                    {
                                        "id": "服务列表_" + newObj.名称 + "_数据结构列表",
                                        "text": "数据结构列表",
                                        "nodeType": nodeType.数据结构列表节点,
                                        "sourceData": newObj.数据结构列表,
                                        "state": { "opened": true },
                                        "children": []
                                    },
                                    {
                                        "id": "服务列表_" + newObj.名称 + "_功能列表",
                                        "text": "功能列表",
                                        "nodeType": nodeType.功能列表节点,
                                        "sourceData": newObj.功能列表,
                                        "state": { "opened": true },
                                        "children": []
                                    }
                                ]
                            }
                        })
                };
            case nodeType.数据结构列表节点:
                return {
                    新增: 获取新增menu("数据结构", node,
                        function (name) {
                            return {
                                "名称": name,
                                "字段列表": [],
                                "描述": ""
                            };
                        },
                        function (newObj, pid) {
                            return {
                                "id": pid + "_" + newObj.名称,
                                "text": newObj.名称,
                                "nodeType": nodeType.数据结构节点,
                                "sourceData": newObj,
                                "state": { "opened": true },
                                "children": [
                                    {
                                        "id": pid + "_" + newObj.名称 + "_字段列表",
                                        "text": "字段列表",
                                        "nodeType": nodeType.字段列表节点,
                                        "sourceData": newObj.字段列表,
                                        "state": { "opened": true },
                                        "children": []
                                    }
                                ]
                            };
                        })
                };
            case nodeType.字段列表节点:
                return {
                    新增: 获取新增menu("字段", node,
                        function (name) {
                            return {
                                "名称": name,
                                "类型": "字符串",
                                "结构": "",
                                "数组": false,
                                "描述": ""
                            };
                        },
                        function (newObj, pid) {
                            return {
                                "id": pid + "_" + newObj.名称,
                                "text": newObj.名称,
                                "nodeType": nodeType.字段节点,
                                "sourceData": newObj,
                                "state": { "opened": true }
                            };
                        })
                };
            case nodeType.功能列表节点:
                return {
                    新增: 获取新增menu("功能", node,
                        function (name) {
                            return {
                                "名称": name,
                                "输入": {
                                    "数据结构": "",
                                    "数组": false,
                                    "描述": ""
                                },
                                "输出": {
                                    "数据结构": "",
                                    "数组": false,
                                    "描述": ""
                                },
                                "异常列表": [],
                                "权限列表": {
                                    "允许角色列表": [],
                                    "拒绝角色列表": []
                                },
                                "描述": ""
                            };
                        },
                        function (newObj, pid) {
                            return {
                                "id": pid + "_" + newObj.名称,
                                "text": newObj.名称,
                                "nodeType": nodeType.功能节点,
                                "sourceData": newObj,
                                "state": { "opened": true },
                                "children": [{
                                    "id": pid + "_" + newObj.名称 + "_异常列表",
                                    "text": "异常列表",
                                    "nodeType": nodeType.异常列表节点,
                                    "sourceData": newObj.异常列表,
                                    "state": { "opened": true },
                                    "children": []
                                }]
                            };
                        })
                };
            case nodeType.异常列表节点:
                return {
                    新增: 获取新增menu("异常", node,
                        function (name) {
                            return {
                                "名称": name,
                                "描述": ""
                            };
                        },
                        function (newObj, pid) {
                            return {
                                "id": pid + "_" + newObj.名称,
                                "text": newObj.名称,
                                "nodeType": nodeType.异常节点,
                                "state": { "opened": true },
                                "sourceData": newObj
                            };
                        })
                };
            default:
                return null
        }
    };

    var buildBaseControl = function (node, container, name, value, ori, data) {
        var aDiv = $("<div>");
        aDiv.append($("<label>" + name + "</label>"));
        var control;
        switch (typeof (value)) {
            case "string":
                if (data) {
                    control = $('<select class="value" name="' + name + '">').appendTo(aDiv);
                    data.forEach(function (e) {
                        control.append($('<option value="' + e.value + '">' + e.text + '</option>'));
                    });
                    control.val(value);
                }
                else {
                    control = $('<input class="value" name="' + name + '">').appendTo(aDiv).val(value);
                }
                aDiv.appendTo(container);
                break;
            case "number":
                control = $('<input type="number" class="value" name="' + name + '">').appendTo(aDiv).val(value);
                aDiv.appendTo(container);
                break;
            case "boolean":
                control = $('<input type="checkbox" class="value" name="' + name + '">').appendTo(aDiv).prop("checked", value);
                aDiv.appendTo(container);
                break;
            default:
                break;
        }

        if (control) {
            control.change(function (e) {
                var value = $(e.currentTarget).val();
                var name = $(e.currentTarget).attr("name");
                if (name == "名称") {
                    if (tree.get_node(node.parent).original.sourceData.some(function (item) {
                            return item.名称 == name;
                    })) {
                        alert(type + "已存在");
                        buildEditForm(node);
                        return;
                    }
                    else {
                        node.text = value;
                        tree.redraw_node(node, true);
                    }
                }
                if (e.currentTarget.type == "checkbox") {
                    ori[name] = $(e.currentTarget).prop("checked");
                }
                else {
                    ori[name] = value;
                }

                checkChange();
            });
        }
    };

    var buildEditForm = function (node) {
        editDiv.empty();
        switch (node.original.nodeType) {
            case nodeType.角色节点:
                for (var i in node.original.sourceData) {
                    buildBaseControl(node, editDiv, i, node.original.sourceData[i], node.original.sourceData);
                }

                var roleList = source.角色列表.filter(function (item) {
                    return item.名称 != node.original.sourceData.名称;
                });
                if (roleList.length > 0) {
                    var checkgroup = $("<div>").appendTo(editDiv);
                    checkgroup.append("<label>继承:</label>");
                    roleList.forEach(function (item) {
                        $('<input value="' + item.名称 + '" type="checkbox"/>').change(function () {
                            var selected = new Array();
                            checkgroup.find('input[type="checkbox"]:checked').each(function (index, el) {
                                selected.push($(el).val());
                            });

                            if (selected.some(function (e) {
                                return $.grep(source.角色列表, function (el) {
                                return el.名称 == e;
                            })[0].继承.some(function (el) {
                                return el == node.original.sourceData.名称;
                            });
                            })) {
                                alert("不能继承被继承的对象");
                                buildEditForm(node);
                            }
                            else {
                                node.original.sourceData.继承 = selected;
                            }


                            checkChange();
                        }).appendTo(checkgroup).before($("<label>" + item.名称 + "</label>"));
                    });
                    node.original.sourceData.继承.forEach(function (item) {
                        checkgroup.find('input[value="' + item + '"]').prop("checked", true);
                    });
                }
                break;
            case nodeType.服务节点:
                for (var i in node.original.sourceData) {
                    buildBaseControl(node, editDiv, i, node.original.sourceData[i], node.original.sourceData);
                }
                break;
            case nodeType.数据结构节点:
                for (var i in node.original.sourceData) {
                    buildBaseControl(node, editDiv, i, node.original.sourceData[i], node.original.sourceData);
                }
                break;
            case nodeType.字段节点:
                for (var i in node.original.sourceData) {
                    if (i == "类型") {
                        var types = new Array();
                        for (var k in cypher_global.枚举.代码生成功能.字段类型) {
                            types.push({
                                value: k,
                                text: k
                            });
                        }
                        buildBaseControl(node, editDiv, i, node.original.sourceData[i], node.original.sourceData, types);
                    }
                    else if (i == "结构") {
                        var structs = tree.get_node(tree.get_node(tree.get_node(node.parent).parent).parent).original.sourceData.map(function (e) {
                            return {
                                value: e.名称,
                                text: e.名称
                            };
                        });
                        structs.unshift({
                            value: "",
                            text: "无"
                        });
                        buildBaseControl(node, editDiv, i, node.original.sourceData[i], node.original.sourceData, structs);
                    }
                    else {
                        buildBaseControl(node, editDiv, i, node.original.sourceData[i], node.original.sourceData);
                    }
                }
                break;
            case nodeType.功能节点:
                for (var i in node.original.sourceData) {
                    buildBaseControl(node, editDiv, i, node.original.sourceData[i], node.original.sourceData);
                }

                var ssource = tree.get_node(tree.get_node(node.parent).parent).original.sourceData.数据结构列表.map(function (e) {
                    return {
                        value: e.名称,
                        text: e.名称
                    };
                });
                ssource.unshift({
                    value: "",
                    text: "无"
                });
                var inputContainer = $("<div>").appendTo(editDiv);
                inputContainer.append("<label>输入:</label>");
                for (var i in node.original.sourceData.输入) {
                    if (i == "数据结构") {
                        buildBaseControl(node, inputContainer, i, node.original.sourceData.输入[i], node.original.sourceData.输入, ssource);
                    }
                    else {
                        buildBaseControl(node, inputContainer, i, node.original.sourceData.输入[i], node.original.sourceData.输入);
                    }
                }

                var outputContainer = $("<div>").appendTo(editDiv);
                outputContainer.append("<label>输出:</label>");
                for (var i in node.original.sourceData.输出) {
                    if (i == "数据结构") {
                        buildBaseControl(node, outputContainer, i, node.original.sourceData.输出[i], node.original.sourceData.输出, ssource);
                    }
                    else {
                        buildBaseControl(node, outputContainer, i, node.original.sourceData.输出[i], node.original.sourceData.输出);
                    }
                }

                var checkgroup = $("<div>").appendTo(editDiv);
                checkgroup.append("<label>允许角色:</label>");
                source.角色列表.forEach(function (item) {
                    $('<input value="' + item.名称 + '" type="checkbox"/>').change(function () {
                        var selected = new Array();
                        checkgroup.find('input[type="checkbox"]:checked').each(function (index, el) {
                            selected.push($(el).val());
                        });
                        node.original.sourceData.权限列表.允许角色列表 = selected;

                        checkChange();
                    }).appendTo(checkgroup).before($("<label>" + item.名称 + "</label>"));
                });
                node.original.sourceData.权限列表.允许角色列表.forEach(function (item) {
                    checkgroup.find('input[value="' + item + '"]').prop("checked", true);
                });

                var checkgroup2 = $("<div>").appendTo(editDiv);
                checkgroup2.append("<label>拒绝角色:</label>");
                source.角色列表.forEach(function (item) {
                    $('<input value="' + item.名称 + '" type="checkbox"/>').change(function () {
                        var selected = new Array();
                        checkgroup2.find('input[type="checkbox"]:checked').each(function (index, el) {
                            selected.push($(el).val());
                        });
                        node.original.sourceData.权限列表.拒绝角色列表 = selected;

                        checkChange();
                    }).appendTo(checkgroup2).before($("<label>" + item.名称 + "</label>"));
                });
                node.original.sourceData.权限列表.拒绝角色列表.forEach(function (item) {
                    checkgroup2.find('input[value="' + item + '"]').prop("checked", true);
                });
                break;
            case nodeType.异常节点:
                for (var i in node.original.sourceData) {
                    buildBaseControl(node, editDiv, i, node.original.sourceData[i], node.original.sourceData);
                }
                break;
            case nodeType.根节点:
                buildBaseControl(node, editDiv, "描述", node.original.sourceData.描述, node.original.sourceData);
                break;
            default:
                break;
        }
    };

    var checkChange = function () {
        if (JSON.stringify(source) != oldSource) {
            saveButton.show();
        }
    }

    this.buildTree = function (container) {
        container.empty();
        editDiv.empty();
        container.jstree({
            'core': {
                'check_callback': true,
                'worker': false,
                'data': treeJSON,
                'themes': {
                    'name': 'proton',
                    'responsive': true
                }
            },
            "plugins": ["contextmenu"],
            contextmenu: {
                items: contextMenu
            }
        });

        saveButton = $('<button class="btn btn-primary btn-xs">保存项目更改</button>').click(function (e) {
            e.preventDefault();
            saveTree();
        }).prependTo(container).hide().button();

        tree = container.jstree();

        container.bind("changed.jstree", function (e, obj) {
            buildEditForm(obj.node);
        });
    };

    var saveTree = function () {
        var 项目定义服务 = CypherProjectDefinition.WebService.项目定义服务;
        var loading = new cypher.loading().show();
        项目定义服务.保存项目(JSON.stringify(source), function (res) {
            loading.hide();
            var result = JSON.parse(res);
            if (result.success) {
                oldSource = JSON.stringify(source);
                saveButton.hide();

                if (saveTreeCallback) {
                    saveTreeCallback(source);
                }
            }
            else {
                alert(result.errMsg);
            }
        }, function (e) {
            alert(e);
            loading.hide();
        });

    };


    this.saveTree = saveTree;
    this.setSaveTreeCallback = function (callback) {
        saveTreeCallback = callback;
    };
};