package com.example.demo.card.data;

import java.util.List;

public class CardsPageDto {
    private List<CardDto> cardList;
    private Integer totalPages;
    private Integer pageSize;
    private Integer pageNumber;

    public CardsPageDto() {
    }

    public List<CardDto> getCardList() {
        return cardList;
    }

    public void setCardList(List<CardDto> cardList) {
        this.cardList = cardList;
    }

    public Integer getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(Integer totalPages) {
        this.totalPages = totalPages;
    }

    public Integer getPageSize() {
        return pageSize;
    }

    public void setPageSize(Integer pageSize) {
        this.pageSize = pageSize;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public CardsPageDto(List<CardDto> cardList, Integer totalPages, Integer pageSize, Integer pageNumber) {
        this.cardList = cardList;
        this.totalPages = totalPages;
        this.pageSize = pageSize;
        this.pageNumber = pageNumber;
    }
}
