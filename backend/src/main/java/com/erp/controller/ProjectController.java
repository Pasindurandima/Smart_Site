package com.erp.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.erp.dto.ProjectRequest;
import com.erp.dto.ProjectResponse;
import com.erp.service.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {
    private final ProjectService service;

    public ProjectController(ProjectService service) { this.service = service; }

    @GetMapping
    public ResponseEntity<List<ProjectResponse>> list() { 
        return ResponseEntity.ok(service.listAll()); 
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> get(@PathVariable Long id) {
        return service.getById(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<ProjectResponse> create(@Valid @RequestBody ProjectRequest req) {
        ProjectResponse created = service.create(req);
        return ResponseEntity.created(URI.create("/api/projects/" + created.getId())).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjectResponse> update(@PathVariable Long id, @Valid @RequestBody ProjectRequest req) {
        return service.update(id, req).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-client/{clientId}")
    public ResponseEntity<List<ProjectResponse>> byClient(@PathVariable Long clientId) { 
        return ResponseEntity.ok(service.findByClient(clientId)); 
    }
}

