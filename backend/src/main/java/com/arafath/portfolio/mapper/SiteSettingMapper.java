package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.SiteSettingRequest;
import com.arafath.portfolio.dto.response.SiteSettingResponse;
import com.arafath.portfolio.entity.SiteSetting;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface SiteSettingMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    SiteSetting toEntity(SiteSettingRequest request);

    SiteSettingResponse toResponse(SiteSetting siteSetting);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(
            SiteSettingRequest request,
            @MappingTarget SiteSetting siteSetting
    );

}