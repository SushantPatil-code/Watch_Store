package com.watchstore.api.product;

import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductRepository products;

    public ProductController(ProductRepository products) {
        this.products = products;
    }

    @GetMapping
    public List<Product> list(@RequestParam(required = false) String q,
                              @RequestParam(required = false) String brand,
                              @RequestParam(required = false) String category,
                              @RequestParam(required = false) BigDecimal minPrice,
                              @RequestParam(required = false) BigDecimal maxPrice,
                              @RequestParam(defaultValue = "name") String sort) {
        return products.findAll(spec(q, brand, category, minPrice, maxPrice), sort(sort));
    }

    @GetMapping("/{id}")
    public Product detail(@PathVariable Long id) {
        return products.findById(id).orElseThrow(() -> new ResponseStatusException(NOT_FOUND, "Product not found"));
    }

    private Specification<Product> spec(String q, String brand, String category, BigDecimal minPrice, BigDecimal maxPrice) {
        return (root, query, cb) -> {
            var predicate = cb.conjunction();
            if (q != null && !q.isBlank()) {
                var like = "%" + q.toLowerCase() + "%";
                predicate = cb.and(predicate, cb.or(
                        cb.like(cb.lower(root.get("name")), like),
                        cb.like(cb.lower(root.get("brand")), like),
                        cb.like(cb.lower(root.get("description")), like)));
            }
            if (brand != null && !brand.isBlank()) predicate = cb.and(predicate, cb.equal(root.get("brand"), brand));
            if (category != null && !category.isBlank()) predicate = cb.and(predicate, cb.equal(root.get("category"), category));
            if (minPrice != null) predicate = cb.and(predicate, cb.greaterThanOrEqualTo(root.<BigDecimal>get("price"), minPrice));
            if (maxPrice != null) predicate = cb.and(predicate, cb.lessThanOrEqualTo(root.<BigDecimal>get("price"), maxPrice));
            return predicate;
        };
    }

    private Sort sort(String value) {
        return switch (value) {
            case "priceAsc" -> Sort.by("price").ascending();
            case "priceDesc" -> Sort.by("price").descending();
            case "newest" -> Sort.by("id").descending();
            default -> Sort.by("name").ascending();
        };
    }
}
