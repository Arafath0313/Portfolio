package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.EducationRequest;
import com.arafath.portfolio.dto.response.EducationResponse;
import com.arafath.portfolio.entity.Education;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface EducationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "events", ignore = true)
    @Mapping(target = "organizations", ignore = true)
    @Mapping(target = "galleries", ignore = true)
    @Mapping(target = "achievements", ignore = true)
    Education toEntity(EducationRequest request);

    EducationResponse toResponse(Education education);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "events", ignore = true)
    @Mapping(target = "organizations", ignore = true)
    @Mapping(target = "galleries", ignore = true)
    @Mapping(target = "achievements", ignore = true)
    void updateEntityFromRequest(
            EducationRequest request,
            @MappingTarget Education education
    );

}