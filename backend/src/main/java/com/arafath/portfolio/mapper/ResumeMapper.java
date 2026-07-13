package com.arafath.portfolio.mapper;

import com.arafath.portfolio.dto.request.ResumeRequest;
import com.arafath.portfolio.dto.response.ResumeResponse;
import com.arafath.portfolio.entity.Resume;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(
        componentModel = "spring",
        nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE
)
public interface ResumeMapper {

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "about", ignore = true)
    Resume toEntity(ResumeRequest request);

    @Mapping(target = "aboutId", source = "about.id")
    @Mapping(target = "aboutFullName", source = "about.fullName")
    ResumeResponse toResponse(Resume resume);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "about", ignore = true)
    void updateEntityFromRequest(
            ResumeRequest request,
            @MappingTarget Resume resume
    );

}