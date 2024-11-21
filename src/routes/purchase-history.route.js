const express = require("express");
const router = express.Router();
const purchaseHistoryController = require("../controllers/purchase-history.controller");

router.get("/", purchaseHistoryController.getPurchaseHistory);

module.exports = router;
