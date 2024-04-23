package com.example.todo_pesto_hackathon.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.todo_pesto_hackathon.entity.User;



public interface UserRepository extends JpaRepository<User, Integer> {

	
	public Optional<User> findByEmail(String email);
	@Query(value="select * from user where email=?1" , nativeQuery=true)
	public User findId(String userName);
	
}
