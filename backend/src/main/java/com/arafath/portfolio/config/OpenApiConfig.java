package com.arafath.portfolio.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI portfolioOpenAPI() {

        return new OpenAPI()
                .info(new Info()
                        .title("Personal Portfolio REST API")
                        .description("REST API for Personal Portfolio System")
                        .version("v1.0.0")
                        .contact(new Contact()
                                .name("MHD Arafath")
                                .email("your-email@example.com")));
    }
}