package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.AdminRequest;
import com.arafath.portfolio.dto.response.AdminResponse;
import com.arafath.portfolio.entity.Admin;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface AdminMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "lastLogin", ignore = true)
    Admin toEntity(AdminRequest request);

    AdminResponse toResponse(Admin admin);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "lastLogin", ignore = true)
    void updateEntityFromRequest(
            AdminRequest request,
            @MappingTarget Admin admin
    );

}