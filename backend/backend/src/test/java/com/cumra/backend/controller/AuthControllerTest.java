package com.cumra.backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.cumra.backend.repository.UserRepository;
import com.cumra.backend.repository.RoleRepository;
import com.cumra.backend.security.jwt.JwtUtils;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

//@WebMvcTest(AuthController.class)
@SpringBootTest
@AutoConfigureMockMvc
public class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Mock private AuthenticationManager authManager;
    @Mock private UserRepository userRepository;
    @Mock private RoleRepository roleRepository;
    @Mock private JwtUtils jwtUtils;

    @Test
    void testSignupSuccess() throws Exception {
        when(userRepository.existsByUsername("testuser")).thenReturn(false);
        when(userRepository.existsByEmail("test@gmail.com")).thenReturn(false);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"testuser10\",\"email\":\"test10@gmail.com\",\"password\":\"Test@1234\"}"))
                .andExpect(status().isOk());
    }

    @Test
    void testLoginFailureInvalidCreds() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"username\":\"wrong\",\"password\":\"wrong\"}"))
                .andExpect(status().is4xxClientError());
    }
}
