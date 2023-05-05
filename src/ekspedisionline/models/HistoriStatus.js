// class Pengiriman {
//   constructor(
//     id,
//     id_pengiriman,
//     id_petugas,
//     nama_petugas,
//     detail_status,
//     updated_on,
//   ) {
//     this.id = id;
//     this.id_pengiriman = id_pengiriman;
//     this.id_petugas = id_petugas;
//     this.nama_petugas = nama_petugas;
//     this.detail_status = detail_status;
//     this.updated_on = updated_on;
//   }
// }

class HistoriStatus {
  constructor(id, status, detail_status, updated_on) {
    this.id = id;
    this.title = status;
    this.description = detail_status;
    this.time = updated_on;
  }
}

export default HistoriStatus;
