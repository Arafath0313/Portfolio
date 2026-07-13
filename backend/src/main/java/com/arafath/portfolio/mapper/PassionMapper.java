package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.PassionRequest;
import com.arafath.portfolio.dto.response.PassionResponse;
import com.arafath.portfolio.entity.Passion;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface PassionMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Passion toEntity(PassionRequest request);

    PassionResponse toResponse(Passion passion);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(
            PassionRequest request,
            @MappingTarget Passion passion
    );

}
