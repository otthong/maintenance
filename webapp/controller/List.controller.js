sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "../model/formatter",
    "sap/m/MessageBox"
], function (Controller, UIComponent, formatter, MessageBox) {
    "use strict";

    return Controller.extend("com.demo.maintenanceapp.controller.List", {
        formatter: formatter,

        onInit: function () {
            // 控制器初始化逻辑
        },

        onNavBack: function () {
            window.history.go(-1);
        },

        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oRouter = UIComponent.getRouterFor(this);
            var oContext = oItem.getBindingContext();
            
            if (oContext) {
                var sId = oContext.getProperty("ID");
                if (sId) {
                    console.log("导航到详情页，ID:", sId); // 添加日志
                    oRouter.navTo("detail", {
                        id: sId
                    });
                } else {
                    MessageBox.error("无法获取记录ID");
                }
            } else {
                MessageBox.error("无法获取记录信息");
            }
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oList = this.byId("list");
            var oBinding = oList.getBinding("items");
            
            if (sQuery) {
                var aFilters = [new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sQuery)];
                oBinding.filter(aFilters);
            } else {
                oBinding.filter([]);
            }
        }
    });
});
 