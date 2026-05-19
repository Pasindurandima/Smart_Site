package com.erp.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.EnumMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.dto.WorkflowEventRequest;
import com.erp.dto.WorkflowEventResponse;
import com.erp.dto.WorkflowStepResponse;
import com.erp.dto.WorkflowTypeResponse;
import com.erp.model.Project;
import com.erp.model.UserRole;
import com.erp.model.WorkflowEvent;
import com.erp.model.WorkflowWorkType;
import com.erp.repository.ProjectRepository;
import com.erp.repository.WorkflowEventRepository;

@Service
@Transactional
public class WorkflowService {

    private record WorkflowDefinition(String title, String description, List<String> supportedRoles, List<WorkflowStepResponse> steps) {}

    private final WorkflowEventRepository eventRepository;
    private final ProjectRepository projectRepository;
    private final Map<WorkflowWorkType, WorkflowDefinition> workflowDefinitions = new EnumMap<>(WorkflowWorkType.class);

    public WorkflowService(WorkflowEventRepository eventRepository, ProjectRepository projectRepository) {
        this.eventRepository = eventRepository;
        this.projectRepository = projectRepository;
        registerDefinitions();
    }

    @Transactional(readOnly = true)
    public List<WorkflowTypeResponse> listWorkflowTypes() {
        return workflowDefinitions.entrySet().stream()
                .map(entry -> toTypeResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public WorkflowTypeResponse getWorkflowType(String workTypeValue) {
        WorkflowWorkType workType = parseWorkType(workTypeValue);
        WorkflowDefinition definition = workflowDefinitions.get(workType);
        if (definition == null) {
            throw new IllegalArgumentException("Workflow type not found");
        }
        return toTypeResponse(workType, definition);
    }

    @Transactional(readOnly = true)
    public List<WorkflowTypeResponse> listByRole(String roleValue) {
        String normalizedRole = normalize(roleValue);
        return workflowDefinitions.entrySet().stream()
                .filter(entry -> entry.getValue().supportedRoles().contains(normalizedRole))
                .map(entry -> toTypeResponse(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<WorkflowEventResponse> listEvents(Long projectId, String workTypeValue) {
        WorkflowWorkType filterType = workTypeValue == null || workTypeValue.isBlank() ? null : parseWorkType(workTypeValue);

        return eventRepository.findAllByOrderByCreatedAtDesc().stream()
                .filter(event -> projectId == null || projectId.equals(event.getProjectId()))
                .filter(event -> filterType == null || filterType.equals(event.getWorkType()))
                .map(this::toEventResponse)
                .collect(Collectors.toList());
    }

    public WorkflowEventResponse recordEvent(WorkflowEventRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request body is required");
        }

        WorkflowEvent event = new WorkflowEvent();
        event.setProjectId(request.getProjectId());
        event.setWorkType(parseWorkType(request.getWorkType()));
        event.setTitle(request.getTitle().trim());
        event.setDescription(request.getDescription().trim());
        event.setActorRole(request.getActorRole().trim().toUpperCase(Locale.ROOT));
        event.setStatus(request.getStatus());

        validateProjectId(event.getProjectId());
        return toEventResponse(eventRepository.save(event));
    }

    public WorkflowEventResponse recordProjectEvent(Long projectId, WorkflowWorkType workType, String title, String description, String actorRole, String status) {
        validateProjectId(projectId);

        WorkflowEvent event = new WorkflowEvent();
        event.setProjectId(projectId);
        event.setWorkType(workType);
        event.setTitle(title);
        event.setDescription(description);
        event.setActorRole(actorRole == null ? null : actorRole.trim().toUpperCase(Locale.ROOT));
        event.setStatus(status);

        return toEventResponse(eventRepository.save(event));
    }

    private void validateProjectId(Long projectId) {
        if (projectId == null) {
            return;
        }

        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found"));
        if (project.getId() == null) {
            throw new IllegalArgumentException("Project not found");
        }
    }

    private WorkflowTypeResponse toTypeResponse(WorkflowWorkType workType, WorkflowDefinition definition) {
        WorkflowTypeResponse response = new WorkflowTypeResponse();
        response.setCode(workType.name());
        response.setTitle(definition.title());
        response.setDescription(definition.description());
        response.setSupportedRoles(new ArrayList<>(definition.supportedRoles()));
        response.setSteps(definition.steps());
        return response;
    }

    private WorkflowEventResponse toEventResponse(WorkflowEvent event) {
        WorkflowEventResponse response = new WorkflowEventResponse();
        response.setId(event.getId());
        response.setProjectId(event.getProjectId());
        response.setWorkType(event.getWorkType().name());
        response.setTitle(event.getTitle());
        response.setDescription(event.getDescription());
        response.setActorRole(event.getActorRole());
        response.setStatus(event.getStatus());
        response.setCreatedAt(event.getCreatedAt());
        return response;
    }

    private WorkflowWorkType parseWorkType(String value) {
        try {
            return WorkflowWorkType.valueOf(normalize(value));
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid workflow type");
        }
    }

    private String normalize(String value) {
        if (value == null) {
            return null;
        }
        return value.trim().toUpperCase(Locale.ROOT).replace('-', '_').replace(' ', '_');
    }

    private WorkflowStepResponse step(int order, String title, String description, String actorRole, String status) {
        WorkflowStepResponse step = new WorkflowStepResponse();
        step.setOrder(order);
        step.setTitle(title);
        step.setDescription(description);
        step.setActorRole(actorRole);
        step.setStatus(status);
        return step;
    }

    private void registerDefinitions() {
        workflowDefinitions.put(WorkflowWorkType.SAAS_PLATFORM, new WorkflowDefinition(
                "SaaS Platform",
                "Platform owner workflow for managing companies, subscriptions, analytics, and settings.",
                roles(UserRole.SUPER_ADMIN),
                List.of(
                        step(1, "Company Registration Approval", "Review incoming company registrations and activate tenants.", "SUPER_ADMIN", "PENDING_REVIEW"),
                        step(2, "Subscription Assignment", "Assign Starter, Pro, or Enterprise plans.", "SUPER_ADMIN", "PLAN_ASSIGNED"),
                        step(3, "Platform Monitoring", "Track company count, revenue, active users, and usage.", "SUPER_ADMIN", "MONITORING"),
                        step(4, "System Settings", "Manage email, storage, and security settings.", "SUPER_ADMIN", "CONFIGURED")
                )));

        workflowDefinitions.put(WorkflowWorkType.COMPANY_REGISTRATION, new WorkflowDefinition(
                "Company Registration",
                "Tenant onboarding workflow for construction companies.",
                roles(UserRole.SUPER_ADMIN),
                List.of(
                        step(1, "Registration Submitted", "Company submits onboarding request.", "CLIENT", "SUBMITTED"),
                        step(2, "Verification", "Super admin verifies the company profile and documents.", "SUPER_ADMIN", "UNDER_REVIEW"),
                        step(3, "Tenant Activation", "Tenant workspace is activated after approval.", "SUPER_ADMIN", "ACTIVE")
                )));

        workflowDefinitions.put(WorkflowWorkType.SUBSCRIPTION_MANAGEMENT, new WorkflowDefinition(
                "Subscription Management",
                "Billing workflow for activating, renewing, upgrading, or suspending plans.",
                roles(UserRole.SUPER_ADMIN),
                List.of(
                        step(1, "Choose Plan", "Select Starter, Pro, or Enterprise.", "COMPANY_ADMIN", "PLAN_SELECTED"),
                        step(2, "Payment Success", "Confirm payment and activate the tenant.", "SYSTEM", "PAID"),
                        step(3, "Billing Cycle", "Track renewals, upgrades, and suspensions.", "SUPER_ADMIN", "ACTIVE")
                )));

        workflowDefinitions.put(WorkflowWorkType.PROJECT_SETUP, new WorkflowDefinition(
                "Project Setup",
                "Admin workflow for creating and assigning construction projects.",
                roles(UserRole.COMPANY_ADMIN),
                List.of(
                        step(1, "Create Project", "Enter project name, client, budget, deadline, and location.", "COMPANY_ADMIN", "CREATED"),
                        step(2, "Assign Manager", "Assign a project manager to the project.", "COMPANY_ADMIN", "MANAGER_ASSIGNED"),
                        step(3, "Initial Planning", "Prepare scope and kickoff details.", "PROJECT_MANAGER", "PLANNED")
                )));

        workflowDefinitions.put(WorkflowWorkType.WORKER_MANAGEMENT, new WorkflowDefinition(
                "Worker Management",
                "Admin workflow for assigning and maintaining the site workforce.",
                roles(UserRole.COMPANY_ADMIN),
                List.of(
                        step(1, "Add Workers", "Register engineers, laborers, electricians, and supervisors.", "COMPANY_ADMIN", "REGISTERED"),
                        step(2, "Assign Sites", "Assign workers to projects and teams.", "PROJECT_MANAGER", "ASSIGNED"),
                        step(3, "Attendance Tracking", "Monitor attendance and daily labor availability.", "SITE_ENGINEER", "TRACKED")
                )));

        workflowDefinitions.put(WorkflowWorkType.INVENTORY_MANAGEMENT, new WorkflowDefinition(
                "Inventory Management",
                "Material tracking workflow for stock, requests, and issue approvals.",
                roles(UserRole.COMPANY_ADMIN),
                List.of(
                        step(1, "Add Materials", "Track cement, sand, steel, and bricks.", "COMPANY_ADMIN", "STOCK_ADDED"),
                        step(2, "Request Materials", "Engineers request materials from the site.", "SITE_ENGINEER", "REQUESTED"),
                        step(3, "Issue Materials", "Admin approves and issues stock.", "COMPANY_ADMIN", "ISSUED"),
                        step(4, "Low Stock Alert", "Trigger alerts when inventory is low.", "SYSTEM", "ALERTED")
                )));

        workflowDefinitions.put(WorkflowWorkType.FINANCE_MONITORING, new WorkflowDefinition(
                "Finance Monitoring",
                "Budget, expense, invoice, and payment oversight workflow.",
                roles(UserRole.COMPANY_ADMIN),
                List.of(
                        step(1, "Expense Logging", "Record labor, fuel, and material expenses.", "ACCOUNTANT", "LOGGED"),
                        step(2, "Invoice Creation", "Generate and share customer invoices.", "ACCOUNTANT", "INVOICED"),
                        step(3, "Payment Tracking", "Mark invoices as pending or paid.", "ACCOUNTANT", "TRACKED"),
                        step(4, "Profit Analysis", "Review budget consumption and profit/loss.", "ACCOUNTANT", "ANALYZED")
                )));

        workflowDefinitions.put(WorkflowWorkType.PROJECT_EXECUTION, new WorkflowDefinition(
                "Project Execution",
                "Manager workflow for planning, executing, and reporting on project tasks.",
                roles(UserRole.PROJECT_MANAGER),
                List.of(
                        step(1, "Create Tasks", "Break work into foundation, plumbing, electrical, and finishing tasks.", "PROJECT_MANAGER", "TASKS_CREATED"),
                        step(2, "Assign Engineers", "Assign site engineers to task owners.", "PROJECT_MANAGER", "ASSIGNED"),
                        step(3, "Track Progress", "Move tasks through TO DO, IN PROGRESS, and COMPLETED.", "PROJECT_MANAGER", "TRACKED"),
                        step(4, "Report Delays", "Escalate missed deadlines or material shortages.", "PROJECT_MANAGER", "REPORTED")
                )));

        workflowDefinitions.put(WorkflowWorkType.SITE_EXECUTION, new WorkflowDefinition(
                "Site Execution",
                "Engineer workflow for day-to-day site supervision and updates.",
                roles(UserRole.SITE_ENGINEER),
                List.of(
                        step(1, "Open Assigned Site", "Load assigned projects and tasks.", "SITE_ENGINEER", "OPENED"),
                        step(2, "Perform Work", "Supervise the site, workers, and materials.", "SITE_ENGINEER", "IN_PROGRESS"),
                        step(3, "Daily Update", "Submit work completed, issues, weather, and notes.", "SITE_ENGINEER", "UPDATED"),
                        step(4, "Upload Evidence", "Attach photos and videos to progress updates.", "SITE_ENGINEER", "UPLOADED")
                )));

        workflowDefinitions.put(WorkflowWorkType.EXPENSE_MANAGEMENT, new WorkflowDefinition(
                "Expense Management",
                "Accountant workflow for day-to-day finance tracking.",
                roles(UserRole.ACCOUNTANT),
                List.of(
                        step(1, "Add Expense", "Record fuel, labor, and material expenses.", "ACCOUNTANT", "LOGGED"),
                        step(2, "Review Budget", "Compare actual spend with budget.", "ACCOUNTANT", "REVIEWED"),
                        step(3, "Generate Report", "Export finance summaries and records.", "ACCOUNTANT", "EXPORTED")
                )));

        workflowDefinitions.put(WorkflowWorkType.CLIENT_MONITORING, new WorkflowDefinition(
                "Client Monitoring",
                "Client portal workflow for viewing progress, invoices, and approvals.",
                roles(UserRole.CLIENT),
                List.of(
                        step(1, "View Dashboard", "Open project dashboard and timeline.", "CLIENT", "VIEWED"),
                        step(2, "Inspect Progress", "Review site photos, gallery updates, and status.", "CLIENT", "INSPECTED"),
                        step(3, "Review Invoice", "Download and review invoices.", "CLIENT", "REVIEWED"),
                        step(4, "Approve Milestone", "Approve the completed phase if satisfied.", "CLIENT", "APPROVED")
                )));

        workflowDefinitions.put(WorkflowWorkType.NOTIFICATION, new WorkflowDefinition(
                "Notifications",
                "System workflow for alerts triggered by invoices, materials, or delays.",
                Arrays.asList("SUPER_ADMIN", "COMPANY_ADMIN", "PROJECT_MANAGER", "SITE_ENGINEER", "ACCOUNTANT", "CLIENT"),
                List.of(
                        step(1, "Event Detected", "A workflow event occurs in finance, inventory, or project tracking.", "SYSTEM", "DETECTED"),
                        step(2, "Message Sent", "Send email or in-app notification to relevant users.", "SYSTEM", "SENT"),
                        step(3, "Recipient Review", "User opens the alert and acts on it.", "USER", "ACKNOWLEDGED")
                )));

        workflowDefinitions.put(WorkflowWorkType.AI_DELAY_PREDICTION, new WorkflowDefinition(
                "AI Delay Prediction",
                "Future AI workflow for predicting project delay risk.",
                roles(UserRole.PROJECT_MANAGER, UserRole.SUPER_ADMIN),
                List.of(
                        step(1, "Analyze Data", "Review task progress, budget, and overdue items.", "SYSTEM", "ANALYZED"),
                        step(2, "Predict Risk", "Generate delay risk score.", "SYSTEM", "PREDICTED"),
                        step(3, "Alert Manager", "Notify managers when delay risk is high.", "SYSTEM", "ALERTED")
                )));

        workflowDefinitions.put(WorkflowWorkType.AI_BUDGET_FORECAST, new WorkflowDefinition(
                "AI Budget Forecast",
                "Future AI workflow for forecasting overspending.",
                roles(UserRole.ACCOUNTANT, UserRole.SUPER_ADMIN),
                List.of(
                        step(1, "Analyze Spending", "Review historic expense patterns.", "SYSTEM", "ANALYZED"),
                        step(2, "Forecast Budget", "Predict overspending and budget pressure.", "SYSTEM", "FORECASTED"),
                        step(3, "Notify Finance", "Alert the accountant or admin.", "SYSTEM", "NOTIFIED")
                )));
    }

    private List<String> roles(UserRole... roles) {
        return Arrays.stream(roles).map(UserRole::name).collect(Collectors.toList());
    }
}