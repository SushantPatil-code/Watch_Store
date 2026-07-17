package com.watchstore.api.order;

import com.watchstore.api.order.OrderDtos.CheckoutRequest;
import com.watchstore.api.order.OrderDtos.OrderResponse;
import jakarta.validation.Valid;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {
    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public OrderResponse checkout(@AuthenticationPrincipal UserDetails principal,
                                  @Valid @RequestBody CheckoutRequest request) {
        return orderService.checkout(principal, request);
    }

    @GetMapping
    public List<OrderResponse> history(@AuthenticationPrincipal UserDetails principal) {
        return orderService.history(principal);
    }

    @GetMapping("/{id}")
    public OrderResponse detail(@AuthenticationPrincipal UserDetails principal, @PathVariable Long id) {
        return orderService.detail(principal, id);
    }
}
