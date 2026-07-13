package com.arafath.portfolio.security.auth;

import com.arafath.portfolio.entity.Admin;
import com.arafath.portfolio.exception.UnauthorizedException;
import com.arafath.portfolio.repository.AdminRepository;
import com.arafath.portfolio.security.jwt.JwtService;
import com.arafath.portfolio.security.user.AuthenticatedUser;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final AdminRepository adminRepository;

    public LoginResponse login(LoginRequest request) {

        Authentication authentication;

        try {
            authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getUsername(),
                            request.getPassword()
                    )
            );
        } catch (AuthenticationException ex) {
            throw new UnauthorizedException("Invalid username or password.");
        }

        AuthenticatedUser authenticatedUser =
                (AuthenticatedUser) authentication.getPrincipal();

        Admin admin = authenticatedUser.getAdmin();

        admin.setLastLogin(LocalDateTime.now());
        adminRepository.save(admin);

        String accessToken = jwtService.generateToken(authenticatedUser);

        return LoginResponse.builder()
                .accessToken(accessToken)
                .expiresIn(jwtService.getExpiration())
                .build();
    }

}