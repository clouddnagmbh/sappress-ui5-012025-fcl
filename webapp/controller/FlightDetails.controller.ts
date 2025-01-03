import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace at.clouddna.fcl.controller
 */
export default class FlightDetails extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        let oRouter = (this.getOwnerComponent() as UIComponent).getRouter(),
            oRoute = oRouter.getRoute("RouteFlightDetails");
        oRoute?.attachPatternMatched(this.onPatternMatched, this);
    }

    private sParentPath : string;

    private onPatternMatched(oEvent: Event) {
        let oArguments = (oEvent as any).getParameters().arguments,
            sPath = decodeURIComponent(oArguments.path2);
        
        this.getView()?.bindElement({
            path: sPath,
            parameters: { "$expand": "flightBookings" }
        });

        this.sParentPath = oArguments.path;
    }

    private toUpper(sValue: string){
        return sValue?.toUpperCase();
    }

    private handleFullScreen () {
        let sNextLayout = (this.getOwnerComponent()?.getModel("ui") as JSONModel).getProperty("/actionButtonsInfo/endColumn/fullScreen");
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteCarrierDetails", {
            path: encodeURIComponent(this.getView()?.getElementBinding()?.getPath() as string),
            path2: this.sParentPath,
            "?query": {
                layout: sNextLayout
            }
        });
    }

    private handleExitFullScreen () {
        let sNextLayout = (this.getOwnerComponent()?.getModel("ui") as JSONModel).getProperty("/actionButtonsInfo/endColumn/exitFullScreen");
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteCarrierDetails", {
            path: encodeURIComponent(this.getView()?.getElementBinding()?.getPath() as string),
            path2: this.sParentPath,
            "?query": {
                layout: sNextLayout
            }
        });
    }

    private handleClose () {
        let sNextLayout = (this.getOwnerComponent()?.getModel("ui") as JSONModel).getProperty("/actionButtonsInfo/endColumn/closeColumn");
        //(this.getOwnerComponent() as any).getEventBus().publish("CarrierDetails", "resetSelection");
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteCarrierDetails", {
            path: this.sParentPath,
            "?query": {
                layout: sNextLayout
            }
        });
    }
    
}