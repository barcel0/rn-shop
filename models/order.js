class Order {
  constructor(id, ownerId, date, total, itemIds) {
    this.id = id;
    this.ownerId = ownerId;
    this.date = date;
    this.total = total;
    this.itemIds = itemIds;
  }
}

export default Order;