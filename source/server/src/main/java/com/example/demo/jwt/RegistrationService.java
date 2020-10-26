package com.example.demo.jwt;

import com.example.demo.jwt.dao.CustomUserDetails;
import com.example.demo.jwt.dao.CustomUserDetailsRepo;
import com.example.demo.jwt.dao.RefreshTokenSessionEntity;
import com.example.demo.jwt.dao.RefreshTokenSessionEntityRepo;
import com.example.demo.jwt.dto.UserDto;
import com.example.demo.jwt.exceptions.BadRequestException;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.keygen.KeyGenerators;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.servlet.ServletRequest;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Date;
import java.util.Optional;

import static org.springframework.util.StringUtils.hasText;

@Service
public class RegistrationService {

    @Value("${jwt.jwtSecret}")
    private String jwtSecret;

    @Autowired
    private RefreshTokenSessionEntityRepo refreshSessionRepo;

    @Autowired
    private CustomUserDetailsRepo userDetailsRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void saveRefreshTokenSessionEntity(RefreshTokenSessionEntity session) {
        refreshSessionRepo.save(session);
    }

    public void saveCustomUserDetails(CustomUserDetails user) {
        userDetailsRepo.save(user);
    }


    public Optional<CustomUserDetails> findUserByUsername(String username){
        return userDetailsRepo.findByUsername(username);
    }

    public void clearRefreshTokenCookie(HttpServletResponse response) {
        Cookie cookie = new Cookie("refresh",null);
        cookie.setPath("/auth");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(0);

        response.addCookie(cookie);
    }

    public void deleteRefreshTokenSession(RefreshTokenSessionEntity session) {
        refreshSessionRepo.delete(session);
    }

    public String genAccessToken(String username, String roles) {
        Date date = Date.from(LocalDateTime.now().plusDays(2).toInstant(ZoneOffset.of("+3")));
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles)
                .setExpiration(date)
                .signWith(SignatureAlgorithm.HS512, jwtSecret)
                .compact();

    }

    public String genRefreshToken(){
        byte[] ms = KeyGenerators.secureRandom(50).generateKey();
        return bytesToHex(ms);
    }

    private static String bytesToHex(byte[]hashInBytes) {

        StringBuilder sb = new StringBuilder();
        for (byte b : hashInBytes) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }


    public void putRefreshCookie(HttpServletResponse response, String refreshCookie) {
        Cookie cookie = new Cookie("refresh",refreshCookie);
        cookie.setPath("/auth");
        cookie.setHttpOnly(true);
        cookie.setMaxAge(30*24*60*60);  // 30 days
        response.addCookie(cookie);
    }

    public Optional<RefreshTokenSessionEntity> findSessionByUsernameAndId(String username, long sessionId) {
        return refreshSessionRepo.findByIdAndUsername(sessionId, username);
    }

    public Optional<RefreshTokenSessionEntity> findSessionById(long sessionId) {
        return refreshSessionRepo.findById(sessionId);
    }

    public Claims validateAccessToken(HttpServletRequest request) {

        String accessToken = null;
        String bearer = request.getHeader("Authorization");
        if (hasText(bearer) && bearer.startsWith("Bearer ")) {
            accessToken = bearer.substring(7);
        }

        return Jwts.parser().setSigningKey(jwtSecret).parseClaimsJws(accessToken).getBody();

    }

    public void update(UserDto dto) throws BadRequestException {
        try{
            CustomUserDetails userDetails = userDetailsRepo.findByUsername(dto.getUsername()).orElseThrow(Exception::new);
            if(passwordEncoder.matches(dto.getPassword(),userDetails.getPassword())) {
                String oldPswd = userDetails.getPassword();
                String encodedNewPswd = passwordEncoder.encode(dto.getNewPassword());

                userDetails.setPassword(encodedNewPswd);
                userDetailsRepo.save(userDetails);

            } else throw new Exception();

        } catch (Exception e){
            throw new BadRequestException();
        }

    }
}
