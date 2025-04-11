package com.cumra.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {

	@NotBlank
	@Size(min = 4, max =20, message = "Username must be at least 4 characters.")
	@Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores.")
	private String username;
	
	@Pattern(regexp = "^[a-zA-Z0-9._%+-]+@(gmail\\.com|yahoo\\.com|outlook\\.com)$",
			  message = "Email must end with @gmail.com, @yahoo.com, or @outlook.com")
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
    @Size(min = 8, max = 40, message = "Password must be at least 8 characters.")
	@Pattern(
		      regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*]).+$",
		      message = "Password must include uppercase, lowercase, digit, and special character."
		    )
    private String password;
}

