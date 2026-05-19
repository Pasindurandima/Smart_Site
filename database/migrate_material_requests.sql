-- Migration: Add material_name column to material_requests table
-- This script adds support for storing material names directly in requests
-- Allows engineers to specify material names without requiring a pre-existing inventory entry

ALTER TABLE material_requests ADD COLUMN material_name VARCHAR(255) AFTER material_id;

-- Optional: Backfill existing requests with material names from inventory if available
UPDATE material_requests mr
SET mr.material_name = i.name
WHERE mr.material_id IS NOT NULL
  AND mr.material_name IS NULL
  AND i.id = mr.material_id;
