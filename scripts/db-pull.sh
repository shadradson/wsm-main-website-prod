#!/usr/bin/env sh
set -e

echo "Exporting remote D1 data (contacts, articles, csat_surveys, article_references)..."
npx wrangler d1 export wsm-website-db --remote --no-schema --table contacts        --output=scripts/_seed_contacts.sql
npx wrangler d1 export wsm-website-db --remote --no-schema --table articles        --output=scripts/_seed_articles.sql
npx wrangler d1 export wsm-website-db --remote --no-schema --table csat_surveys    --output=scripts/_seed_csat.sql
npx wrangler d1 export wsm-website-db --remote --no-schema --table article_references --output=scripts/_seed_refs.sql

cat scripts/_seed_contacts.sql scripts/_seed_articles.sql scripts/_seed_csat.sql scripts/_seed_refs.sql > scripts/dev-seed.sql
rm scripts/_seed_contacts.sql scripts/_seed_articles.sql scripts/_seed_csat.sql scripts/_seed_refs.sql

echo "Clearing local tables..."
npx wrangler d1 execute wsm-website-db --local --command="DELETE FROM article_references"
npx wrangler d1 execute wsm-website-db --local --command="DELETE FROM csat_surveys"
npx wrangler d1 execute wsm-website-db --local --command="DELETE FROM articles"
npx wrangler d1 execute wsm-website-db --local --command="DELETE FROM contacts"

echo "Importing data into local D1..."
npx wrangler d1 execute wsm-website-db --local --file=scripts/dev-seed.sql

echo "Done - local D1 is now in sync with remote."
