package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.CertificationRequest;
import com.arafath.portfolio.dto.response.CertificationResponse;
import com.arafath.portfolio.entity.Certification;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface CertificationMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    Certification toEntity(CertificationRequest request);

    CertificationResponse toResponse(Certification certification);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    void updateEntityFromRequest(
            CertificationRequest request,
            @MappingTarget Certification certification
    );

}