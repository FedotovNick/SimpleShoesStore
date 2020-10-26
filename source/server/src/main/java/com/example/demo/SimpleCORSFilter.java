package com.example.demo;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

//@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class SimpleCORSFilter extends GenericFilterBean {
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;

        String host1 = "http://localhost:9999";
        String host2 = "null";

        response.setHeader("Access-Control-Allow-Origin", host1 );
        response.setHeader("Access-Control-Allow-Methods", "PUT,DELETE,POST,GET,OPTIONS");
        response.setHeader("Access-Control-Max-Age", "3600");
        response.setHeader("Access-Control-Allow-Headers", "authorization,content-type");
        response.setHeader("Access-Control-Allow-Credentials", "true");



        if(request.getMethod().equals("OPTIONS"))
        {
            response.setStatus(HttpServletResponse.SC_OK);
            return;
        }


        chain.doFilter(req, res);
    }
}