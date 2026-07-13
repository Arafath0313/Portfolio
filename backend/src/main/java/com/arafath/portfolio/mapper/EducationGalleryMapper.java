package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.EducationGalleryRequest;
import com.arafath.portfolio.dto.response.EducationGalleryResponse;
import com.arafath.portfolio.entity.EducationGallery;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface EducationGalleryMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "education", ignore = true)
    EducationGallery toEntity(EducationGalleryRequest request);

    @Mapping(target = "educationId", source = "education.id")
    @Mapping(target = "educationUniversityName", source = "education.universityName")
    EducationGalleryResponse toResponse(EducationGallery entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "education", ignore = true)
    void updateEntityFromRequest(
            EducationGalleryRequest request,
            @MappingTarget EducationGallery entity
    );

}