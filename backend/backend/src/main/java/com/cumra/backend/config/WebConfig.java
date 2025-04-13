package com.cumra.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer{

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**") // Allow CORS for all endpoints
		.allowedOrigins("http://localhost:5173") // Allow frontend origin (Vite dev server)
		.allowedMethods("GET","POST","PUT","DELETE","OPTIONS") // Permit these HTTP methods
		.allowedHeaders("*") // Allow all headers
		.allowCredentials(true); // Allow cookies and authentication headers (JWT)
	}
}
