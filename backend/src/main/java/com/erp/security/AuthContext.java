package com.erp.security;

public class AuthContext {
    private static final ThreadLocal<AuthContext> CTX = new ThreadLocal<>();

    private Long userId;
    private String role;
    private Long companyId;

    public static void set(AuthContext ctx) { CTX.set(ctx); }
    public static AuthContext get() { return CTX.get(); }
    public static void clear() { CTX.remove(); }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public Long getCompanyId() { return companyId; }
    public void setCompanyId(Long companyId) { this.companyId = companyId; }
}
