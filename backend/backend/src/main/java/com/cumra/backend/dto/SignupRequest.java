package com.cumra.backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SignupRequest {

	@NotBlank
	@Size(min = 3, max =20)
	private String username;
	
	@NotBlank
	@Email
	private String email;
	
	@NotBlank
    @Size(min = 6, max = 40)
    private String password;
}

