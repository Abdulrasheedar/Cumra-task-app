package com.cumra.backend.security.service;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.cumra.backend.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

// This class is a custom implementation of Spring Security's UserDetails interface.
// It adapts the application's User entity to the format expected by Spring Security.
public class UserDetailsImpl implements UserDetails{
	
	private Long id;
	private String username;
	private String email;
	@JsonIgnore
	private String password;
	private Collection<? extends GrantedAuthority> authorities;
	
	
	public UserDetailsImpl(Long id, String username, String email,String password
			, Collection<? extends GrantedAuthority> authorities) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}
	
	// Static factory method to build UserDetailsImpl from the User entity:
	public static UserDetailsImpl build(User user) {
		// Convert user's roles into a list of GrantedAuthority
		List<GrantedAuthority> auths = user.getRoles().stream()
				.map(role -> new SimpleGrantedAuthority(role.getName().name()))
				.collect(Collectors.toList());

		return new UserDetailsImpl(
				user.getId(),
				user.getUsername(),
				user.getEmail(),
				user.getPassword(),
				auths
				);
	}
	
	@Override public Collection<? extends GrantedAuthority> getAuthorities() { return authorities; }
	public Long getId() { return id; }
	@Override public String getPassword() { 
		return password; }
    @Override public String getUsername() { return username; }
    @Override public boolean isAccountNonExpired() { return true; }
    @Override public boolean isAccountNonLocked() { return true; }
    @Override public boolean isCredentialsNonExpired() { return true; }
    @Override public boolean isEnabled() { return true; }
	

}
