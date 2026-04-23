-- Add subcategory type columns to article_references
-- (from Article_Reference__c.Parent_Subcategory_Type__c and Child_Subcategory_Type__c)
ALTER TABLE article_references ADD COLUMN parent_subcategory_type TEXT;
ALTER TABLE article_references ADD COLUMN child_subcategory_type TEXT;
