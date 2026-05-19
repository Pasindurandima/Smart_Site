package com.erp.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.erp.dto.MaterialRequestDTO;
import com.erp.service.MaterialRequestService;

@RestController
@RequestMapping("/api/material-requests")
public class MaterialRequestController {

    private final MaterialRequestService materialRequestService;

    public MaterialRequestController(MaterialRequestService materialRequestService) {
        this.materialRequestService = materialRequestService;
    }

    @PostMapping
    public MaterialRequestDTO createRequest(@RequestBody MaterialRequestDTO request) {
        return materialRequestService.createRequest(request);
    }

    @GetMapping("/pending")
    public List<MaterialRequestDTO> getPendingRequests(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {
        return materialRequestService.listPendingRequests(page, size);
    }

    @GetMapping
    public List<MaterialRequestDTO> getAllRequests(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size) {
        return materialRequestService.listAllRequests(page, size);
    }

    @PostMapping("/{id}/approve")
    public MaterialRequestDTO approveRequest(@PathVariable Long id) {
        return materialRequestService.approveRequest(id);
    }

    @PostMapping("/{id}/reject")
    public MaterialRequestDTO rejectRequest(@PathVariable Long id) {
        return materialRequestService.rejectRequest(id);
    }
}
