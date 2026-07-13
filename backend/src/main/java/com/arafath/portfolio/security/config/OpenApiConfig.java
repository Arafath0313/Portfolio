package com.arafath.portfolio.security.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI JWT security configuration for Swagger UI.
 */
@Configuration("securityOpenApiConfig")
public class OpenApiConfig {

    private static final String BEARER_AUTH_SCHEME = "bearerAuth";
    private static final String ADMIN_API_PREFIX = "/api/v1/admin/";

    /**
     * Adds JWT bearer authentication metadata to the generated OpenAPI document.
     *
     * @return OpenAPI customizer with bearer security scheme
     */
    @Bean
    public OpenApiCustomizer jwtOpenApiCustomizer() {

        return this::customizeJwtSecurity;
    }

    private void customizeJwtSecurity(OpenAPI openApi) {

        Components components = openApi.getComponents();

        if (components == null) {
            components = new Components();
            openApi.setComponents(components);
        }

        components.addSecuritySchemes(
                BEARER_AUTH_SCHEME,
                new SecurityScheme()
                        .name(BEARER_AUTH_SCHEME)
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
        );

        if (openApi.getPaths() == null) {
            return;
        }

        openApi.getPaths().forEach((path, pathItem) -> {
            if (!path.startsWith(ADMIN_API_PREFIX)) {
                return;
            }

            pathItem.readOperations().forEach(this::applyBearerSecurity);
        });
    }

    private void applyBearerSecurity(Operation operation) {

        if (operation.getSecurity() != null
                && operation.getSecurity().stream()
                .anyMatch(securityRequirement -> securityRequirement.containsKey(BEARER_AUTH_SCHEME))) {
            return;
        }

        operation.addSecurityItem(
                new SecurityRequirement().addList(BEARER_AUTH_SCHEME)
        );
    }
}