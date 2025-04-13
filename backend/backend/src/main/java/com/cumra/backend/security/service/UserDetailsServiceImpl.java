package com.cumra.backend.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cumra.backend.entity.User;
import com.cumra.backend.repository.UserRepository;

import jakarta.transaction.Transactional;


//This class implements Spring Security's UserDetailsService interface
//It is used during the authentication process to fetch user details from the database
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepository;
	
	// This method is automatically called by Spring Security during login
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
		User user = userRepository.findByUsername(username)
				.orElseThrow(()-> new UsernameNotFoundException("User Name not found: "+username));
		// Convert the User entity to a UserDetails object
		return UserDetailsImpl.build(user);
	}

}
