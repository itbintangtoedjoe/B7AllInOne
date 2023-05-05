class Pengiriman {
  constructor(
    id,
    resi_barang,
    jenis_barang,
    nik_pengirim,
    nama_pengirim,
    lokasi_pengirim,
    nik_admin_penerima,
    nik_penerima,
    nama_penerima,
    lokasi_penerima,
    keterangan,
    status,
    detail_status,
    creation_date,
    last_updated_on,
  ) {
    this.id = id;
    this.resi_barang = resi_barang;
    this.jenis_barang = jenis_barang;
    this.nik_pengirim = nik_pengirim;
    this.nama_pengirim = nama_pengirim;
    this.lokasi_pengirim = lokasi_pengirim;
    this.nik_admin_penerima = nik_admin_penerima;
    this.nik_penerima = nik_penerima;
    this.nama_penerima = nama_penerima;
    this.lokasi_penerima = lokasi_penerima;
    this.keterangan = keterangan;
    this.status = status;
    this.detail_status = detail_status;
    this.creation_date = creation_date;
    this.last_updated_on = last_updated_on;
  }
}

export default Pengiriman;
