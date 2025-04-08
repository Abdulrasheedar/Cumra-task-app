package com.cumra.backend.config;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.cumra.backend.security.jwt.AuthEntryPointJwt;
import com.cumra.backend.security.jwt.JwtAuthTokenFilter;
import com.cumra.backend.security.jwt.JwtUtils;
import com.cumra.backend.security.service.UserDetailsServiceImpl;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	@Autowired 
	private UserDetailsServiceImpl userDetailsService;
    @Autowired 
    private JwtUtils jwtUtils;
    @Autowired 
    private AuthEntryPointJwt unauthorizedHandler;
    
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
    	return config.getAuthenticationManager();
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }
    
    @Bean 
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // We create our JWT filter instance (defined below) 
        JwtAuthTokenFilter jwtFilter = new JwtAuthTokenFilter(jwtUtils, userDetailsService);
        
        http.csrf(csrf -> csrf.disable())   // disable CSRF for API
            .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))  // no HTTP session
            .exceptionHandling(eh -> eh.authenticationEntryPoint(unauthorizedHandler))  // handle auth errors
            .authorizeHttpRequests(auth -> {
                auth.requestMatchers("/api/auth/**").permitAll();   // public auth endpoints
                auth.requestMatchers("/api/admin/**").hasRole("ADMIN");   // admin-only
                auth.requestMatchers("/api/user/**").hasAnyRole("USER","ADMIN"); // logged-in users
                auth.anyRequest().authenticated();  // any other endpoints require auth
            });
        
        // Add JWT filter before the default UsernamePasswordAuthenticationFilter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        // Also set our authenticationProvider
        http.authenticationProvider(authenticationProvider());
        
        return http.build();
    }
    
    

}