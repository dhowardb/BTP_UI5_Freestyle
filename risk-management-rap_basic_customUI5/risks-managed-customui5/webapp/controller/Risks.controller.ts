import CheckBox from "sap/m/CheckBox";
import Table from "sap/m/Table";
import Event from "sap/ui/base/Event";
import Item from "sap/ui/core/Item";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";

/**
 * @namespace rap.custom.risksmanagedcustomui5.controller
 */
export default class Risks extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
    }

    public onCheckBoxSelect(event : Event) : void {
        const FixedLayout = event.getParameter( "selected" as never);
        const source = event.getSource() as CheckBox;
        const TableID = source.data('targetTable') as string;
        
        const Table = this.byId(TableID) as Table;
        Table.setFixedLayout(FixedLayout);
    }

    public onNavigateToMitigations(event: Event) : void {

        const selectedItem = event.getSource() as Item;
        const bindingContext = selectedItem.getBindingContext();

        const router = UIComponent.getRouterFor(this);
        const riskUUID = bindingContext?.getProperty("Uuid") as string;
        const IsActiveEntity = bindingContext?.getProperty("IsActiveEntity") as string;

        router.navTo("RouteRisksObjectPage", {
            Uuid: riskUUID,
            IsActiveEntity: IsActiveEntity ? "true" : "false"
        })
    }
}