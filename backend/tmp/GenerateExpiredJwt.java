import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

public class GenerateExpiredJwt {
    public static void main(String[] args) {
        String secret = "9M5qK7rL2xN8vB4pF1sW6eT3yU9iA0dH7jC5kL8mN2pQ4rS6tV1xY3zB5cD7eF9g";
        SecretKey key = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        Date now = new Date();
        Date expiredAt = new Date(now.getTime() - 60000L);
        Date issuedAt = new Date(now.getTime() - 120000L);

        String token = Jwts.builder()
                .subject("admin")
                .issuedAt(issuedAt)
                .expiration(expiredAt)
                .signWith(key, Jwts.SIG.HS256)
                .compact();

        System.out.println(token);
    }
}