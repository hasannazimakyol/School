sap.ui.define([], function() {
	"use strict";

	return {

		/**
		 * Rounds the number unit value to 2 digits
		 * @public
		 * @param {string} sValue the number string to be rounded
		 * @returns {string} sValue with 2 digits rounded
		 */
		numberUnit: function(sValue) {
			if (!sValue) {
				return "";
			}
			return parseFloat(sValue).toFixed(2);
		},

		setGradeColor: function(sValue) {
			if (sValue ) {
				return "sap-icon://leads";
			} else {
				return "sap-icon://employee-pane";
			}
		},
		
		setState: function(sValue) {
			if (sValue === "1000") {
				return "Error";
			} else {
				return "Success";
			}
		}

	};

});