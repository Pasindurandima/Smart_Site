package com.erp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.dto.SiteProgressRequest;
import com.erp.dto.SiteProgressResponse;
import com.erp.model.SiteProgressUpdate;
import com.erp.repository.SiteProgressRepository;

@Service
@Transactional
public class SiteProgressService {

    private final SiteProgressRepository repository;

    public SiteProgressService(SiteProgressRepository repository) {
        this.repository = repository;
    }

    public SiteProgressResponse create(SiteProgressRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request body is required");
        }

        SiteProgressUpdate update = new SiteProgressUpdate();
        update.setProjectId(request.getProjectId());
        update.setEngineerEmail(request.getEngineerEmail());
        update.setTitle(request.getTitle().trim());
        update.setShortDescription(request.getShortDescription().trim());
        update.setComments(request.getComments());
        update.setImageData(request.getImageData());

        return toResponse(repository.save(update));
    }

    @Transactional(readOnly = true)
    public List<SiteProgressResponse> list(Long projectId) {
        List<SiteProgressUpdate> records = projectId == null
                ? repository.findAllByOrderByCreatedAtDesc()
                : repository.findByProjectIdOrderByCreatedAtDesc(projectId);

        return records.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private SiteProgressResponse toResponse(SiteProgressUpdate update) {
        SiteProgressResponse response = new SiteProgressResponse();
        response.setId(update.getId());
        response.setProjectId(update.getProjectId());
        response.setEngineerEmail(update.getEngineerEmail());
        response.setTitle(update.getTitle());
        response.setShortDescription(update.getShortDescription());
        response.setComments(update.getComments());
        response.setImageData(update.getImageData());
        response.setCreatedAt(update.getCreatedAt());
        return response;
    }
}