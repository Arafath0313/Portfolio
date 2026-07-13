package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.AcademicAchievementRequest;
import com.arafath.portfolio.dto.response.AcademicAchievementResponse;
import com.arafath.portfolio.entity.AcademicAchievement;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface AcademicAchievementMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "education", ignore = true)
    AcademicAchievement toEntity(AcademicAchievementRequest request);

    @Mapping(target = "educationId", source = "education.id")
    @Mapping(target = "educationUniversityName", source = "education.universityName")
    AcademicAchievementResponse toResponse(AcademicAchievement entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "education", ignore = true)
    void updateEntityFromRequest(
            AcademicAchievementRequest request,
            @MappingTarget AcademicAchievement entity
    );

}