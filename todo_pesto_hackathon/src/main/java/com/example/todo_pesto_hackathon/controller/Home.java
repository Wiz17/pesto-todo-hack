package com.example.todo_pesto_hackathon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.todo_pesto_hackathon.entity.TodoData;
import com.example.todo_pesto_hackathon.security.JwtHelper;
import com.example.todo_pesto_hackathon.service.TodoDataService;
import com.example.todo_pesto_hackathon.service.UserService;

@RestController
@RequestMapping("/home")
@CrossOrigin(origins = "http://localhost:3000")
public class Home {

	@Autowired
	private TodoDataService tds;
	@Autowired
	private JwtHelper jwth;
	@Autowired
	private UserService us;
	
	@GetMapping("/trial")
	public String trial() { 
		return "U gonna get whatever u want";
	}
	
	@GetMapping("/isTokenExpired")
	public boolean isTokenExpired(@RequestParam String token) {
		return jwth.isTokenExpired(token);
	}
	@PostMapping("/add-todo")
	public ResponseEntity<String> addTodo(@RequestBody TodoData data,@RequestParam String token) {

		data.setUser(us.findUserIdFromUsername(jwth.getUsernameFromToken(token)));
		if (tds.addTodo(data)) return ResponseEntity.status(HttpStatus.CREATED).body("Todo added successfully!!");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to add todo");
        
	}
	
	@PostMapping("/update-todo")
	public ResponseEntity<String> updateTodo(@RequestBody TodoData data,@RequestParam String token){
		
		data.setUser(us.findUserIdFromUsername(jwth.getUsernameFromToken(token)));
	    if (tds.updateTodo(data,data.getUser().getUserId())) return ResponseEntity.status(HttpStatus.CREATED).body("Todo updated successfully!!");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update todo");
	}
	
	@DeleteMapping("/delete-todo")
	public ResponseEntity<String> deleteTodo(@RequestParam Integer todoId){
		
		tds.deleteTodo(todoId);
	   return ResponseEntity.status(HttpStatus.ACCEPTED).body("Deleted todo");
	    
	}
	
	@GetMapping("/filter")
	public List<TodoData> filter(@RequestParam String status ,@RequestParam String token) {
		String userId = us.findUserIdFromUsername(jwth.getUsernameFromToken(token)).getUserId();
		
		return tds.filter(status , userId);
	}
	
	@GetMapping("/get-all-todo")
	public List<TodoData> getAllTodo(@RequestParam String token){
		
		return tds.getAllTdodo(us.findUserIdFromUsername(jwth.getUsernameFromToken(token)).getUserId());
		
	}
	//make json of get all todo of user
}
