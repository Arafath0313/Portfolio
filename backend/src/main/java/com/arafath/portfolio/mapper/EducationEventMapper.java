package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.EducationEventRequest;
import com.arafath.portfolio.dto.response.EducationEventResponse;
import com.arafath.portfolio.entity.EducationEvent;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface EducationEventMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "education", ignore = true)
    EducationEvent toEntity(EducationEventRequest request);

    @Mapping(target = "educationId", source = "education.id")
    @Mapping(target = "educationUniversityName", source = "education.universityName")
    EducationEventResponse toResponse(EducationEvent entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "education", ignore = true)
    void updateEntityFromRequest(
            EducationEventRequest request,
            @MappingTarget EducationEvent entity
    );

}