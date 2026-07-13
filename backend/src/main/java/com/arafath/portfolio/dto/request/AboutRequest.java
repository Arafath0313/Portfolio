package com.arafath.portfolio.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class AboutRequest {

    @NotBlank(message = "Full name is required.")
    @Size(max = 100, message = "Full name cannot exceed 100 characters.")
    private String fullName;

    @NotBlank(message = "Headline is required.")
    @Size(max = 150, message = "Headline cannot exceed 150 characters.")
    private String headline;

    @NotBlank(message = "Bio is required.")
    private String bio;

    @NotBlank(message = "Email is required.")
    @Email(message = "Please provide a valid email address.")
    @Size(max = 100, message = "Email cannot exceed 100 characters.")
    private String email;

    @Size(max = 20, message = "Phone number cannot exceed 20 characters.")
    private String phone;

    @Size(max = 100, message = "Location cannot exceed 100 characters.")
    private String location;

    @Size(max = 255, message = "Address cannot exceed 255 characters.")
    private String address;

    @Size(max = 255, message = "Profile image path cannot exceed 255 characters.")
    private String profileImage;

    @Size(max = 255, message = "Cover image path cannot exceed 255 characters.")
    private String coverImage;

}