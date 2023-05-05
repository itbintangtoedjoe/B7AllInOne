class Document {
  constructor(
    id,
    judul,
    deskripsi,
    subcategory_id,
    path_url,
    accessible_path,
    keywords,
    valid_until,
    targeted_roles,
    created_by,
    creation_date,
    last_updated_on,
    is_deleted,
  ) {
    this.id = id;
    this.judul = judul;
    this.deskripsi = deskripsi;
    this.subcategory_id = subcategory_id;
    this.path_url = path_url;
    this.accessible_path = accessible_path;
    this.keywords = keywords;
    this.valid_until = valid_until;
    this.targeted_roles = targeted_roles;
    this.created_by = created_by;
    this.creation_date = creation_date;
    this.last_updated_on = last_updated_on;
    this.is_deleted = is_deleted;
  }
}

export default Document;
