package com.example.demo.card.services;

import com.example.demo.card.data.CardDto;
import com.example.demo.card.data.CardEntity;
import com.example.demo.card.data.CardEntityRepository;
import com.example.demo.card.data.CardsPageDto;
import com.example.demo.card.exceptions.CardCreateException;
import com.example.demo.card.exceptions.CardDeleteException;
import com.example.demo.card.exceptions.CardReadException;
import com.example.demo.card.exceptions.CardUpdateException;
import com.example.demo.customer.data.OrderItemEntity;
import com.example.demo.customer.data.OrderItemEntityRepo;
import com.example.demo.customer.exceptions.CardInOrderDeleteException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.convert.ConversionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;

@Service
public class CardService {
    @Value("${filepath}")
    private String fdir;

    @Autowired
    private CardEntityRepository cardEntityRepository;

    @Autowired
    private OrderItemEntityRepo orderItemEntityRepo;

    @Autowired
    private ConversionService conversionService;

    public CardDto getCard(Long id) throws CardReadException {
        CardEntity entity = cardEntityRepository.findById(id).orElseThrow(CardReadException::new);
        return conversionService.convert(entity, CardDto.class);
    }

    public CardsPageDto getAllCards(String key, Pageable pageable) throws CardReadException {
        try {

            Page<CardEntity> page = null;
            if(key.equals("male")) page = cardEntityRepository.findByCategory("мужская",pageable);
            else if(key.equals("female")) page = cardEntityRepository.findByCategory("женская",pageable);
            else page = cardEntityRepository.findAll(pageable);


            List<CardEntity> listEntity = page.toList();
            List<CardDto> listDto = new ArrayList<>();

            for (CardEntity e : listEntity) {
                listDto.add(conversionService.convert(e, CardDto.class));
            }
            if (listDto.isEmpty()) throw new CardReadException();

            return new CardsPageDto(listDto, page.getTotalPages(), page.getSize(), page.getNumber());
        } catch (Exception e) {
            throw new CardReadException();
        }

    }


    public void setCard(CardDto dto) {

        try {
            CardEntity entity = conversionService.convert(dto, CardEntity.class);
            MultipartFile[] fmas = dto.getFiles();

            if (fmas != null) {
                String[] imgLinks = new String[fmas.length];

                for (int i = 0; i < fmas.length; i++) {

                    String prefix = UUID.randomUUID().toString();
                    String postfix = fmas[i].getOriginalFilename();
                    String imgPath = fdir + "/" + prefix + postfix;

                    fmas[i].transferTo(new File(imgPath));

                    String imgLink = "/img/" + prefix + postfix;

                    imgLinks[i] = imgLink;
                }

                entity.setLinks(Arrays.asList(imgLinks));

            }

            cardEntityRepository.save(entity);
        } catch (Exception e) {
            e.printStackTrace();
            throw new CardCreateException();
        }
    }


    public void delete(Long id) throws CardInOrderDeleteException {
        CardEntity entity = cardEntityRepository.findById(id).orElseThrow(CardDeleteException::new);
        List<OrderItemEntity> orders = orderItemEntityRepo.findByCardId(id);
        if(!orders.isEmpty()) throw new CardInOrderDeleteException();

        List<String> links = entity.getLinks();
        for (String flink : links) {
            flink = flink.substring(4);
            String realFilePath = fdir + flink;
            File f = new File(realFilePath);
            f.delete();
        }


        cardEntityRepository.delete(entity);
    }

    public void update(CardDto dto) throws IOException, CardInOrderDeleteException {
        CardEntity entity = cardEntityRepository.findById(dto.getId()).orElseThrow(CardUpdateException::new);
        List<OrderItemEntity> orders = orderItemEntityRepo.findByCardId(dto.getId());
        if(!orders.isEmpty()) throw new CardInOrderDeleteException();

        entity.setTitle(dto.getTitle());
        entity.setDescription(dto.getDescription());
        entity.setPrice(dto.getPrice());
        entity.setSizeto(dto.getSizeto());
        entity.setSizefrom(dto.getSizefrom());
        entity.setCategory(dto.getCategory());

        String[] dtoLinks = dto.getLinks();

        if (dtoLinks != null) {
            try {

                List<String> newLinks = new ArrayList<>();
                List<MultipartFile> mfList = new ArrayList<>();
                if (dto.getFiles() != null) mfList.addAll(Arrays.asList(dto.getFiles()));

                Iterator mfIterator = mfList.iterator();

                for (int i = 0; i < dtoLinks.length; i++) {
                    if (dtoLinks[i].equals("null")) {
                        MultipartFile f = (MultipartFile) mfIterator.next();
                        String prefix = UUID.randomUUID().toString();
                        String postfix = f.getOriginalFilename();
                        String imgPath = fdir + "/" + prefix + postfix;
                        f.transferTo(new File(imgPath));
                        String imgLink = "/img/" + prefix + postfix;
                        newLinks.add(imgLink);
                    } else {
                        newLinks.add(dtoLinks[i]);
                    }
                }

                List<String> oldLinks = entity.getLinks();
                oldLinks.removeAll(newLinks);

                for (String flink : oldLinks) {
                    flink = flink.substring(4);
                    String realFilePath = fdir + flink;
                    File f = new File(realFilePath);
                    f.delete();
                }

                entity.setLinks(newLinks);

            } catch (Exception ex) {
                ex.printStackTrace();
            }

        } else {
            List<String> oldLinks = entity.getLinks();
            if(oldLinks!=null){
                for (String flink : oldLinks) {
                    flink = flink.substring(4);
                    String realFilePath = fdir + flink;
                    File f = new File(realFilePath);
                    f.delete();
                }
            }
            List<String> newLinks = new ArrayList<>();
            entity.setLinks(newLinks);
        }
        cardEntityRepository.save(entity);
    }
}
