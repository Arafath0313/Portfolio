package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.ContactMessageRequest;
import com.arafath.portfolio.dto.response.ContactMessageResponse;
import com.arafath.portfolio.entity.ContactMessage;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ContactMessageMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "receivedAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "replied", ignore = true)
    ContactMessage toEntity(ContactMessageRequest request);

    ContactMessageResponse toResponse(ContactMessage contactMessage);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "receivedAt", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "replied", ignore = true)
    void updateEntityFromRequest(
            ContactMessageRequest request,
            @MappingTarget ContactMessage contactMessage
    );

}