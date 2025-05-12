package com.example.Observer.controller;


import com.example.Observer.model.Product;
import com.example.Observer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin // permite chamadas dos frontend

public class ProductController {

    @Autowired
    private ProductService service;


    @PostMapping("/observers")
    public void registerObserver(@RequestBody Map<String, String > body ){
        service.registerObserver(body.get("callbackUrl"));
    }

    @DeleteMapping("/observers")
    public void unregisterObserver(@RequestBody Map<String ,String > body){
        service.unregisterObserver(body.get("callbackUrl"));
    }

    @PostMapping("/products")
    public Product addProduct(@RequestBody Product product){
        return service.addProduct(product);
    }

    @PutMapping("/products/{id}")
    public void updatePrice(@PathVariable Long id , @RequestBody Map<String, Double >body ){
        service.updatePrice(id, body.get("price"));
    }

    @GetMapping("/products")
    public List<Product> getProducts(){
        return service.getProducts();
    }


}
