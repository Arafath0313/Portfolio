package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.ProjectImageRequest;
import com.arafath.portfolio.dto.response.ProjectImageResponse;
import com.arafath.portfolio.entity.ProjectImage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ProjectImageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "project", ignore = true)
    ProjectImage toEntity(ProjectImageRequest request);

    @Mapping(target = "projectId", source = "project.id")
    @Mapping(target = "projectTitle", source = "project.title")
    ProjectImageResponse toResponse(ProjectImage projectImage);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "project", ignore = true)
    void updateEntityFromRequest(
            ProjectImageRequest request,
            @MappingTarget ProjectImage projectImage
    );

}