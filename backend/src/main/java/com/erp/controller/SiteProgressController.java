package com.erp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.erp.dto.SiteProgressRequest;
import com.erp.dto.SiteProgressResponse;
import com.erp.service.SiteProgressService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/site-progress")
public class SiteProgressController {

    private final SiteProgressService service;

    public SiteProgressController(SiteProgressService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<SiteProgressResponse> create(@Valid @RequestBody SiteProgressRequest request) {
        return ResponseEntity.ok(service.create(request));
    }

    @GetMapping
    public ResponseEntity<List<SiteProgressResponse>> list(@RequestParam(required = false) Long projectId) {
        return ResponseEntity.ok(service.list(projectId));
    }
}