package com.arafath.portfolio.storage.config;

import com.arafath.portfolio.storage.enums.FileCategory;
import com.arafath.portfolio.storage.exception.StorageInitializationException;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Slf4j
@Configuration
@RequiredArgsConstructor
public class StorageConfiguration {

    private final FileStorageProperties properties;

    @PostConstruct
    public void initializeStorage() {
        try {
            Path root = Paths.get(properties.getUploadDir())
                    .toAbsolutePath()
                    .normalize();

            log.info("Storage initialization. Storage Root: {}", root);

            Files.createDirectories(root);

            for (FileCategory category : FileCategory.values()) {
                Path dir = root.resolve(category.getFolderName());
                Files.createDirectories(dir);
            }

            log.info("Storage folders initialized successfully.");
        } catch (IOException ex) {
            log.error("Storage initialization failure.", ex);
            throw new StorageInitializationException("Failed to initialize storage directories.", ex);
        }
    }
}