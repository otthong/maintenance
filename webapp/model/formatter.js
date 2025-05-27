sap.ui.define([], function () {
    "use strict";

    return {
        formatDate: function (date) {
            if (!date) {
                return "";
            }
            return new Date(date).toLocaleDateString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            });
        },

        formatStatus: function (bValue) {
            return bValue ? "正常" : "异常";
        }
    };
}); 