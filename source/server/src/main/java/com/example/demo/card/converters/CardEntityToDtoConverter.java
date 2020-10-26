package com.example.demo.card.converters;

import com.example.demo.card.data.CardDto;
import com.example.demo.card.data.CardEntity;
import org.springframework.core.convert.converter.Converter;

import java.util.List;

public class CardEntityToDtoConverter implements Converter<CardEntity, CardDto> {
    @Override
    public CardDto convert(CardEntity entity) {

        CardDto dto = new CardDto();
        dto.setId(entity.getId());
        dto.setTitle(entity.getTitle());
        dto.setDescription(entity.getDescription());
        dto.setPrice(entity.getPrice());
        dto.setSizefrom(entity.getSizefrom());
        dto.setSizeto(entity.getSizeto());
        dto.setCategory(entity.getCategory());
        List<String> links = entity.getLinks();

        dto.setLinks(links.toArray(new String[links.size()]));



       return dto;
    }
}
