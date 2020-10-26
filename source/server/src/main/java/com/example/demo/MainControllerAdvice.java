package com.example.demo;

import com.example.demo.aux.ExceptionDto;
import com.example.demo.card.exceptions.*;
import com.example.demo.customer.exceptions.CardInOrderDeleteException;
import com.example.demo.customer.exceptions.WrongOrdersRequestException;
import com.example.demo.jwt.dto.ResponseDto;
import com.example.demo.jwt.exceptions.BadRequestException;
import com.example.demo.jwt.exceptions.RefreshTokenExpiredException;
import com.example.demo.jwt.exceptions.WrongRefreshTokenException;
import com.example.demo.jwt.exceptions.WrongUsernameOrPasswordException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.NoHandlerFoundException;

@ControllerAdvice
public class MainControllerAdvice{

    @ResponseBody
    @ExceptionHandler(CardInOrderDeleteException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionDto cardInOrderDeleteExceptionHandler(Exception e){
        return new ExceptionDto(400, "Card in order");
    }

    @ResponseBody
    @ExceptionHandler(CardCreateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionDto cardCreateExceptionHandler(Exception e){
        return new ExceptionDto(400,"Create ex");
    }

    @ResponseBody
    @ExceptionHandler(CardReadException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ExceptionDto cardReadExceptionHandler(Exception e){
        return new ExceptionDto(404,"Cards not found");
    }

    @ResponseBody
    @ExceptionHandler(CardUpdateException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionDto cardUpdateExceptionHandler(Exception e){
        return new ExceptionDto(400,"Update ex");
    }

    @ResponseBody
    @ExceptionHandler(CardDeleteException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionDto cardDeleteExceptionHandler(Exception e){
        return new ExceptionDto(400,"Delete ex");
    }

    @ResponseBody
    @ExceptionHandler(CardNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionDto cardNotValidExceptionHandler(Exception e){
        return new ExceptionDto(400,"Not valid ex");
    }

    @ResponseBody
    @ExceptionHandler(WrongOrdersRequestException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ExceptionDto wrongOrdersRequestExceptionHandler(Exception e){
        return new ExceptionDto(400, "Wrong orders request");
    }

    @ResponseBody
    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<ResponseDto> noHandlerFoundExceptionHandler(Exception e){
        return ResponseEntity.status(404).body(new ResponseDto(404,"Resourse not found"));
    }

    @ResponseBody
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    protected ResponseEntity<ResponseDto> handleHttpRequestMethodNotSupported(Exception e) {
        return ResponseEntity.status(405).body(new ResponseDto(405,"Request method not supported"));
    }

    @ResponseBody
    @ExceptionHandler(WrongUsernameOrPasswordException.class)
    public ResponseEntity<ResponseDto> wrongUsernameOrPasswordExceptionHandler(Exception ex) {
        return ResponseEntity.status(400).body(new ResponseDto(400, "Wrong username or password"));
    }

    @ResponseBody
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ResponseDto> notValidBindingDataExceptionHandler(Exception ex) {
        return ResponseEntity.status(400).body(new ResponseDto(400, "Not valid"));
    }

    @ResponseBody
    @ExceptionHandler(WrongRefreshTokenException.class)
    public ResponseEntity<ResponseDto> wrongRefreshTokenExceptionHandler(Exception ex) {
        return ResponseEntity.status(400).body(new ResponseDto(400, "Wrong refresh token"));
    }

    @ResponseBody
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ResponseDto> badRequestExceptionHandler(Exception ex) {
        return ResponseEntity.status(400).body(new ResponseDto(400, "Bad request"));
    }

    @ResponseBody
    @ExceptionHandler(RefreshTokenExpiredException.class)
    public ResponseEntity<ResponseDto> RefreshTokenExpiredExceptionHandler(Exception ex) {
        return ResponseEntity.status(400).body(new ResponseDto(400, "Refresh token expired"));
    }
}
