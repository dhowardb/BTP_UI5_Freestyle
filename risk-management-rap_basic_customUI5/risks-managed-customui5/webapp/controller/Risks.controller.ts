import Button from "sap/m/Button";
import CheckBox from "sap/m/CheckBox";
import Dialog from "sap/m/Dialog";
import Input from "sap/m/Input";
import Label from "sap/m/Label";
import MessageToast from "sap/m/MessageToast";
import Table from "sap/m/Table";
import VBox from "sap/m/VBox";
import Event from "sap/ui/base/Event";
import Item from "sap/ui/core/Item";
import UIComponent from "sap/ui/core/UIComponent";
import Controller from "sap/ui/core/mvc/Controller";
import SimpleForm from "sap/ui/layout/form/SimpleForm";
import JSONModel from "sap/ui/model/json/JSONModel";
import ODataListBinding from "sap/ui/model/odata/v4/ODataListBinding";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

/**
 * @namespace rap.custom.risksmanagedcustomui5.controller
 */
export default class Risks extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/

    private _onDialog: Dialog | never;
    private oBinding: ODataListBinding;

    public onInit(): void {
        const riskModel = new JSONModel({
            newRisk: {
                Title: "",
                Owner: "",
                IsActiveEntity: true //Set to true since we dont handle draft data
            }
        });

        riskModel.setDefaultBindingMode("TwoWay");
        this.getView()?.setModel(riskModel, "createRisk");

        this._createDialogCreateRisk();
    }

    public onCheckBoxSelect(event: Event): void {
        const FixedLayout = event.getParameter("selected" as never);
        const source = event.getSource() as CheckBox;
        const TableID = source.data('targetTable') as string;

        const Table = this.byId(TableID) as Table;
        Table.setFixedLayout(FixedLayout);
    }

    public onNavigateToMitigations(event: Event): void {

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

    public onAddRisk(event: Event): void {
        if (this._onDialog) {
            (this._onDialog as Dialog).open()
        }
    }

    private _createDialogCreateRisk(): void {
        this._onDialog = new Dialog({
            title: "Create New Risk",
            resizable: true,
            contentWidth: "550px",
            contentHeight: "300px",
            content: [
                new SimpleForm({
                    editable: true,
                    layout: "ResponsiveGridLayout",
                    content: [
                        new Label({ text: "Title" }),
                        new Input({
                            value: "{createRisk>/newRisk/Title}",  // Binding to the model
                            required: true
                        }),
                        new Label({ text: "Owner" }),
                        new Input({
                            value: "{createRisk>/newRisk/Owner}",  // Binding to the model
                            required: true
                        })
                    ]
                })
            ],
            beginButton: new Button({
                text: "Create",
                press: () => this.onCreateRisk()
            }),
            endButton: new Button({
                text: "Cancel",
                press: () => this._onDialog?.close()
            })
        })

        this.getView()?.addDependent(this._onDialog);

    }

    private async onCreateRisk(): Promise<void> {
        const model = this.getView()?.getModel() as ODataModel;

        const riskModel = this.getView()?.getModel("createRisk") as JSONModel;
        const newRisk = riskModel.getProperty("/newRisk");
        const binding = this.getView()?.getModel()?.bindList("/Risks") as ODataListBinding;

        try {
            const context = binding.create(newRisk);
            await context.created();

            MessageToast.show("Risk created successfully");
            binding.refresh();
            this._onDialog.close()
        } catch (error) {
            MessageToast.show("Error creating risk");
            console.error("Create risk error:", error)
        }
    }
}