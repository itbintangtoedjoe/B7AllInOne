class Subcategory {
  constructor(
    id,
    nama_subkategori,
    category_id,
    created_by,
    creation_date,
    last_updated_on,
    is_deleted,
  ) {
    this.id = id;
    this.nama_subkategori = nama_subkategori;
    this.category_id = category_id;
    this.created_by = created_by;
    this.creation_date = creation_date;
    this.last_updated_on = last_updated_on;
    this.is_deleted = is_deleted;
  }
}

export default Subcategory;
