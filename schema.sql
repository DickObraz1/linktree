CREATE TABLE kliky (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  link_id TEXT NOT NULL,
  bio_page TEXT NOT NULL,
  cas TEXT NOT NULL,        -- ISO datum a čas
  zeme TEXT,                -- z hlavičky cf-ipcountry
  mobil INTEGER              -- 0 nebo 1
);
