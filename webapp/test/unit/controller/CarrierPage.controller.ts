/*global QUnit*/
import Controller from "at/clouddna/fcl/controller/Carrier.controller";

QUnit.module("Carrier Controller");

QUnit.test("I should test the Carrier controller", function (assert: Assert) {
	const oAppController = new Controller("Carrier");
	oAppController.onInit();
	assert.ok(oAppController);
});