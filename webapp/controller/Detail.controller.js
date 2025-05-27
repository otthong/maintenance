sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/UIComponent",
    "sap/m/MessageToast",
    "sap/m/MessageBox"
], function (Controller, UIComponent, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("com.demo.maintenanceapp.controller.Detail", {
        onInit: function () {
            var oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("detail").attachPatternMatched(this._onPatternMatched, this);
        },

        _onPatternMatched: function (oEvent) {
            var oArguments = oEvent.getParameter("arguments");
            console.log("路由参数:", oArguments);
            
            if (!oArguments || !oArguments.objectId) {
                console.error("未收到有效的路由参数");
                MessageBox.error("无效的记录ID", {
                    onClose: function() {
                        this.onNavBack();
                    }.bind(this)
                });
                return;
            }

            this._recordId = oArguments.objectId;
            console.log("获取到记录ID:", this._recordId);
            
            // 编辑模式 - 从后端加载数据
            this._loadExistingData(this._recordId);
        },

        _loadExistingData: function(recordId) {
            var oDataModel = this.getOwnerComponent().getModel();
            var sPath = "/MaintenanceChecks('" + recordId + "')";
            
            console.log("准备加载数据，路径:", sPath);
            
            oDataModel.read(sPath, {
                success: function(oData) {
                    console.log("成功加载数据:", oData);
                    if (oData) {
                        this._loadDataToView(oData);
                    } else {
                        console.error("加载的数据为空");
                        MessageBox.error("无法加载记录数据", {
                            onClose: function() {
                                this.onNavBack();
                            }.bind(this)
                        });
                    }
                }.bind(this),
                error: function(oError) {
                    console.error("加载数据失败:", oError);
                    MessageBox.error("加载数据失败", {
                        onClose: function() {
                            this.onNavBack();
                        }.bind(this)
                    });
                }.bind(this)
            });
        },

        _loadDataToView: function(oData) {
            // 设置控件值
            this.byId("batteryStatus").setSelected(oData.BatteryStatus);
            this.byId("chargerMonitor").setSelected(oData.ChargerMonitor);
            this.byId("roofCondition").setSelected(oData.RoofCondition);
            this.byId("transformerSound").setSelected(oData.TransformerSound);
            this.byId("hvGaugeMeter").setSelected(oData.HvGaugeMeter);
            this.byId("capacitorStatus").setSelected(oData.CapacitorStatus);
            this.byId("abnormalSmell").setSelected(oData.AbnormalSmell);
            this.byId("remarks").setValue(oData.Remarks || "");
        },

        _collectFormData: function() {
            return {
                BatteryStatus: this.byId("batteryStatus").getSelected(),
                ChargerMonitor: this.byId("chargerMonitor").getSelected(),
                RoofCondition: this.byId("roofCondition").getSelected(),
                TransformerSound: this.byId("transformerSound").getSelected(),
                HvGaugeMeter: this.byId("hvGaugeMeter").getSelected(),
                CapacitorStatus: this.byId("capacitorStatus").getSelected(),
                AbnormalSmell: this.byId("abnormalSmell").getSelected(),
                Remarks: this.byId("remarks").getValue(),
                Inspector: "默认检查员",
                Date: new Date()
            };
        },

        onNavBack: function () {
            var oRouter = UIComponent.getRouterFor(this);
            oRouter.navTo("list", {}, true);
        },

        onSave: function () {
            if (!this._recordId) {
                MessageBox.error("无效的记录ID");
                return;
            }

            var oDataModel = this.getOwnerComponent().getModel();
            var oFormData = this._collectFormData();
            
            // 更新现有记录
            var sPath = "/MaintenanceChecks('" + this._recordId + "')";
            oDataModel.update(sPath, oFormData, {
                success: function() {
                    MessageBox.success("更新成功！", {
                        onClose: function() {
                            this.onNavBack();
                        }.bind(this)
                    });
                }.bind(this),
                error: function(oError) {
                    console.error("更新失败:", oError);
                    MessageBox.error("更新失败！");
                }
            });
        },

        onCancel: function () {
            MessageBox.confirm("确定要取消保存吗？", {
                actions: [MessageBox.Action.YES, MessageBox.Action.NO],
                emphasizedAction: MessageBox.Action.NO,
                onClose: function (sAction) {
                    if (sAction === MessageBox.Action.YES) {
                        this.onNavBack();
                    }
                }.bind(this)
            });
        }
    });
});