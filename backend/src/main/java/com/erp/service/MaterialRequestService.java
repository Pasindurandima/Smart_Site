package com.erp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.dto.MaterialRequestDTO;
import com.erp.model.MaterialRequest;
import com.erp.repository.MaterialRequestRepository;

@Service
@Transactional
public class MaterialRequestService {

    private final MaterialRequestRepository materialRequestRepository;

    public MaterialRequestService(MaterialRequestRepository materialRequestRepository) {
        this.materialRequestRepository = materialRequestRepository;
    }

    public MaterialRequestDTO createRequest(MaterialRequestDTO req) {
        Long currentCompany = currentCompanyId();
        if (currentCompany == null) {
            throw new IllegalArgumentException("Company is required");
        }

        MaterialRequest mr = new MaterialRequest();
        mr.setCompanyId(currentCompany);
        mr.setProjectId(req.getProjectId());
        mr.setEngineerId(req.getEngineerId());
        mr.setMaterialId(req.getMaterialId());
        mr.setMaterialName(req.getMaterialName());
        mr.setQuantity(req.getQuantity());
        if (req.getPriority() != null) {
            mr.setPriority(MaterialRequest.Priority.valueOf(req.getPriority()));
        }
        mr.setStatus(MaterialRequest.RequestStatus.PENDING);

        MaterialRequest saved = materialRequestRepository.save(mr);
        return toDTO(saved);
    }

    public List<MaterialRequestDTO> listPendingRequests(int page, int size) {
        Long currentCompany = currentCompanyId();
        if (currentCompany == null) {
            throw new IllegalArgumentException("Company is required");
        }

        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, size));
        Page<MaterialRequest> results = materialRequestRepository.findByCompanyIdAndStatus(
            currentCompany, MaterialRequest.RequestStatus.PENDING, pageable);
        return results.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public List<MaterialRequestDTO> listAllRequests(int page, int size) {
        Long currentCompany = currentCompanyId();
        if (currentCompany == null) {
            throw new IllegalArgumentException("Company is required");
        }

        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, size));
        Page<MaterialRequest> results = materialRequestRepository.findByCompanyId(currentCompany, pageable);
        return results.stream().map(this::toDTO).collect(Collectors.toList());
    }

    public MaterialRequestDTO approveRequest(Long id) {
        Long currentCompany = currentCompanyId();
        MaterialRequest mr = materialRequestRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        if (!currentCompany.equals(mr.getCompanyId())) {
            throw new IllegalArgumentException("Request not found");
        }

        mr.setStatus(MaterialRequest.RequestStatus.APPROVED);
        MaterialRequest saved = materialRequestRepository.save(mr);
        return toDTO(saved);
    }

    public MaterialRequestDTO rejectRequest(Long id) {
        Long currentCompany = currentCompanyId();
        MaterialRequest mr = materialRequestRepository.findById(id)
            .orElseThrow(() -> new IllegalArgumentException("Request not found"));

        if (!currentCompany.equals(mr.getCompanyId())) {
            throw new IllegalArgumentException("Request not found");
        }

        mr.setStatus(MaterialRequest.RequestStatus.REJECTED);
        MaterialRequest saved = materialRequestRepository.save(mr);
        return toDTO(saved);
    }

    private MaterialRequestDTO toDTO(MaterialRequest mr) {
        MaterialRequestDTO dto = new MaterialRequestDTO();
        dto.setId(mr.getId());
        dto.setCompanyId(mr.getCompanyId());
        dto.setProjectId(mr.getProjectId());
        dto.setEngineerId(mr.getEngineerId());
        dto.setMaterialId(mr.getMaterialId());
        dto.setMaterialName(mr.getMaterialName());
        dto.setQuantity(mr.getQuantity());
        dto.setPriority(mr.getPriority().name());
        dto.setStatus(mr.getStatus().name());
        dto.setCreatedAt(mr.getCreatedAt());
        return dto;
    }

    private Long currentCompanyId() {
        return com.erp.security.AuthContext.get() != null ? com.erp.security.AuthContext.get().getCompanyId() : null;
    }
}
