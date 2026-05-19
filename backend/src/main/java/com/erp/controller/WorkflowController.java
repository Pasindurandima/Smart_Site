package com.erp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.erp.dto.WorkflowEventRequest;
import com.erp.dto.WorkflowEventResponse;
import com.erp.dto.WorkflowTypeResponse;
import com.erp.service.WorkflowService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/workflows")
@CrossOrigin("*")
public class WorkflowController {

    private final WorkflowService workflowService;

    public WorkflowController(WorkflowService workflowService) {
        this.workflowService = workflowService;
    }

    @GetMapping("/types")
    public ResponseEntity<List<WorkflowTypeResponse>> listTypes() {
        return ResponseEntity.ok(workflowService.listWorkflowTypes());
    }

    @GetMapping("/types/{workType}")
    public ResponseEntity<WorkflowTypeResponse> getType(@PathVariable String workType) {
        return ResponseEntity.ok(workflowService.getWorkflowType(workType));
    }

    @GetMapping("/roles/{role}")
    public ResponseEntity<List<WorkflowTypeResponse>> byRole(@PathVariable String role) {
        return ResponseEntity.ok(workflowService.listByRole(role));
    }

    @GetMapping("/events")
    public ResponseEntity<List<WorkflowEventResponse>> listEvents(
            @RequestParam(required = false) Long projectId,
            @RequestParam(required = false) String workType) {
        return ResponseEntity.ok(workflowService.listEvents(projectId, workType));
    }

    @PostMapping("/events")
    public ResponseEntity<WorkflowEventResponse> createEvent(@Valid @RequestBody WorkflowEventRequest request) {
        return ResponseEntity.ok(workflowService.recordEvent(request));
    }
}