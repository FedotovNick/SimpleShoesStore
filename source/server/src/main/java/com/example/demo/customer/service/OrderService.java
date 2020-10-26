package com.example.demo.customer.service;

import com.example.demo.card.data.CardEntity;
import com.example.demo.card.data.CardEntityRepository;
import com.example.demo.customer.data.*;
import com.example.demo.customer.exceptions.WrongOrdersRequestException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderEntityRepo orderEntityRepo;
    @Autowired
    private CardEntityRepository cardEntityRepository;

    public void addOrder(OrderDto dto) throws WrongOrdersRequestException {
        try{
            OrderEntity orderEntity = null;
            List<OrderItemEntity> itemsList = null;

            Optional<OrderEntity> oe = orderEntityRepo.findByPhone(dto.getPhone());

            Long[] cardId = dto.getCard_ids();
            Integer[] sizes = dto.getSizes();

            if(oe.isPresent()){
                orderEntity = oe.get();
                itemsList = orderEntity.getOrderItems();
            }
            else {
                orderEntity = new OrderEntity();
                orderEntity.setPhone(dto.getPhone());

                itemsList = new ArrayList<>();
            }

            for(int i=0; i<cardId.length; i++){
                OrderItemEntity oie = new OrderItemEntity(cardId[i], sizes[i]);
                itemsList.add(oie);
            }

            orderEntity.setName(dto.getName());
            orderEntity.setSurname(dto.getSurname());
            orderEntity.setOrderItems(itemsList);
            orderEntityRepo.save(orderEntity);
        } catch (Exception ex){
            throw new WrongOrdersRequestException();
        }
    }

    public OrdersPageDto getOrdersPage() throws WrongOrdersRequestException {

        try{
            OrdersPageDto opd = new OrdersPageDto();

            List<OrderEntity> orderEntityList = orderEntityRepo.findAll();
            List<OrderDto> orderDtos = new ArrayList<>();
            for(OrderEntity oe: orderEntityList){
                OrderDto dto = new OrderDto();
                dto.setId(oe.getId());
                dto.setName(oe.getName());
                dto.setSurname(oe.getSurname());
                dto.setPhone(oe.getPhone());

                List<OrderItemEntity> oie = oe.getOrderItems();

                Long[] cardIds = new Long[oie.size()];
                Integer[] sizes = new Integer[oie.size()];
                OrderCard[] cards = new OrderCard[oie.size()];

                for(int i=0; i<oie.size(); i++){
                    Long cid = oie.get(i).getCardId();
                    cardIds[i] = cid;

                    Integer s = oie.get(i).getSize();
                    sizes[i] = s;

                    OrderCard oc = new OrderCard();
                    CardEntity cent = cardEntityRepository.findById(cid).orElseThrow(WrongOrdersRequestException::new);

                    oc.setSize(s);
                    oc.setTitle(cent.getTitle());
                    oc.setPrice(cent.getPrice());

                    cards[i] = oc;
                }

                dto.setCard_ids(cardIds);
                dto.setSizes(sizes);
                dto.setCards(cards);

                orderDtos.add(dto);
            }

            opd.setOrders(orderDtos);
            return opd;

        } catch (Exception ex){
            ex.printStackTrace();
            throw new WrongOrdersRequestException();
        }

    }

    public void deleteOrder(Long orderId) throws WrongOrdersRequestException {
        Optional<OrderEntity> oeo = orderEntityRepo.findById(orderId);
        if(oeo.isPresent()) orderEntityRepo.delete(oeo.get());
        else throw new WrongOrdersRequestException();
    }

    public OrderDto getOrder(Long orderId) throws WrongOrdersRequestException {
        Optional<OrderEntity> oeo = orderEntityRepo.findById(orderId);
        if(oeo.isPresent()) {
            OrderEntity oe = oeo.get();

            OrderDto dto = new OrderDto();
            dto.setId(oe.getId());
            dto.setName(oe.getName());
            dto.setSurname(oe.getSurname());
            dto.setPhone(oe.getPhone());

            List<OrderItemEntity> oie = oe.getOrderItems();

            Long[] cardIds = new Long[oie.size()];
            Integer[] sizes = new Integer[oie.size()];
            OrderCard[] cards = new OrderCard[oie.size()];


            for(int i=0; i<oie.size(); i++){
                Long cid = oie.get(i).getCardId();
                cardIds[i] = cid;

                Integer s = oie.get(i).getSize();
                sizes[i] = s;

                OrderCard oc = new OrderCard();
                CardEntity cent = cardEntityRepository.findById(cid).orElseThrow(WrongOrdersRequestException::new);

                oc.setSize(s);
                oc.setTitle(cent.getTitle());
                oc.setPrice(cent.getPrice());

                cards[i] = oc;
            }

            dto.setCard_ids(cardIds);
            dto.setSizes(sizes);
            dto.setCards(cards);

            return dto;
        }
        else {
            throw new WrongOrdersRequestException();
        }
    }
}
