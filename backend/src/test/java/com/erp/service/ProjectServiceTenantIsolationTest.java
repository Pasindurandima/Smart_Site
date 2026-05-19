package com.erp.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.PageImpl;

import com.erp.dto.ProjectRequest;
import com.erp.model.Project;
import com.erp.repository.ProjectRepository;
import com.erp.security.AuthContext;

@ExtendWith(MockitoExtension.class)
class ProjectServiceTenantIsolationTest {

    @InjectMocks
    private ProjectService projectService;

    @Mock
    private ProjectRepository projectRepository;

    @Mock
    private WorkflowService workflowService;

    @AfterEach
    void tearDown() {
        AuthContext.clear();
    }

    @Test
    void createProjectAssignsAuthenticatedCompanyId() {
        AuthContext ctx = new AuthContext();
        ctx.setCompanyId(11L);
        AuthContext.set(ctx);

        when(projectRepository.save(any(Project.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ProjectRequest request = new ProjectRequest();
        request.setName("Alpha Tower");
        request.setClientId(101L);
        request.setStatus("PENDING");

        projectService.create(request);

        verify(projectRepository).save(org.mockito.ArgumentMatchers.argThat(project -> Long.valueOf(11L).equals(project.getCompanyId())));
    }

    @Test
    void listAllUsesCompanyScopedRepositoryQuery() {
        AuthContext ctx = new AuthContext();
        ctx.setCompanyId(13L);
        AuthContext.set(ctx);

        Project p = new Project();
        p.setId(1L);
        p.setName("Scoped Project");
        p.setCompanyId(13L);

        when(projectRepository.findByCompanyId(13L, Pageable.unpaged())).thenReturn(new PageImpl<>(List.of(p)));

        List<?> results = projectService.listAll();

        assertThat(results).hasSize(1);
        verify(projectRepository).findByCompanyId(13L, Pageable.unpaged());
    }
}