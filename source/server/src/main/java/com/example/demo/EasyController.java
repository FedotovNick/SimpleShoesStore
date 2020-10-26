package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping(value= {"/"})
public class EasyController {

    @GetMapping("/*")
    String getPage() {
        return "/pages/client.html";
    }

    @GetMapping("/admin/**")
    String getM2(){
        return "/pages/admin.html";
    }

    @GetMapping("/admin")
    String getM3(){
        return "/pages/admin.html";
    }

}
