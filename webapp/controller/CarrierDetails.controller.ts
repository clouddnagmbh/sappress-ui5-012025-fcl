import Table from "sap/m/Table";
import EventBus from "sap/ui/core/EventBus";
import Controller from "sap/ui/core/mvc/Controller";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";

/**
 * @namespace at.clouddna.fcl.controller
 */
export default class CarrierDetails extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        let oRouter = (this.getOwnerComponent() as UIComponent).getRouter(),
            oRoute = oRouter.getRoute("RouteCarrierDetails"),
            oFlightRoute = oRouter.getRoute("RouteFlightDetails");
        oRoute?.attachPatternMatched(this.onPatternMatched, this);
        oFlightRoute?.attachPatternMatched(this.onPatternMatched, this);

        (this.getOwnerComponent() as any).getEventBus().subscribe("CarrierDetails", "resetSelection", () => {
            (this.getView()?.byId("tableFlights") as Table).removeSelections(true);
        });
    }

    private onPatternMatched(oEvent: Event) {
        let oArguments = (oEvent as any).getParameters().arguments,
            sPath = decodeURIComponent(oArguments.path);
        this.getView()?.bindElement({
            path: sPath,
            parameters: { "$expand": "carrierFlights" }
        });
    }
    
    private stateAvSeats(seats: int, seatsocc: int): string {
        let iDiff = seats - seatsocc;
        if (iDiff <= 15) {
            return "Error";
        } else if (iDiff <= 25) {
            return "Warning";
        } else {
            return "Success";
        }
    }
    private iconAvSeats(seats: int, seatsocc: int): string {
        let iDiff = seats - seatsocc;
        if (iDiff <= 15) {
            return "sap-icon://message-error";
        } else if (iDiff <= 25) {
            return "sap-icon://message-warning";
        } else {
            return "sap-icon://message-success";
        }
    }

    private onNavToFlightDetail(oEvent: Event) {
        let oBindingContext = (oEvent as any).getParameters().listItem.getBindingContext(),
            sPath = oBindingContext?.getPath(),
            oNextUIState = (this.getOwnerComponent() as any).getHelper().getNextUIState(2);

        let oRouter = (this.getOwnerComponent() as UIComponent).getRouter();
        oRouter.navTo("RouteFlightDetails", {
            path: encodeURIComponent(this.getView()?.getElementBinding()?.getPath() as string),
            path2: encodeURIComponent(sPath),
            "?query": {
                layout: oNextUIState.layout
            }
        });
    }

    private handleFullScreen () {
        let sNextLayout = (this.getOwnerComponent()?.getModel("ui") as JSONModel).getProperty("/actionButtonsInfo/midColumn/fullScreen");
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteCarrierDetails", {
            path: encodeURIComponent(this.getView()?.getElementBinding()?.getPath() as string),
            "?query": {
                layout: sNextLayout
            }
        });
    }

    private handleExitFullScreen () {
        let sNextLayout = (this.getOwnerComponent()?.getModel("ui") as JSONModel).getProperty("/actionButtonsInfo/midColumn/exitFullScreen");
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteCarrierDetails", {
            path: encodeURIComponent(this.getView()?.getElementBinding()?.getPath() as string),
            "?query": {
                layout: sNextLayout
            }
        });
    }

    private handleClose () {
        let sNextLayout = (this.getOwnerComponent()?.getModel("ui") as JSONModel).getProperty("/actionButtonsInfo/midColumn/closeColumn");
        (this.getOwnerComponent() as any).getEventBus().publish("Carrier", "resetSelection");
        (this.getOwnerComponent() as UIComponent).getRouter().navTo("RouteCarrier", {
            "?query": {
                layout: sNextLayout
            }
        });
    }
}