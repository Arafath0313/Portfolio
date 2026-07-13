package com.arafath.portfolio.common.pagination;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PaginationRequest {

    @Min(value = 0, message = "Page number must be greater than or equal to 0.")
    private Integer page;

    @Min(value = 1, message = "Page size must be at least 1.")
    @Max(value = 100, message = "Page size cannot exceed 100.")
    private Integer size;

    private List<String> sort;
}
