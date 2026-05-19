package com.erp.dto;

import java.time.LocalDateTime;

public class SiteProgressResponse {
    private Long id;
    private Long projectId;
    private String engineerEmail;
    private String title;
    private String shortDescription;
    private String comments;
    private String imageData;
    private LocalDateTime createdAt;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getEngineerEmail() { return engineerEmail; }
    public void setEngineerEmail(String engineerEmail) { this.engineerEmail = engineerEmail; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }

    public String getComments() { return comments; }
    public void setComments(String comments) { this.comments = comments; }

    public String getImageData() { return imageData; }
    public void setImageData(String imageData) { this.imageData = imageData; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}