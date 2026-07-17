package com.watchstore.api.config;

import com.watchstore.api.product.Product;
import com.watchstore.api.product.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;
import java.util.List;

@Configuration
public class SeedData {
    @Bean
    CommandLineRunner seedProducts(ProductRepository products) {
        return args -> {
            if (products.count() > 0) return;
            products.saveAll(List.of(
                    watch("Aurum Classic 40", "Aurum", "Dress", "Automatic", "Polished stainless steel", "Italian leather", "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=900&q=80", "A restrained automatic dress watch with slim lugs and a champagne dial.", "1299.00", 14),
                    watch("Monarch Moonphase", "Monarch", "Luxury", "Automatic", "Rose gold PVD", "Alligator grain leather", "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&q=80", "A moonphase statement piece designed for evening wear and milestone moments.", "2499.00", 8),
                    watch("Vektor Chrono Steel", "Vektor", "Chronograph", "Quartz", "Brushed stainless steel", "Steel bracelet", "https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&w=900&q=80", "A precise chronograph with a balanced panda dial and daily-wear durability.", "899.00", 20),
                    watch("Northline Diver 300", "Northline", "Diver", "Automatic", "316L stainless steel", "Rubber", "https://images.unsplash.com/photo-1600003014755-ba31aa59c4b6?auto=format&fit=crop&w=900&q=80", "A confident dive watch with strong lume, rotating bezel, and 300m water resistance.", "1499.00", 11),
                    watch("Civic Field Auto", "Civic", "Field", "Automatic", "Satin steel", "Canvas", "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?auto=format&fit=crop&w=900&q=80", "A legible field watch with rugged proportions and a warm textured dial.", "699.00", 26),
                    watch("Obsidian Ceramic", "Obsidian", "Modern", "Quartz", "Black ceramic", "Ceramic bracelet", "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?auto=format&fit=crop&w=900&q=80", "A monochrome ceramic watch with a sharp silhouette and scratch-resistant finish.", "1799.00", 9)
            ));
        };
    }

    private Product watch(String name, String brand, String category, String movement, String caseMaterial,
                          String strapType, String imageUrl, String description, String price, int stock) {
        Product product = new Product();
        product.setName(name);
        product.setBrand(brand);
        product.setCategory(category);
        product.setMovement(movement);
        product.setCaseMaterial(caseMaterial);
        product.setStrapType(strapType);
        product.setImageUrl(imageUrl);
        product.setDescription(description);
        product.setPrice(new BigDecimal(price));
        product.setStock(stock);
        return product;
    }
}
