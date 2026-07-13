package com.arafath.portfolio.common.pagination;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class PageResponse<T> {

    private final List<T> content;

    private final int page;

    private final int size;

    private final long totalElements;

    private final int totalPages;

    private final int numberOfElements;

    private final boolean first;

    private final boolean last;

    private final boolean empty;

    private final List<SortResponse> sort;

    public static <T> PageResponse<T> from(Page<T> page) {
        return PageResponse.<T>builder()
                .content(page.getContent())
                .page(page.getNumber())
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .numberOfElements(page.getNumberOfElements())
                .first(page.isFirst())
                .last(page.isLast())
                .empty(page.isEmpty())
                .sort(page.getSort().stream()
                        .map(SortResponse::from)
                        .toList())
                .build();
    }

    @Getter
    @Builder
    @AllArgsConstructor
    public static class SortResponse {

        private final String property;

        private final String direction;

        private static SortResponse from(Sort.Order order) {
            return SortResponse.builder()
                    .property(order.getProperty())
                    .direction(order.getDirection().name())
                    .build();
        }
    }
}
