package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.SocialLinkRequest;
import com.arafath.portfolio.dto.response.SocialLinkResponse;
import com.arafath.portfolio.entity.SocialLink;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface SocialLinkMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    SocialLink toEntity(SocialLinkRequest request);

    SocialLinkResponse toResponse(SocialLink socialLink);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(
            SocialLinkRequest request,
            @MappingTarget SocialLink socialLink
    );

}