package com.erp.dto;

import java.math.BigDecimal;

import jakarta.validation.constraints.NotBlank;

public class OperationalRecordRequest {
    @NotBlank(message = "Record type is required")
    private String recordType;

    private Long projectId;

    @NotBlank(message = "Title is required")
    private String title;

    private BigDecimal amount;
    private Integer quantity;

    @NotBlank(message = "Status is required")
    private String status;

    private String notes;

    @NotBlank(message = "Actor role is required")
    private String actorRole;

    public String getRecordType() { return recordType; }
    public void setRecordType(String recordType) { this.recordType = recordType; }

    public Long getProjectId() { return projectId; }
    public void setProjectId(Long projectId) { this.projectId = projectId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getActorRole() { return actorRole; }
    public void setActorRole(String actorRole) { this.actorRole = actorRole; }
}