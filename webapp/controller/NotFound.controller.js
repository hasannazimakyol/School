sap.ui.define([
		"hnakyol/School/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("hnakyol.School.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);