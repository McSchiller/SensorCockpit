sap.ui.define([
	"jquery.sap.global",
	"./BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device",
	'sap/m/Popover',
	'sap/m/Button'
], function(jQuery, BaseController, JSONModel, Device, Popover, Button) {
	"use strict";

	return BaseController.extend("schiller.SensorCockpit.controller.App", {

		onInit: function() {
			// shortcut to FioriClient helper
			this.oFioriClient = this.getComponent().getFioriClient();

			// ui view model
			var oViewModel = new JSONModel({
				"isFioriClientAvailable": this.oFioriClient.isAvailable()
			});
			this.setModel(oViewModel, "ui");
			this.oViewModel = oViewModel;

			// shortcut
			this.oToolPage = this.byId("toolPage");
		},

		
		onAfterRendering: function() {
			// auto expand on tablet
			if (Device.system.tablet) {
				this.oToolPage.setSideExpanded(true);
			}
		},
		
		
		onHelp: function() {
			sap.m.URLHelper.redirect("https://github.com/McSchiller/SensorCockpit/wiki", true);
		},
		
		onItemSelect: function(oEvent) {
			this.onNavTo(oEvent);

			if (Device.system.phone) {
				this.oToolPage.setSideExpanded(false);
			}
		},

		onSideNavButtonPress: function() {
			this.oToolPage.setSideExpanded(!this.oToolPage.getSideExpanded());
		},
		onUserNamePress: function (event) {
			var that = this;
			var popover = new Popover({
				showHeader: false,
				placement: sap.m.PlacementType.Bottom,
				content:[
					new Button({
						text: 'Feedback',
						type: sap.m.ButtonType.Transparent,
						icon: "sap-icon://feed"
					}),
					new Button({
						text: 'Help',
						type: sap.m.ButtonType.Transparent,
						icon: "sap-icon://sys-help",
						press: that.onHelp
					}),
					new Button({
						text: 'Logout',
						type: sap.m.ButtonType.Transparent,
						icon: "sap-icon://log"
					})
				]
			}).addStyleClass('sapMOTAPopover sapTntToolHeaderPopover');

			popover.openBy(event.getSource());
		}

	});
});