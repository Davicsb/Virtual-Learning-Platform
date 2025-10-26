package com.example.AuthService.security.jwt;
import com.example.AuthService.model.CustomUser;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {


    public static String generateToken(CustomUser user){
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", user.getUserType().getRoleJwt());
        return Jwts
                .builder()
                .setClaims(claims)
                .subject(user.getEmail())
                .expiration(new Date(System.currentTimeMillis() + 86_400_000))
                .signWith(getSigningKey())
                .compact();
    }

    public static Claims getClaims(String token){
        return Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public static boolean isTokenValid(String token){
        return !isExpired(token);
    }

    private static boolean isExpired(String token) {
        return getClaims(token)
                .getExpiration()
                .before(new Date());
    }

    private static SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode("yourSecretKeyAndItMustBeLongEnoughForSecurity");
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

