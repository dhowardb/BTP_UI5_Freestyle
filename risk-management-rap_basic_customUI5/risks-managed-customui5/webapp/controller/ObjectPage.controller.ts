import MessageToast from "sap/m/MessageToast";
import Event from "sap/ui/base/Event";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @namespace rap.custom.risksmanagedcustomui5.controller
 */
export default class ObjectPage extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const Router = UIComponent.getRouterFor(this);
        Router.getRoute("RouteRisksObjectPage")?.attachPatternMatched(this._onObjectMatched, this);
    }

    public onNavBack(): void {
        const router = UIComponent.getRouterFor(this);
        router.navTo('RouteRisks')
    }

    private _onObjectMatched(event : Event ) : void {
        const args = event.getParameter("arguments" as never) as { [key: string]: string };
        const riskUuid: string | undefined = args?.Uuid;
        const IsActiveEntity: string | undefined = args?.IsActiveEntity;

        const sPath = `/Risks(Uuid=${riskUuid},IsActiveEntity=${IsActiveEntity})`;
        const view = this.getView();

        view?.bindElement({
            path : sPath,
            events : {
                dataRequested: function() {
                    view.setBusy(true);
                },
                dataReceived: function() {
                    view.setBusy(false);
                }
            }
        })
    }
}