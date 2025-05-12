package com.example.Observer.service;


import com.example.Observer.model.Product;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ProductService {

    private final Map<Long , Product> products = new HashMap<>();
    private final List<String> observers = new ArrayList<>();

    public void registerObserver(String callbackUrl){
        if (!observers.contains(callbackUrl)){
            observers.add(callbackUrl);
        }
    }

    public void unregisterObserver(String callbackUrl){
        observers.remove(callbackUrl);
    }

    public Product addProduct(Product product){
        products.put(product.getId(), product);
        return product;
    }

    public void updatePrice(Long id , double newPrice){
        Product product = products.get(id);
        if (product != null){
            product.setPrice(newPrice);
            notifyObserves(product);
        }
    }

    public List<Product> getProducts(){
        return new ArrayList<>(products.values());

    }

    private void notifyObserves(Product product){
        RestTemplate restTemplate = new RestTemplate();
        Map<String , Object> payload = Map.of(
                "productId", product.getId(),
                "name ", product.getName(),
                "price ", product.getPrice()

        );

        for (String observerUrl : observers)  {
            try {
                restTemplate.postForEntity(observerUrl,payload,String.class);
            }catch (Exception e ){
                System.err.println("Erro ao notificfar " + observerUrl+ ":" +e.getMessage());
            }

        }

    }


}
