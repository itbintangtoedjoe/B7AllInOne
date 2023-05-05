class CartItem {
  constructor(
    id,
    nik,
    nama_item,
    detail_item,
    poin_item,
    jumlah_item,
    img_url,
  ) {
    this.id = id;
    this.nik = nik;
    this.nama_item = nama_item;
    this.detail_item = detail_item;
    this.poin_item = poin_item;
    this.jumlah_item = jumlah_item;
    this.img_url = img_url;
  }
}

export default CartItem;
