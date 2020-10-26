package com.example.demo;

import com.example.demo.jwt.CustomGrantedAuthority;
import com.example.demo.jwt.RegistrationService;
import com.example.demo.jwt.dao.CustomUserDetails;
import com.example.demo.jwt.dto.ResponseDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Component
public class CustomSecurityFilter extends GenericFilterBean {
    @Autowired
    private RegistrationService rs;

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String header = request.getHeader("Authorization");

        if(header != null){

            try {
                Claims claims = rs.validateAccessToken(request);
                String username = claims.getSubject();
                String roles = claims.get("roles", String.class);
                String[] rmas = roles.split(" ");

                List<CustomGrantedAuthority> authList = new ArrayList<>();
                for(String s: rmas){
                    authList.add(CustomGrantedAuthority.valueOf(s));
                }

                UsernamePasswordAuthenticationToken user = new UsernamePasswordAuthenticationToken(username, null, authList);

                SecurityContextHolder.getContext().setAuthentication(user);

                filterChain.doFilter(servletRequest, servletResponse);

            } catch(ExpiredJwtException expired) {

                ResponseDto rdto = new ResponseDto(400, "Access token expired");
                String json = objectMapper.writeValueAsString(rdto);

                response.setStatus(400);
                response.setHeader("Content-Type","application/json");
                PrintWriter writer = new PrintWriter(response.getOutputStream());
                writer.println(json);
                writer.flush();
                writer.close();

            } catch(Exception ex){

                ResponseDto rdto = new ResponseDto(400, "Bad access token");
                String json = objectMapper.writeValueAsString(rdto);

                response.setStatus(400);
                response.setHeader("Content-Type","application/json");
                PrintWriter writer = new PrintWriter(response.getOutputStream());
                writer.println(json);
                writer.flush();
                writer.close();
            }
        }

        else filterChain.doFilter(servletRequest, servletResponse);
    }
}
