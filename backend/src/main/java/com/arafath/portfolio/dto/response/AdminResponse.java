package com.arafath.portfolio.dto.response;

import com.arafath.portfolio.enums.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class AdminResponse {

    private Long id;

    private String username;

    private String email;

    private Role role;

    private Boolean enabled;

    private LocalDateTime lastLogin;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
