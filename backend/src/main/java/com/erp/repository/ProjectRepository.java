package com.erp.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erp.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {
    Page<Project> findByNameContainingIgnoreCase(String name, Pageable pageable);
    List<Project> findByClientId(Long clientId);
    Page<Project> findByCompanyId(Long companyId, Pageable pageable);
    List<Project> findByCompanyIdAndClientId(Long companyId, Long clientId);
    void deleteByIdAndCompanyId(Long id, Long companyId);
}
