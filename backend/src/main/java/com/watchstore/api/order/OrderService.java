package com.watchstore.api.order;

import com.watchstore.api.order.OrderDtos.*;
import com.watchstore.api.product.ProductRepository;
import com.watchstore.api.user.AppUser;
import com.watchstore.api.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
public class OrderService {
    private final OrderRepository orders;
    private final ProductRepository products;
    private final UserRepository users;

    public OrderService(OrderRepository orders, ProductRepository products, UserRepository users) {
        this.orders = orders;
        this.products = products;
        this.users = users;
    }

    @Transactional
    public OrderResponse checkout(UserDetails principal, CheckoutRequest request) {
        var user = currentUser(principal);
        var order = new CustomerOrder();
        order.setUser(user);
        order.setShippingName(request.shippingName());
        order.setShippingAddress(request.shippingAddress());
        order.setPaymentReference("MOCK-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        BigDecimal total = BigDecimal.ZERO;
        for (var line : request.items()) {
            var product = products.findById(line.productId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Product not found"));
            if (product.getStock() < line.quantity()) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, product.getName() + " does not have enough stock");
            }
            product.setStock(product.getStock() - line.quantity());
            var item = new OrderItem();
            item.setOrder(order);
            item.setProductId(product.getId());
            item.setProductName(product.getName());
            item.setBrand(product.getBrand());
            item.setImageUrl(product.getImageUrl());
            item.setQuantity(line.quantity());
            item.setUnitPrice(product.getPrice());
            order.getItems().add(item);
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(line.quantity())));
        }
        order.setTotal(total);
        return toResponse(orders.save(order));
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> history(UserDetails principal) {
        return orders.findByUserOrderByCreatedAtDesc(currentUser(principal)).stream().map(this::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse detail(UserDetails principal, Long id) {
        var user = currentUser(principal);
        var order = orders.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found"));
        if (!order.getUser().getId().equals(user.getId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Order not found");
        }
        return toResponse(order);
    }

    private AppUser currentUser(UserDetails principal) {
        return users.findByEmail(principal.getUsername())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
    }

    private OrderResponse toResponse(CustomerOrder order) {
        return new OrderResponse(order.getId(), order.getTotal(), order.getStatus(), order.getPaymentReference(),
                order.getShippingName(), order.getShippingAddress(), order.getCreatedAt(),
                order.getItems().stream()
                        .map(item -> new OrderItemResponse(item.getProductId(), item.getProductName(), item.getBrand(),
                                item.getImageUrl(), item.getQuantity(), item.getUnitPrice()))
                        .toList());
    }
}
