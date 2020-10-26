package com.example.demo.card.converters;

import com.example.demo.card.data.CardDto;
import com.example.demo.card.data.CardEntity;
import org.springframework.core.convert.converter.Converter;

import java.util.Arrays;


public class CardDtoToEntityConverter implements Converter<CardDto, CardEntity> {

    @Override
    public CardEntity convert(CardDto dto) {
        CardEntity entity = new CardEntity();

        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        if(dto.getLinks()!=null) entity.setLinks(Arrays.asList(dto.getLinks()));
        entity.setSizefrom(dto.getSizefrom());
        entity.setSizeto(dto.getSizeto());
        if(dto.getCategory()!=null) entity.setCategory(dto.getCategory());
        System.out.println(entity);
        return entity;
    }
}
