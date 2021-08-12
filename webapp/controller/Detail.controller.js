sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel"
], function(Controller, History, JSONModel) {
	"use strict";
	return Controller.extend("hnakyol.School.controller.Detail", {
		onInit: function() {
			
			this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); // if you want session log use 'Type.session'
			this.oStorage.get("localData");
			if (this.oStorage.get("localData")) {
				this.getView().setModel(new JSONModel(this.oStorage.get("localData")), "student");
			}

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("detail").attachPatternMatched(this._onObjectMatched, this);

		},
		_onObjectMatched: function(oEvent) {
			this.getView().bindElement({
				path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").studentPath),
				model: "student"
			});
		},

		onNavBack: function() {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = this.getOwnerComponent().getRouter();
				oRouter.navTo("studentsList", {}, true);
			}
		},

		onBeforeRendering: function() {

		}
	});
});