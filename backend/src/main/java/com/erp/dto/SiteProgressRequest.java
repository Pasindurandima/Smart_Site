package com.erp.dto;

import jakarta.validation.constraints.NotBlank;

public class SiteProgressRequest {
    private Long projectId;
    private String engineerEmail;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Short description is required")
    private String shortDescription;

    private String comments;

    @NotBlank(message = "Image data is required")
    private String imageData;

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
}