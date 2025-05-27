sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast"
], function (Controller, History, UIComponent, MessageToast) {
    "use strict";

    return Controller.extend("com.demo.maintenanceapp.controller.Information", {
        onInit: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.getRoute("information").attachPatternMatched(this._onObjectMatched, this);
        },

        _onObjectMatched: function (oEvent) {
            var sObjectId = oEvent.getParameter("arguments").objectId;
            var oView = this.getView();
            
            // 保存objectId供后续使用
            this._sObjectId = sObjectId;
            
            oView.setBusy(true);
            
            // 获取模型
            var oModel = this.getView().getModel();
            
            // 构建查询路径
            var sPath = "/MaintenanceChecks('" + sObjectId + "')";
            console.log("查询路径:", sPath);
            
            // 直接获取数据
            oModel.read(sPath, {
                success: function(oData) {
                    console.log("获取到的数据:", oData);
                    oView.setBusy(false);
                    oView.bindElement({
                        path: sPath
                    });
                },
                error: function(oError) {
                    console.error("数据加载错误:", oError);
                    oView.setBusy(false);
                    MessageToast.show("无法加载数据");
                }
            });
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                var oRouter = UIComponent.getRouterFor(this);
                oRouter.navTo("list", {}, true);
            }
        },

        onDailyMaintenance: function () {
            if (!this._sObjectId) {
                MessageToast.show("无法获取记录ID");
                return;
            }
            
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("detail", {
                objectId: this._sObjectId
            });
        },

        onPreventiveMaintenance: function () {
            MessageToast.show("预防性维修功能开发中");
        },

        onEquipmentMaintenance: function () {
            MessageToast.show("设备维修功能开发中");
        }
    });
}); 