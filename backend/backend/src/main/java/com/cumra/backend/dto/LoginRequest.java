package com.cumra.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
public class LoginRequest {

	@NotBlank
    private String username;

    @NotBlank
    private String password;
}
