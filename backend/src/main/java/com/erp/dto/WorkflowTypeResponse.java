package com.erp.dto;

import java.util.ArrayList;
import java.util.List;

public class WorkflowTypeResponse {
    private String code;
    private String title;
    private String description;
    private List<String> supportedRoles = new ArrayList<>();
    private List<WorkflowStepResponse> steps = new ArrayList<>();

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<String> getSupportedRoles() { return supportedRoles; }
    public void setSupportedRoles(List<String> supportedRoles) { this.supportedRoles = supportedRoles; }

    public List<WorkflowStepResponse> getSteps() { return steps; }
    public void setSteps(List<WorkflowStepResponse> steps) { this.steps = steps; }
}