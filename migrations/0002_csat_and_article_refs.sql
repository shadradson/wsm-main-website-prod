-- CSAT Surveys (synced from Salesforce CSAT_Survey__c)
CREATE TABLE IF NOT EXISTS csat_surveys (
  sf_id TEXT PRIMARY KEY,
  name TEXT,
  account_name TEXT,
  client_account_id TEXT,
  contact_id TEXT,
  csat_date TEXT,
  first_name TEXT,
  last_name TEXT,
  title TEXT,
  star_rating INTEGER,
  star_rating_picklist TEXT,
  refer_likelihood INTEGER,
  how_can_we_do_better TEXT,
  permission_for_website INTEGER DEFAULT 0,
  website_testimonial_blurb TEXT,
  wsm_response TEXT,
  synced_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Article References (synced from Salesforce Article_Reference__c)
CREATE TABLE IF NOT EXISTS article_references (
  sf_id TEXT PRIMARY KEY,
  name TEXT,
  child_article_id TEXT,
  parent_or_primary_id TEXT,
  csat_survey_id TEXT,
  relationship_type TEXT,
  wsm_contract_id TEXT,
  synced_at TEXT NOT NULL DEFAULT (datetime('now'))
);
