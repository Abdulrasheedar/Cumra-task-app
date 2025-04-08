package com.cumra.backend.controller;

import com.cumra.backend.dto.MessageResponse;
import com.cumra.backend.dto.SubmissionRequest;
import com.cumra.backend.entity.Submission;
import com.cumra.backend.entity.User;
import com.cumra.backend.repository.SubmissionRepository;
import com.cumra.backend.repository.UserRepository;
import com.cumra.backend.security.service.UserDetailsImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private SubmissionRepository submissionRepository;

    @Autowired
    private UserRepository userRepository;

    // 🔹 Get all submissions of the logged-in user
    @GetMapping("/submissions")
    public ResponseEntity<List<Submission>> getMySubmissions(Authentication authentication) {
        String username = authentication.getName();
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<Submission> submissions = submissionRepository.findByUserId(user.getId());
        return ResponseEntity.ok(submissions);
    }

    // 🔹 Create a new submission
    @PostMapping("/submissions")
    public ResponseEntity<?> createSubmission(
            @RequestBody SubmissionRequest request,
            @AuthenticationPrincipal UserDetailsImpl userDetails) {

        User user = userRepository.findById(userDetails.getId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Submission submission = new Submission();
        submission.setTitle(request.getTitle());
        submission.setContent(request.getContent());
        submission.setUser(user);
        submission.setCreatedAt(Instant.now());

        submissionRepository.save(submission);
        return ResponseEntity.ok(new MessageResponse("Submission created successfully"));
    }

    // 🔹 Update a submission (only if the current user owns it)
    @PutMapping("/submissions/{id}")
    public ResponseEntity<?> updateSubmission(
            @PathVariable Long id,
            @RequestBody SubmissionRequest request,
            Authentication authentication) {

        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        if (!submission.getUser().getUsername().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("You can only update your own submissions"));
        }

        submission.setTitle(request.getTitle());
        submission.setContent(request.getContent());
        submissionRepository.save(submission);

        return ResponseEntity.ok(new MessageResponse("Submission updated successfully"));
    }

    // 🔹 Delete a submission (only if the current user owns it)
    @DeleteMapping("/submissions/{id}")
    public ResponseEntity<?> deleteSubmission(
            @PathVariable Long id,
            Authentication authentication) {

        Submission submission = submissionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        if (!submission.getUser().getUsername().equals(authentication.getName())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(new MessageResponse("You can only delete your own submissions"));
        }

        submissionRepository.delete(submission);
        return ResponseEntity.ok(new MessageResponse("Submission deleted successfully"));
    }
}
