package com.erp.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.erp.model.MaterialRequest;

@Repository
public interface MaterialRequestRepository extends JpaRepository<MaterialRequest, Long> {
    Page<MaterialRequest> findByCompanyId(Long companyId, Pageable pageable);
    Page<MaterialRequest> findByCompanyIdAndStatus(Long companyId, MaterialRequest.RequestStatus status, Pageable pageable);
    List<MaterialRequest> findByCompanyIdAndProjectId(Long companyId, Long projectId);
}
