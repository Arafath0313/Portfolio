package com.arafath.portfolio.security.config;

import com.arafath.portfolio.security.filter.JwtAuthenticationFilter;
import com.arafath.portfolio.security.handler.JwtAccessDeniedHandler;
import com.arafath.portfolio.security.handler.JwtAuthenticationEntryPoint;
import com.arafath.portfolio.security.user.CustomUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private static final String[] SWAGGER_WHITELIST = {
        "/swagger-ui/**",
        "/swagger-ui.html",
        "/v3/api-docs/**"
    };

    private static final String[] SYSTEM_WHITELIST = {
        "/error",
        "/media/**"
    };

    private static final String[] PUBLIC_API_WHITELIST = {
        "/api/v1/auth/**",
        "/api/v1/about/**",
        "/api/v1/projects/**",
        "/api/v1/beyond-coding/**",
        "/api/v1/skills/**",
        "/api/v1/certifications/**",
        "/api/v1/social-links/**",
        "/api/v1/youtube/**",
        "/api/v1/youtube-videos/**",
        "/api/v1/site-settings/**",
        "/api/v1/resume/**",
        "/api/v1/contact/**",
        "/api/v1/education/**"
    };

    private final CustomUserDetailsService customUserDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        return http
            .csrf(AbstractHttpConfigurer::disable)

            .cors(cors -> cors
                .configurationSource(corsConfigurationSource())
            )

            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            .headers(headers -> headers
                .frameOptions(frameOptions -> frameOptions.disable())
            )

            .exceptionHandling(exception -> exception
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)
            )

            .authenticationProvider(authenticationProvider())

            .authorizeHttpRequests(auth -> auth

                // CORS preflight
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                // Swagger
                .requestMatchers(SWAGGER_WHITELIST).permitAll()

                // System
                .requestMatchers(SYSTEM_WHITELIST).permitAll()

                // Public APIs
                .requestMatchers(PUBLIC_API_WHITELIST).permitAll()

                // Admin APIs
                .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")

                // Everything else
                .anyRequest().authenticated()
            )

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            )

            .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider provider =
                new DaoAuthenticationProvider();

        provider.setUserDetailsService(customUserDetailsService);
        provider.setPasswordEncoder(passwordEncoder());

        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration
    ) throws Exception {

        return configuration.getAuthenticationManager();
    }

    /**
     * CORS configuration for local development
     * and the production Render frontend.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOriginPatterns(List.of(
            "http://localhost:*",
            "https://localhost:*",
            "https://portfolio-1-wure.onrender.com"
        ));

        configuration.setAllowedMethods(List.of(
            "GET",
            "POST",
            "PUT",
            "DELETE",
            "PATCH",
            "OPTIONS"
        ));

        configuration.setAllowedHeaders(List.of(
            "Authorization",
            "Content-Type",
            "Accept",
            "Origin"
        ));

        configuration.setExposedHeaders(List.of(
            "Authorization"
        ));

        configuration.setAllowCredentials(false);

        configuration.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source =
                new UrlBasedCorsConfigurationSource();

        source.registerCorsConfiguration(
            "/**",
            configuration
        );

        return source;
    }
}