package com.erp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.erp.model.OperationalRecord;
import com.erp.model.OperationalRecordType;

public interface OperationalRecordRepository extends JpaRepository<OperationalRecord, Long> {
    List<OperationalRecord> findAllByOrderByCreatedAtDesc();
    List<OperationalRecord> findByRecordTypeOrderByCreatedAtDesc(OperationalRecordType recordType);
}