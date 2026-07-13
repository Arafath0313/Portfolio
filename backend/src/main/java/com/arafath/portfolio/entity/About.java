package com.arafath.portfolio.entity;

import com.arafath.portfolio.entity.base.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "about")
public class About extends BaseEntity {

    @NotBlank
    @Size(max = 100)
    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @NotBlank
    @Size(max = 150)
    @Column(nullable = false, length = 150)
    private String headline;

    @NotBlank
    @Lob
    @Column(nullable = false, columnDefinition = "TEXT")
    private String bio;

    @NotBlank
    @Email
    @Size(max = 100)
    @Column(nullable = false, length = 100)
    private String email;

    @Size(max = 20)
    @Column(length = 20)
    private String phone;

    @Size(max = 100)
    @Column(length = 100)
    private String location;

    @Size(max = 255)
    @Column(length = 255)
    private String address;

    @Size(max = 255)
    @Column(name = "profile_image", length = 255)
    private String profileImage;

    @Size(max = 255)
    @Column(name = "cover_image", length = 255)
    private String coverImage;

}
