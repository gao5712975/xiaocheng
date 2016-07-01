!function (app) {
    var limitCtrl = function ($scope, $http, $location, SysRuleUserFty) {
        $scope.ruleId = getLocationRule($location.absUrl().toString()).ruleId, $scope.ruleId && SysRuleUserFty.getUserRightsByParentId({rightsParentId: $scope.ruleId}).success(function (response) {
            if (response || !(response.items.length < 0)) {
                var ruleList = {16: [], 17: [], 18: [], 19: [], 20: [], 21: [], 22: [], 23: [], 24: [], 25: []};
                if (response.items.forEach(function (ob) {
                        var s = jsonRule[ob.id];
                        ruleList[s.parentId].push(s)
                    }), $scope.ruleList = ruleList, ruleList[16].length > 0) {
                    var companyRule = {};
                    ruleList[16].forEach(function (data) {
                        companyRule[data.id] = data
                    }), $scope.companyRule = companyRule
                }
                if (ruleList[17].length > 0) {
                    var departRule = {};
                    ruleList[17].forEach(function (data) {
                        departRule[data.id] = data
                    }), $scope.departRule = departRule
                }
                if (ruleList[18].length > 0) {
                    var roleRule = {};
                    ruleList[18].forEach(function (data) {
                        roleRule[data.id] = data
                    }), $scope.roleRule = roleRule
                }
                if (ruleList[19].length > 0) {
                    var userRule = {};
                    ruleList[19].forEach(function (data) {
                        userRule[data.id] = data
                    }), $scope.userRule = userRule
                }
                if (ruleList[20].length > 0) {
                    var achiffRule = {};
                    ruleList[20].forEach(function (data) {
                        achiffRule[data.id] = data
                    }), $scope.achiffRule = achiffRule
                }
               if (ruleList[25].length > 0) {
                    var contractRule = {};
                   ruleList[25].forEach(function (data) {
                        contractRule[data.id] = data
                    }), $scope.contractRule = contractRule
                }

            }
        })
    }, companyManageCtrl = function ($scope, $http, SysCompanyFty) {
        ycui.loading.show();
        var pageSize = 10, modView = function (response) {
            ycui.loading.hide(), $scope.page_size = response.page_size, $scope.prev_page = response.prev_page, $scope.total_page = response.total_page, $scope.items = response.items, $scope.page = response.page, $scope.total_count = response.total_count
        };
        SysCompanyFty.companyPageList({pageSize: pageSize}).success(modView), $scope.search = "", $scope.go = "", $scope.redirect = function (num, con) {
            if (num) {
                con && ($scope.search = con);
                var query = {pageSize: pageSize, pageIndex: num};
                $scope.search && (query.companyNameOrAbbr = $scope.search), SysCompanyFty.companyPageList(query).success(modView)
            }
        }
    }, companyEditCtrl = function ($scope, $http, SysCompanyFty, DictionaryFty) {
        id = getSearch("id"), $scope.companyType = "", $scope.companyTypeList = [{name: "总公司", id: 1}, {
            name: "分公司",
            id: 2
        }], ycui.loading.show(), SysCompanyFty.companyEditInfo({id: id}).success(function (response) {
            ycui.loading.hide(), $scope.companyName = response.companyName, $scope.abbrName = response.abbrName, $scope.companyUrl = response.companyUrl, $scope.manager = response.manager, $scope.phone = response.phone, $scope.companyType = response.companyType, $scope.email = response.email, $scope.companyAreaId = response.companyAreaId, setTimeout(function () {
                $("input[type=radio]").each(function (i, n) {
                    $scope.companyAreaId == i + 1 && $(this).prop("checked", "checked")
                })
            }, 200)
        }), $scope.updateCompanyType = function (id) {
            $scope.companyType = id, 1 == id ? $scope.companyAreaId = 0 : $scope.companyAreaId = -1
        }, DictionaryFty.provinceListForCompany().success(function (response) {
            $scope.areaList = response
        }), $scope.getAreaId = function (id) {
            $scope.companyAreaId = id, $(".selectArea").parent().find(".error-message").remove()
        }, $scope.postEdit = function () {
            var parent, pass = !0;
            "" == $scope.companyType && (parent = $(".select-companyType").parent(), parent.find(".error-message").size() <= 0 && parent.append("<span class='error-message'>请选择客户类型</span>"), pass = !1), -1 == $scope.companyAreaId && (parent = $(".selectArea").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择所属地域</span>'), pass = !1), $(".companyCompileForm").valid() || (pass = !1), pass && SysCompanyFty.companyEdit({
                id: id,
                companyName: $scope.companyName,
                abbrName: $scope.abbrName,
                companyUrl: $scope.companyUrl,
                manager: $scope.manager,
                phone: $scope.phone,
                companyType: $scope.companyType,
                companyAreaId: $scope.companyAreaId,
                email: $scope.email
            }).success(function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("companyManage.html")
                    }
                })
            })
        }, $(".companyCompileForm").validate({
            rules: {
                userName: "required",
                companyName: {required: !0},
                myUrl: {required: !0, url: !0},
                companyPerson: "required",
                myPhone: {required: !0, phone: !0},
                myEmail: {required: !0, email: !0}
            },
            messages: {
                userName: "请输入公司名称",
                companyName: {required: "请输入公司简称"},
                myUrl: {required: "请输入网址"},
                companyPerson: "请输入公司负责人",
                myPhone: {required: "请输入联系电话"},
                myEmail: {required: "请输入邮箱"}
            },
            errorClass: "error-span",
            errorElement: "span"
        }), ycui.select(".yc-select")
    }, companyAddCtrl = function ($scope, $http, SysCompanyFty, DictionaryFty) {
        $scope.companyName = "", $scope.companyUrl = "http://", $scope.manager = "", $scope.phone = "", $scope.remark = "", $scope.abbrName = "", $scope.companyTypeList = [{
            name: "总公司",
            id: 1
        }, {name: "分公司", id: 2}], $scope.companyType = 0, $scope.email = "", $scope.updateCompanyType = function (id) {
            $scope.companyType = id, 1 == id ? $scope.companyAreaId = 0 : $scope.companyAreaId = -1
        }, DictionaryFty.provinceListForCompany().success(function (response) {
            $scope.areaList = response
        }), $scope.getAreaId = function (id) {
            $scope.companyAreaId = id, $(".selectArea").parent().find(".error-message").remove()
        }, $scope.postEdit = function () {
            var parent, pass = !0;
            0 == $scope.companyType && (parent = $(".select-companyType").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择公司类型</span>'), pass = !1), -1 == $scope.companyAreaId && (parent = $(".selectArea").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择所属地域</span>'), pass = !1), $(".companyIncreasedForm").valid() || (pass = !1), pass && (ycui.loading.show(), SysCompanyFty.companyAdd({
                companyName: $scope.companyName,
                companyUrl: $scope.companyUrl,
                manager: $scope.manager,
                phone: $scope.phone,
                remark: $scope.remark,
                abbrName: $scope.abbrName,
                companyType: $scope.companyType,
                companyAreaId: $scope.companyAreaId,
                email: $scope.email
            }).success(function (response) {
                ycui.loading.hide(), "string" === ycui.type(response) ? response = JSON.parse(response) : "", response.code && 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("companyManage.html")
                    },
                    timeout: -1
                })
            }))
        }, ycui.select(".yc-select"), $(".companyIncreasedForm").validate({
            rules: {
                userName: "required",
                companyName: {required: !0},
                myUrl: {required: !0, url: !0},
                companyPerson: "required",
                myPhone: {required: !0, phone: !0},
                myEmail: {required: !0, email: !0}
            },
            messages: {
                userName: "请输入公司名称",
                companyName: {required: "请输入公司简称"},
                myUrl: {required: "请输入网址"},
                companyPerson: "请输入公司负责人",
                myPhone: {required: "请输入联系电话"},
                myEmail: {required: "请输入邮箱"}
            },
            errorClass: "error-span",
            errorElement: "span"
        })
    }, departmentManageCtrl = function ($scope, $http, SysDepartmentFty) {
        ycui.loading.show(), pageSize = 10, modView = function (response) {
            ycui.loading.hide(), $scope.page_size = response.page_size, $scope.prev_page = response.prev_page, $scope.total_page = response.total_page, $scope.items = response.items, $scope.page = response.page, $scope.total_count = response.total_count
        }, SysDepartmentFty.getCompany().success(function (response) {
            200 == response.code && ($scope.companyList = response.companyList)
        }), SysDepartmentFty.departmentPageList({pageSize: pageSize}).success(modView), $scope.search = "", $scope.go = "", $scope.redirect = function (num, con) {
            if (num) {
                con && ($scope.search = con);
                var query = {pageSize: pageSize, pageIndex: num};
                $scope.companyId && (query.companyId = $scope.companyId), $scope.search && (query.departmentName = $scope.search), SysDepartmentFty.departmentPageList(query).success(modView)
            }
        }, ycui.select(".yc-select", function (valueId) {
            var arr = valueId.attr("data-value").split(":"), stringId = (valueId.html(), arr[0]), numId = arr[1];
            switch (stringId) {
                case"cn":
                    $scope.companyId = -1 == numId ? "" : numId
            }
            var query = {pageSize: pageSize, pageIndex: 1};
            $scope.search && (query.departmentName = $scope.search), $scope.companyId && (query.companyId = $scope.companyId), SysDepartmentFty.departmentPageList(query).success(modView)
        })
    }, departmentEditCtrl = function ($scope, $http, SysDepartmentFty) {
        var id = getSearch("id");
        ycui.loading.show(), SysDepartmentFty.departmentEditInfo({id: id}).success(function (response) {
            ycui.loading.hide(), $scope.deListId = response.companyId, $scope.companyName = response.companyName, $scope.departmentName = response.departmentName
        }), SysDepartmentFty.departmentListForDep().success(function (response) {
            "string" === ycui.type(response) ? response = JSON.parse(response) : "", $scope.deList = response.companyList
        }), $scope.updateDe = function (id) {
            $scope.deListId = id, $(".select-deType").parent().find(".error-message").remove()
        }, $scope.postEdit = function () {
            SysDepartmentFty.departmentEdit({
                Id: id,
                departmentName: $scope.departmentName,
                companyId: $scope.deListId
            }).success(function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("departmentManage.html")
                    }
                })
            })
        }, $(".departmentCompileForm").validate({
            rules: {myText: "required"},
            messages: {myText: "部门名称不得为空"},
            errorClass: "error-span",
            errorElement: "span",
            submitHandler: function (form) {
                $scope.postEdit()
            }
        }), ycui.select(".yc-select")
    }, departmentAddCtrl = function ($scope, $http, SysDepartmentFty) {
        $scope.deListId = -1, SysDepartmentFty.departmentListForDep().success(function (response) {
            "string" === ycui.type(response) ? response = JSON.parse(response) : "", $scope.deList = response.companyList
        }), $scope.updateDe = function (id) {
            $scope.deListId = id, $(".select-deType").parent().find(".error-message").remove()
        }, $scope.postEdit = function () {
            var parent, pass = !0;
            -1 == $scope.deListId && (parent = $(".select-deType").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择公司</span>'), pass = !1), pass && (ycui.loading.show(), SysDepartmentFty.departmentAdd({
                departmentName: $scope.departmentNames,
                companyId: $scope.deListId
            }).success(function (response) {
                ycui.loading.hide(), "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("departmentManage.html")
                    }
                })
            }))
        }, ycui.select(".yc-select"), $(".departmentIncreasedForm").validate({
            rules: {myText: "required"},
            messages: {myText: "请输入公告名称"},
            errorClass: "error-span",
            errorElement: "span",
            submitHandler: function (form) {
                $scope.postEdit()
            }
        })
    }, roleManageCtrl = function ($scope, $http, SysRuleUserFty) {
        ycui.loading.show();
        var pageSize = 10, modView = function (response) {
            return ycui.loading.hide(), "string" === ycui.type(response) ? response = JSON.parse(response) : "", 500 == response.code ? void ycui.alertInfo(response.msg, "warning", 4500) : ($scope.page_size = response.page_size, $scope.prev_page = response.prev_page, $scope.total_page = response.total_page, $scope.items = response.items, $scope.page = response.page, void($scope.total_count = response.total_count))
        };
        SysRuleUserFty.listRole({pageSize: pageSize}).success(modView), $scope.search = "", $scope.go = "", $scope.redirect = function (num, con) {
            con && ($scope.search = con);
            var query = {pageSize: pageSize, pageIndex: num || 1};
            $scope.search && (query.param1 = $scope.search), SysRuleUserFty.listRole(query).success(modView)
        }, ycui.select(".yc-select")
    }, roleEditCtrl = function ($scope, $http) {
        var getApi = "/role/getRole.htm", postApi = "/role/updateRole.htm", id = getSearch("id");
        ycui.loading.show(), $http.post(baseUrl + getApi + "?id=" + id).success(function (response) {
            ycui.loading.hide(), $scope.roleId = response.roleId, $scope.roleName = response.roleName, $scope.roleCluster = response.roleCluster, $.getJSON("../../static/data/limit.json", function (data) {
                $scope.getAreaids = ycui.createAreas(data, $scope.roleCluster, "#areasList", 1)
            })
        }), $scope.postEdit = function () {
            var roleClusterId = $scope.getAreaids();
            0 == roleClusterId.length ? ycui.alert({content: "角色权限必须勾选"}) : $.post(baseUrl + postApi, {
                id: id,
                roleName: $scope.roleName,
                roleCluster: roleClusterId.join(",")
            }, function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("roleManage.html")
                    },
                    timeout: 100
                })
            })
        }, $(".roleCompileForm").validate({
            rules: {myRole: "required"},
            messages: {myRole: "请输入角色名称"},
            errorClass: "error-span",
            errorElement: "span",
            submitHandler: function (form) {
                $scope.postEdit()
            }
        })
    }, roleAddCtrl = function ($scope, $http) {
        var postUrl = "/role/addRole.htm";
        $scope.roleName = "", $scope.remark = "", $scope.postEdit = function () {
            var roleClusterId = $scope.getAreaids();
            0 == roleClusterId.length ? ycui.alert({content: "角色权限必须勾选"}) : (ycui.loading.show(), $.post(baseUrl + postUrl, {
                roleName: $scope.roleName,
                roleCluster: roleClusterId.join(",")
            }, function (response) {
                ycui.loading.hide(), "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("roleManage.html")
                    },
                    timeout: 100
                })
            }))
        }, $.getJSON("../../static/data/limit.json", function (data) {
            $scope.getAreaids = ycui.createAreas(data, [], "#areasList", 1), testVar = $scope.getAreaids
        }), $(".roleIncreaseForm").validate({
            rules: {myRole: "required"},
            messages: {myRole: "请输入角色名称"},
            errorClass: "error-span",
            errorElement: "span",
            submitHandler: function (form) {
                $scope.postEdit()
            }
        })
    }, roleCheckCtrl = function ($scope, $http) {
        var getApi = "/role/getRole.htm", id = getSearch("id");
        setTimeout(function () {
            $("input").attr("disabled", "disabled")
        }, 200), ycui.loading.show(), $http.get(baseUrl + getApi + "?id=" + id).success(function (response) {
            ycui.loading.hide(), $scope.roleId = response.roleId, $scope.roleName = response.roleName, $scope.roleCluster = response.roleCluster, $.getJSON("../../static/data/limit.json", function (data) {
                $scope.getAreaids = ycui.createAreas(data, $scope.roleCluster, "#areasList", 1)
            })
        }), $scope.backToRole = function () {
            location.replace("roleManage.html")
        }
    }, userManageCtrl = function ($scope, $http, SysUserFty, SysDepartmentFty) {
        var departApi = "/user/depAndUserList.htm", getApi = "/user/paramList.htm", pageSize = 10;
        $http.get(baseUrl + getApi).success(function (response) {
            200 == response.code && ($scope.companyList = response.companyList, $scope.roleList = response.roleList)
        }), ycui.loading.show();
        var modView = function (response) {
            ycui.loading.hide(), $scope.page_size = response.page_size, $scope.prev_page = response.prev_page, $scope.total_page = response.total_page, $scope.items = response.items, $scope.page = response.page, $scope.total_count = response.total_count
        };
        SysUserFty.userList({pageSize: pageSize}).success(modView), SysDepartmentFty.departmentList().success(function (response) {
            "string" === ycui.type(response) ? response = JSON.parse(response) : "", $scope.departmentList = response
        }), $scope.ruleId = getSearch("ruleId"), $scope.search = "", $scope.go = "", $scope.redirect = function (num, con) {
            con && ($scope.search = con);
            var query = {pageSize: pageSize, pageIndex: num || 1};
            $scope.search && (query.logNameOrTrueName = $scope.search), $scope.roleId && (query.searchRole = $scope.roleId), $scope.departmentId && (query.searchDepartment = $scope.departmentId), $scope.companyId && (query.searchCompany = $scope.companyId), SysUserFty.userList(query).success(modView)
        }, ycui.select(".yc-select", function (valueId) {
            var arr = valueId.attr("data-value").split(":"), stringId = arr[0], numId = arr[1];
            switch (stringId) {
                case"ro":
                    $scope.roleId = -1 == numId ? "" : numId;
                    break;
                case"de":
                    $scope.departmentId = -1 == numId ? "" : numId;
                    break;
                case"cn":
                    $scope.companyId = -1 == numId ? 0 : numId, $http.get(baseUrl + departApi + "?companyId=" + $scope.companyId).success(function (response) {
                        $scope.departmentList = response.departmentList
                    })
            }
            var query = {pageSize: pageSize, pageIndex: 1};
            $scope.search && (query.logNameOrTrueName = $scope.search), $scope.roleId && (query.searchRole = $scope.roleId), $scope.departmentId && (query.searchDepartment = $scope.departmentId), $scope.companyId && (query.searchCompany = $scope.companyId), SysUserFty.userList(query).success(modView)
        })
    }, userEditCtrl = function ($scope, $http) {
        var userApi = "/user/paramList.htm", getApi = "/user/getEditUserInfo.htm", postApi = "/user/edit.htm", passApi = "/user/updatePwd.htm", useListApi = "/user/depAndUserList.htm", getPassApi = "/user/validPwd.htm", id = parseInt(getSearch("id"));
        $http.get(baseUrl + userApi).success(function (response) {
            200 == response.code && ($scope.companyList = response.companyList, $scope.departmentList = response.departmentList, $scope.roleList = array1Change2(response.roleList, 5))
        }), $scope.oldPass = "";
        var newPass = $(".dialog-con-pass input").eq(2).val(), isNewPass = $(".dialog-con-pass input").eq(3).val(), oldPass = $(".dialog-con-pass input").eq(1).val();
        $(".dialog-con-pass input[name=oldPass]").blur(function () {
            oldPass = $(".dialog-con-pass input").eq(1).val(), $.post(baseUrl + getPassApi, {
                id: id,
                logPwd: md5(oldPass)
            }).success(function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", 500 == response.code ? $(".passShow").css("display", "block") : $(".passShow").css("display", "none")
            })
        }), $(".dialog-con-pass input[name=newPass]").blur(function () {
            newPass = $(".dialog-con-pass input").eq(2).val(), newPass.length < 6 ? $(".passShow6").css("display", "block") : $(".passShow6").css("display", "none")
        }), $(".dialog-con-pass input[name=newPassAgin]").blur(function () {
            isNewPass = $(".dialog-con-pass input").eq(3).val(), newPass != isNewPass ? $(".passShow2").css("display", "block") : $(".passShow2").css("display", "none")
        }), $(".ok").click(function () {
            var newPass1 = $(".dialog-con-pass input").eq(2).val(), oldPass1 = ($(".dialog-con-pass input").eq(3).val(), $(".dialog-con-pass input").eq(1).val());
            return newPass != isNewPass ? void $(".passShow2").css("display", "block") : void(newPass1.length < 6 ? $(".passShow6").css("display", "block") : $.post(baseUrl + passApi, {
                id: id,
                logPwd: md5(oldPass1),
                newLogPwd: md5(newPass),
                mark: 1
            }, function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("userManage.html")
                    }
                })
            }))
        }), $scope.highBox = function () {
            $(".dialog-con-pass input[type=text]").val($scope.logName), $(".dialog-bg-pass").fadeIn(), $(".dialog-close-pass").click(function () {
                $(".dialog-bg-pass").fadeOut()
            }), $(".no").click(function () {
                $(".dialog-bg-pass").fadeOut()
            }), $(".passShow").css("display", "none"), $(".passShow2").css("display", "none"), $(".passShow6").css("display", "none"), $(".dialog-con-pass input").eq(2).val(""), $(".dialog-con-pass input").eq(3).val(""), $(".dialog-con-pass input").eq(1).val("")
        }, $scope.departmentId = 0, $scope.roleId = 0, $scope.companyId = 0, $scope.leaderId = 0, ycui.loading.show(), $http.post(baseUrl + getApi + "?id=" + id).success(function (response) {
            ycui.loading.hide(), $scope.logName = response.logName, $scope.trueName = response.trueName, $scope.email = response.email, $scope.companyId = response.companyId, $scope.companyName = response.companyName, $scope.departmentId = response.departmentId, $scope.departmentName = response.departmentName, $scope.phone = response.phone, $scope.remark = response.remark, $scope.roleId = response.roleId, $scope.roleName = response.roleName, $scope.leaderId = response.leaderId, $scope.leaderName = response.leaderName, $scope.state = 0 == response.state, $http.get(baseUrl + useListApi + "?companyId=" + $scope.companyId).success(function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", $scope.departmentList = response.departmentList, $scope.userList = response.userList
            }), 0 == $scope.state && $("input[name=close]").prop("checked", !0)
        }), $scope.isSelected = function () {
            $("input[name=open]").prop("checked") ? $("input[name=close]").prop("checked", !1) : $("input[name=close]").prop("checked", !0)
        }, $scope.isSelected2 = function () {
            $("input[name=close]").prop("checked") ? $("input[name=open]").prop("checked", !1) : $("input[name=open]").prop("checked", !0)
        }, $scope.updateRole = function (id) {
            $scope.roleId = id, $(".select-roleType").parent().find(".error-message").remove()
        }, $scope.updateCompanyId = function (id) {
            $scope.companyId = id, $(".select-companyType").parent().find(".error-message").remove()
        }, $scope.updateDepartmengId = function (id) {
            $scope.departmentId = id, $(".select-departmentType").parent().find(".error-message").remove()
        }, $scope.updateUserId = function (id) {
            $scope.leaderId = id, $(".select-departmentType").parent().find(".error-message").remove()
        }, $scope.postEdit = function () {
            var parent, pass = !0;
            0 == $scope.roleId && (parent = $(".select-roleType").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择角色类型</span>'), pass = !1), 0 == $scope.companyId && (parent = $(".select-companyType").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择公司类型</span>'), pass = !1), 0 == $scope.departmentId && (parent = $(".select-departmentType").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择部门名称</span>'), pass = !1), $(".userCompileForm").valid() || (pass = !1), $scope.state = $("input[name=open]").prop("checked"), pass && $.post(baseUrl + postApi, {
                id: id,
                logName: $scope.logName,
                trueName: $scope.trueName,
                email: $scope.email,
                companyId: $scope.companyId,
                departmentId: $scope.departmentId,
                phone: $scope.phone,
                remark: $scope.remark,
                roleId: $scope.roleId,
                leaderId: $scope.leaderId,
                state: 1 == $scope.state ? 0 : -1
            }, function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("userManage.html")
                    }
                })
            })
        }, $(".userCompileForm").validate({
            rules: {
                loginName: "required",
                passWord: {required: !0},
                userName: "required",
                myPhone: {required: !0, phone: !0},
                myEmail: {required: !0, email: !0}
            },
            messages: {
                loginName: "请输入名字",
                passWord: {required: "请输入所属公司"},
                userName: "请输入名字",
                myPhone: {required: "请输入联系电话"},
                myEmail: {required: "请输入邮箱"}
            },
            errorClass: "error-span",
            errorElement: "span"
        }), ycui.select(".yc-select", function (valueId) {
            var arr = valueId.attr("data-value").split(":"), stringId = arr[0], numId = 1 * arr[1];
            switch (stringId) {
                case"ro":
                    $scope.roleId = numId;
                    break;
                case"cn":
                    $scope.companyId = numId, $http.get(baseUrl + useListApi + "?companyId=" + numId).success(function (response) {
                        "string" === ycui.type(response) ? response = JSON.parse(response) : "", $scope.departmentList = response.departmentList, $scope.userList = response.userList
                    });
                    break;
                case"de":
                    $scope.departmentId = numId
            }
        })
    }, userAddCtrl = function ($scope, $http) {
        var userApi = "/user/add.htm", getApi = "/user/paramList.htm", useListApi = "/user/depAndUserList.htm";
        $http.get(baseUrl + getApi).success(function (response) {
            200 == response.code && ($scope.companyList = response.companyList, $scope.departmentList = response.departmentList, $scope.roleList = array1Change2(response.roleList, 5))
        }), $scope.logName = "", $scope.logPwd = "", $scope.logPwd2 = "", $scope.trueName = "", $scope.email = "", $scope.companyId = 0, $scope.departmentId = 0, $scope.phone = "", $scope.state = 0, $scope.leaderId = 0, $scope.updateRole = function (id) {
            $scope.roleId = id, $(".select-roleType").parent().find(".error-message").remove()
        }, $scope.updateCompanyId = function (id) {
            $scope.companyId = id, $(".select-companyType").parent().find(".error-message").remove()
        }, $scope.updateDepartmengId = function (id) {
            $scope.departmentId = id, $(".select-departmentType").parent().find(".error-message").remove()
        }, $scope.updateUserId = function (id) {
            $scope.leaderId = id, $(".select-userType").parent().find(".error-message").remove()
        }, $scope.postEdit = function () {
            var parent, pass = !0;
            return $scope.logPwd != $scope.logPwd2 ? void ycui.alert({content: "两次输入的密码不一样，请重新填写"}) : ($scope.roleId || ($scope.roleIdBo = !0, pass = !1, $scope.$watch("roleId", function (newValue) {
                newValue && ($scope.roleIdBo = !1)
            })), 0 == $scope.companyId && (parent = $(".select-companyType").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择所属公司</span>'), pass = !1), 0 == $scope.departmentId && (parent = $(".select-departmentType").parent(), parent.find(".error-message").size() <= 0 && parent.append('<span class="error-message">请选择所属部门</span>'), pass = !1), $(".userIncreaseForm").valid() || (pass = !1), void(pass && (ycui.loading.show(), $.post(baseUrl + userApi, {
                logName: $scope.logName,
                logPwd: md5($scope.logPwd),
                trueName: $scope.trueName,
                email: $scope.email,
                companyId: $scope.companyId,
                departmentId: $scope.departmentId,
                phone: $scope.phone,
                roleId: $scope.roleId,
                leaderId: $scope.leaderId,
                state: $scope.state
            }, function (response) {
                ycui.loading.hide(), "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("userManage.html")
                    },
                    timeout: 100
                })
            }))))
        }, $(".userIncreaseForm").validate({
            rules: {
                loginName: "required",
                passWord: {required: !0, password: !0},
                isPassWord: {required: !0, password: !0},
                userName: "required",
                myPhone: {required: !0, phone: !0},
                myEmail: {required: !0, email: !0}
            },
            messages: {
                loginName: "请输入用户名",
                passWord: {required: "请输入6位及以上字符，区分大小写"},
                isPassWord: {required: "请再次输入密码"},
                userName: "请输入姓名",
                myPhone: {required: "请输入联系电话"},
                myEmail: {required: "请输入邮箱"}
            },
            errorClass: "error-span",
            errorElement: "span"
        }), ycui.select(".yc-select", function (valueId) {
            var arr = valueId.attr("data-value").split(":"), stringId = arr[0], numId = arr[1];
            "co" == stringId && $http.get(baseUrl + useListApi + "?companyId=" + numId).success(function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", $scope.departmentList = response.departmentList, $scope.userList = response.userList
            })
        })
    }, afficheManageCtrl = function ($scope, $http, SysNoticeFty) {
        var api = "/notice/listNotice.htm", delApi = "/notice/removeNotice.htm";
        ycui.loading.show();
        var pageSize = 10;
        modView = function (response) {
            ycui.loading.hide(), $scope.page_size = response.page_size, $scope.prev_page = response.prev_page, $scope.total_page = response.total_page, $scope.items = response.items, $scope.page = response.page, $scope.total_count = response.total_count
        };
        var newDay = new Date, newDate = newDay.setDate(newDay.getDate() + 1);
        $scope.startTime = getDateFormat(), $scope.endTime = getDateFormat(new Date(newDate)), SysNoticeFty.noticeList({
            pageSize: pageSize,
            startTime: $scope.startTime,
            endTime: $scope.endTime
        }).success(modView), $scope.ruleId = getSearch("ruleId"), $scope.search = "", $scope.go = "", $scope.redirect = function (num, con) {
            con && ($scope.search = con);
            var query = {pageSize: pageSize, pageIndex: num || 1};
            $scope.search && (query.searchConext = $scope.search), $scope.startTime && (query.startTime = $scope.startTime + " 00:00:00"), $scope.endTime && (query.endTime = $scope.endTime + " 23:59:59"), SysNoticeFty.noticeList(query).success(modView)
        }, $scope["delete"] = function (id) {
            ycui.confirm({
                content: "您确定要删除么", okclick: function () {
                    $http.post(baseUrl + delApi + "?id=" + id).success(function (response) {
                        "string" === ycui.type(response) ? response = JSON.parse(response) : "", ycui.alert({
                            content: response.msg,
                            okclick: function () {
                                location.replace("afficheManage.html")
                            }
                        })
                    })
                }
            })
        };
        new pickerDateRange("dateRangeAff", {
            defaultText: " 至 ",
            isSingleDay: !1,
            stopToday: !1,
            calendars: 2,
            startDate: $scope.startTime,
            endDate: $scope.startTime,
            inputTrigger: "dateRange",
            success: function (obj) {
                $scope.startTime = obj.startDate, $scope.endTime = obj.endDate;
                var query = {pageSize: pageSize, pageIndex: 1};
                $scope.search && (query.searchConext = $scope.search), $scope.startTime && (query.startTime = $scope.startTime + " 00:00:00"), $scope.endTime && (query.endTime = $scope.endTime + " 23:59:59"), $http.post(parseGet(baseUrl + api, query)).success(modView)
            }
        })
    }, affcheEditCtrl = function ($scope, $http) {
        var getApi = "/notice/Edit.htm", postApi = "/notice/updateNotice.htm", id = getSearch("id");
        ycui.loading.show(), $http.get(baseUrl + getApi + "?id=" + id).success(function (response) {
            ycui.loading.hide(), $scope.title = response.title, $scope.content = response.content, $scope.isEmail = response.isEmail, $scope.companyId = response.companyId, $scope.departmentId = response.departmentId, $scope.important = response.important, $scope.showDate = response.showDate, $scope.publishUser = response.publishUser, $scope.state = 0 == response.state, $scope.sort = response.sort, $scope.createTime = response.createTime, $scope.updateTime = response.updateTime
        }), $scope.postEdit = function () {
            $.post(baseUrl + postApi, {
                id: id,
                title: $scope.title,
                content: $scope.content,
                state: $scope.state ? 0 : -1,
                isEmail: $scope.isEmail,
                companyId: $scope.companyId,
                departmentId: $scope.departmentId,
                important: $scope.important,
                publishUser: $scope.publishUser
            }, function (response) {
                "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("afficheManage.html")
                    },
                    timeout: 100
                })
            })
        }, $(".affcheCompileForm").validate({
            rules: {userName: "required", myContent: "required"},
            messages: {userName: "请输入公告名称", myContent: "请输入公告内容"},
            errorClass: "error-span",
            errorElement: "span",
            submitHandler: function (form) {
                $scope.postEdit()
            }
        })
    }, affcheAddCtrl = function ($scope, $http) {
        var affcheApi = "/notice/addNotice.htm";
        $scope.title = "", $scope.content = "", $scope.state = !0, $scope.postEdit = function () {
            ycui.loading.show(), $.post(baseUrl + affcheApi, {
                title: $scope.title,
                content: $scope.content,
                state: $scope.state ? 0 : -1
            }, function (response) {
                ycui.loading.hide(), "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        window.open("afficheManage.html", "_self")
                    }
                })
            })
        }, $(".affcheIncreaseForm").validate({
            rules: {myTitle: "required", myContent: "required"},
            messages: {myTitle: "请输入公告名称", myContent: "请输入公告内容"},
            errorClass: "error-span",
            errorElement: "span",
            submitHandler: function (form) {
                $scope.postEdit()
            }
        })
    },contractTolerantCtrl = function ($scope, $http, SysContractTolerantFty) {
        ycui.loading.show();
        SysContractTolerantFty.contractTolerantCurrent().success(function (response) {
            $scope.currentTolerant = response == 'null' ? "暂无" : $scope.tolerantR(response.tolerant),
            $scope.currentTolerantMoney = response == 'null' ? "暂无" : $scope.tolerantManyR(response.tolerantMoney),
            $scope.currentTolerantRule = response == 'null' ? "暂无" : $scope.tolerantRuleR(response.tolerantRule)
        });
        var pageSize = 10, modView = function (response) {
            ycui.loading.hide(), $scope.page_size = response.page_size, $scope.prev_page = response.prev_page, $scope.total_page = response.total_page, $scope.items = response.items, $scope.page = response.page, $scope.total_count = response.total_count
        };
        SysContractTolerantFty.contractTolerantList({pageSize: pageSize}).success(modView), $scope.search = "", $scope.go = "", $scope.tolerantRuleR = function (numRule) {
            return numRule == '0'? "最低原则" : "最高原则";
        }, $scope.tolerantManyR = function (tolerantMany) {
            return "￥"+formatMoney(tolerantMany, 0);
        }, $scope.tolerantR = function (tolerant) {
            return tolerant * 100 +"%";
        }
        /*
         * formatMoney(s,type)
         * 功能：金额按千位逗号分割
         * 参数：s，需要格式化的金额数值.
         * 参数：type,判断格式化后的金额是否需要小数位.
         * 返回：返回格式化后的数值字符串.
         */
        function formatMoney(s, type) {
            if (/[^0-9\.]/.test(s))
                return "0";
            if (s == null || s == "")
                return "0";
            s = s.toString().replace(/^(\d*)$/, "$1.");
            s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
            s = s.replace(".", ",");
            var re = /(\d)(\d{3},)/;
            while (re.test(s))
                s = s.replace(re, "$1,$2");
            s = s.replace(/,(\d\d)$/, ".$1");
            if (type == 0) {// 不带小数位(默认是有小数位)
                var a = s.split(".");
                if (a[1] == "00") {
                    s = a[0];
                }
            }
            return s;
        }
    }, contractTolerantAddCtrl = function ($scope, $http, SysContractTolerantFty) {
        var contractTolerant = {};
        SysContractTolerantFty.contractTolerantCurrent().success(function (response) {
                contractTolerant = response == 'null' ? {} :  response;
                $scope.tolerant = response == 'null' ? null : response.tolerant * 100,
                $scope.tolerantMoney = response == 'null' ? null : response.tolerantMoney,
                $scope.tolerantRule = response == 'null' ? 0 : response.tolerantRule,
                $("ul.yc-select-options li[data-value='"+response.tolerantRule+"']").click();
        });
       $scope.postEdit = function () {
           var t_tolerant =  $scope.tolerant/100;
           (ycui.loading.show(), SysContractTolerantFty.contractTolerantAdd({
                tolerant: t_tolerant,
               tolerantMoney: $scope.tolerantMoney,
               tolerantRule: $scope.tolerantRule
            }).success(function (response) {
                ycui.loading.hide(), "string" === ycui.type(response) ? response = JSON.parse(response) : "", 200 == response.code && ycui.alert({
                    content: response.msg,
                    okclick: function () {
                        location.replace("contractTolerantManage.html")
                    }
                })
            }))
        }, ycui.select(".yc-select"), $(".contractTolerantIncreasedForm").validate({
            rules: {tolerant: "required",tolerantMoney: "required"},
            messages: {tolerant: "请输入比率",tolerantMoney: "请输入绝对值"},
            errorClass: "error-span",
            errorElement: "span",
            submitHandler: function (form) {
                if($scope.tolerant == contractTolerant.tolerant * 100 && $scope.tolerantMoney == contractTolerant.tolerantMoney && $scope.tolerantRule == contractTolerant.tolerantRule){
                    ycui.alert({"content":"数据没有修改，请修改后提交！"});
                    return;
                }
                $scope.postEdit()
            }
        }), $scope.updateSelect = function (type, value) {
           $scope[type] = value;
       }
    }, operationlogCtrl = function ($scope, $http) {
        var api = "/log/listLogs.htm", pageSize = 10, modView = function (response) {
            $scope.page_size = response.page_size, $scope.prev_page = response.prev_page, $scope.total_page = response.total_page, $scope.items = response.items, $scope.page = response.page, $scope.total_count = response.total_count
        };
        $http.post(baseUrl + api + "?pageSize=" + pageSize).success(modView), $scope.search = "", $scope.go = "", $scope.optype = "", $scope.redirect = function (num, con) {
            if (num) {
                con && ($scope.search = con);
                var query = {pageSize: pageSize, pageIndex: num};
                $scope.optype && (query.type = $scope.optype), $scope.search && (query.descr = $scope.search), $http.get(parseGet(baseUrl + api, query)).success(modView)
            }
        }, ycui.select(".yc-select", function (v) {
            $scope.optype = 1 * v.attr("data-value"), $scope.redirect(1)
        });
        new pickerDateRange("dateRangeOperate", {
            defaultText: " 至 ",
            isSingleDay: !1,
            stopToday: !1,
            calendars: 2,
            inputTrigger: "dateRange",
            success: function (obj) {
                $("#dateRange").val(obj.startDate)
            }
        })
    }, errorlogCtrl = function ($scope, $http) {
        var api = "/log/listSystemLogs.htm", pageSize = 10, modView = function (response) {
            $scope.page_size = response.page_size, $scope.prev_page = response.prev_page, $scope.total_page = response.total_page, $scope.items = response.items, $scope.page = response.page, $scope.total_count = response.total_count
        };
        $http.post(baseUrl + api + "?pageSize=" + pageSize).success(modView), $scope.search = "", $scope.go = "", $scope.redirect = function (num, con) {
            if (num) {
                con && ($scope.search = con);
                var query = {pageSize: pageSize, pageIndex: num};
                $http.get(parseGet(baseUrl + api, query)).success(modView)
            }
        }, ycui.select(".yc-select");
        new pickerDateRange("dateRangeError", {
            defaultText: " 至 ",
            isSingleDay: !1,
            stopToday: !1,
            calendars: 2,
            inputTrigger: "dateRange",
            success: function (obj) {
                $("#dateRange").val(obj.startDate)
            }
        })
    };
    app.filter("typeApp", function () {
        return function (input) {
            return 1 == input ? "Web" : 2 == input ? "Wap" : "APP"
        }
    }), app.filter("isNull", function () {
        return function (input) {
            return input ? input : "请选择"
        }
    }), app.filter("companyTypeFtr", function () {
        return function (input) {
            switch (input) {
                case 1:
                    return "总公司";
                case 2:
                    return "分公司";
                default:
                    return "--"
            }
        }
    }), app.controller("companyManageCtrl", ["$scope", "$http", "SysCompanyFty", companyManageCtrl]), app.controller("companyEditCtrl", ["$scope", "$http", "SysCompanyFty", "DictionaryFty", companyEditCtrl]), app.controller("companyAddCtrl", ["$scope", "$http", "SysCompanyFty", "DictionaryFty", companyAddCtrl]), app.controller("departmentManageCtrl", ["$scope", "$http", "SysDepartmentFty", departmentManageCtrl]), app.controller("departmentEditCtrl", ["$scope", "$http", "SysDepartmentFty", departmentEditCtrl]), app.controller("departmentAddCtrl", ["$scope", "$http", "SysDepartmentFty", departmentAddCtrl]), app.controller("roleManageCtrl", ["$scope", "$http", "SysRuleUserFty", roleManageCtrl]), app.controller("roleEditCtrl", ["$scope", "$http", roleEditCtrl]), app.controller("roleAddCtrl", ["$scope", "$http", "SysRuleUserFty", roleAddCtrl]), app.controller("roleCheckCtrl", ["$scope", "$http", roleCheckCtrl]), app.controller("userManageCtrl", ["$scope", "$http", "SysUserFty", "SysDepartmentFty", userManageCtrl]), app.controller("userEditCtrl", ["$scope", "$http", userEditCtrl]), app.controller("userAddCtrl", ["$scope", "$http", userAddCtrl]), app.controller("afficheManageCtrl", ["$scope", "$http", "SysNoticeFty", afficheManageCtrl]), app.controller("affcheEditCtrl", ["$scope", "$http", affcheEditCtrl]), app.controller("affcheAddCtrl", ["$scope", "$http", affcheAddCtrl]),app.controller("contractTolerantCtrl", ["$scope", "$http", "SysContractTolerantFty", contractTolerantCtrl]),app.controller("contractTolerantAddCtrl", ["$scope", "$http", "SysContractTolerantFty", contractTolerantAddCtrl]), app.controller("operationlogCtrl", ["$scope", "$http", operationlogCtrl]), app.controller("errorlogCtrl", ["$scope", "$http", errorlogCtrl]), app.controller("limitCtrl", ["$scope", "$http", "$location", "SysRuleUserFty", limitCtrl]), $(".strategys-items a").click(function () {
        var i = $(this).index();
        $(this).addClass("strategys-itemsFa").siblings().removeClass("strategys-itemsFa"), $(".operationMa-switchover .operationMa-tab ").hide().eq(i).show()
    })
}(app);