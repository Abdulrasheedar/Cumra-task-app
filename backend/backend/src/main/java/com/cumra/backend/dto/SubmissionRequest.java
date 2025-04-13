package com.cumra.backend.dto;


import jakarta.validation.constraints.NotBlank;

import lombok.*;



// DTO used to handle submission creation and update requests.
// Contains basic validation to ensure fields are not empty.
 
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    
}

