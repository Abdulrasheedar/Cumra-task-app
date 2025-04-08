package com.cumra.backend.security.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;

import java.security.Key;
import java.util.Date;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


@Component
public class JwtUtils {
	
	
	@Value("${app.jwtSecret}")
	private String jwtSecret;
	
	@Value("${app.jwtExpirationsMs}")
	private int jwtExpirationMs;
	
	
	
	   // Generate a JWT for a given UserDetails (called during login success)
	public String generateToken(UserDetails userDetails) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + jwtExpirationMs);
		
		// Include username and roles in the token claims:
        String roles = userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority)
                        .collect(Collectors.joining(","));
		
		return Jwts.builder()
				.setSubject(userDetails.getUsername())
				.claim("roles", roles)
				.setIssuedAt(now)
				.setExpiration(expiry)
				.signWith(Keys.hmacShaKeyFor(jwtSecret.getBytes()))
				.compact();
	}

	// Validate JWT and return username if valid (or null if invalid)
    public String getUsernameFromToken(String token) {
        return Jwts.parser().setSigningKey(jwtSecret.getBytes())
                   .build().parseClaimsJws(token)
                   .getBody().getSubject();
    }
    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(jwtSecret.getBytes()).build().parseClaimsJws(token);
            return true;
        } catch (JwtException e) { // catches expired, malformed, etc.
            // log error or handle accordingly
            return false;
        }
    }
}
