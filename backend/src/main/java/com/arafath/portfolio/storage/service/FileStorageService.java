package com.arafath.portfolio.storage.service;

import com.arafath.portfolio.storage.dto.StorageResult;
import com.arafath.portfolio.storage.enums.FileCategory;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

/**
 * Generic service interface defining standard file storage operations.
 */
public interface FileStorageService {

    /**
     * Validates and stores a new file on the filesystem under the specified category.
     *
     * @param file the MultipartFile to store
     * @param category the category folder path mapping
     * @return storage details containing names, paths, and URLs
     */
    StorageResult store(MultipartFile file, FileCategory category);

    /**
     * Validates and replaces an existing file.
     *
     * @param oldRelativePath relative path to the existing file to be replaced
     * @param newFile the replacement MultipartFile
     * @param category the category folder path mapping
     * @return storage details of the newly created file
     */
    StorageResult replace(String oldRelativePath, MultipartFile newFile, FileCategory category);

    /**
     * Deletes a file physically from the filesystem.
     *
     * @param relativePath relative path to the file (e.g. "resumes/uuid.pdf")
     */
    void delete(String relativePath);

    /**
     * Loads a file resource from the local filesystem for downloads/viewing.
     *
     * @param relativePath relative path to the file
     * @return the file resource
     */
    Resource load(String relativePath);

    /**
     * Checks if a file exists on the filesystem.
     *
     * @param relativePath relative path to the file
     * @return true if the file exists, false otherwise
     */
    boolean exists(String relativePath);

    /**
     * Generates a public URL representing the relative file path.
     *
     * @param relativePath relative path to the file
     * @return the public-facing HTTP url (e.g. "/media/resumes/uuid.pdf")
     */
    String generateUrl(String relativePath);
}
