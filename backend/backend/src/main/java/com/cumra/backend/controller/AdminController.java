package com.cumra.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cumra.backend.dto.MessageResponse;
import com.cumra.backend.dto.UserResponse;
import com.cumra.backend.entity.Submission;
import com.cumra.backend.entity.User;
import com.cumra.backend.repository.RoleRepository;
import com.cumra.backend.repository.SubmissionRepository;
import com.cumra.backend.repository.UserRepository;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {
    @Autowired 
    private UserRepository userRepo;
    @Autowired 
    private SubmissionRepository submissionRepo;
    @Autowired 
    private RoleRepository roleRepo;
    
    // Get list of all users
    @GetMapping("/users")
    public List<UserResponse> listUsers() {
        List<User> users = userRepo.findAll();
        // Convert to DTO to avoid exposing passwords
        return users.stream().map(user -> new UserResponse(
                user.getId(), user.getUsername(), user.getEmail(),
                user.getRoles().stream().map(role -> role.getName().name()).toList()
        )).toList();
    }
    
    // Delete a user by ID
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        if (!userRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("User not found"));
        }
        userRepo.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("User deleted successfully"));
    }
    
    // Get all submissions (from all users)
    @GetMapping("/submissions")
    public List<Submission> listAllSubmissions() {
        return submissionRepo.findAll();
    }
    
    // Delete any submission by ID
    @DeleteMapping("/submissions/{id}")
    public ResponseEntity<?> deleteSubmissionAdmin(@PathVariable Long id) {
        if (!submissionRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Submission not found"));
        }
        submissionRepo.deleteById(id);
        return ResponseEntity.ok(new MessageResponse("Submission deleted"));
    }
}
