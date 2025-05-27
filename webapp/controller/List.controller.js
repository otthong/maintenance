sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/ui/core/routing/History",
    "sap/ui/core/date/UI5Date",
    "sap/m/MessageToast"
], function (Controller, UIComponent, History, UI5Date, MessageToast) {
    "use strict";

    return Controller.extend("com.demo.maintenanceapp.controller.List", {
        onInit: function () {
            this._oRouter = UIComponent.getRouterFor(this);
        },

        onNavBack: function () {
            var oHistory = History.getInstance();
            var sPreviousHash = oHistory.getPreviousHash();

            if (sPreviousHash !== undefined) {
                window.history.go(-1);
            } else {
                this._oRouter.navTo("list", {}, true);
            }
        },

        onItemPress: function (oEvent) {
            var oItem = oEvent.getSource();
            var oBindingContext = oItem.getBindingContext();
            var sObjectId = oBindingContext.getProperty("ID");
            
            this._oRouter.navTo("information", {
                objectId: sObjectId
            });
        },

        onSearch: function (oEvent) {
            var sQuery = oEvent.getParameter("query");
            var oList = this.byId("list");
            var oBinding = oList.getBinding("items");
            
            if (sQuery) {
                var aFilters = [
                    new sap.ui.model.Filter("ID", sap.ui.model.FilterOperator.Contains, sQuery)
                ];
                oBinding.filter(aFilters);
            } else {
                oBinding.filter([]);
            }
        },

        formatter: {
            formatDate: function (oDate) {
                if (!oDate) {
                    return "";
                }
                var oDateInstance = UI5Date.getInstance(oDate);
                return oDateInstance.toLocaleDateString();
            },

            formatStatus: function (bStatus) {
                return bStatus ? "正常" : "异常";
            }
        }
    });
});
 