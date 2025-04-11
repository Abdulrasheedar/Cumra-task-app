package com.cumra.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cumra.backend.dto.JwtResponse;
import com.cumra.backend.dto.LoginRequest;
import com.cumra.backend.dto.MessageResponse;
import com.cumra.backend.dto.SignupRequest;
import com.cumra.backend.entity.ERole;
import com.cumra.backend.entity.Role;
import com.cumra.backend.entity.User;
import com.cumra.backend.repository.RoleRepository;
import com.cumra.backend.repository.UserRepository;
import com.cumra.backend.security.jwt.JwtUtils;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired 
	private AuthenticationManager authManager;
    @Autowired 
    private UserRepository userRepository;
    @Autowired 
    private RoleRepository roleRepository;
    @Autowired 
    private PasswordEncoder passwordEncoder;
    @Autowired 
    private JwtUtils jwtUtils;
    
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest, BindingResult result) {
        if (result.hasErrors()) {
            List<String> errors = result.getFieldErrors()
                .stream()
                .map(error -> error.getDefaultMessage())
                .toList();
            return ResponseEntity.badRequest().body(errors);
        }

        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(List.of("Username already taken."));
        }

        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity.badRequest().body(List.of("Email already in use."));
        }

        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));

        Role userRole = roleRepository.findByName(ERole.ROLE_USER)
                          .orElseThrow(() -> new RuntimeException("Role not found"));
        user.getRoles().add(userRole);

        userRepository.save(user);
        return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        // 1. Authenticate using AuthenticationManager
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
        // 2. If we reach here, authentication was successful
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String jwt = jwtUtils.generateToken(userDetails);
        List<String> roles = userDetails.getAuthorities().stream()
                            .map(item -> item.getAuthority()).toList();
        // 3. Return JWT in response body (and optionally user info)        
        JwtResponse response = new JwtResponse(jwt,userDetails.getUsername(),roles);
        
        return ResponseEntity.ok(response);
    }
}
