import BaseComponent from "sap/ui/core/UIComponent";
import { createDeviceModel } from "./model/models";
import { LayoutType } from "sap/f/library";
import FlexibleColumnLayoutSemanticHelper from "sap/f/FlexibleColumnLayoutSemanticHelper";
import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import EventBus from "sap/ui/core/EventBus";

/**
 * @namespace at.clouddna.fcl
 */
export default class Component extends BaseComponent {

	public static metadata = {
		manifest: "json"
	};

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
	public init() : void {
		// call the base component's init function
		super.init();

        // enable routing
        this.getRouter().initialize();

        // set the device model
        this.setModel(createDeviceModel(), "device");
	}

    public getHelper() {
        var oFCL = (this.getRootControl() as any).byId("fcl") as FlexibleColumnLayout,
            oParams = new URLSearchParams(window.location.search),
            oSettings = {
                defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
                defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
                maxColumnsCount: oParams.get("max")
            };

        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings);
    }
}