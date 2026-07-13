package com.arafath.portfolio.dto.response;

import com.arafath.portfolio.enums.MessageStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class ContactMessageResponse {

    private Long id;

    private String name;

    private String email;

    private String phone;

    private String subject;

    private String message;

    private LocalDateTime receivedAt;

    private MessageStatus status;

    private Boolean replied;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
