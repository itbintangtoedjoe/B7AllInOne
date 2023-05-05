class Category {
  constructor(
    id,
    nama_kategori,
    created_by,
    creation_date,
    last_updated_on,
    is_deleted,
  ) {
    this.id = id;
    this.nama_kategori = nama_kategori;
    this.created_by = created_by;
    this.creation_date = creation_date;
    this.last_updated_on = last_updated_on;
    this.is_deleted = is_deleted;
  }
}

export default Category;
