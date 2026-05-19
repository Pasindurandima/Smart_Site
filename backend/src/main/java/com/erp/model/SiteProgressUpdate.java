package com.erp.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "site_progress_updates")
public class SiteProgressUpdate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "engineer_email")
    private String engineerEmail;

    @Column(nullable = false)
    private String title;

    @Column(name = "short_description", nullable = false)
    private String shortDescription;

    @Column(columnDefinition = "TEXT")
    private String comments;

    @Column(name = "image_data", columnDefinition = "LONGTEXT", nullable = false)
    private String imageData;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

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