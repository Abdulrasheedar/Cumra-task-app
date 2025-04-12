package com.cumra.backend.controller;

import com.cumra.backend.entity.ERole;
import com.cumra.backend.entity.Role;
import com.cumra.backend.entity.User;
import com.cumra.backend.repository.RoleRepository;
import com.cumra.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class AdminControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setupAdminUser() {
        if (!userRepository.existsByUsername("adminuser")) {
            Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
                    .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_ADMIN)));

            User admin = new User();
            admin.setUsername("adminuser");
            admin.setEmail("admin@gmail.com");
            admin.setPassword(passwordEncoder.encode("Admin@123"));
            admin.setRoles(new HashSet<>(Set.of(adminRole)));

            userRepository.save(admin);
        }
    }

    private String obtainAccessToken(String username, String password) throws Exception {
        String loginJson = String.format("{\"username\":\"%s\", \"password\":\"%s\"}", username, password);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType("application/json")
                        .content(loginJson))
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString();
        return new ObjectMapper().readTree(response).get("token").asText();
    }

    @Test
    void testGetAllUsersAsAdmin() throws Exception {
        String token = obtainAccessToken("adminuser", "Admin@123");

        mockMvc.perform(MockMvcRequestBuilders.get("/api/admin/users")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void testDeleteUserNotFound() throws Exception {
        String token = obtainAccessToken("adminuser", "Admin@123");

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/users/9999")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }

    @Test
    void testDeleteSubmissionNotFound() throws Exception {
        String token = obtainAccessToken("adminuser", "Admin@123");

        mockMvc.perform(MockMvcRequestBuilders.delete("/api/admin/submissions/404")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isNotFound());
    }
}
