package com.example.todo_pesto_hackathon.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo_pesto_hackathon.entity.JwtResponse;
import com.example.todo_pesto_hackathon.entity.User;
import com.example.todo_pesto_hackathon.security.JwtHelper;
import com.example.todo_pesto_hackathon.service.UserService;



@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private AuthenticationManager manager;

	@Autowired
	private UserService userService;

	@Autowired
	private JwtHelper helper;

	private Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	UserService us;
//	@Autowired
//	JwtHelper jh;
//	@GetMapping("/getuser")
//	public User getUser(@RequestParam String token) {
//		return us.findUserIdFromUsername(jh.getUsernameFromToken(token));
//	}
	@PostMapping("/login")
	public JwtResponse login(@RequestParam String email, @RequestParam String password) {

	
		this.doAuthenticate(email, password);

		
		UserDetails userDetails = userDetailsService.loadUserByUsername(email);
		String token = this.helper.generateToken(userDetails);

		 JwtResponse response = new JwtResponse();
		 response.setJwtToken(token);
		 response.setUsername(userDetails.getUsername());
		 User user=us.findUserIdFromUsername(email);
		 System.out.println("JWT GENERATED");
		 response.setName(user.getName());
		 
		// return new ResponseEntity<>(response, HttpStatus.OK);
		return response;

	}

	private void doAuthenticate(String email, String password) {

		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(email, password);
		try {
			manager.authenticate(authentication);

		} catch (BadCredentialsException e) {
			throw new BadCredentialsException(" Invalid Username or Password  !!");
		}

	}

	@ExceptionHandler(BadCredentialsException.class)
	public String exceptionHandler() {
		return "Credentials Invalid !!";
	}

	@PostMapping("/create-user")
	public User createUser(@RequestBody User user) {
		return userService.createUser(user);
	}

}