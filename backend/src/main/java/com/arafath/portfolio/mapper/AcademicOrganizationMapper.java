package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.AcademicOrganizationRequest;
import com.arafath.portfolio.dto.response.AcademicOrganizationResponse;
import com.arafath.portfolio.entity.AcademicOrganization;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface AcademicOrganizationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "education", ignore = true)
    AcademicOrganization toEntity(AcademicOrganizationRequest request);

    @Mapping(target = "educationId", source = "education.id")
    @Mapping(target = "educationUniversityName", source = "education.universityName")
    AcademicOrganizationResponse toResponse(AcademicOrganization entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "education", ignore = true)
    void updateEntityFromRequest(
            AcademicOrganizationRequest request,
            @MappingTarget AcademicOrganization entity
    );

}