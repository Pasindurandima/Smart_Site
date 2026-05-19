USE smartsite_db;

SET FOREIGN_KEY_CHECKS = 0;

-- Backfill users from known tenant email domains / seeded records.
UPDATE users
SET company_id = 1
WHERE company_id IS NULL
  AND (email LIKE '%@abcconstruction.com' OR email LIKE '%abcconstruction%');

UPDATE users
SET company_id = 2
WHERE company_id IS NULL
  AND (email LIKE '%@xyzengineering.com' OR email LIKE '%xyzengineering%');

-- Backfill clients from company name / email patterns.
UPDATE clients
SET company_id = 1
WHERE company_id IS NULL
  AND (
      company LIKE '%ABC%'
      OR email LIKE '%@abcconstruction.com'
      OR name LIKE '%ABC%'
  );

UPDATE clients
SET company_id = 2
WHERE company_id IS NULL
  AND (
      company LIKE '%XYZ%'
      OR email LIKE '%@xyzengineering.com'
      OR name LIKE '%XYZ%'
  );

-- Projects inherit tenant from the linked client first, then from the assigned manager.
UPDATE projects p
JOIN clients c ON c.id = p.client_id
SET p.company_id = c.company_id
WHERE p.company_id IS NULL
  AND c.company_id IS NOT NULL;

UPDATE projects p
JOIN users u ON u.id = p.manager_id
SET p.company_id = u.company_id
WHERE p.company_id IS NULL
  AND u.company_id IS NOT NULL;

-- Subordinate tables inherit tenant from their parent records.
UPDATE tasks t
JOIN projects p ON p.id = t.project_id
SET t.company_id = p.company_id
WHERE t.company_id IS NULL
  AND p.company_id IS NOT NULL;

UPDATE milestones m
JOIN projects p ON p.id = m.project_id
SET m.company_id = p.company_id
WHERE m.company_id IS NULL
  AND p.company_id IS NOT NULL;

UPDATE workers w
JOIN projects p ON p.id = w.assigned_project_id
SET w.company_id = p.company_id
WHERE w.company_id IS NULL
  AND w.assigned_project_id IS NOT NULL
  AND p.company_id IS NOT NULL;

UPDATE inventory i
JOIN suppliers s ON s.id = i.supplier_id
SET i.company_id = s.company_id
WHERE i.company_id IS NULL
  AND i.supplier_id IS NOT NULL
  AND s.company_id IS NOT NULL;

UPDATE attendance a
JOIN workers w ON w.id = a.worker_id
SET a.company_id = w.company_id
WHERE a.company_id IS NULL
  AND w.company_id IS NOT NULL;

UPDATE suppliers
SET company_id = 1
WHERE company_id IS NULL
  AND (supplier_name LIKE '%ABC%' OR email LIKE '%@abcconstruction.com');

UPDATE suppliers
SET company_id = 2
WHERE company_id IS NULL
  AND (supplier_name LIKE '%XYZ%' OR email LIKE '%@xyzengineering.com');

SET FOREIGN_KEY_CHECKS = 1;

-- Manual review reminders:
-- 1. Any remaining NULL company_id rows should be reviewed before enabling strict tenant checks.
-- 2. After backfill, verify the tenant counts for companies, users, clients, projects, workers, inventory, and attendance.