package com.arafath.portfolio.common.pagination;

import com.arafath.portfolio.exception.BadRequestException;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public final class PaginationUtils {

    public static final int DEFAULT_PAGE = 0;
    public static final int DEFAULT_SIZE = 10;
    public static final int MAX_PAGE_SIZE = 100;

    public static Pageable toPageable(
            PaginationRequest request,
            Sort defaultSort) {

        int page = request.getPage() != null ? request.getPage() : DEFAULT_PAGE;
        int size = request.getSize() != null ? request.getSize() : DEFAULT_SIZE;

        if (size > MAX_PAGE_SIZE) {
            throw new BadRequestException(
                    "Page size cannot exceed " + MAX_PAGE_SIZE + "."
            );
        }

        return PageRequest.of(
                page,
                size,
                resolveSort(request.getSort(), defaultSort)
        );
    }

    private static Sort resolveSort(
            List<String> sortParams,
            Sort defaultSort) {

        if (sortParams == null || sortParams.isEmpty()) {
            return defaultSort;
        }

        List<Sort.Order> orders = new ArrayList<>();

        for (String sortParam : sortParams) {
            if (!StringUtils.hasText(sortParam)) {
                throw new BadRequestException(
                        "Sort parameter must follow the format 'property,direction'."
                );
            }

            String[] tokens = sortParam.split(",");
            String property = tokens[0].trim();

            if (!StringUtils.hasText(property)) {
                throw new BadRequestException("Sort property is required.");
            }

            Sort.Direction direction = Sort.Direction.ASC;

            if (tokens.length > 1) {
                try {
                    direction = Sort.Direction.fromString(tokens[1].trim());
                } catch (IllegalArgumentException ex) {
                    throw new BadRequestException(
                            "Sort direction must be either 'asc' or 'desc'."
                    );
                }
            }

            if (tokens.length > 2) {
                throw new BadRequestException(
                        "Sort parameter must follow the format 'property,direction'."
                );
            }

            orders.add(new Sort.Order(direction, property));
        }

        return orders.isEmpty() ? defaultSort : Sort.by(orders);
    }
}
