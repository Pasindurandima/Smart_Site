package com.erp.dto;

import jakarta.validation.constraints.NotBlank;

public class WorkflowEventRequest {
    private Long projectId;

    @NotBlank(message = "Workflow type is required")
    private String workType;

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Actor role is required")
    private String actorRole;

    private String status;

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getWorkType() { return workType; }
    public void setWorkType(String workType) { this.workType = workType; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getActorRole() { return actorRole; }
    public void setActorRole(String actorRole) { this.actorRole = actorRole; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}