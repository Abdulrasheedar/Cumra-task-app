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
import org.springframework.http.MediaType;
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
public class UserControllerTest {

    @Autowired private MockMvc mockMvc;
    @Autowired private UserRepository userRepository;
    @Autowired private RoleRepository roleRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @BeforeEach
    void setupUser() {
        if (!userRepository.existsByUsername("testuser")) {
            Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                    .orElseGet(() -> roleRepository.save(new Role(ERole.ROLE_USER)));

            User user = new User();
            user.setUsername("testuser");
            user.setEmail("test@gmail.com");
            user.setPassword(passwordEncoder.encode("User@1234"));
            user.setRoles(new HashSet<>(Set.of(userRole)));

            userRepository.save(user);
        }
    }

    private String obtainAccessToken(String username, String password) throws Exception {
        String loginJson = String.format("{\"username\":\"%s\", \"password\":\"%s\"}", username, password);

        MvcResult result = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(loginJson))
                .andExpect(status().isOk())
                .andReturn();

        String response = result.getResponse().getContentAsString();
        return new ObjectMapper().readTree(response).get("token").asText();
    }

    @Test
    void testGetOwnSubmissionsAuthorized() throws Exception {
        String token = obtainAccessToken("testuser", "User@1234");

        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/submissions")
                        .header("Authorization", "Bearer " + token))
                .andExpect(status().isOk());
    }

    @Test
    void testGetOwnSubmissionsUnauthorized() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/submissions"))
                .andExpect(status().is4xxClientError()); // 401
    }
}
