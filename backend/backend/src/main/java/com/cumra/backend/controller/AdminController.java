package com.cumra.backend.controller;

import java.util.HashSet;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cumra.backend.dto.MessageResponse;
import com.cumra.backend.dto.SubmissionRequest;
import com.cumra.backend.dto.SubmissionResponse;
import com.cumra.backend.dto.UpdateUserRolesRequest;
import com.cumra.backend.dto.UserResponse;
import com.cumra.backend.entity.Role;
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
        List<User> users = userRepo.findAll();// Fetch all users from DB
        // Map User entities to UserResponse DTOs (excluding sensitive data like passwords)
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
        userRepo.deleteById(id); // Delete user if exists
        return ResponseEntity.ok(new MessageResponse("User deleted successfully"));
    }
    
    // Get all submissions (from all users)
    @GetMapping("/submissions")
    public List<SubmissionResponse> listAllSubmissions() {
    	// Fetch and map submissions to DTOs with userId included
        return submissionRepo.findAll().stream()
            .map(sub -> new SubmissionResponse(
                sub.getId(),
                sub.getTitle(),
                sub.getContent(),
                sub.getUser().getId(), // extract only user_id
                sub.getCreatedAt()
            ))
            .toList();
    }
    // Update user roles (promote/demote)
    @PutMapping("/users/roles/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> updateUserRoles(
            @PathVariable Long id,
            @RequestBody UpdateUserRolesRequest request) {

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Role> roles = roleRepo.findAllById(request.getRoleIds());  // Fetch new roles

        if (roles.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid role IDs provided.");
        }

        // Prevent admin from removing their own admin access
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = auth.getName();

        if (user.getUsername().equals(currentUsername) &&
            request.getRoleIds().stream().noneMatch(roleId -> roleId == 2L)) {
            return ResponseEntity.badRequest().body("You cannot remove your own admin role.");
        }

        user.setRoles(new HashSet<>(roles)); // Apply new roles
        userRepo.save(user); // Persist changes

        return ResponseEntity.ok("User roles updated successfully.");
    }


    // Update a submission (admin or owner allowed)
    @PutMapping("/submissions/{id}")
    public ResponseEntity<?> updateSubmission(
            @PathVariable Long id,
            @RequestBody SubmissionRequest request,
            Authentication authentication) {

        Submission submission = submissionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        // Check if user is admin
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

        // Only allow if admin OR user owns the submission
        if (!isAdmin && !submission.getUser().getUsername().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("You can only update your own submissions"));
        }

        submission.setTitle(request.getTitle()); // Update title
        submission.setContent(request.getContent()); // Update content
        submissionRepo.save(submission); // Save changes

        return ResponseEntity.ok(new MessageResponse("Submission updated successfully"));
    }

    
    
    // Delete any submission by ID
    @DeleteMapping("/submissions/{id}")
    public ResponseEntity<?> deleteSubmissionAdmin(@PathVariable Long id) {
        if (!submissionRepo.existsById(id)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new MessageResponse("Submission not found"));
        }
        submissionRepo.deleteById(id); // Delete the submission
        return ResponseEntity.ok(new MessageResponse("Submission deleted"));
    }
}
