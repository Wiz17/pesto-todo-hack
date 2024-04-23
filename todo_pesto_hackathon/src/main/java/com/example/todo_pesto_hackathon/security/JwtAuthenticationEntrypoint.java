package com.example.todo_pesto_hackathon.security;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

@Component
public class JwtAuthenticationEntrypoint implements AuthenticationEntryPoint{

	

	@Override
	public void commence(jakarta.servlet.http.HttpServletRequest request,
			jakarta.servlet.http.HttpServletResponse response, AuthenticationException authException)
			throws IOException, jakarta.servlet.ServletException {
		// TODO Auto-generated method stub
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		PrintWriter writer=response.getWriter();
		writer.println("ACCESS DENIED!!!!!" + authException.getMessage());
		
	}

}
