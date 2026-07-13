package com.arafath.portfolio.dto.response;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AboutResponse {

    private Long id;

    private String fullName;

    private String headline;

    private String bio;

    private String email;

    private String phone;

    private String location;

    private String address;

    private String profileImage;

    private String coverImage;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}