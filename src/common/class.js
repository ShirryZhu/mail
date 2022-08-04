export class RecommendItem {
  constructor(listItem) {
    this.image = listItem.image
    this.title = listItem.title
    this.price = listItem.price
    this.cfav = listItem.cfav
  }
}

export class HomeGoodsItem {
  constructor(listItem) {
    this.iid = listItem.iid
    this.image = listItem.show.img
    this.title = listItem.title
    this.price = listItem.price
    this.cfav = listItem.cfav
  }
}