package com.example.student_management_system.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        logger.debug("JWT FILTER EXECUTED");

        String path = request.getServletPath();

        logger.debug("PATH: {}", path);

        if (path.startsWith("/auth")) {

            logger.debug("AUTH API - SKIPPING JWT FILTER");

            filterChain.doFilter(request, response);

            return;
        }

        final String authHeader =
                request.getHeader("Authorization");

        final String jwt;
        final String userEmail;

        // CHECK HEADER
        if (authHeader == null ||
                !authHeader.startsWith("Bearer ")) {

            logger.debug("NO TOKEN FOUND");

            filterChain.doFilter(request, response);

            return;
        }


        // EXTRACT TOKEN
        jwt = authHeader.substring(7);

        logger.debug("TOKEN: {}", jwt);

        // EXTRACT EMAIL
        userEmail = jwtService.extractUsername(jwt);

        logger.debug("EMAIL: {}", userEmail);

        // CHECK AUTH
        if (userEmail != null &&
                SecurityContextHolder.getContext()
                        .getAuthentication() == null) {

            UserDetails userDetails =
                    userDetailsService
                            .loadUserByUsername(userEmail);

            logger.debug("USER LOADED");

            if (jwtService.isTokenValid(jwt, userDetails)) {

                logger.debug("TOKEN VALID");

                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails,
                                null,
                                userDetails.getAuthorities()
                        );

                authToken.setDetails(
                        new WebAuthenticationDetailsSource()
                                .buildDetails(request)
                );

                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);

                logger.debug("AUTHENTICATION SET");
            }
        }

        filterChain.doFilter(request, response);
    }
}