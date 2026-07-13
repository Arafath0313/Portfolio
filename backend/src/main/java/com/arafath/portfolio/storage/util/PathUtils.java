package com.arafath.portfolio.storage.util;

import com.arafath.portfolio.storage.exception.InvalidFileException;
import java.nio.file.Path;

/**
 * Utility for verifying path integrity and resolving folders safely.
 */
public final class PathUtils {

    private PathUtils() {
        // Prevent instantiation
    }

    /**
     * Resolves a path relative to a base directory and verifies it doesn't escape the base dir.
     * Prevents path traversal attacks (e.g. filename = "../../../etc/passwd").
     *
     * @param baseDir the root directory
     * @param relativePathStr the path to resolve
     * @return the resolved and validated absolute Path
     */
    public static Path verifyAndResolvePath(Path baseDir, String relativePathStr) {
        if (relativePathStr == null) {
            throw new InvalidFileException("Relative path cannot be null");
        }
        Path resolvedPath = baseDir.resolve(relativePathStr).normalize();
        if (!resolvedPath.startsWith(baseDir.normalize())) {
            throw new InvalidFileException("Path traversal attempt detected: " + relativePathStr);
        }
        return resolvedPath;
    }

    /**
     * Normalizes windows backslashes to standard forward slashes.
     *
     * @param path standard path string
     * @return slash normalized path string
     */
    public static String normalizeRelativePath(String path) {
        if (path == null) {
            return "";
        }
        return path.replace('\\', '/');
    }
}
