import List from "sap/m/List";
import Table from "sap/m/Table";
import EventBus from "sap/ui/core/EventBus";
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";

/**
 * @namespace at.clouddna.fcl.controller
 */
export default class Carrier extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        (this.getOwnerComponent() as any).getEventBus().subscribe("Carrier", "resetSelection", () => {
            (this.getView()?.byId("carrierList") as List).removeSelections(true);
        });
    }   

    private onNavToDetail(oEvent: Event) {
        let oBindingContext = (oEvent as any).getParameters().listItem.getBindingContext(),
            sPath = oBindingContext?.getPath(),
            oNextUIState = (this.getOwnerComponent() as any).getHelper().getNextUIState(1);

        let oRouter = (this.getOwnerComponent() as UIComponent).getRouter();
        oRouter.navTo("RouteCarrierDetails", {
            path: encodeURIComponent(sPath),
            query: {
                layout: oNextUIState.layout
            }
        });
    }
}