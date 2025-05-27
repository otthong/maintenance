sap.ui.define([
    "sap/ui/core/util/MockServer",
    "sap/base/util/UriParameters"
], function (MockServer, UriParameters) {
    "use strict";

    return {
        init: function () {
            // 创建 MockServer 实例
            var oMockServer = new MockServer({
                rootUri: "/sap/opu/odata/sap/ZMAINTENANCE_SRV/"
            });

            var oUriParameters = new UriParameters(window.location.href);

            // 配置延迟
            MockServer.config({
                autoRespond: true,
                autoRespondAfter: oUriParameters.get("serverDelay") || 500
            });

            // 模拟 ABAP CDS 视图
            var sPath = sap.ui.require.toUrl("com/demo/maintenanceapp/localService");
            oMockServer.simulate(sPath + "/metadata.xml", {
                sMockdataBaseUrl: sPath + "/mockdata",
                bGenerateMissingMockData: true
            });

            // 启动 MockServer
            oMockServer.start();

            jQuery.sap.log.info("运行应用程序的 Mock 模式");
        }
    };
}); 