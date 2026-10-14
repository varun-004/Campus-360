package com.example.student_management_system.controller;

import com.example.student_management_system.dto.ProfileResponse;
import com.example.student_management_system.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<ProfileResponse> getProfile() {

        return ResponseEntity.ok(
                userService.getMyProfile()
        );
    }

    @PostMapping(
            value = "/upload-profile",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<String> uploadProfile(

            @RequestParam("file")
            MultipartFile file
    ) {

        return ResponseEntity.ok(
                userService.uploadProfile(file)
        );
    }

}