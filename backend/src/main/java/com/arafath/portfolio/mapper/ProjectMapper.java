package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.ProjectRequest;
import com.arafath.portfolio.dto.response.ProjectResponse;
import com.arafath.portfolio.entity.Project;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ProjectMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "thumbnailUrl", ignore = true)
    Project toEntity(ProjectRequest request);

    ProjectResponse toResponse(Project project);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "images", ignore = true)
    @Mapping(target = "thumbnailUrl", ignore = true)
    void updateEntityFromRequest(
            ProjectRequest request,
            @MappingTarget Project project
    );

}