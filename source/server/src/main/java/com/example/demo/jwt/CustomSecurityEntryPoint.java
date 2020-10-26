package com.example.demo.jwt;

import com.example.demo.jwt.dto.ResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class CustomSecurityEntryPoint implements AuthenticationEntryPoint {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void commence(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {
        ResponseDto rdto = new ResponseDto(401, "Not authenticated");
        String json = objectMapper.writeValueAsString(rdto);

        httpServletResponse.setStatus(401);
        httpServletResponse.setHeader("Content-Type","application/json");


        PrintWriter writer = new PrintWriter(httpServletResponse.getOutputStream());
        writer.println(json);
        writer.flush();
        writer.close();
    }
}
