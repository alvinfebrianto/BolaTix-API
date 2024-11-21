const purchaseHistoryService = require("../services/purchase-history.service");

const getPurchaseHistory = async (req, res, next) => {
  try {
    const purchaseHistory = await purchaseHistoryService.getPurchaseHistory();
    res.json(purchaseHistory);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPurchaseHistory,
};
