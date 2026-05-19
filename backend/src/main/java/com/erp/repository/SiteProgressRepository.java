package com.erp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.model.SiteProgressUpdate;

public interface SiteProgressRepository extends JpaRepository<SiteProgressUpdate, Long> {
    List<SiteProgressUpdate> findAllByOrderByCreatedAtDesc();
    List<SiteProgressUpdate> findByProjectIdOrderByCreatedAtDesc(Long projectId);
}