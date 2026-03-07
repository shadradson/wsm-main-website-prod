-- Contacts table (synced from Salesforce Contact)
CREATE TABLE IF NOT EXISTS contacts (
  sf_id TEXT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  certifications TEXT,
  about_us_sort_order INTEGER DEFAULT 0,
  trailblazer_url TEXT,
  photo_r2_key TEXT,
  synced_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Articles table (synced from Salesforce Article__c)
CREATE TABLE IF NOT EXISTS articles (
  sf_id TEXT PRIMARY KEY,
  name TEXT,
  subtitle TEXT,
  short_description TEXT,
  article_body TEXT,
  html_body TEXT,
  article_category TEXT,
  subcategory TEXT,
  author_id TEXT,
  author_first_name TEXT,
  author_last_name TEXT,
  author_title TEXT,
  splash_image_url TEXT,
  splash_image_background TEXT,
  publish_status TEXT,
  article_order INTEGER DEFAULT 0,
  navigation_type TEXT,
  nav_json TEXT,
  body_type TEXT,
  intended_audiences TEXT,
  parent_article_id TEXT,
  vertical_product TEXT,
  synced_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Sync log for tracking cron runs
CREATE TABLE IF NOT EXISTS sync_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  started_at TEXT NOT NULL,
  completed_at TEXT,
  status TEXT NOT NULL DEFAULT 'running',
  contacts_synced INTEGER DEFAULT 0,
  articles_synced INTEGER DEFAULT 0,
  error TEXT
);
