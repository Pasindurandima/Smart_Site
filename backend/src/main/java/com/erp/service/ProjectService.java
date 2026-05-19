package com.erp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.dto.ProjectRequest;
import com.erp.dto.ProjectResponse;
import com.erp.model.Project;
import com.erp.model.WorkflowWorkType;
import com.erp.repository.ProjectRepository;

@Service
@Transactional
public class ProjectService {
    private final ProjectRepository repo;
    private final WorkflowService workflowService;

    public ProjectService(ProjectRepository repo, WorkflowService workflowService) {
        this.repo = repo;
        this.workflowService = workflowService;
    }

    public List<ProjectResponse> listAll() {
        Long currentCompany = currentCompanyId();
        return (currentCompany == null ? repo.findAll() : repo.findByCompanyId(currentCompany, Pageable.unpaged()).getContent())
            .stream()
            .map(this::toResponse)
            .collect(Collectors.toList());
    }

    public Optional<ProjectResponse> getById(Long id) {
        return repo.findById(id)
                .filter(project -> isAllowed(project.getCompanyId()))
                .map(this::toResponse);
    }

    public ProjectResponse create(ProjectRequest req) {
        Project p = new Project();
        applyRequest(p, req);
        Long currentCompany = currentCompanyId();
        if (currentCompany == null) {
            throw new IllegalArgumentException("Company is required");
        }
        p.setCompanyId(currentCompany);
        p = repo.save(p);

        workflowService.recordProjectEvent(
                p.getId(),
                WorkflowWorkType.PROJECT_SETUP,
                "Project created",
                "Project created and ready for planning",
                "SYSTEM",
                p.getStatus());

        return toResponse(p);
    }

    public Optional<ProjectResponse> update(Long id, ProjectRequest req) {
        return repo.findById(id).map(existingProject -> {
            if (!isAllowed(existingProject.getCompanyId())) {
                throw new IllegalArgumentException("Project not found");
            }
            String previousStatus = existingProject.getStatus();
            applyRequest(existingProject, req);
            Project savedProject = repo.save(existingProject);

            if (savedProject.getStatus() != null && !savedProject.getStatus().equals(previousStatus)) {
                workflowService.recordProjectEvent(
                        savedProject.getId(),
                        WorkflowWorkType.PROGRESS_TRACKING,
                        "Project status updated",
                        "Project status changed from " + previousStatus + " to " + savedProject.getStatus(),
                        "SYSTEM",
                        savedProject.getStatus());
            }

            return toResponse(savedProject);
        });
    }

    public void delete(Long id) {
        Long currentCompany = currentCompanyId();
        if (currentCompany == null) {
            throw new IllegalArgumentException("Project not found");
        }
        Project existing = repo.findById(id).orElseThrow(() -> new IllegalArgumentException("Project not found"));
        if (!currentCompany.equals(existing.getCompanyId())) {
            throw new IllegalArgumentException("Project not found");
        }
        repo.deleteById(id);
    }

    public List<ProjectResponse> findByClient(Long clientId) {
        Long currentCompany = currentCompanyId();
        return (currentCompany == null ? repo.findByClientId(clientId) : repo.findByCompanyIdAndClientId(currentCompany, clientId))
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    private void applyRequest(Project p, ProjectRequest req) {
        p.setName(req.getName());
        p.setClientId(req.getClientId());
        p.setDescription(req.getDescription());
        p.setAddress(req.getAddress());
        p.setStatus(req.getStatus());
        p.setBudget(req.getBudget());
        p.setManagerId(req.getManagerId());
        p.setStartDate(req.getStartDate());
        p.setEndDate(req.getEndDate());
    }

    private ProjectResponse toResponse(Project p) {
        ProjectResponse r = new ProjectResponse();
        r.setId(p.getId());
        r.setName(p.getName());
        r.setClientId(p.getClientId());
        r.setDescription(p.getDescription());
        r.setAddress(p.getAddress());
        r.setStatus(p.getStatus());
        r.setBudget(p.getBudget());
        r.setManagerId(p.getManagerId());
        r.setStartDate(p.getStartDate());
        r.setEndDate(p.getEndDate());
        r.setCreatedAt(p.getCreatedAt());
        return r;
    }

    private Long currentCompanyId() {
        return com.erp.security.AuthContext.get() != null ? com.erp.security.AuthContext.get().getCompanyId() : null;
    }

    private boolean isAllowed(Long companyId) {
        Long currentCompany = currentCompanyId();
        return currentCompany == null || companyId == null || currentCompany.equals(companyId);
    }
}

