CREATE TABLE IF NOT EXISTS projects (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  client_id BIGINT,
  description TEXT,
  address VARCHAR(512),
  status VARCHAR(100),
  budget DECIMAL(15,2),
  manager_id BIGINT,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
