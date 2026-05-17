# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose

This document defines the requirements for the Construction ERP SaaS System, a cloud-based platform to manage construction operations including project tracking, workforce management, inventory control, finance, and client reporting.

Target implementation stack:

- Frontend: React.js
- Backend: Spring Boot (REST API)
- Database: MySQL

### 1.2 Scope

The system provides a multi-tenant SaaS platform for construction companies to:

- Manage multiple projects
- Track worker attendance and productivity
- Control materials and inventory
- Manage expenses, invoices, and payments
- Share real-time updates with clients
- Generate analytics and operational reports
- Use subscription-based access plans

### 1.3 Definitions

- SaaS: Software as a Service
- ERP: Enterprise Resource Planning
- Client Portal: Interface where customers track project progress and invoices
- Multi-Tenant: One platform serving multiple companies with isolated data

## 2. Overall Description

### 2.1 Product Perspective

The platform digitizes construction workflows that are often managed through spreadsheets, paper logs, and chat-based updates.

### 2.2 System Architecture

- React.js frontend for dashboards and portals
- Spring Boot backend exposing REST APIs
- MySQL for transactional data
- JWT for stateless authentication
- Optional cloud storage (for project media)

### 2.3 User Classes

| User Type | Description |
| --- | --- |
| Super Admin | Manages platform and subscriptions |
| Company Admin | Manages company workspace and users |
| Project Manager | Oversees project tasks and milestones |
| Site Engineer | Updates site progress and reports |
| Accountant | Manages finance and invoices |
| Client | Views project status and documents |

### 2.4 Operating Environment

- Web-based system
- Supported browsers: Chrome, Firefox, Edge
- Responsive frontend for mobile and desktop
- Cloud-hosted backend deployment

### 2.5 Constraints

- Requires internet connectivity
- Requires secure authentication and authorization
- Tenant data isolation is mandatory
- File uploads constrained by storage limits and policy

### 2.6 Assumptions

- Users have stable internet access
- Companies subscribe monthly
- Site updates are often submitted from mobile devices

## 3. Functional Requirements

### 3.1 Authentication and Access Control

- User registration and login
- JWT-based session management
- Role-based access control (RBAC)
- Password hashing with BCrypt

### 3.2 Company Management

- Create and manage company workspace
- Update company profile and branding
- Manage subscription status and plan
- Add and remove company users

### 3.3 Project Management

- Create and update projects
- Assign managers and engineers
- Define milestones and deadlines
- Track status (Pending, Ongoing, Completed)
- Upload and manage project documents

### 3.4 Task Management

- Create project-level tasks
- Assign tasks to staff/workers
- Set due dates and priorities
- Track task completion states

### 3.5 Worker and Staff Management

- Add and update worker profiles
- Site assignment management
- Attendance tracking (manual and QR-ready)
- Salary and overtime tracking

### 3.6 Inventory Management

- Add and maintain material catalog
- Track stock levels and movements
- Maintain supplier information
- Record material usage by project
- Generate low-stock alerts

### 3.7 Expense Management

- Record site expenses
- Categorize expenses (fuel, labor, equipment, etc.)
- Monitor budget consumption
- Generate monthly expense reports

### 3.8 Invoice and Payment Management

- Generate invoices (PDF-ready)
- Track payment status (Paid, Pending, Overdue)
- Store payment history
- Enable invoice download

### 3.9 Client Portal

- Client login and secure access
- View project progress and milestones
- View/download invoices
- View photos and videos
- Approve milestones

### 3.10 Reporting and Analytics

- Project progress reports
- Financial summaries and P/L view
- Worker productivity reports
- Inventory consumption reports

### 3.11 Notifications

- Email notifications
- In-app alerts
- Payment reminders and task updates

### 3.12 Subscription and SaaS Billing

- Plan management: Starter, Professional, Enterprise
- Monthly billing model
- Feature gating by plan
- Trial period support

## 4. Non-Functional Requirements

### 4.1 Performance

- Support 1000+ concurrent users
- Target API response time under 2 seconds for standard operations

### 4.2 Security

- JWT authentication for API access
- RBAC enforcement on protected resources
- Password encryption using BCrypt
- Strong tenant-level data segregation

### 4.3 Scalability

- Modular backend that is microservice-ready
- Tenant-aware architecture for growth
- Cloud deployment compatibility

### 4.4 Usability

- Clean, intuitive, responsive UI
- Mobile-friendly workflows for on-site users
- Low learning curve for non-technical staff

### 4.5 Reliability

- Target 99% uptime
- Data backup strategy
- Centralized error logging and monitoring

### 4.6 Maintainability

- Layered Spring Boot architecture
- Reusable React components and hooks
- Clear API contracts and DTO usage

## 5. System Feature Summary

- Multi-company SaaS operation
- End-to-end construction project lifecycle support
- Workforce and attendance management
- Inventory and procurement visibility
- Finance and invoice management
- Client collaboration portal
- Subscription billing and plan control
- Dashboard and analytics reporting

## 6. External Interfaces

### 6.1 User Interface

- React admin dashboards
- Company operations panel
- Client portal
- Responsive mobile interface

### 6.2 Hardware Interface

- Mobile devices for field updates
- Optional QR scanners for attendance

### 6.3 Software Interface

- MySQL database
- Spring Boot REST APIs
- SMTP/email provider
- Optional object storage for media

### 6.4 Communication Interface

- HTTPS transport
- RESTful endpoints
- JSON request/response payloads

## 7. High-Level Database Entities

- users
- companies
- projects
- tasks
- workers
- attendance
- inventory
- expenses
- invoices
- subscriptions
- payments
- client_access

## 8. SaaS Plans

### 8.1 Starter Plan

- Target users: small contractors
- Example limits: 2 projects, 10 workers, attendance, basic reports
- Example price: Rs. 4,999/month

### 8.2 Professional Plan

- Target users: medium companies
- Includes unlimited projects, inventory, client portal, finance, AI reports
- Example price: Rs. 14,999/month

### 8.3 Enterprise Plan

- Target users: large firms and multi-branch operators
- Includes custom branding, integrations, advanced analytics, dedicated support
- Example price: Rs. 49,999+/month

## 9. AI Feature Roadmap

- AI-generated daily and weekly summaries
- Delay and risk prediction alerts
- Budget forecasting and anomaly detection
- Construction assistant for estimation and schedule recommendations

## 10. Demo Strategy

For sales/demo environments, preload a full demo tenant:

- Demo company profile
- Demo projects and milestones
- Demo workers and attendance
- Demo invoices and reports

This allows prospects to experience realistic workflows immediately after login.

## 11. Architecture Evolution Plan

### 11.1 MVP Phase (Current)

- Modular monolith: React + Spring Boot + MySQL
- Faster delivery and lower operational complexity

### 11.2 Microservices Target Architecture

Planned services:

- API Gateway
- Auth Service
- Company Service
- Project Service
- Worker Service
- Inventory Service
- Finance Service
- Client Service
- Notification Service

Infrastructure roadmap:

- Service discovery and centralized configuration
- Event-driven integration (Kafka/RabbitMQ)
- Database-per-service strategy in advanced phase

## 12. Conclusion

The Construction ERP SaaS System is designed as a scalable business platform for digitizing construction operations. It combines operational control, financial visibility, client transparency, and SaaS monetization in a single solution, while maintaining a clear growth path from MVP to microservices.