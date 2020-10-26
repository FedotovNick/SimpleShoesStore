package com.example.demo.jwt;

import com.example.demo.jwt.dao.CustomUserDetails;
import com.example.demo.jwt.dao.RefreshTokenSessionEntity;
import com.example.demo.jwt.dto.ResponseDto;
import com.example.demo.jwt.dto.UserDto;
import com.example.demo.jwt.exceptions.BadRequestException;
import com.example.demo.jwt.exceptions.RefreshTokenExpiredException;
import com.example.demo.jwt.exceptions.WrongRefreshTokenException;
import com.example.demo.jwt.exceptions.WrongUsernameOrPasswordException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @Autowired
    private RegistrationService rs;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @PostMapping("login")
    public ResponseEntity<ResponseDto> login(@Valid UserDto userDto,
                                             @CookieValue(required = false) String refresh,
                                             HttpServletResponse response) throws WrongUsernameOrPasswordException, WrongRefreshTokenException {

        String refreshToken = null;
        long sessionId = 0;
        RefreshTokenSessionEntity session = null;
        String accessToken = null;

        if (refresh != null) {
            try {
                String exm[] = refresh.split("\\.");
                if (exm.length != 2) throw new Exception();
                sessionId = new Long(exm[1]);

                refreshToken = exm[0];
                if (refreshToken.length() != 100) throw new Exception();

                session = rs.findSessionById(sessionId).orElseThrow(Exception::new);
                rs.deleteRefreshTokenSession(session);

            } catch (Exception e) {
            }
        }

        String username = userDto.getUsername();

        CustomUserDetails user = rs.findUserByUsername(username).orElseThrow(WrongUsernameOrPasswordException::new);

        if (!passwordEncoder.matches(userDto.getPassword(), user.getPassword()))
            throw new WrongUsernameOrPasswordException();

        String roles = "";
        List<CustomGrantedAuthority> list = user.getAuthorities();

        for (CustomGrantedAuthority a : list) {
            roles += a.getAuthority() + " ";
        }

        roles = roles.trim();

        Instant expiration = LocalDateTime.now().plusDays(30).toInstant(ZoneOffset.of("+3"));


        refreshToken = rs.genRefreshToken();
        accessToken = rs.genAccessToken(username, roles);
        session = new RefreshTokenSessionEntity(refreshToken, username, roles, expiration);
        rs.saveRefreshTokenSessionEntity(session);
        sessionId = session.getId();

        String refreshCookie = refreshToken + "." + sessionId;
        rs.putRefreshCookie(response, refreshCookie);

        return ResponseEntity.status(200).body(new ResponseDto(200, accessToken));

    }

    @PostMapping("registration")
    @ResponseStatus(HttpStatus.CREATED)
    public void registration(@Valid UserDto userDto,
                             @CookieValue(required = false) String refresh) throws WrongUsernameOrPasswordException {

        String username = userDto.getUsername();

        if (rs.findUserByUsername(username).isPresent()) throw new WrongUsernameOrPasswordException();

        CustomUserDetails user = new CustomUserDetails(username, passwordEncoder.encode(userDto.getPassword()), Collections.singletonList(CustomGrantedAuthority.ROLE_USER));
        rs.saveCustomUserDetails(user);

//        if(refresh != null) {
//            try{
//                String exm[] = refresh.split("\\.");
//                if (exm.length != 2) throw new Exception();
//                long sessionId = new Long(exm[1]);
//                String refreshToken = exm[0];
//                if(refreshToken.length() != 100) throw new Exception();
//
//                RefreshTokenSessionEntity session = rs.findSessionById(sessionId).orElseThrow(Exception::new);
//                if(refreshToken.equals(session.getRefreshToken())) rs.deleteRefreshTokenSession(session);
//
//            } catch(Exception ex){
//
//            }
//        }

    }


    @GetMapping("logout")
    @ResponseStatus(HttpStatus.OK)
    public void logout(@CookieValue(required = false) String refresh,
                       HttpServletResponse response) throws BadRequestException, WrongRefreshTokenException {

        if (refresh == null) throw new BadRequestException();

        String exm[] = refresh.split("\\.");
        if (exm.length != 2) throw new WrongRefreshTokenException();
        long sessionId = 0;

        try {
            sessionId = new Long(exm[1]);
        } catch (Exception e) {
            throw new WrongRefreshTokenException();
        }

        String refreshToken = exm[0];
        if (refreshToken.length() != 100) throw new WrongRefreshTokenException();

        RefreshTokenSessionEntity session = rs.findSessionById(sessionId).orElseThrow(WrongRefreshTokenException::new);

        if (session.getRefreshToken().equals(refreshToken)) rs.deleteRefreshTokenSession(session);

        rs.clearRefreshTokenCookie(response);

    }
    @PostMapping("update")
    @ResponseStatus(HttpStatus.OK)
    public void updatePassword(@Valid UserDto dto) throws BadRequestException {
        rs.update(dto);
    }


    @GetMapping("refresh")
    public ResponseEntity<ResponseDto> refresh(@CookieValue(required = false) String refresh,
                                               HttpServletRequest request,
                                               HttpServletResponse response) throws BadRequestException, WrongRefreshTokenException, RefreshTokenExpiredException {

        if (refresh == null) throw new BadRequestException();

        String exm[] = refresh.split("\\.");
        if (exm.length != 2) throw new WrongRefreshTokenException();
        long sessionId = 0;

        try {
            sessionId = new Long(exm[1]);
        } catch (Exception e) {
            throw new WrongRefreshTokenException();
        }

        String refreshToken = exm[0];
        if (refreshToken.length() != 100) throw new WrongRefreshTokenException();

        RefreshTokenSessionEntity session = rs.findSessionById(sessionId).orElseThrow(WrongRefreshTokenException::new);

        if (!session.getRefreshToken().equals(refreshToken)) throw new WrongRefreshTokenException();

        Instant ex1 = session.getExpiration();
        Instant now = Instant.now();

        if (now.isBefore(ex1)) {

            refreshToken = rs.genRefreshToken();
            String accessToken = rs.genAccessToken(session.getUsername(), session.getAuthorities());
            Instant expiration = LocalDateTime.now().plusDays(30).toInstant(ZoneOffset.of("+3"));

            session.setRefreshToken(refreshToken);
            session.setExpiration(expiration);

            rs.saveRefreshTokenSessionEntity(session);

            String refreshCookie = refreshToken + "." + sessionId;
            rs.putRefreshCookie(response, refreshCookie);

            return ResponseEntity.status(200).body(new ResponseDto(200, accessToken));
        } else {
            rs.deleteRefreshTokenSession(session);
            rs.clearRefreshTokenCookie(response);

            throw new RefreshTokenExpiredException();
        }
    }
}
