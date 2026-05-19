package com.erp.security;

import java.io.IOException;

import org.springframework.stereotype.Component;

import com.auth0.jwt.interfaces.DecodedJWT;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtFilter implements Filter {

    private final JwtUtil jwtUtil;

    public JwtFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        try {
            HttpServletRequest req = (HttpServletRequest) request;
            String h = req.getHeader("Authorization");
            if (h != null && h.startsWith("Bearer ")) {
                String token = h.substring(7);
                DecodedJWT jwt = jwtUtil.verifyToken(token);
                AuthContext ctx = new AuthContext();
                ctx.setUserId(Long.valueOf(jwt.getSubject()));
                ctx.setRole(jwt.getClaim("role").asString());
                Long company = null;
                if (!jwt.getClaim("companyId").isNull()) {
                    company = jwt.getClaim("companyId").asLong();
                }
                ctx.setCompanyId(company);
                AuthContext.set(ctx);
            }
            chain.doFilter(request, response);
        } finally {
            AuthContext.clear();
        }
    }
}
