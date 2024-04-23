package com.example.todo_pesto_hackathon.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Entity
@Table(name="todo_data")
public class TodoData {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer todoId;
	private String todo;
	private String detailedTodo;
    private String status;
    private String date;
    @ManyToOne
	@JoinColumn(name = "userId", referencedColumnName = "userId")
    private User user;

}
