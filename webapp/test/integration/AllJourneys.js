/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"hnakyol/School/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"hnakyol/School/test/integration/pages/Worklist",
	"hnakyol/School/test/integration/pages/Object",
	"hnakyol/School/test/integration/pages/NotFound",
	"hnakyol/School/test/integration/pages/Browser",
	"hnakyol/School/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "hnakyol.School.view."
	});

	sap.ui.require([
		"hnakyol/School/test/integration/WorklistJourney",
		"hnakyol/School/test/integration/ObjectJourney",
		"hnakyol/School/test/integration/NavigationJourney",
		"hnakyol/School/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});