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
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import com.erp.dto.ClientRequest;
import com.erp.model.Client;
import com.erp.repository.ClientRepository;
import com.erp.security.AuthContext;

@ExtendWith(MockitoExtension.class)
class ClientServiceTenantIsolationTest {

    @InjectMocks
    private ClientService clientService;

    @Mock
    private ClientRepository clientRepository;

    @AfterEach
    void tearDown() {
        AuthContext.clear();
    }

    @Test
    void createClientUsesAuthenticatedCompanyId() {
        AuthContext ctx = new AuthContext();
        ctx.setCompanyId(7L);
        AuthContext.set(ctx);

        when(clientRepository.existsByCompanyIdAndEmail(7L, "client@example.com")).thenReturn(false);
        when(clientRepository.save(any(Client.class))).thenAnswer(invocation -> invocation.getArgument(0));

        ClientRequest request = new ClientRequest();
        request.setName("Client One");
        request.setEmail("client@example.com");
        request.setPhone("12345");
        request.setCompany("Tenant Company");

        clientService.createClient(request);

        verify(clientRepository).save(org.mockito.ArgumentMatchers.argThat(client -> Long.valueOf(7L).equals(client.getCompanyId())));
    }

    @Test
    void listClientsFiltersByCurrentCompany() {
        AuthContext ctx = new AuthContext();
        ctx.setCompanyId(9L);
        AuthContext.set(ctx);

        Client c = new Client();
        c.setId(1L);
        c.setName("Tenant Client");
        c.setCompanyId(9L);

        when(clientRepository.findByCompanyId(9L, PageRequest.of(0, 20))).thenReturn(new PageImpl<>(List.of(c)));

        List<?> results = clientService.listClients(0, 20);

        assertThat(results).hasSize(1);
        verify(clientRepository).findByCompanyId(9L, PageRequest.of(0, 20));
    }
}