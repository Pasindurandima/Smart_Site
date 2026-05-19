package com.erp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.dto.ClientRequest;
import com.erp.dto.ClientResponse;
import com.erp.model.Client;
import com.erp.repository.ClientRepository;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @Transactional
    public ClientResponse createClient(ClientRequest req) {
        validateRequest(req);
        Long currentCompany = com.erp.security.AuthContext.get() != null ? com.erp.security.AuthContext.get().getCompanyId() : null;
        Long effectiveCompany = currentCompany != null ? currentCompany : req.getCompanyId();
        if (effectiveCompany == null) {
            throw new IllegalArgumentException("Company is required");
        }
        if (req.getEmail() != null && clientRepository.existsByCompanyIdAndEmail(effectiveCompany, req.getEmail())) {
            throw new IllegalArgumentException("Email already used by another client");
        }

        Client c = new Client();
        c.setName(req.getName().trim());
        c.setCompany(req.getCompany());
        c.setCompanyId(effectiveCompany);
        c.setEmail(req.getEmail());
        c.setPhone(req.getPhone());
        c.setAddress(req.getAddress());
        c.setNotes(req.getNotes());

        Client saved = clientRepository.save(c);
        return toResponse(saved);
    }

    @Transactional(readOnly = true)
    public ClientResponse getClient(Long id) {
        Client c = clientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found"));
        ensureTenantAccess(c.getCompanyId());
        return toResponse(c);
    }

    @Transactional(readOnly = true)
    public List<ClientResponse> listClients(int page, int size) {
        Pageable p = PageRequest.of(Math.max(0, page), Math.max(1, size));
        Long currentCompany = com.erp.security.AuthContext.get() != null ? com.erp.security.AuthContext.get().getCompanyId() : null;
        Page<Client> res = currentCompany == null ? clientRepository.findAll(p) : clientRepository.findByCompanyId(currentCompany, p);
        return res.stream().map(this::toResponse).collect(Collectors.toList());
    }

    @Transactional
    public ClientResponse updateClient(Long id, ClientRequest req) {
        Client c = clientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found"));
        ensureTenantAccess(c.getCompanyId());
        if (req.getEmail() != null && !req.getEmail().equalsIgnoreCase(c.getEmail()) && clientRepository.existsByCompanyIdAndEmail(c.getCompanyId(), req.getEmail())) {
            throw new IllegalArgumentException("Email already used by another client");
        }
        if (!isBlank(req.getName())) c.setName(req.getName().trim());
        if (req.getCompany() != null) c.setCompany(req.getCompany());
        if (req.getEmail() != null) c.setEmail(req.getEmail());
        if (req.getPhone() != null) c.setPhone(req.getPhone());
        if (req.getAddress() != null) c.setAddress(req.getAddress());
        if (req.getNotes() != null) c.setNotes(req.getNotes());

        Client saved = clientRepository.save(c);
        return toResponse(saved);
    }

    @Transactional
    public void deleteClient(Long id) {
        Client c = clientRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Client not found"));
        ensureTenantAccess(c.getCompanyId());
        clientRepository.deleteById(id);
    }

    @Transactional(readOnly = true)
    public List<ClientResponse> searchClients(String q, int page, int size) {
        Pageable p = PageRequest.of(Math.max(0, page), Math.max(1, size));
        Long currentCompany = com.erp.security.AuthContext.get() != null ? com.erp.security.AuthContext.get().getCompanyId() : null;
        Page<Client> res = currentCompany == null ? clientRepository.findByNameContainingIgnoreCase(q == null ? "" : q, p) : clientRepository.findByCompanyIdAndNameContainingIgnoreCase(currentCompany, q == null ? "" : q, p);
        return res.stream().map(this::toResponse).collect(Collectors.toList());
    }

    private ClientResponse toResponse(Client c) {
        ClientResponse r = new ClientResponse();
        r.setId(c.getId());
        r.setName(c.getName());
        r.setCompany(c.getCompany());
        r.setCompanyId(c.getCompanyId());
        r.setEmail(c.getEmail());
        r.setPhone(c.getPhone());
        r.setAddress(c.getAddress());
        r.setNotes(c.getNotes());
        r.setCreatedAt(c.getCreatedAt());
        return r;
    }

    private void validateRequest(ClientRequest req) {
        if (req == null) throw new IllegalArgumentException("Request body is required");
        if (isBlank(req.getName())) throw new IllegalArgumentException("Client name is required");
    }

    private boolean isBlank(String s) { return s == null || s.trim().isEmpty(); }

    private void ensureTenantAccess(Long companyId) {
        Long currentCompany = com.erp.security.AuthContext.get() != null ? com.erp.security.AuthContext.get().getCompanyId() : null;
        if (currentCompany != null && companyId != null && !currentCompany.equals(companyId)) {
            throw new IllegalArgumentException("Client not found");
        }
    }
}
