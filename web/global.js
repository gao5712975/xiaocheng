function intAddZero(num, n) {
    for (var len = num.toString().length; n > len;)num = "0" + num, len++;
    return num
}
function fillZero(n) {
    return 9 >= n ? "0" + n : "" + n
}
function chDate(str) {
    for (var res = [], arr = str.split("-"), i = 0; i < arr.length; i++)res.push(fillZero(arr[i]));
    return res.join("-")
}
function getLocalTime(nS) {
    return new Date(1e3 * parseInt(nS)).toLocaleDateString().replace(/:\d{1,2}$/, " ")
}
function getLocalTimeHour(nS) {
    return new Date(1e3 * parseInt(nS)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ")
}
function getDateFormat(data) {
    var d = data || new Date;
    return d.getFullYear() + "-" + fillZero(+d.getMonth() + 1) + "-" + fillZero(d.getDate())
}
function isSupportPlaceholder() {
    var input = document.createElement("input");
    return "placeholder"in input
}
////192.168.0.143:8080
var baseUrl = "//192.168.100.212:8081", fileUrl = "//xhwCreative.adpush.cn", jsssssssss = '<script sid="<%id%>" type="text/javascript" src="http://180.76.170.75:81/js/xadn.js?r=.cntv.cn/adplayer/adBlockDetector/adv_index"></script>';
$(function () {
    $(document.body).click(function () {
        var doc = top.document;
        $(doc).find(".frame-top-setting-list,.frame-info").stop(!0).slideUp("fast")
    }), $(".frame-info").click(function (event) {
        event.stopPropagation()
    }), $(document.body).keyup(function (event) {
        var key = event.keyCode ? event.keyCode : event.which;
        if (13 == key) {
            var input = $("div.yc-search-wraper").find("input:focus[type=text]");
            1 == input.length && input.next("i.yc-icon").trigger("click")
        }
    })
});
var getUrlSearch = function (url) {
    url = decodeURIComponent(url);
    var params = url.substr(url.lastIndexOf("?") + 1, url.length), s = params.split("&"), a = "{";
    return s.forEach(function (data, index) {
        var ar = data.split("=");
        a += s.length - 1 == index ? '"' + ar[0] + '":"' + ar[1] + '"' : '"' + ar[0] + '":"' + ar[1] + '",'
    }), a += "}", JSON.parse(a)
}, stringToDate = function (strDate) {
    var n = strDate.split("-");
    3 != n.length && (n = strDate.split("/"));
    var d = new Date;
    return d.setDate(n[2]), d.setFullYear(n[0]), d.setMonth(n[1] - 1), d.setHours(0, 0, 0, 0), d
}, getDateArray = function (nowDate) {
    for (var array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28], date = stringToDate(nowDate), m = date.getMonth(), i = 29; 31 >= i && (date.setDate(i), date.getMonth() == m); i++)array.push(i);
    return array
}, getWeekArray = function (nowDate, format) {
    function formatStr(num) {
        switch (num) {
            case 0:
                return "日";
            case 1:
                return "一";
            case 2:
                return "二";
            case 3:
                return "三";
            case 4:
                return "四";
            case 5:
                return "五";
            case 6:
                return "六"
        }
    }

    var day = [], array = getDateArray(nowDate), date = stringToDate(nowDate);
    return array.forEach(function (data) {
        date.setDate(data), "EN" == format ? day.push(date.getDay()) : day.push(formatStr(date.getDay()))
    }), day
}, array1Change2 = function (array, size) {
    for (var b = [], a = [], i = 1, j = array.length; j >= i; i++)a.push(array[i - 1]), i % size == 0 ? (b.push(a), a = []) : i == j && (b.push(a), a = []);
    return b
}, proportionPhoto = function (oldWidth, oldHeight, limitWidth, limitHeight) {
    if (oldWidth = Number(oldWidth), oldHeight = Number(oldHeight), limitWidth = Number(limitWidth), limitHeight = Number(limitHeight), limitWidth >= oldWidth && limitHeight >= oldHeight)return [oldWidth, oldHeight];
    var a = oldWidth / oldHeight, b = limitWidth / limitHeight;
    return a >= 1 && b >= 1 ? oldWidth / limitWidth > oldHeight / limitHeight ? [limitWidth, Math.floor(limitWidth * oldHeight / oldWidth)] : [Math.floor(oldWidth * limitHeight / oldHeight), limitHeight] : a >= 1 && 1 >= b ? [limitWidth, Math.floor(oldHeight * limitWidth / oldWidth)] : 1 >= a && b >= 1 ? [Math.floor(limitHeight * oldWidth / oldHeight), limitHeight] : 1 >= a && 1 >= b ? oldHeight / limitHeight > oldWidth / limitWidth ? [Math.floor(oldWidth * limitHeight / oldHeight), limitHeight] : [limitWidth, Math.floor(limitWidth * oldHeight / oldWidth)] : void 0
}, photoAndSwfPreview = function (data) {
    var wh = proportionPhoto(data.size[0], data.size[1], data.width, data.height), photo = "", style = "", href = parseGet(baseUrl + "/views/preview.html", data), a = "<a style='width: " + wh[0] + "px; height: 100%; position: absolute; cursor: pointer; opacity: 0; background-color: rgb(255, 255, 255);' href='" + href + "' target='_blank'></a>";
    return data.style && (style = "top:" + (data.height - wh[1]) / 2 + "px;"), photo = -1 != data.src.lastIndexOf(".swf") ? a + "<object width='" + wh[0] + "' height='" + wh[1] + "' align='middle' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0'><param name='allowScriptAccess' value='always'><param name='movie' value='" + data.src + "'><param name='quality' value='high'><param name='bgcolor' value='#000'><param name='height' value='" + wh[1] + "'><param name='width' value='" + wh[0] + "'><param name='FlashVars' value='true'><param name='allowFullScreen' value='true'><param name='wmode' value='transparent'><param name='loop' value='true'><embed width='" + wh[0] + "' height='" + wh[1] + "' pluginspage='http://www.macromedia.com/go/getflashplayer' src='" + data.src + "' type='application/x-shockwave-flash' wmode='transparent' flashvars='false' allowfullscreen='true' loop='true' allowscriptaccess='always' bgcolor='#000' quality='high'></object>" : a + "<img src='" + data.src + "' width='" + wh[0] + "' height='" + wh[1] + "'>", "<div style='margin: 0 auto;position: relative;width: " + wh[0] + "px;height: auto;" + style + "'>" + photo + "</div>"
}, photoAndSwfPreview2 = function (data, data2) {
    var wh = proportionPhoto(data.size[0], data.size[1], data.width, data.height), photo = "", style = "", href = parseGet(baseUrl + "/views/preview.html", data), a = "<a style='width: " + wh[0] + "px; height: 100%; display:block;position: absolute; cursor: pointer; opacity: 0; background-color: rgb(255, 255, 255);' href='" + href + "' target='_blank'></a>";
    data.style && (style = "top:" + (data.height - wh[1]) / 2 + "px;"), photo = -1 != data.src.lastIndexOf(".swf") ? a + "<object width='" + wh[0] + "' height='" + wh[1] + "' align='middle' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0'><param name='allowScriptAccess' value='always'><param name='movie' value='" + data.src + "'><param name='quality' value='high'><param name='bgcolor' value='#000'><param name='height' value='" + wh[1] + "'><param name='width' value='" + wh[0] + "'><param name='FlashVars' value='true'><param name='allowFullScreen' value='true'><param name='wmode' value='transparent'><param name='loop' value='true'><embed width='" + wh[0] + "' height='" + wh[1] + "' pluginspage='http://www.macromedia.com/go/getflashplayer' src='" + data.src + "' type='application/x-shockwave-flash' wmode='transparent' flashvars='false' allowfullscreen='true' loop='true' allowscriptaccess='always' bgcolor='#000' quality='high'></object>" : a + "<img style='margin-left: 5px' src='" + data.src + "' width='" + wh[0] + "' height='" + wh[1] + "'>";
    var href2 = parseGet(baseUrl + "/views/preview.html", data2), wh2 = proportionPhoto(data2.size[0], data2.size[1], data2.width, data2.height), a2 = "<a style='width: " + wh2[0] + "px; height: 100%; display:block;position: absolute; cursor: pointer; opacity: 0; background-color: rgb(255, 255, 255);' href='" + href2 + "' target='_blank'></a>", photo2 = "";
    return photo2 = -1 != data.src.lastIndexOf(".swf") ? a2 + "<object width='" + wh2[0] + "' height='" + wh2[1] + "' align='middle' classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,0,0,0'><param name='allowScriptAccess' value='always'><param name='movie' value='" + data2.src + "'><param name='quality' value='high'><param name='bgcolor' value='#000'><param name='height' value='" + wh2[1] + "'><param name='width' value='" + wh2[0] + "'><param name='FlashVars' value='true'><param name='allowFullScreen' value='true'><param name='wmode' value='transparent'><param name='loop' value='true'><embed width='" + wh2[0] + "' height='" + wh2[1] + "' pluginspage='http://www.macromedia.com/go/getflashplayer' src='" + data2.src + "' type='application/x-shockwave-flash' wmode='transparent' flashvars='false' allowfullscreen='true' loop='true' allowscriptaccess='always' bgcolor='#000' quality='high'></object>" : a2 + "<img style='margin-left: 5px' src='" + data2.src + "' width='" + wh2[0] + "' height='" + wh2[1] + "'>", "<div style='margin: 0 auto;position: relative;width: auto;height: auto;" + style + "'><div style='display: inline-block;'>" + photo + "</div><div style='display: inline-block;'>" + photo2 + "</div></div>"
};
Date.prototype.dateFormat = function (str) {
    str = str || "yyyy-MM-dd";
    var y = this.getFullYear(), M = intAddZero(this.getMonth() + 1, 2), d = intAddZero(this.getDate(), 2), H = intAddZero(this.getHours(), 2), m = intAddZero(this.getMinutes(), 2), s = intAddZero(this.getSeconds(), 2);
    return str.replace("yyyy", y).replace("MM", M).replace("dd", d).replace("HH", H).replace("mm", m).replace("ss", s)
}, Date.prototype.calendar = function (dateType, num) {
    switch (dateType) {
        case 1:
            var d = this.getDate();
            return this.setDate(d + num), this;
        case 2:
            var m = this.getMonth();
            return this.setMonth(m + num), this;
        case 3:
            var y = this.getFullYear();
            return this.setFullYear(y + num), this
    }
};
var getSearch = function (name) {
    var reg = new RegExp("(?:^|&)" + name + "=([^&]*)(?:&|$)", "i");
    return ((location.search.split("?")[1] || "").match(reg) || [])[1] || ""
}, parseGet = function (u, obj) {
    var j, p = "";
    for (j in obj)obj.hasOwnProperty(j) && (p += j + "=" + obj[j] + "&");
    return u + "?" + p + "_=" + 1 * new Date
}, YcSessionStorage = function (queryKey, queryValue, exclude) {
    exclude instanceof Array && exclude.forEach(function (da) {
        delete queryValue[da]
    }), window.sessionStorage.setItem(queryKey, JSON.stringify(queryValue))
}, exportFun = function (showColumns, Column) {
    var i = 0;
    for (var a in Column)Column[a] || (showColumns.splice(i, 1), --i), i++
}, isFunction = function (value) {
    return value instanceof Function
}, isArray = function (value) {
    return value instanceof Array
}, jsonRule = {
    6: {id: 6, name: "查询排期", parentId: 1, url: "ADManage/listManage.html", ruleId: 1},
    7: {id: 7, name: "查看投放订单", parentId: 2, url: "ADManage/putListManage.html", ruleId: 1},
    8: {
        id: 8,
        name: "管理投放订单",
        parentId: 2,
        url: ["ADManage/putListManage.html", "ADManage/putAdd.html", "ADManage/putEdit.html", "ADManage/putListAdd.html", "ADManage/putListEdit.html"],
        ruleId: 1
    },
    9: {id: 9, name: "业务一审(订单)", parentId: 2, url: "ADManage/putCheck.html", ruleId: 1},
    10: {id: 10, name: "业务二审(订单)", parentId: 2, url: "ADManage/putCheck.html", ruleId: 1},
    11: {id: 11, name: "财务审核(订单)", parentId: 2, url: "ADManage/putCheck.html", ruleId: 1},
    12: {id: 12, name: "经管审核(订单)", parentId: 2, url: "ADManage/putCheck.html", ruleId: 1},
    110: {id: 110, name: "编辑合同号(进入审核流程后)", parentId: 2, url: "ADManage/putListManage.html", ruleId: 1},
    13: {id: 13, name: "法务审核(创意)", parentId: 2, url: "ADManage/putCreateManage.html", ruleId: 1},
    14: {id: 14, name: "美编审核(创意)", parentId: 2, url: "ADManage/putCreateManage.html", ruleId: 1},
    15: {id: 15, name: "查看归档订单", parentId: 3, url: ""},
    16: {id: 16, name: "管理归档订单", parentId: 3, url: ""},
    17: {id: 17, name: "查看默认订单", parentId: 4, url: "ADManage/trueAdvertisement.html", ruleId: 1},
    18: {
        id: 18,
        name: "默认订单管理",
        parentId: 4,
        url: ["ADManage/trueAdvertisement.html", "ADManage/trueAdvertisementAdd.html", "ADManage/trueAdvertisementEdit.html", "ADManage/trueCreateListAdd.html", "ADManage/trueCreateListEdit.html"],
        ruleId: 1
    },
    19: {id: 19, name: "紧急订单管理", parentId: 4, url: "ADManage/trueAdvertisement.html", ruleId: 1},
    20: {id: 20, name: "紧急创意审核", parentId: 4, url: "ADManage/trueCreateAd.html", ruleId: 1},
    21: {id: 21, name: "紧急订单审核", parentId: 4, url: "ADManage/trueAdvertisementAudit.html", ruleId: 1},
    111: {id: 111, name: "默认订单审核", parentId: 4, url: "ADManage/trueAdvertisementAudit.html", ruleId: 1},
    22: {id: 22, name: "查看媒体", parentId: 5, url: "ResourceManage/mediaManage.html", ruleId: 2},
    23: {
        id: 23,
        name: "管理媒体",
        parentId: 5,
        url: ["ResourceManage/mediaManage.html", "ResourceManage/mediaCompile.html", "ResourceManage/mediaIncreased.html"],
        ruleId: 2
    },
    24: {id: 24, name: "查看频道", parentId: 6, url: "ResourceManage/channelManage.html", ruleId: 2},
    25: {
        id: 25,
        name: "管理频道",
        parentId: 6,
        url: ["ResourceManage/channelManage.html", "ResourceManage/channelCompile.html", "ResourceManage/channelIncrease"],
        ruleId: 2
    },
    26: {id: 26, name: "查看创意类型", parentId: 7, url: "ResourceManage/createManage.html", ruleId: 2},
    27: {
        id: 27,
        name: "管理创意类型",
        parentId: 7,
        url: ["ResourceManage/createManage.html", "ResourceManage/createCompile.html", "ResourceManage/createIncreased.html"],
        ruleId: 2
    },
    28: {id: 28, name: "查看尺寸", parentId: 8, url: "ResourceManage/sizeManage.html", ruleId: 2},
    29: {
        id: 29,
        name: "管理尺寸",
        parentId: 8,
        url: ["ResourceManage/sizeManage.html", "ResourceManage/sizeCompile.html", "ResourceManage/sizeIncreased.html"],
        ruleId: 2
    },
    30: {id: 30, name: "查看广告位", parentId: 9, url: "ResourceManage/advertiseManage.html", ruleId: 2},
    31: {
        id: 31,
        name: "管理广告位",
        parentId: 9,
        url: ["ResourceManage/advertiseManage.html", "ResourceManage/advertiseCompile.html", "ResourceManage/advertiseIncrease.html"],
        ruleId: 2
    },
    32: {
        id: 32,
        name: "审核广告位",
        parentId: 9,
        url: ["ResourceManage/advertiseManage.html", "ResourceManage/advertiseCompile.html", "ResourceManage/advertiseIncrease.html"],
        ruleId: 2
    },
    33: {id: 33, name: "查看刊例", parentId: 10, url: ""},
    34: {id: 34, name: "管理刊例", parentId: 10, url: ""},
    35: {
        id: 35,
        name: "查看客户",
        parentId: 11,
        url: ["ClientManage/clientManageh.html", "ClientManage/QualificationManage.html"],
        ruleId: 3
    },
    36: {id: 36, name: "审核客户", parentId: 11, url: "ClientManage/audit.html", ruleId: 3},
    37: {
        id: 37,
        name: "管理客户",
        parentId: 11,
        url: ["ClientManage/clientManageh.html", "ClientManage/clientEdit.html", "ClientManage/clientAdd.html", "ClientManage/QualificationAdd.html", "ClientManage/QualificationEdit.html"],
        ruleId: 3
    },
    38: {id: 38, name: "查看客户报表", parentId: 12, url: "ReportManage/clientReport.html", ruleId: 4},
    39: {id: 39, name: "查看资源消耗报表", parentId: 13, url: "ReportManage/resourceReport.html", ruleId: 4},
    40: {id: 40, name: "查看广告投放报表", parentId: 14, url: "ReportManage/adReport.html", ruleId: 4},
    41: {id: 41, name: "查看对比报表", parentId: 15, url: "ReportManage/contrastReport.html", ruleId: 4},
    42: {id: 42, name: "查看公司", parentId: 16, url: "SystemManage/companyManage.html", ruleId: 5},
    43: {
        id: 43,
        name: "管理公司",
        parentId: 16,
        url: ["SystemManage/companyManage.html", "SystemManage/companyIncreased.html", "SystemManage/companyCompile.html"],
        ruleId: 5
    },
    44: {id: 44, name: "查看部门", parentId: 17, url: "SystemManage/departmentManage.html", ruleId: 5},
    45: {
        id: 45,
        name: "管理部门",
        parentId: 17,
        url: ["SystemManage/departmentManage.html", "SystemManage/departmentIncreased.html", "SystemManage/departmentCompile.html"],
        ruleId: 5
    },
    46: {id: 46, name: "查看角色", parentId: 18, url: "SystemManage/roleManage.html", ruleId: 5},
    47: {
        id: 47,
        name: "管理角色",
        parentId: 18,
        url: ["SystemManage/roleManage.html", "SystemManage/roleIncreased.html", "SystemManage/roleCheck.html", "SystemManage/roleCompile.html"],
        ruleId: 5
    },
    48: {id: 48, name: "查看用户", parentId: 19, url: "SystemManage/userManage.html", ruleId: 5},
    49: {
        id: 49,
        name: "管理用户",
        parentId: 19,
        url: ["SystemManage/userManage.html", "SystemManage/userIncreased.html", "SystemManage/userCompile.html"],
        ruleId: 5
    },
    50: {
        id: 50,
        name: "管理公告",
        parentId: 20,
        url: ["SystemManage/afficheManage.html", "SystemManage/affcheIncreased.html", "SystemManage/affcheCompile.html"],
        ruleId: 5
    },
    51: {id: 51, name: "查看操作日志", parentId: 21, url: ""},
    52: {id: 52, name: "查看错误日志", parentId: 21, url: ""},
    53: {id: 53, name: "管理广告角标", parentId: 22, url: ""},
    54: {id: 54, name: "管理报警预警", parentId: 23, url: ""},
    55: {id: 55, name: "查看服务器状态", parentId: 24, url: ""},
    56: {
        id: 56,
        name: "管理容错率",
        parentId: 25,
        url: ["SystemManage/contractTolerantManage.html", "SystemManage/contractTolerantIncreased.html"],
        ruleId: 5
    }
}, getLocationRule = function (url) {
    for (var i in jsonRule)if (jsonRule[i].url) {
        var ruleUrl = jsonRule[i].url;
        if (jsonRule[i].url instanceof Array) {
            for (var x = 0; x < jsonRule[i].url.length; x++)if (-1 != url.indexOf(jsonRule[i].url[x]))return jsonRule[i]
        } else if (-1 != url.indexOf(ruleUrl))return jsonRule[i]
    }
};