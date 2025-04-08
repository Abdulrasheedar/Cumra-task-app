package com.cumra.backend.security.jwt;


import java.io.IOException;
import java.util.Enumeration;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;


@Component
@RequiredArgsConstructor
public class JwtAuthTokenFilter extends OncePerRequestFilter{

	private JwtUtils jwtUtils;
	private UserDetailsService userDetailsService;
	
	public JwtAuthTokenFilter(JwtUtils jwtUtils, UserDetailsService userDetailsService) {
		this.jwtUtils = jwtUtils;
		this.userDetailsService = userDetailsService;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException{
		
		try {
			String header = request.getHeader("Authorization");
			if(header!= null && header.startsWith("Bearer ")) {
				String token = header.substring(7); //removes Bearer prefix
				if (jwtUtils.validateToken(token)) {
                    // Token is valid, get username and roles
                    String username = jwtUtils.getUsernameFromToken(token);
                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    // Create authentication token
                    UsernamePasswordAuthenticationToken authToken = 
                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                }
			}
		} catch(Exception e) {
			logger.error("Cannot set user authentication: {}");
		}
		
		filterChain.doFilter(request, response);
	}
}
