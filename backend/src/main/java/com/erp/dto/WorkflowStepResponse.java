package com.erp.dto;

public class WorkflowStepResponse {
    private int order;
    private String title;
    private String description;
    private String actorRole;
    private String status;

    public int getOrder() { return order; }
    public void setOrder(int order) { this.order = order; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getActorRole() { return actorRole; }
    public void setActorRole(String actorRole) { this.actorRole = actorRole; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}