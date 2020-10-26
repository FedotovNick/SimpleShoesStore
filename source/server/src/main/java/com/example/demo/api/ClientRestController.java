package com.example.demo.api;

import com.example.demo.card.data.CardDto;
import com.example.demo.card.data.CardsPageDto;
import com.example.demo.card.exceptions.CardReadException;
import com.example.demo.card.services.CardService;
import com.example.demo.cimg.data.CImgsDto;
import com.example.demo.cimg.services.CImgService;
import com.example.demo.customer.data.OrderDto;
import com.example.demo.customer.exceptions.WrongOrdersRequestException;
import com.example.demo.customer.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/client")
public class ClientRestController {

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
    public CardsPageDto getAllCards( Pageable pageable, @RequestParam(required = false) String key) throws CardReadException {
        if(key==null) key="all";
        return cardService.getAllCards(key,pageable);
    }

    @GetMapping("cimg")
    public CImgsDto getAllCImgs(){
        return cImgService.getAllCImgs();
    }


    @PostMapping("orders")
    public void addOrder(@RequestBody OrderDto dto) throws WrongOrdersRequestException {
        orderService.addOrder(dto);
    }

}
