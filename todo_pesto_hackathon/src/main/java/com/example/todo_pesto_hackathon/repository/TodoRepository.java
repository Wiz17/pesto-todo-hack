package com.example.todo_pesto_hackathon.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.example.todo_pesto_hackathon.entity.TodoData;

import jakarta.transaction.Transactional;


public interface TodoRepository extends JpaRepository<TodoData, Integer> {

	@Modifying
	@Transactional
	@Query(value="UPDATE todo_data SET date=?1,detailed_todo=?2,status=?3,todo=?4 WHERE user_id = ?5 AND todo_id=?6" , nativeQuery=true)
	public int updateTableTodos(String date  , String detailedTodo  ,String status,String todo, String userId,Integer todoId);

	@Query(value="Select * from todo_data where status=?1 AND user_id=?2" , nativeQuery=true)
	public List<TodoData> filter(String status, String userId);

	@Query(value="Select * from todo_data where user_id=?1" , nativeQuery=true)
	public List<TodoData> getAllTodoOfUser(String userId);
	
	
//	@Modifying
//    @Transactional
//	@Query(value="DELETE FROM todo_data WHERE todo_id=?1")
//	public void deleteTodo(Integer todoId);
}

