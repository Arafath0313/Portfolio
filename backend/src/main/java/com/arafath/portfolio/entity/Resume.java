package com.arafath.portfolio.entity;

import com.arafath.portfolio.entity.base.BaseEntity;
import com.arafath.portfolio.enums.FileType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "resume")
public class Resume extends BaseEntity {

    @NotBlank
    @Size(max = 255)
    @Column(name = "file_name", nullable = false, length = 255)
    private String fileName;

    @NotBlank
    @Size(max = 255)
    @Column(name = "file_url", nullable = false, length = 255)
    private String fileUrl;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "file_type", nullable = false, length = 20)
    private FileType fileType;

    @NotNull
    @Column(name = "file_size", nullable = false)
    private Long fileSize;

    @Size(max = 20)
    @Column(length = 20)
    private String version;

    @NotNull
    @Column(nullable = false)
    private Boolean active = true;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "about_id", nullable = false, unique = true)
    private About about;

}