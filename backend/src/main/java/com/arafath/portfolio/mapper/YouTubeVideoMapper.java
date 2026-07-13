package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.YouTubeVideoRequest;
import com.arafath.portfolio.dto.response.YouTubeVideoResponse;
import com.arafath.portfolio.entity.YouTubeVideo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface YouTubeVideoMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    YouTubeVideo toEntity(YouTubeVideoRequest request);

    YouTubeVideoResponse toResponse(YouTubeVideo video);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(
            YouTubeVideoRequest request,
            @MappingTarget YouTubeVideo video
    );

}