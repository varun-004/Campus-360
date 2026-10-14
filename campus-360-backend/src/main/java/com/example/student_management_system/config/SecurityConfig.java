
package com.example.student_management_system.config;

import com.example.student_management_system.security.CustomUserDetailsService;
import com.example.student_management_system.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;

    private final CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http
    ) throws Exception {

        http

                .cors(cors -> {})

                .csrf(csrf -> csrf.disable())


                .authorizeHttpRequests(auth -> auth

                        /*
                        |--------------------------------------------------------------------------
                        | PUBLIC AUTH APIs
                        |--------------------------------------------------------------------------
                        */
                        .requestMatchers("/uploads/**")
                        .permitAll()


                        .requestMatchers("/auth/**")
                        .permitAll()

                        /*
                        |--------------------------------------------------------------------------
                        | SWAGGER
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                "/v3/api-docs/**",
                                "/swagger-ui/**",
                                "/swagger-ui.html"
                        ).permitAll()

                        /*
                        |--------------------------------------------------------------------------
                        | STUDENT APIs (/students/**)
                        | GET all/by-id/search/page: ADMIN only
                        | POST (create), PUT (update), DELETE: ADMIN only
                        | GET /students/email/{email}: STUDENT & ADMIN (own profile lookup)
                        | GET /students/dashboard: STUDENT & ADMIN
                        |--------------------------------------------------------------------------
                        | NOTE: actual controller base path is /students (not /student)
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                org.springframework.http.HttpMethod.GET,
                                "/students/email/**",
                                "/students/dashboard"
                        ).hasAnyRole("STUDENT", "ADMIN", "TEACHER")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.GET,
                                "/students",
                                "/students/**"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.POST,
                                "/students"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.PUT,
                                "/students/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.DELETE,
                                "/students/**"
                        ).hasRole("ADMIN")

                        /*
                        |--------------------------------------------------------------------------
                        | TEACHER APIs (/api/teachers/**)
                        | GET all/by-id: ADMIN, TEACHER
                        | POST (create), PUT (update), DELETE: ADMIN only
                        | Dashboard & email lookup: ADMIN & TEACHER
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                org.springframework.http.HttpMethod.POST,
                                "/api/teachers"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.PUT,
                                "/api/teachers/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.DELETE,
                                "/api/teachers/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.GET,
                                "/api/teachers/**"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        /*
                        |--------------------------------------------------------------------------
                        | COURSE APIs (/api/courses/**)
                        | GET: authenticated users (ADMIN, TEACHER, STUDENT)
                        | POST/PUT/DELETE: ADMIN only
                        | Assign teacher/student: ADMIN only
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                org.springframework.http.HttpMethod.GET,
                                "/api/courses/**"
                        ).authenticated()

                        .requestMatchers(
                                org.springframework.http.HttpMethod.POST,
                                "/api/courses"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.PUT,
                                "/api/courses/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.DELETE,
                                "/api/courses/**"
                        ).hasRole("ADMIN")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.POST,
                                "/api/courses/**"
                        ).hasRole("ADMIN")

                        /*
                        |--------------------------------------------------------------------------
                        | MARKS APIs (/api/marks/**)
                        | GET student marks/average/gpa: STUDENT, ADMIN, TEACHER
                        | POST (add), PUT (update), DELETE: ADMIN, TEACHER
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                org.springframework.http.HttpMethod.GET,
                                "/api/marks/**"
                        ).hasAnyRole("STUDENT", "ADMIN", "TEACHER")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.POST,
                                "/api/marks",
                                "/api/marks/**"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.PUT,
                                "/api/marks/**"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.DELETE,
                                "/api/marks/**"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        /*
                        |--------------------------------------------------------------------------
                        | ATTENDANCE APIs (/api/attendance/**)
                        | POST (mark attendance): ADMIN, TEACHER
                        | GET student/{studentId}: STUDENT, ADMIN, TEACHER
                        | GET course/{courseId}: ADMIN, TEACHER
                        | GET teacher/{teacherId}: ADMIN, TEACHER
                        | GET percentage: STUDENT, ADMIN, TEACHER
                        | GET course-wise: STUDENT, ADMIN, TEACHER
                        | CSV exports: STUDENT (own), ADMIN, TEACHER
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                org.springframework.http.HttpMethod.POST,
                                "/api/attendance",
                                "/api/attendance/**"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        .requestMatchers(
                                org.springframework.http.HttpMethod.GET,
                                "/api/attendance/**"
                        ).hasAnyRole("STUDENT", "ADMIN", "TEACHER")

                        /*
                        |--------------------------------------------------------------------------
                        | ANALYTICS APIs (/api/analytics/**)
                        | Dashboard: ADMIN only
                        | Student risk: ADMIN, TEACHER
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                "/api/analytics/dashboard"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        .requestMatchers(
                                "/api/analytics/students-risk"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        .requestMatchers(
                                "/api/analytics/**"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        /*
                        |--------------------------------------------------------------------------
                        | AI APIs (/api/ai/**)
                        | STUDENT can access their own AI intelligence
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers("/api/ai/**")
                        .hasAnyRole("ADMIN", "STUDENT", "TEACHER")

                        /*
                        |--------------------------------------------------------------------------
                        | REPORT APIs (/api/report/**)
                        | Student report by studentId: STUDENT (own), ADMIN, TEACHER
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                "/api/report/**"
                        ).hasAnyRole("STUDENT", "ADMIN", "TEACHER")

                        /*
                        |--------------------------------------------------------------------------
                        | DASHBOARD STATS (/api/dashboard/**)
                        | Admin only
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers(
                                "/api/dashboard/**"
                        ).hasAnyRole("ADMIN", "TEACHER")

                        /*
                        |--------------------------------------------------------------------------
                        | ADMIN CONTROLLER (/admin/**)
                        |--------------------------------------------------------------------------
                        */

                        .requestMatchers("/admin/**")
                        .hasRole("ADMIN")

                        /*
                        |--------------------------------------------------------------------------
                        | ALL OTHER APIs - require authentication
                        |--------------------------------------------------------------------------
                        */

                        .anyRequest()
                        .authenticated()
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authenticationProvider(
                        authenticationProvider()
                )

                .addFilterBefore(
                        jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {

        DaoAuthenticationProvider authProvider =
                new DaoAuthenticationProvider();

        authProvider.setUserDetailsService(
                userDetailsService
        );

        authProvider.setPasswordEncoder(
                passwordEncoder()
        );

        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {

        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        return new BCryptPasswordEncoder();
    }
}
