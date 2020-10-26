package com.example.demo.jwt;

import com.example.demo.jwt.dto.ResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AccessDeniedException e) throws IOException, ServletException {
        ResponseDto rdto = new ResponseDto(403, "Access forbidden for this user");
        String json = objectMapper.writeValueAsString(rdto);

        httpServletResponse.setStatus(403);
        httpServletResponse.setHeader("Content-Type","application/json");
        PrintWriter writer = new PrintWriter(httpServletResponse.getOutputStream());
        writer.println(json);
        writer.flush();
        writer.close();
    }
}
