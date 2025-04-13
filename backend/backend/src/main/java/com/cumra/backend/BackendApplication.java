package com.cumra.backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.cumra.backend.entity.ERole;
import com.cumra.backend.entity.Role;
import com.cumra.backend.repository.RoleRepository;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args); // Start the Spring Boot application
	}

	@Bean
    CommandLineRunner initRoles(RoleRepository roleRepository) {
        return args -> {
        	// If ROLE_USER does not exist, save it to the DB
            if (roleRepository.findByName(ERole.ROLE_USER).isEmpty()) {
                roleRepository.save(new Role(ERole.ROLE_USER));
            }
            // If ROLE_ADMIN does not exist, save it to the DB
            if (roleRepository.findByName(ERole.ROLE_ADMIN).isEmpty()) {
                roleRepository.save(new Role(ERole.ROLE_ADMIN));
            }
        };
    }
}
