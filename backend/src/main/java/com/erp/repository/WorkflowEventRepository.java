package com.erp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.model.WorkflowEvent;

public interface WorkflowEventRepository extends JpaRepository<WorkflowEvent, Long> {
    List<WorkflowEvent> findAllByOrderByCreatedAtDesc();
}