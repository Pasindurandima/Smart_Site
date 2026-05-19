package com.erp.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.model.Client;

public interface ClientRepository extends JpaRepository<Client, Long> {
    Page<Client> findByNameContainingIgnoreCase(String name, Pageable pageable);
    boolean existsByEmail(String email);
    Page<Client> findByCompanyId(Long companyId, Pageable pageable);
    Page<Client> findByCompanyIdAndNameContainingIgnoreCase(Long companyId, String name, Pageable pageable);
    boolean existsByCompanyIdAndEmail(Long companyId, String email);
}
