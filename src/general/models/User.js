class User {
  constructor(
    nik,
    nama_role,
    nama_user,
    email,
    user_ad,
    poin_bisa,
    is_admin,
    tanggal_awal_redeem,
    tanggal_akhir_redeem,
    jumlah_notifikasi,
  ) {
    this.nik = nik;
    this.nama_role = nama_role;
    this.nama_user = nama_user;
    this.email = email;
    this.user_ad = user_ad;
    this.poin_bisa = poin_bisa;
    this.is_admin = is_admin;
    this.tanggal_awal_redeem = tanggal_awal_redeem;
    this.tanggal_akhir_redeem = tanggal_akhir_redeem;
    this.jumlah_notifikasi = jumlah_notifikasi;
  }
}

export default User;
