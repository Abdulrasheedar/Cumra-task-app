package com.cumra.backend.dto;


import jakarta.validation.constraints.NotBlank;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    
}

