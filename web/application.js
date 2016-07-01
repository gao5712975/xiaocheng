var ApplicationConfig = function () {
    var moduleName = "WangCheng", moduleDependencies = [];
    return {moduleName: moduleName, moduleDependencies: moduleDependencies}
}(), configForm = {
    headers: {"Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"},
    transformRequest: function (data) {
        return data ? $.param(data) : void 0
    }
}, configJson = {
    headers: {"Content-Type": "application/json;charset=UTF-8"}, transformRequest: function (data) {
        return data ? JSON.stringify(data) : void 0
    }
}, app = angular.module(ApplicationConfig.moduleName, ApplicationConfig.moduleDependencies);
app.config(["$locationProvider", "$httpProvider", function ($locationProvider, $httpProvider) {
    $httpProvider.defaults.headers.post.Accept = "*/*", $httpProvider.interceptors.push("InterceptorHttp")
}]), app.factory("InterceptorHttp", [function () {
    return {
        responseError: function (rejection) {
            return rejection.status <= 0 ? (ycui.alert({content: "系统错误", timeout: -1}), rejection) : rejection
        }, request: function (request) {
            return request
        }, response: function (response) {
            if (response.data && 205 == response.data.status)return "/login.html" == location.pathname ? response : (top.location.href = baseUrl + "/login.html", response);
            if (500 == response.status)return ycui.alert({content: "系统错误", timeout: -1}), response;
            if (415 == response.status)return ycui.alert({content: "参数错误", timeout: -1}), response;
            if (response.data && 500 == response.data.code) {
                var data = angular.copy(response.data);
                delete data.msg, delete data.code;
                var msg = "";
                for (var i in data)msg += data[i];
                return ycui.alert({content: msg || response.data.msg, timeout: -1}), response
            }
            return response
        }
    }
}]), app.directive("ngAttr", function () {
    return {
        restrict: "A", link: function (scope, element, attr) {
            scope.$watch(attr.ngAttr, function (newValue) {
                for (var i in newValue)element.attr(i, newValue[i])
            })
        }
    }
}), app.directive("ngPlaceholder", ["$timeout", function ($timeout) {
    return {
        restrict: "A", link: function (scope, element, attr) {
            var span;
            if (element.attr("ng-model") && scope.$watch(attr.ngModel, function (newValue, oldValue) {
                    span && (newValue ? span.css("display", "none") : span.css("display", "block"))
                }), isSupportPlaceholder())$timeout(function () {
                element.attr("placeholder", attr.ngPlaceholder)
            }, 20); else {
                var parent = element.parent();
                parent.css("position", "relative"), span = document.createElement("span"), span.style.position = "absolute", span.style.left = "5px", span.style.color = "#9f9f9f", span.style.display = "inlineBlock", span.style.lineHeight = "30px", span.style.width = "auto", span.style.display = "none", span.style.top = "0", span.innerHTML = attr.ngPlaceholder, parent.append(span), span = angular.element(span), 0 == element.val().length && span.css("display", "block"), span.bind("click", function () {
                    span.css("display", "none"), element[0].focus()
                }), element.bind("blur", function () {
                    element.val().length > 0 ? span.css("display", "none") : (span.css({color: "#9f9f9f"}), span.css("display", "block"))
                }), element.bind("input", function () {
                    element.val().length > 0 ? span.css("display", "none") : (span.css({color: "#9f9f9f"}), span.css("display", "block"))
                })
            }
        }
    }
}]), app.filter("dateYMD", function () {
    return function (input) {
        return new Date(input).toLocaleDateString()
    }
}), app.filter("DateFormatFtr", function () {
    return function (input) {
        return input ? getDateFormat(new Date(input)) : ""
    }
}), app.filter("orderTypeFtr", function () {
    return function (input) {
        switch (input) {
            case-1:
                return "审核未通过";
            case 1:
                return "业务一级待审";
            case 2:
                return "业务二级待审";
            case 3:
                return "财务待审";
            case 4:
                return "经管待审";
            case 5:
                return "审核通过";
            default:
                return "--"
        }
    }
}), app.filter("createTypeFtr", function () {
    return function (input) {
        switch (input) {
            case 1:
                return "法务待审";
            case 2:
                return "美编待审";
            case 3:
                return "审核通过";
            default:
                return "审核未通过"
        }
    }
}), app.filter("scheduleTypeFtr", function () {
    return function (input) {
        switch (input) {
            case 0:
                return "正常购买";
            case 1:
                return "免费配送";
            case 2:
                return "自用";
            default:
                return ""
        }
    }
}), app.filter("customerTypeFtr", function () {
    return function (input) {
        switch (input) {
            case 1:
                return "直客";
            case 2:
                return "代理商";
            case 3:
                return "代理子客户";
            default:
                return ""
        }
    }
}), app.filter("customerLevelFtr", function () {
    return function (input) {
        switch (input) {
            case 1:
                return "低";
            case 2:
                return "中";
            case 3:
                return "高";
            default:
                return ""
        }
    }
}), app.filter("defaultOrderCheckFtr", function () {
    return function (input, data) {
        if (-1 == data)return "--";
        switch (input) {
            case-1:
                return "审核不通过";
            case 0:
                return "审核中";
            case 1:
                return "审核通过";
            default:
                return "--"
        }
    }
}), app.filter("toTwo", function () {
    return function (input) {
        return isNaN(input) || input == 1 / 0 ? "0.00%" : (100 * input).toFixed(2) + "%"
    }
}), app.factory("DictionaryFty", ["$http", function ($http) {
    var languageListApi = baseUrl + "/dic/languageList.htm", cityListApi = baseUrl + "/dic/cityList.htm", provinceListApi = baseUrl + "/dic/provinceList.htm", provinceListForCompanyApi = baseUrl + "/dic/provinceListForCompany.htm";
    return {
        languageList: function () {
            return $http.get(languageListApi)
        }, cityList: function (query) {
            return $http.post(cityListApi, query, configForm)
        }, provinceList: function () {
            return $http.get(provinceListApi)
        }, provinceListForCompany: function () {
            return $http.get(provinceListForCompanyApi)
        }
    }
}]), app.factory("OrdersFty", ["$http", function ($http) {
    var ordersListApi = baseUrl + "/orders/list.htm", orderCheckInfoApi = baseUrl + "/orders/checkInfo.htm", changeShowStateApi = baseUrl + "/orders/changeShowState.htm", orderAddApi = baseUrl + "/orders/add.htm", orderNameApi = baseUrl + "/orders/orderNames.htm", adSpaceNamesByOrderApi = baseUrl + "/orderAdCreative/adSpaceNames.htm", adSpaceNamesBySizeApi = baseUrl + "/orderAdCreative/sizes.htm", orderDetailApi = baseUrl + "/orders/getDetail.htm", orderUpdateApi = baseUrl + "/orders/update.htm", orderCheckApi = baseUrl + "/orders/checkOrder.htm", getADSpacesForAddOrderApi = baseUrl + "/orders/getADSpacesForAddOrder.htm", orderDataCountApi = baseUrl + "/orders/DataCount.htm", adSpaceUsedDetailApi = baseUrl + "/orders/adSpaceUsedDetail.htm", contractUploadPDFApi = fileUrl + "/contract/uploadPDF.htm", judgeADShowDateUsableApi = baseUrl + "/orders/judgeADShowDateUsable.htm", updateContractCodeApi = baseUrl + "/orders/updateContractCode.htm";
    return {
        ordersList: function (query) {
            return $http.post(ordersListApi, query, configForm)
        }, orderCheckInfo: function (query) {
            return $http.post(orderCheckInfoApi, query, configForm)
        }, changeShowState: function (query) {
            return $http.post(changeShowStateApi, query, configForm)
        }, adSpaceNamesByOrder: function (query) {
            return $http.post(adSpaceNamesByOrderApi, query, configForm)
        }, adSpaceNamesBySize: function (query) {
            return $http.post(adSpaceNamesBySizeApi, query, configForm)
        }, orderAdd: function (query) {
            return $http.post(orderAddApi, query, configJson)
        }, orderDetail: function (query) {
            return $http.post(orderDetailApi, query, configForm)
        }, orderUpdate: function (query) {
            return $http.post(orderUpdateApi, query, configJson)
        }, orderCheck: function (query) {
            return $http.post(orderCheckApi, query, configForm)
        }, getADSpacesForAddOrder: function (query) {
            return $http.post(getADSpacesForAddOrderApi, query, configForm)
        }, orderDataCount: function (query) {
            return $http.post(orderDataCountApi, query, configForm)
        }, adSpaceUsedDetail: function (query) {
            return $http.post(adSpaceUsedDetailApi, query, configForm)
        }, orderName: function () {
            return $http.get(orderNameApi)
        }, judgeADShowDateUsable: function (query) {
            return $http.post(judgeADShowDateUsableApi, query, configJson)
        }, updateContractCode: function (query) {
            return $http.post(updateContractCodeApi, query, configJson)
        }, contractUploadPDFApi: contractUploadPDFApi
    }
}]), app.factory("ScheduleFty", ["$http", function ($http) {
    var scheduleListApi = baseUrl + "/schedule/list.htm", scheduleDetailApi = baseUrl + "/schedule/ordersDetail.htm", scheduleDownListApi = baseUrl + "/schedule/downList.htm", scheduleADToOrderApi = baseUrl + "/schedule/addADToOrder.htm";
    return {
        scheduleList: function (query) {
            return $http.post(scheduleListApi, query, configForm)
        }, scheduleDetail: function (query) {
            return $http.post(scheduleDetailApi, query, configForm)
        }, scheduleDownList: function () {
            return $http.get(scheduleDownListApi)
        }, scheduleADToOrder: function (query) {
            return $http.post(scheduleADToOrderApi, query, configForm)
        }
    }
}]), app.factory("DefaultOrdersFty", ["$http", function ($http) {
    var defaultOrdersListApi = baseUrl + "/defaultOrders/list.htm", defaultOrdersAddApi = baseUrl + "/defaultOrders/add.htm", defaultOrdersDetailApi = baseUrl + "/defaultOrders/getOrder.htm", defaultOrdersNameApi = baseUrl + "/defaultOrders/orderNames.htm", defaultOrdersUpdateApi = baseUrl + "defaultOrders/updateOrder.htm", defaultAdCreativeListApi = baseUrl + "/defaultOrderAdCreative/list.htm", defaultAdCreativeDetailApi = baseUrl + "/defaultOrderAdCreative/getAdCreative.htm", defaultAdCreativeGetPVApi = baseUrl + "/defaultOrderAdCreative/getPV.htm", defaultAdCreativeDeleteApi = baseUrl + "/defaultOrderAdCreative/delete.htm", defaultOrderDataCountApi = baseUrl + "/defaultOrders/DataCount.htm", defaultAdCreativeDataCountApi = baseUrl + "/defaultOrderAdCreative/DataCount.htm", defaultAdCreativeUpdateApi = baseUrl + "/defaultOrderAdCreative/update.htm", defaultOrderCheckApi = baseUrl + "/defaultOrders/checkEmergency.htm", defaultAdCreativeCheckApi = baseUrl + "/defaultOrderAdCreative/checkEmergency.htm", defaultAdCreativeSizeListApi = baseUrl + "/defaultOrderAdCreative/getSizeList.htm", defaultAdCreativeAddApi = baseUrl + "/defaultOrderAdCreative/add.htm", defaultAdCreativeUploadApi = fileUrl + "/defaultOrderAdCreative/upload.htm";
    return {
        defaultOrdersList: function (query) {
            return $http.post(defaultOrdersListApi, query, configForm)
        }, defaultOrdersAdd: function (query) {
            return $http.post(defaultOrdersAddApi, query, configJson)
        }, defaultOrdersDetail: function (query) {
            return $http.post(defaultOrdersDetailApi, query, configForm)
        }, defaultOrdersName: function (query) {
            return $http.post(defaultOrdersNameApi, query, configForm)
        }, defaultOrdersUpdate: function (query) {
            return $http.post(defaultOrdersUpdateApi, query, configJson)
        }, defaultAdCreativeList: function (query) {
            return $http.post(defaultAdCreativeListApi, query, configForm)
        }, defaultAdCreativeDetail: function (query) {
            return $http.post(defaultAdCreativeDetailApi, query, configForm)
        }, defaultAdCreativeGetPV: function (query) {
            return $http.post(defaultAdCreativeGetPVApi, query, configForm)
        }, defaultAdCreativeDelete: function (query) {
            return $http.post(defaultAdCreativeDeleteApi, query, configJson)
        }, defaultOrderDataCount: function (query) {
            return $http.post(defaultOrderDataCountApi, query, configForm)
        }, defaultAdCreativeDataCount: function (query) {
            return $http.post(defaultAdCreativeDataCountApi, query, configForm)
        }, defaultAdCreativeUpdate: function (query) {
            return $http.post(defaultAdCreativeUpdateApi, query, configJson)
        }, defaultOrderCheck: function (query) {
            return $http.post(defaultOrderCheckApi, query, configForm)
        }, defaultAdCreativeCheck: function (query) {
            return $http.post(defaultAdCreativeCheckApi, query, configForm)
        }, defaultAdCreativeSizeList: function (query) {
            return $http.post(defaultAdCreativeSizeListApi, query, configForm)
        }, defaultAdCreativeAdd: function (query) {
            return $http.post(defaultAdCreativeAddApi, query, configJson)
        }, defaultAdCreativeUploadApi: defaultAdCreativeUploadApi
    }
}]), app.factory("AdCreativeFty", ["$http", function ($http) {
    var adCreativeListApi = baseUrl + "/orderAdCreative/list.htm", adCreativeUpdateApi = baseUrl + "/orderAdCreative/update.htm", adCreativeUpStateApi = baseUrl + "/orderAdCreative/changeShowState.htm", adCreativeBatchOptApi = baseUrl + "/orderAdCreative/batchOpt.htm", adCreativeOrderNamesApi = baseUrl + "/orderAdCreative/orderNamesForAdd.htm", orderNamesForListApi = baseUrl + "/orderAdCreative/orderNamesForList.htm", adSpaceNamesByOrderIdApi = baseUrl + "/orderAdCreative/adSpaceNames.htm", adSpaceSizesByOrderIdApi = baseUrl + "/orderAdCreative/sizes.htm", adCreativeCheckApi = baseUrl + "/orderAdCreative/checkAdCreative.htm", adCreativeUploadApi = baseUrl + "/orderAdCreative/upload.htm", adCreativeDataCountApi = baseUrl + "/orderAdCreative/DataCount.htm", adCreativeCheckInfoApi = baseUrl + "/orderAdCreative/checkInfo.htm", adCreativeInfoApi = baseUrl + "/orderAdCreative/getCreative.htm", adCreativeUploadFileApi = fileUrl + "/orderAdCreative/upload.htm";
    return {
        adCreativeList: function (query) {
            return $http.post(adCreativeListApi, query, configForm)
        }, adCreativeUpdate: function (query) {
            return $http.post(adCreativeUpdateApi, query, configJson)
        }, adCreativeUpState: function (query) {
            return $http.post(adCreativeUpStateApi, query, configForm)
        }, adCreativeBatchOpt: function (query) {
            return $http.post(adCreativeBatchOptApi, query, configJson)
        }, adCreativeOrderNames: function () {
            return $http.get(adCreativeOrderNamesApi)
        }, adSpaceNamesByOrderId: function (query) {
            return $http.post(adSpaceNamesByOrderIdApi, query, configForm)
        }, adSpaceSizesByOrderId: function (query) {
            return $http.post(adSpaceSizesByOrderIdApi, query, configForm)
        }, adCreativeCheck: function (query) {
            return $http.post(adCreativeCheckApi, query, configForm)
        }, adCreativeUpload: function (query) {
            return $http.post(adCreativeUploadApi, query, configJson)
        }, adCreativeDataCount: function (query) {
            return $http.post(adCreativeDataCountApi, query, configForm)
        }, adCreativeCheckInfo: function (query) {
            return $http.post(adCreativeCheckInfoApi, query, configForm)
        }, adCreativeInfo: function (query) {
            return $http.post(adCreativeInfoApi, query, configForm)
        }, orderNamesForList: function () {
            return $http.get(orderNamesForListApi)
        }, adCreativeUploadFileApi: adCreativeUploadFileApi
    }
}]), app.factory("ResChannelFty", ["$http", function ($http) {
    var getChannelApi = baseUrl + "/channel/getChannel.htm", channelPageListApi = baseUrl + "/channel/pageList.htm", channelAddMediaApi = baseUrl + "/channel/addMediaChannel.htm", channelBatchUpdateLevelApi = baseUrl + "/channel/batchUpdateLevel.htm", channelAddApi = baseUrl + "/channel/add.htm", channelUpdateApi = baseUrl + "/channel/update.htm", channelListApi = baseUrl + "/channel/list.htm";
    return {
        getChannel: function (query) {
            return $http.post(getChannelApi, query, configForm)
        }, channelPageList: function (query) {
            return $http.post(channelPageListApi, query, configForm)
        }, channelAddMedia: function (query) {
            return $http.post(channelAddMediaApi, query, configJson)
        }, channelBatchUpdateLevel: function (query) {
            return $http.post(channelBatchUpdateLevelApi, query, configJson)
        }, channelAdd: function (query) {
            return $http.post(channelAddApi, query, configJson)
        }, channelUpdate: function (query) {
            return $http.post(channelUpdateApi, query, configJson)
        }, channelList: function (query) {
            return $http.get(channelListApi)
        }
    }
}]), app.factory("ResMediaFty", ["$http", function ($http) {
    var mediaAddApi = baseUrl + "/media/add.htm", mediaUpdateApi = baseUrl + "/media/update.htm", mediaListApi = baseUrl + "/media/list.htm", mediaPageListApi = baseUrl + "/media/pageList.htm", getMediaApi = baseUrl + "/media/getMedia.htm";
    return {
        mediaAdd: function (query) {
            return $http.post(mediaAddApi, query, configJson)
        }, mediaUpdate: function (query) {
            return $http.post(mediaUpdateApi, query, configForm)
        }, mediaList: function (query) {
            return $http.post(mediaListApi, query, configForm)
        }, mediaPageList: function (query) {
            return $http.post(mediaPageListApi, query, configForm)
        }, getMedia: function (query) {
            return $http.post(getMediaApi, query, configForm)
        }
    }
}]), app.factory("ResAdvertisingFty", ["$http", function ($http) {
    var aDSpaceAddApi = baseUrl + "/ADSpace/add.htm", aDSpaceDetailApi = baseUrl + "/ADSpace/getADSpace.htm", aDSpaceUpdateApi = baseUrl + "/ADSpace/update.htm", aDSpaceDownListForAddApi = baseUrl + "/ADSpace/downListForAdd.htm", getChannelsApi = baseUrl + "/channel/getChannels.htm", ADSpaceListApi = baseUrl + "/ADSpace/pageList.htm", downListForSearchApi = baseUrl + "/ADSpace/downListForSearch.htm", getJSCodeApi = baseUrl + "/ADSpace/getJSCode.htm", checkADSpaceApi = baseUrl + "/ADSpace/checkADSpace.htm";
    return {
        ADSpaceList: function (query) {
            return $http.post(ADSpaceListApi, query, configForm)
        }, aDSpaceAdd: function (query) {
            return $http.post(aDSpaceAddApi, query, configForm)
        }, aDSpaceDownListForAdd: function () {
            return $http.get(aDSpaceDownListForAddApi)
        }, getChannels: function (query) {
            return $http.post(getChannelsApi, query, configForm)
        }, aDSpaceUpdate: function (query) {
            return $http.post(aDSpaceUpdateApi, query, configForm)
        }, aDSpaceDetail: function (query) {
            return $http.post(aDSpaceDetailApi, query, configForm)
        }, downListForSearch: function () {
            return $http.get(downListForSearchApi)
        }, getJSCode: function (query) {
            return $http.post(getJSCodeApi, query, configForm)
        }, checkADSpace: function (query) {
            return $http.post(checkADSpaceApi, query, configForm)
        }
    }
}]), app.factory("ResCreativityFty", ["$http", function ($http) {
    var ADSpaceTypeApi = baseUrl + "/ADSpaceType/list.htm", adSpacePageListApi = baseUrl + "/ADSpaceType/pageList.htm";
    return {
        aDSpaceType: function () {
            return $http.get(ADSpaceTypeApi)
        }, adSpacePageList: function (query) {
            return $http.post(adSpacePageListApi, query, configForm)
        }
    }
}]), app.factory("ResSizeFty", ["$http", function ($http) {
    var sizeAllNameApi = baseUrl + "/size/list.htm", sizePageListApi = baseUrl + "/size//pageList.htm";
    return {
        sizeAllName: function () {
            return $http.get(sizeAllNameApi)
        }, sizePageList: function (query) {
            return $http.post(sizePageListApi, query, configForm)
        }
    }
}]), app.factory("CustomerFty", ["$http", function ($http) {
    var getPartCustomerApi = baseUrl + "/customer/getPartCustomer.htm", getAllCustomerApi = baseUrl + "/customer/getAllCustomer.htm", getCustomerApi = baseUrl + "/customer/getCustomer.htm", listCustomerApi = baseUrl + "/customer/listCustomer.htm";
    return {
        getPartCustomer: function (query) {
            return $http.post(getPartCustomerApi, query, configForm)
        }, getAllCustomer: function (query) {
            return $http.post(getAllCustomerApi, query, configForm)
        }, getCustomer: function (query) {
            return $http.post(getCustomerApi, query, configForm)
        }, listCustomer: function (query) {
            return $http.post(listCustomerApi, query, configForm)
        }
    }
}]), app.factory("QualificationFty", ["$http", function ($http) {
    var findQualificationsUrl = baseUrl + "/qualifications/findQualifications.htm", addQualificationsUrl = baseUrl + "/qualifications/addQualifications.htm", secondLevelIndustryUrl = baseUrl + "/industry/secondLevelIndustry.htm", updateQualificationsUrl = baseUrl + "/qualifications/updateQualifications.htm", findCustomerQualificationsUrl = baseUrl + "/qualifications/findCustomerQualifications.htm", firstLevelIndustryUrl = baseUrl + "/industry/firstLevelIndustry.htm", listQualificationsUrl = baseUrl + "/qualifications/listQualifications.htm", deleteQualificationsUrl = baseUrl + "/qualifications/deleteQualifications.htm";
    return {
        findQualifications: function (query) {
            return $http.post(findQualificationsUrl, query, configForm)
        }, addQualifications: function (query) {
            return $http.post(addQualificationsUrl, query, configJson)
        }, secondLevelIndustry: function (query) {
            return $http.post(secondLevelIndustryUrl, query, configForm)
        }, updateQualifications: function (query) {
            return $http.post(updateQualificationsUrl, query, configForm)
        }, findCustomerQualifications: function (query) {
            return $http.post(findCustomerQualificationsUrl, query, configForm)
        }, firstLevelIndustry: function () {
            return $http.get(firstLevelIndustryUrl)
        }, listQualifications: function (query) {
            return $http.post(listQualificationsUrl, query, configForm)
        }, deleteQualifications: function (query) {
            return $http.post(deleteQualificationsUrl, query, configForm)
        }
    }
}]), app.factory("SysCompanyFty", ["$http", function ($http) {
    var companyAddApi = baseUrl + "/company/add.htm", companyEditInfoApi = baseUrl + "/company/getEditCompanyInfo.htm", companyEditApi = baseUrl + "/company/edit.htm", companyPageListApi = baseUrl + "/company/pageList.htm", companyListApi = baseUrl + "/company/list.htm";
    return {
        companyAdd: function (query) {
            return $http.post(companyAddApi, query, configForm)
        }, companyEditInfo: function (query) {
            return $http.post(companyEditInfoApi, query, configForm)
        }, companyEdit: function (query) {
            return $http.post(companyEditApi, query, configForm)
        }, companyPageList: function (query) {
            return $http.post(companyPageListApi, query, configForm)
        }, companyList: function (query) {
            return $http.post(companyListApi, query, configForm)
        }
    }
}]), app.factory("SysDepartmentFty", ["$http", function ($http) {
    var departmentListApi = baseUrl + "/department/list.htm", departmentPageListApi = baseUrl + "/department/pageList.htm", departmentEditInfoApi = baseUrl + "/department/getEditDepartmentInfo.htm", departmentEditApi = baseUrl + "/department/edit.htm", departmentAddApi = baseUrl + "/department/add.htm", departmentListForDepApi = baseUrl + "/department/getCompanyListForDep.htm", getCompanyApi = baseUrl + "/company/getCompany.htm";
    return {
        departmentList: function () {
            return $http.get(departmentListApi)
        }, departmentPageList: function (query) {
            return $http.post(departmentPageListApi, query, configForm)
        }, departmentEditInfo: function (query) {
            return $http.post(departmentEditInfoApi, query, configForm)
        }, departmentEdit: function (query) {
            return $http.post(departmentEditApi, query, configForm)
        }, departmentAdd: function (query) {
            return $http.post(departmentAddApi, query, configJson)
        }, departmentListForDep: function () {
            return $http.get(departmentListForDepApi)
        }, getCompany: function () {
            return $http.get(getCompanyApi)
        }
    }
}]), app.factory("SysLoginUserFty", ["$http", function ($http) {
    var loginUserInfoApi = baseUrl + "/system/getLoginUser.htm", loginApi = baseUrl + "/system/login.htm", loginOutApi = baseUrl + "/system/loginOut.htm";
    return {
        loginUserInfo: function () {
            return $http.get(loginUserInfoApi)
        }, login: function (query) {
            return $http.post(loginApi, query, configJson)
        }, loginOut: function () {
            return $http.get(loginOutApi)
        }
    }
}]), app.factory("SysRuleUserFty", ["$http", function ($http) {
    var rightsByFirstMenuApi = baseUrl + "/rights/rightsByFirstMenu.htm", ruleByParentIdApi = baseUrl + "/rights/getUserRightsByParentId.htm", listRoleApi = baseUrl + "/role/listRole.htm", rightsRuleAddApi = baseUrl + "/rights/addRights.htm", rightsRuleEditApi = baseUrl + "/rights/Edit.htm";
    return {
        rightsByFirstMenu: function () {
            return $http.get(rightsByFirstMenuApi)
        }, getUserRightsByParentId: function (query) {
            return $http.post(ruleByParentIdApi, query, configForm)
        }, listRole: function (query) {
            return $http.post(listRoleApi, query, configForm)
        }, rightsRuleAdd: function (query) {
            return $http.post(rightsRuleAddApi, query, configForm)
        }, rightsRuleEdit: function (query) {
            return $http.post(rightsRuleEditApi, query, configForm)
        }
    }
}]), app.factory("SysUserFty", ["$http", function ($http) {
    var validPwdApi = baseUrl + "/user/validPwd.htm", updatePwdApi = baseUrl + "/user/updatePwd.htm", userInfoApi = baseUrl + "/user/getEditUserInfo.htm", userListApi = baseUrl + "/user/list.htm";
    return {
        validPwd: function (query) {
            return $http.post(validPwdApi, query, configForm)
        }, updatePwd: function (query) {
            return $http.post(updatePwdApi, query, configForm)
        }, userInfo: function (query) {
            return $http.post(userInfoApi, query, configForm)
        }, userList: function (query) {
            return $http.post(userListApi, query, configForm)
        }
    }
}]), app.factory("SysNoticeFty", ["$http", function ($http) {
    var viewAllNoticeApi = baseUrl + "/notice/viewAllNotice.htm", noticeListApi = baseUrl + "/notice/listNotice.htm";
    return {
        viewAllNotice: function (query) {
            return $http.post(viewAllNoticeApi, query, configForm)
        }, noticeList: function (query) {
            return $http.post(noticeListApi, query, configForm)
        }
    }
}]), app.factory("SysContractTolerantFty", ["$http", function ($http) {
    var contractTolerantCurrentApi = baseUrl + "/contractTolerant/current.htm", contractTolerantListApi = baseUrl + "/contractTolerant/pageList.htm", addContractTolerantApi = baseUrl + "/contractTolerant/addContractTolerant.htm";
    return {
        contractTolerantCurrent: function (query) {
            return $http.get(contractTolerantCurrentApi, query, configForm)
        },contractTolerantList: function (query) {
            return $http.post(contractTolerantListApi, query, configForm)
        },contractTolerantAdd: function (query) {
            return $http.post(addContractTolerantApi, query, configForm)
        }
    }
}]), app.factory("ReportCustomerFty", ["$http", function ($http) {
    var collectCustomerReportApi = baseUrl + "/CustomerReport/collectCustomerReport.htm", collectAgentCustomerReportApi = baseUrl + "/CustomerReport/collectAgentCustomerReport.htm", exportCustomerReportApi = baseUrl + "/CustomerReport/exportCustomerReport.htm", exportAgentCustomerReportApi = baseUrl + "/CustomerReport/exportAgentCustomerReport.htm", customerReportApi = baseUrl + "/CustomerReport/CustomerReport.htm", agentCustomerReportApi = baseUrl + "/CustomerReport/AgentCustomerReport.htm";
    return {
        collectCustomerReport: function (query) {
            return $http.post(collectCustomerReportApi, query, configForm)
        }, collectAgentCustomerReport: function (query) {
            return $http.post(collectAgentCustomerReportApi, query, configForm)
        }, exportCustomerReport: function (query) {
            return $http.post(exportCustomerReportApi, query, configForm)
        }, exportAgentCustomerReport: function (query) {
            return $http.post(exportAgentCustomerReportApi, query, configForm)
        }, customerReport: function (query) {
            return $http.post(customerReportApi, query, configForm)
        }, agentCustomerReport: function (query) {
            return $http.post(agentCustomerReportApi, query, configForm)
        }
    }
}]), app.factory("ReportAdvertiseFty", ["$http", function ($http) {
    var totalCityApi = baseUrl + "/AdvertiseReport/totalCity.htm", totalADSpaceApi = baseUrl + "/AdvertiseReport/totalADSpace.htm", totalOSApi = baseUrl + "/AdvertiseReport/totalOS.htm", collectOSApi = baseUrl + "/AdvertiseReport/collectOS.htm", collectAdCreativeApi = baseUrl + "/AdvertiseReport/collectAdCreative.htm", collectCityApi = baseUrl + "/AdvertiseReport/collectCity.htm", collectBrowserApi = baseUrl + "/AdvertiseReport/collectBrowser.htm", collectDateReportApi = baseUrl + "/AdvertiseReport/collectDateReport.htm", collectOrderApi = baseUrl + "/AdvertiseReport/collectOrder.htm", collectADSpaceApi = baseUrl + "/AdvertiseReport/collectADSpace.htm", allNDefaultOrderNamesApi = baseUrl + "/orders/AllNDefaultOrderNames.htm", totalBrowserApi = baseUrl + "/AdvertiseReport/totalBrowser.htm", orderReportApi = baseUrl + "/AdvertiseReport/orderReport.htm", dateReportApi = baseUrl + "/AdvertiseReport/DateReport.htm", totalAdCreativeApi = baseUrl + "/AdvertiseReport/totalAdCreative.htm";
    return {
        totalCity: function (query) {
            return $http.post(totalCityApi, query, configForm)
        }, totalADSpace: function (query) {
            return $http.post(totalADSpaceApi, query, configForm)
        }, totalOS: function (query) {
            return $http.post(totalOSApi, query, configForm)
        }, collectOS: function (query) {
            return $http.post(collectOSApi, query, configForm)
        }, collectAdCreative: function (query) {
            return $http.post(collectAdCreativeApi, query, configForm)
        }, collectCity: function (query) {
            return $http.post(collectCityApi, query, configForm)
        }, collectBrowser: function (query) {
            return $http.post(collectBrowserApi, query, configForm)
        }, collectDateReport: function (query) {
            return $http.post(collectDateReportApi, query, configForm)
        }, collectOrder: function (query) {
            return $http.post(collectOrderApi, query, configForm)
        }, collectADSpace: function (query) {
            return $http.post(collectADSpaceApi, query, configForm)
        }, allNDefaultOrderNames: function (query) {
            return $http.post(allNDefaultOrderNamesApi, query, configForm)
        }, totalBrowser: function (query) {
            return $http.post(totalBrowserApi, query, configForm)
        }, orderReport: function (query) {
            return $http.post(orderReportApi, query, configForm)
        }, dateReport: function (query) {
            return $http.post(dateReportApi, query, configForm)
        }, totalAdCreative: function (query) {
            return $http.post(totalAdCreativeApi, query, configForm)
        }
    }
}]), app.factory("ReportResourceFty", ["$http", function ($http) {
    var adCreativeConsumeApi = baseUrl + "/Resource/AdCreativeConsume.htm", aDSpaceConsumeApi = baseUrl + "/Resource/ADSpaceConsume.htm", collectChannelConsumeApi = baseUrl + "/Resource/collectChannelConsume.htm", collectMediaConsumeApi = baseUrl + "/Resource/CollectMediaConsume.htm", collectADSpaceConsumeApi = baseUrl + "/Resource/collectADSpaceConsume.htm", collectAdCreativeConsumeApi = baseUrl + "/Resource/collectAdCreativeConsume.htm", mediaChannelConsumeApi = baseUrl + "/Resource/MediaChannelConsume.htm", mediaConsumeApi = baseUrl + "/Resource/MediaConsume.htm";
    return {
        adCreativeConsume: function (query) {
            return $http.post(adCreativeConsumeApi, query, configForm)
        }, aDSpaceConsume: function (query) {
            return $http.post(aDSpaceConsumeApi, query, configForm)
        }, collectChannelConsume: function (query) {
            return $http.post(collectChannelConsumeApi, query, configForm)
        }, collectMediaConsume: function (query) {
            return $http.post(collectMediaConsumeApi, query, configForm)
        }, collectADSpaceConsume: function (query) {
            return $http.post(collectADSpaceConsumeApi, query, configForm)
        }, collectAdCreativeConsume: function (query) {
            return $http.post(collectAdCreativeConsumeApi, query, configForm)
        }, mediaChannelConsume: function (query) {
            return $http.post(mediaChannelConsumeApi, query, configForm)
        }, mediaConsume: function (query) {
            return $http.post(mediaConsumeApi, query, configForm)
        }
    }
}]), app.factory("UploadKeyFty", ["$http", function ($http) {
    var uploadKeyApi = baseUrl + "/uploadKey/getKey.htm";
    return {
        uploadKey: function () {
            return $http.get(uploadKeyApi)
        }
    }
}]);