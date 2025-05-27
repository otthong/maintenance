sap.ui.define([
    "sap/ui/core/UIComponent",
    "sap/ui/Device",
    "./model/models",
    "./localService/mockserver"
], function (UIComponent, Device, models, mockserver) {
    "use strict";

    return UIComponent.extend("com.demo.maintenanceapp.Component", {
        metadata: {
            manifest: "json"
        },

        init: function () {
            // 初始化 mock server
            mockserver.init();
            
            // 调用父类的 init 函数
            UIComponent.prototype.init.apply(this, arguments);

            // 设置设备模型
            this.setModel(models.createDeviceModel(), "device");

            // 创建并设置 OData 模型
            var oModel = new sap.ui.model.odata.v2.ODataModel("/sap/opu/odata/sap/ZMAINTENANCE_SRV/", {
                useBatch: false
            });
            this.setModel(oModel);

            // 初始化路由
            this.getRouter().initialize();
        }
    });
}); 