package com.example.demo;

import com.example.demo.jwt.CustomGrantedAuthority;
import com.example.demo.jwt.dao.CustomUserDetails;
import com.example.demo.jwt.dao.CustomUserDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Collections;
import java.util.Optional;

@SpringBootApplication
public class DemoApplication implements CommandLineRunner {
	@Autowired
	private CustomUserDetailsRepo customUserDetailsRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {
		Optional<CustomUserDetails> udo = customUserDetailsRepo.findByUsername("admin");
		if(!udo.isPresent()) {
			CustomUserDetails ncd = new CustomUserDetails();
			ncd.setUsername("admin");
			ncd.setPassword(passwordEncoder.encode("admin"));
			ncd.setAuthorities(Collections.singletonList(CustomGrantedAuthority.ROLE_ADMIN));

			System.out.println("Admin created");

			customUserDetailsRepo.save(ncd);
		};
	}
}
