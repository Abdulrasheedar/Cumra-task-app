package com.cumra.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
public class LoginRequest {

	@NotBlank(message = "Username is required.")
    @Size(min = 4, message = "Username must be at least 4 characters.")
    private String username;

	@NotBlank(message = "Password is required.")
    @Size(min = 8, message = "Password must be at least 8 characters.")
    private String password;
}
