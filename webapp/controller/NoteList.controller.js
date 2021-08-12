sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
], function(Controller, History, JSONModel, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("hnakyol.School.controller.NoteList", {

		onInit: function() {

			this.oStorage = jQuery.sap.storage(jQuery.sap.storage.Type.local); // if you want session log use 'Type.session'
			this.oStorage.get("localData");

			if (this.oStorage.get("localData")) {
				this.getView().setModel(new JSONModel(this.oStorage.get("localData")), "student");
			}

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("note").attachPatternMatched(this);

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

		onOpenStudentList: function() {

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.navTo("worklist", {}, true);

		},

		onFilterStudents: function(oEvent) {

			// build filter array
			var aFilter = [];
			var sQuery = oEvent.getParameter("query");
			if (sQuery) {
				aFilter.push(new Filter("Name", FilterOperator.Contains, sQuery));
			}

			// filter binding
			var oTable = this.byId("idNotesTable");
			var oBinding = oTable.getBinding("items");
			oBinding.filter(aFilter);
		},

		onSubmitGrade: function(oEvent) {

			var aStudents = this.getView().getModel("student").getData();

			var sStudent = oEvent.getSource().getParent().getBindingContext("student").getProperty();
			var vFirstGrade = sStudent.FirstGrade;
			var vFinalGrade = sStudent.FinalGrade;
			var vMeanGrade = ((vFirstGrade * (40 / 100)) + (vFinalGrade * (60 / 100)));

			var elementSelectedPos = aStudents.Students.map(function(x) {
				return x.No;
			}).indexOf(sStudent.No);
			if (elementSelectedPos !== -1) {
				aStudents.Students[elementSelectedPos].FirstGrade = vFirstGrade;
				aStudents.Students[elementSelectedPos].FinalGrade = vFinalGrade;
				aStudents.Students[elementSelectedPos].MeanGrade = vMeanGrade;

				if (vMeanGrade !== null) {
					if (vMeanGrade >= 90 && vMeanGrade <= 100) {
						aStudents.Students[elementSelectedPos].LetterGrade = "AA";
					} else if (vMeanGrade >= 90 && vMeanGrade <= 100) {
						aStudents.Students[elementSelectedPos].LetterGrade = "BA";
					} else if (vMeanGrade >= 80 && vMeanGrade <= 89) {
						aStudents.Students[elementSelectedPos].LetterGrade = "BB";
					} else if (vMeanGrade >= 70 && vMeanGrade <= 79) {
						aStudents.Students[elementSelectedPos].LetterGrade = "CB";
					} else if (vMeanGrade >= 60 && vMeanGrade <= 69) {
						aStudents.Students[elementSelectedPos].LetterGrade = "CC";
					} else if (vMeanGrade >= 50 && vMeanGrade <= 59) {
						aStudents.Students[elementSelectedPos].LetterGrade = "DC";
					} else if (vMeanGrade >= 40 && vMeanGrade <= 49) {
						aStudents.Students[elementSelectedPos].LetterGrade = "DD";
					} else {
						aStudents.Students[elementSelectedPos].LetterGrade = "FF";
					}
				}
			}
			
			var oStudentsModel = new JSONModel(aStudents);
			this.getView().setModel(oStudentsModel, "student");

			this.oStorage.put("localData", oStudentsModel.getData());

		},

		onBeforeRendering: function() {

		}

	});

});