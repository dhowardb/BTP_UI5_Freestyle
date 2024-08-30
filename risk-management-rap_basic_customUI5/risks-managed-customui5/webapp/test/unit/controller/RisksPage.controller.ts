/*global QUnit*/
import Controller from "rap/custom/risksmanagedcustomui5/controller/Risks.controller";

QUnit.module("Risks Controller");

QUnit.test("I should test the Risks controller", function (assert: Assert) {
	const oAppController = new Controller("Risks");
	oAppController.onInit();
	assert.ok(oAppController);
});