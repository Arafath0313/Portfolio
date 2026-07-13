package com.arafath.portfolio.dto.response;

import com.arafath.portfolio.enums.FileType;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ResumeResponse {

    private Long id;

    private String fileName;

    private String fileUrl;

    private FileType fileType;

    private Long fileSize;

    private String version;

    private Boolean active;

    private Long aboutId;

    private String aboutFullName;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
