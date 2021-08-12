/*global location history */
sap.ui.define([
	"hnakyol/School/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"hnakyol/School/model/formatter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(BaseController, JSONModel, formatter, Filter, FilterOperator) {
	"use strict";

	return BaseController.extend("hnakyol.School.controller.Worklist", {

		formatter: formatter,

		onInit: function() {

			this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); // if you want session log use 'Type.session'
			this.oStorage.get("localData");

			if (this.oStorage.get("localData")) {
				this.getView().setModel(new JSONModel(this.oStorage.get("localData")), "student");
			}

		},

		onRefresh: function() {
			var oTable = this.byId("table");
			oTable.getBinding("items").refresh();
		},

		onPressSaveStudent: function() {

			var aStudents = this.getView().getModel("student").getData();

			var vStudentName = sap.ui.getCore().byId("inputStudentName").getValue();
			sap.ui.getCore().byId("inputStudentName").setValue("");
			var vStudentLastName = sap.ui.getCore().byId("inputStudentLastName").getValue();
			sap.ui.getCore().byId("inputStudentLastName").setValue("");

			/*			var elementSelectedPos = aStudents.map(function(x) {
							return x.No;
						}).indexOf(vMateName);
						if (elementSelectedPos === -1) {
							aTeam.push(sMate);
						} else {
							aTeam[elementSelectedPos].Title = vMateTitle;
							aTeam[elementSelectedPos].Sallary = vMateSalary;
						}*/

			function compare_id(a, b) {
				// a should come before b in the sorted order
				if (a.No < b.No) {
					return -1;
					// a should come after b in the sorted order
				} else if (a.No > b.No) {
					return 1;
					// a and b are the same
				} else {
					return 0;
				}
			}

			var sortedStudents = this.getView().getModel("student").getData().Students.sort(compare_id);
			var newNo = parseInt(sortedStudents[sortedStudents.length - 1].No) + 1;
			var sStudent = {};
			sStudent = {
				No: newNo,
				Name: vStudentName,
				LastName: vStudentLastName,
				FirstGrade: "",
				FinalGrade: "",
				MeanGrade: "",
				LetterGrade: ""
			};

			var oStudentsModel = this.getView().getModel("student");
			oStudentsModel.getData().Students.push(sStudent);
			this.getView().setModel(oStudentsModel, "student");

			this.oStorage.put("localData", oStudentsModel.getData());

			this.getView().byId("idStudentsTable").getModel("student").refresh(true);
			this._getNewStudentDialog(this).close();
		},

		onCreateStudent: function() {
			this._getNewStudentDialog(this).open();
		},

		_getNewStudentDialog: function(that) {
			that._oNewStudentDialog = sap.ui.getCore().byId("dialogNewStudent");
			if (!that._oNewStudentDialog) {
				that._oNewStudentDialog = sap.ui.xmlfragment("hnakyol.School.fragment.NewStudent", that);
				that.getView().addDependent(that._oNewStudentDialog);
				jQuery.sap.syncStyleClass("sapUiSizeCompact", that.getView(), that._oNewStudentDialog);
			}
			return that._oNewStudentDialog;
		},

		onPressCancelStudent: function() {

			sap.ui.getCore().byId("inputStudentName").setValue("");
			sap.ui.getCore().byId("inputStudentLastName").setValue("");
			this._getNewStudentDialog(this).close();

		},

		onPressDeleteStudent: function(oEvent) {
			var sStudent = oEvent.getSource().getParent().getBindingContext("student").getProperty();
			var aStudents = this.getView().getModel("student").getData().Students;
			var elementSelectedPos = aStudents.map(function(x) {
				return x.No;
			}).indexOf(sStudent.No);

			if (elementSelectedPos !== -1) {
				aStudents.splice(elementSelectedPos, 1);
			}

			var storageData = {
				Students: aStudents
			};

			this.getView().getModel("student").setData(storageData);
			this.oStorage.put("localData", storageData);

			// var oStudentModel = new JSONModel(aStudents);
			// this.getView().setModel(oStudentModel, "student");

		},

		onPress: function(oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			var oItem = oEvent.getSource();

			oRouter.navTo("detail", {
				studentPath: window.encodeURIComponent(oItem.getBindingContext("student").getPath().substr(1))
			});
		},

		onOpenNoteList: function(oEvent) {
			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("note");
		},

		onFilterStudents: function(oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oTable = this.byId("idStudentsTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
		}

	});
});