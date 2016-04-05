<%@ Page Title="" Language="C#" MasterPageFile="~/Site.Master" AutoEventWireup="true" CodeBehind="index.aspx.cs" Inherits="CypherProjectDefinition.index" %>

<asp:Content ID="ContentHead" ContentPlaceHolderID="head" runat="server">
    <script src="src/ref/jsTree/jstree.js"></script>
    <script src="src/ProjectTree.js"></script>
    <link href="src/ref/jsTree/themes/default-dark/style.css" rel="stylesheet" />
    <link href="src/ref/jsTree/themes/proton/style.css" rel="stylesheet" />
    <link href="css/index.css" rel="stylesheet" />
    <script>
        $(function () {
            var 项目定义服务 = CypherProjectDefinition.WebService.项目定义服务;

            var 获取项目列表 = function () {
                var container = $("#projectList");
                container.empty();
                var newButton = $('<button class="btn btn-default btn-sm">新建项目</button>').click(function (e) {
                    e.preventDefault();
                    var name = prompt("请输入新项目名称");
                    if (name) {
                        buildTree(name);
                    }
                }).appendTo(container).button();


                var loading = new cypher.loading().show();
                项目定义服务.获取项目列表(function (res) {
                    loading.hide();
                    var result = JSON.parse(res);
                    if (result.success) {
                        result.data.forEach(function (item) {
                            var getButton = $('<button class="btn btn-default btn-sm">' + item.名称 + '</button>').appendTo(container);
                            getButton.click(function (e) {
                                e.preventDefault();
                                getProject(item.名称);
                            }).button();
                        });
                    }
                    else {
                        alert(result.errMsg);
                    }
                }, function (e) {
                    loading.hide();
                    alert(e);
                });
            };

            var buildTree = function (data) {
                $("#projectTree").empty();
                var tree = new projectTree(data);
                tree.buildTree($("<div>").appendTo($("#projectTree")));
                tree.setSaveTreeCallback(function (project) {
                    获取项目列表();
                    getProject(project.项目名称);
                });
            };


            var getProject = function (name) {
                var loading = new cypher.loading().show();
                项目定义服务.获取项目(JSON.stringify({ "名称": name }), function (res) {
                    loading.hide();
                    var result = JSON.parse(res);
                    if (result.success) {
                        buildTree(result.data);
                    }
                    else {
                        alert(result.errMsg);
                    }
                }, function (e) {
                    loading.hide();
                    alert(e);
                });
            };

            $("#refreshProjectList").click(function (e) {
                e.preventDefault();
                获取项目列表();
            }).button();

            获取项目列表();
        });
    </script>
</asp:Content>
<asp:Content ID="Content1" ContentPlaceHolderID="ScriptHolder" runat="server">
    <asp:ScriptManager runat="server">
        <Services>
            <asp:ServiceReference Path="~/WebService/项目定义服务.asmx" />
        </Services>
    </asp:ScriptManager>
</asp:Content>
<asp:Content ID="ContentMain" ContentPlaceHolderID="MainContent" runat="server">
    <nav class="navbar navbar-default" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand" href="#">项目定义</a>
            </div>
        </div>
    </nav>
    <div class="container">
        <div class="row">
            <div class="h_container" title="项目列表">
                <button type="button" class="btn btn-primary btn-xs" id="refreshProjectList">刷新项目列表</button>
                <div id="projectList">
                </div>
            </div>
        </div>
        <div class="row">
            <ul class="nav nav-tabs">
                <li class="active"><a href="#def" data-toggle="tab">定义树</a></li>
                <li><a href="#code" data-toggle="tab">代码文本</a></li>
            </ul>

            <!-- Tab panes -->
            <div class="tab-content">
                <div class="tab-pane fade in active" id="def">
                    <div class="col-md-4 highlight">
                        <div id="projectTree"></div>
                    </div>
                    <div class="col-md-8 highlight">
                        <div id="editDiv"></div>
                    </div>
                </div>
                <div class="tab-pane fade" id="code"></div>
            </div>

        </div>
    </div>
</asp:Content>
