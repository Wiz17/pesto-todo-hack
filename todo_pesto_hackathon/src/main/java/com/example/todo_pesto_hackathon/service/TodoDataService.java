package com.example.todo_pesto_hackathon.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.todo_pesto_hackathon.entity.TodoData;
import com.example.todo_pesto_hackathon.repository.TodoRepository;

@Service
public class TodoDataService {

	
	@Autowired
	private TodoRepository tr;
	
	public boolean addTodo(TodoData td) {
		
		TodoData savedTodo = tr.save(td);
        return savedTodo != null;
	}
	public boolean updateTodo(TodoData td , String userId) {
		tr.updateTableTodos(td.getDate() ,td.getDetailedTodo(), td.getStatus() , td.getTodo()  , userId,td.getTodoId());
		return true;
	}
	
	public void deleteTodo(Integer todoId) {
		 tr.deleteById(todoId);
		
	}
	public List<TodoData> filter(String status, String userId) {
		// TODO Auto-generated method stub
		return tr.filter(status, userId);
	}
	public List<TodoData> getAllTdodo(String userId) {
		// TODO Auto-generated method stub
		
		return tr.getAllTodoOfUser(userId);
	}
}
