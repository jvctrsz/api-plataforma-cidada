
UPDATE "solicitacao"
SET 
  "protocolo" = TO_CHAR(NOW(), 'MM/YYYY') || '-' || UPPER(SUBSTRING(MD5(CAST("id" AS TEXT)), 1, 6))
WHERE 
  "protocolo" IS NULL;