export interface DocumentsType {
  id: number;
  name: string;
  upload_date: string;
  updated_at: string;
  status: string;
  document_id: number;
}

export interface Content {
  cont_id: number;
  text: string;
  p_id: number;
  date: string;
}

export interface DocumentType {
  user_id: number;
  username: string;
  doc_id: number;
  upload_date: string;
  name: string;
  versions: Content[];
}
