package com.cumra.backend.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SubmissionResponse {
    private Long id;
    private String title;
    private String content;
    private Long user_id;
    private Instant createdAt;
}
