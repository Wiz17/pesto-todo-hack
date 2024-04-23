package com.example.todo_pesto_hackathon.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.todo_pesto_hackathon.entity.User;
import com.example.todo_pesto_hackathon.repository.UserRepository;


@Service
public class CustomerUserdetailService implements UserDetailsService{

	
	@Autowired
	private UserRepository userRepository;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		User user = this.userRepository.findByEmail(username).orElseThrow(()-> new RuntimeException("user not found"));
		return user;
	}

	
}
