import FlexibleColumnLayout from "sap/f/FlexibleColumnLayout";
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace at.clouddna.fcl.controller
 */
export default class App extends Controller {

    private oFCL: FlexibleColumnLayout;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        let oOwnerComponent = (this.getOwnerComponent() as UIComponent);
        oOwnerComponent.getRouter().attachRouteMatched(this.onRouteMatched, this);
        oOwnerComponent.setModel(new JSONModel({
            layout: "OneColumn"
        }), "ui");
        this.oFCL = this.getView()?.byId("fcl") as FlexibleColumnLayout;
    }

    private onRouteMatched(oEvent: Event) {
        let sLayout = (oEvent as any).getParameters().arguments["?query"]?.layout;

        if (!sLayout) {
            let oNextUIState = (this.getOwnerComponent() as any).getHelper().getNextUIState(0);
            sLayout = oNextUIState.layout;
        }

        if (sLayout) {
            ((this.getOwnerComponent() as UIComponent).getModel("ui") as JSONModel).setProperty("/layout", sLayout);
        }

        let oActionButtonsInfo = (this.getOwnerComponent() as any).getHelper().getCurrentUIState().actionButtonsInfo;
        ((this.getOwnerComponent() as UIComponent).getModel("ui") as JSONModel).setProperty("/actionButtonsInfo", oActionButtonsInfo);
    }

}