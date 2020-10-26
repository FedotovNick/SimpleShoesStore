package com.example.demo.api;

import com.example.demo.card.data.CardDto;
import com.example.demo.card.data.CardsPageDto;
import com.example.demo.card.exceptions.CardReadException;
import com.example.demo.card.services.CardService;
import com.example.demo.cimg.data.CImgsDto;
import com.example.demo.cimg.services.CImgService;
import com.example.demo.customer.data.OrderDto;
import com.example.demo.customer.data.OrdersPageDto;
import com.example.demo.customer.exceptions.CardInOrderDeleteException;
import com.example.demo.customer.exceptions.WrongOrdersRequestException;
import com.example.demo.customer.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {
    @Value("${filepath}")
    private String filedir;

    @Autowired
    private CardService cardService;

    @Autowired
    private CImgService cImgService;

    @Autowired
    private OrderService orderService;


    @GetMapping("card/{id}")
    public CardDto getCard(@PathVariable Long id) throws CardReadException {
        return cardService.getCard(id);
    }

    @GetMapping("card")
    public CardsPageDto getAllCards(@RequestParam(required = false) String key, Pageable pageable) throws CardReadException {
        if(key==null) key="all";
        return cardService.getAllCards(key, pageable);
    }

    @PostMapping("card")
    @ResponseStatus(HttpStatus.CREATED)
    public void setCard(@Valid CardDto dto){

        System.out.println(dto.getId());
        cardService.setCard(dto);
    }

    @PutMapping("card")
    public void updateCard(@Valid CardDto dto) throws IOException, CardInOrderDeleteException {
        if(dto.getLinks()!=null){
            String[] links = dto.getLinks();
            System.out.println("LINKS LENGTH "+links.length);

        }
        if(dto.getFiles()!=null){
            MultipartFile[] files = dto.getFiles();

        }

        cardService.update(dto);
    }

    @DeleteMapping("card/{id}")
    public void deleteCard(@PathVariable Long id) throws CardInOrderDeleteException {
        cardService.delete(id);
    }

    @GetMapping("cimg")
    public CImgsDto getAllCImgs(){
        return cImgService.getAllCImgs();
    }

    @PutMapping("cimg")
    @ResponseStatus(HttpStatus.CREATED)
    public void updateCImg(CImgsDto dto) throws Exception {
        cImgService.setCImgs(dto);
    }

    @PostMapping("orders")
    public void addOrder(@RequestBody OrderDto dto) throws WrongOrdersRequestException {
        orderService.addOrder(dto);
    }

    @DeleteMapping("orders/{orderId}")
    @ResponseStatus(HttpStatus.OK)
    public void deleteOrder(@PathVariable Long orderId) throws WrongOrdersRequestException {
        orderService.deleteOrder(orderId);
    }

    @GetMapping("orders/{orderId}")
    public OrderDto getOrder(@PathVariable Long orderId) throws WrongOrdersRequestException {
        return orderService.getOrder(orderId);
    }

    @GetMapping("orders")
    public OrdersPageDto getOrders() throws WrongOrdersRequestException {
        return orderService.getOrdersPage();
    }
}
