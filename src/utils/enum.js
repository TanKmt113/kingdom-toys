const ModelStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  DELETED: "deleted",
};

const DISCOUNTTYPE = {
  PERCENT: "percent",
  FIXED: "fixed",
};

const ORDERSTATUS = {
  PENDING: "pending",
  PAID: "paid",
  CANCELLED: "cancelled",
  SHIPPED: "shipped",
  DELIVERED: "delivered",
  DRAFT: "draft",
};

const PAYMENT_METHOD = {
  COD: "cod",
  ZALO: "zalo",
};

const ROLE = {
  ADMIN: "A",
  CLIENT: "C",
};
module.exports = {
  ModelStatus,
  DISCOUNTTYPE,
  ORDERSTATUS,
  PAYMENT_METHOD,
  ROLE,
};
