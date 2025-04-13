package com.cumra.backend.dto;

import lombok.*;

//Simple DTO for sending a single string message in API responses
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {
	private String message;
}
