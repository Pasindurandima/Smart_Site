
package com.erp.service;

import java.util.Locale;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.erp.dto.AuthResponse;
import com.erp.dto.LoginRequest;
import com.erp.dto.SignupRequest;
import com.erp.model.User;
import com.erp.model.UserRole;
import com.erp.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final com.erp.security.JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository, com.erp.security.JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public AuthResponse signup(SignupRequest request) {
        validateSignupRequest(request);

        if (userRepository.existsByEmail(request.getEmail().trim().toLowerCase(Locale.ROOT))) {
            throw new IllegalArgumentException("Email already registered");
        }

        User user = new User();
        user.setName(request.getName().trim());
        user.setEmail(request.getEmail().trim().toLowerCase(Locale.ROOT));
        user.setPhone(request.getPhone().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(parseRole(request.getRole()));
        user.setCompanyId(request.getCompanyId());

        User saved = userRepository.save(user);

        return toAuthResponse(saved, "SIGNUP_SUCCESS");
    }

    public AuthResponse login(LoginRequest request) {
        if (request == null || isBlank(request.getEmail()) || isBlank(request.getPassword())) {
            throw new IllegalArgumentException("Email and password are required");
        }

        User user = userRepository
                .findByEmail(request.getEmail().trim().toLowerCase(Locale.ROOT))
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid email or password");
        }

        return toAuthResponse(user, "LOGIN_SUCCESS");
    }

    private void validateSignupRequest(SignupRequest request) {
        if (request == null) {
            throw new IllegalArgumentException("Request body is required");
        }
        if (isBlank(request.getName())) {
            throw new IllegalArgumentException("Name is required");
        }
        if (isBlank(request.getEmail())) {
            throw new IllegalArgumentException("Email is required");
        }
        if (isBlank(request.getPassword()) || request.getPassword().length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters");
        }
        if (isBlank(request.getPhone())) {
            throw new IllegalArgumentException("Phone is required");
        }
        if (isBlank(request.getRole())) {
            throw new IllegalArgumentException("Role is required");
        }
    }

    private UserRole parseRole(String roleValue) {
        try {
            return UserRole.valueOf(roleValue.trim().toUpperCase(Locale.ROOT));
        } catch (Exception ex) {
            throw new IllegalArgumentException("Invalid role. Use one of: SUPER_ADMIN, COMPANY_ADMIN, PROJECT_MANAGER, SITE_ENGINEER, ACCOUNTANT, CLIENT");
        }
    }

    private AuthResponse toAuthResponse(User user, String message) {
        AuthResponse response = new AuthResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setPhone(user.getPhone());
        response.setRole(user.getRole().name());
        response.setCompanyId(user.getCompanyId());
        // generate JWT token
        try {
            String token = jwtUtil.createToken(user.getId(), user.getRole().name(), user.getCompanyId());
            response.setToken(token);
        } catch (Exception ex) {
            // ignore token generation errors for now
        }
        response.setMessage(message);
        return response;
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
