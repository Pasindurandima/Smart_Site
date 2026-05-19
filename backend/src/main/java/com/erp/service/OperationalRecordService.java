package com.erp.service;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.dto.OperationalRecordRequest;
import com.erp.dto.OperationalRecordResponse;
import com.erp.model.OperationalRecord;
import com.erp.model.OperationalRecordType;
import com.erp.repository.OperationalRecordRepository;

@Service
@Transactional
public class OperationalRecordService {

    private final OperationalRecordRepository repository;
    private final WorkflowService workflowService;

    public OperationalRecordService(OperationalRecordRepository repository, WorkflowService workflowService) {
        this.repository = repository;
        this.workflowService = workflowService;
    }

    public List<OperationalRecordResponse> listAll() {
        return repository.findAllByOrderByCreatedAtDesc().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public List<OperationalRecordResponse> listByType(String recordTypeValue) {
        return repository.findByRecordTypeOrderByCreatedAtDesc(parseType(recordTypeValue)).stream().map(this::toResponse).collect(Collectors.toList());
    }

    public OperationalRecordResponse create(OperationalRecordRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request body is required");
        }

        OperationalRecord record = new OperationalRecord();
        record.setRecordType(parseType(request.getRecordType()));
        record.setProjectId(request.getProjectId());
        record.setTitle(request.getTitle().trim());
        record.setAmount(request.getAmount());
        record.setQuantity(request.getQuantity());
        record.setStatus(request.getStatus().trim().toUpperCase(Locale.ROOT));
        record.setNotes(request.getNotes());
        record.setActorRole(request.getActorRole().trim().toUpperCase(Locale.ROOT));

        OperationalRecord saved = repository.save(record);

        workflowService.recordProjectEvent(
                saved.getProjectId(),
                mapWorkflowType(saved.getRecordType()),
                saved.getTitle(),
                saved.getNotes() == null ? "Operational record created" : saved.getNotes(),
                saved.getActorRole(),
                saved.getStatus());

        return toResponse(saved);
    }

    private OperationalRecordType parseType(String value) {
        try {
            return OperationalRecordType.valueOf(value.trim().toUpperCase(Locale.ROOT));
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid record type");
        }
    }

    private com.erp.model.WorkflowWorkType mapWorkflowType(OperationalRecordType type) {
        switch (type) {
            case WORKER:
                return com.erp.model.WorkflowWorkType.WORKER_MANAGEMENT;
            case MATERIAL:
                return com.erp.model.WorkflowWorkType.INVENTORY_MANAGEMENT;
            case EXPENSE:
                return com.erp.model.WorkflowWorkType.EXPENSE_MANAGEMENT;
            case INVOICE:
            case PAYMENT:
                return com.erp.model.WorkflowWorkType.FINANCE_MONITORING;
            case DAILY_UPDATE:
                return com.erp.model.WorkflowWorkType.DAILY_SITE_UPDATES;
            case MATERIAL_REQUEST:
                return com.erp.model.WorkflowWorkType.MATERIAL_REQUESTS;
            case APPROVAL:
                return com.erp.model.WorkflowWorkType.CLIENT_APPROVALS;
            case SUBSCRIPTION:
                return com.erp.model.WorkflowWorkType.SUBSCRIPTION_MANAGEMENT;
            default:
                throw new IllegalArgumentException("Invalid record type");
        }
    }

    private OperationalRecordResponse toResponse(OperationalRecord record) {
        OperationalRecordResponse response = new OperationalRecordResponse();
        response.setId(record.getId());
        response.setRecordType(record.getRecordType().name());
        response.setProjectId(record.getProjectId());
        response.setTitle(record.getTitle());
        response.setAmount(record.getAmount());
        response.setQuantity(record.getQuantity());
        response.setStatus(record.getStatus());
        response.setNotes(record.getNotes());
        response.setActorRole(record.getActorRole());
        response.setCreatedAt(record.getCreatedAt());
        return response;
    }
}