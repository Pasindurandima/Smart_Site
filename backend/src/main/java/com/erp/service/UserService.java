package com.erp.service;

import java.util.Locale;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.erp.dto.UserProfileResponse;
import com.erp.dto.UserProfileUpdateRequest;
import com.erp.model.User;
import com.erp.repository.UserRepository;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public UserProfileResponse getProfileByEmail(String email) {
        if (isBlank(email)) {
            throw new IllegalArgumentException("Email is required");
        }

        User user = userRepository.findByEmail(email.trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        ensureTenantAccess(user.getCompanyId());
        return toResponse(user);
    }

    public UserProfileResponse updateProfileByEmail(String email, UserProfileUpdateRequest request) {
        if (isBlank(email)) {
            throw new IllegalArgumentException("Email is required");
        }

        User user = userRepository.findByEmail(email.trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        ensureTenantAccess(user.getCompanyId());

        if (!isBlank(request.getName())) {
            user.setName(request.getName().trim());
        }

        if (!isBlank(request.getPhone())) {
            user.setPhone(request.getPhone().trim());
        }

        if (!isBlank(request.getEmail())) {
            String newEmail = request.getEmail().trim().toLowerCase(Locale.ROOT);
            if (!newEmail.equals(user.getEmail()) && userRepository.existsByEmail(newEmail)) {
                throw new IllegalArgumentException("Email already registered");
            }
            user.setEmail(newEmail);
        }

        User saved = userRepository.save(user);
        return toResponse(saved);
    }

    private UserProfileResponse toResponse(User user) {
        UserProfileResponse response = new UserProfileResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole() == null ? null : user.getRole().name());
        return response;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private void ensureTenantAccess(Long companyId) {
        Long currentCompany = com.erp.security.AuthContext.get() != null ? com.erp.security.AuthContext.get().getCompanyId() : null;
        if (currentCompany != null && companyId != null && !currentCompany.equals(companyId)) {
            throw new IllegalArgumentException("User not found");
        }
    }
}