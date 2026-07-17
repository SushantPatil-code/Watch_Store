package com.watchstore.api.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public class OrderDtos {
    public record CheckoutItem(@NotNull Long productId, @Min(1) int quantity) {}
    public record CheckoutRequest(@NotEmpty List<@Valid CheckoutItem> items,
                                  @NotBlank String shippingName,
                                  @NotBlank String shippingAddress) {}
    public record OrderItemResponse(Long productId, String productName, String brand, String imageUrl,
                                    int quantity, BigDecimal unitPrice) {}
    public record OrderResponse(Long id, BigDecimal total, OrderStatus status, String paymentReference,
                                String shippingName, String shippingAddress, Instant createdAt,
                                List<OrderItemResponse> items) {}
}
