package com.example.demo.configuration;

import com.example.demo.card.converters.CardDtoToEntityConverter;
import com.example.demo.card.converters.CardEntityToDtoConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Value("${filepath}")
    private String uploadPath;

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new CardDtoToEntityConverter());
        registry.addConverter(new CardEntityToDtoConverter());
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry){

        registry.addResourceHandler("/img/**")
                .addResourceLocations("file://"+uploadPath+"/");

    }
}
