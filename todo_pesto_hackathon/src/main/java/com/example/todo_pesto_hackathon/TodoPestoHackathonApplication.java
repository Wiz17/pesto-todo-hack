package com.example.todo_pesto_hackathon;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//@SpringBootApplication
@SpringBootApplication(exclude = {SecurityAutoConfiguration.class})
public class TodoPestoHackathonApplication {

	public static void main(String[] args) {
		SpringApplication.run(TodoPestoHackathonApplication.class, args);
//		System.out.println("Hi");
		
	}

}
