package com.arafath.portfolio.dto.request;

import com.arafath.portfolio.enums.FileType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ResumeRequest {

    @NotBlank(message = "File name is required.")
    @Size(max = 255, message = "File name cannot exceed 255 characters.")
    private String fileName;

    @NotBlank(message = "File URL is required.")
    @Size(max = 255, message = "File URL cannot exceed 255 characters.")
    private String fileUrl;

    @NotNull(message = "File type is required.")
    private FileType fileType;

    @NotNull(message = "File size is required.")
    @Positive(message = "File size must be greater than zero.")
    private Long fileSize;

    @Size(max = 20, message = "Version cannot exceed 20 characters.")
    private String version;

    @NotNull(message = "Active status is required.")
    private Boolean active;

    @NotNull(message = "About ID is required.")
    private Long aboutId;

}
