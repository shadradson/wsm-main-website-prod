-- Add order column to article_references (from Article_Reference__c.Order__c)
ALTER TABLE article_references ADD COLUMN ref_order INTEGER DEFAULT 0;
