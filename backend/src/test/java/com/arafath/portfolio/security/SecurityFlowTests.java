package com.arafath.portfolio.security;

import com.arafath.portfolio.entity.Admin;
import com.arafath.portfolio.enums.Role;
import com.arafath.portfolio.repository.AdminRepository;
import com.arafath.portfolio.security.auth.LoginRequest;
import com.arafath.portfolio.security.jwt.JwtService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class SecurityFlowTests {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @BeforeEach
    void setUp() {
        adminRepository.deleteAll();
        Admin admin = new Admin();
        admin.setUsername("testadmin");
        admin.setPassword(passwordEncoder.encode("testpass123"));
        admin.setEmail("testadmin@example.com");
        admin.setRole(Role.ADMIN);
        admin.setEnabled(Boolean.TRUE);
        adminRepository.save(admin);
    }

    @Test
    public void testPublicEndpointAccessibleWithoutAuth() throws Exception {
        mockMvc.perform(get("/api/v1/skills"))
                .andExpect(status().isOk());
    }

    @Test
    public void testLoginWithValidCredentialsReturnsJwt() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setUsername("testadmin");
        request.setPassword("testpass123");

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.accessToken").exists())
                .andExpect(jsonPath("$.data.expiresIn").exists());
    }

    @Test
    public void testLoginWithInvalidCredentialsReturns401() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setUsername("testadmin");
        request.setPassword("wrongpassword");

        mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testAdminEndpointWithoutTokenReturns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/admins"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testAdminEndpointWithInvalidTokenReturns401() throws Exception {
        mockMvc.perform(get("/api/v1/admin/admins")
                .header("Authorization", "Bearer invalid_token"))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void testAdminEndpointWithValidTokenBypassesSecurity() throws Exception {
        LoginRequest request = new LoginRequest();
        request.setUsername("testadmin");
        request.setPassword("testpass123");

        String responseString = mockMvc.perform(post("/api/v1/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

        String token = objectMapper.readTree(responseString).path("data").path("accessToken").asText();

        mockMvc.perform(get("/api/v1/admin/admins")
                .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }
}
