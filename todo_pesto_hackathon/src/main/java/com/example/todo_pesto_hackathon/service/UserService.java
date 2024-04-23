package com.example.todo_pesto_hackathon.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.example.todo_pesto_hackathon.entity.User;
import com.example.todo_pesto_hackathon.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	private List<User> getUSers(){
		return userRepository.findAll();
	}
	
	
	public User findUserIdFromUsername(String userName) {
		return userRepository.findId(userName);
	}
	public User existUserById(String mail, String pass) {
		return userRepository.findId(mail);
	}

	public User createUser(User user) {
		// TODO Auto-generated method stub
		user.setUserId(UUID.randomUUID().toString());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepository.save(user);
	}


	
}