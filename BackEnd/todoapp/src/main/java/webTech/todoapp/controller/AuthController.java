package webTech.todoapp.controller;


import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.security.authentication.AuthenticationManager;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import webTech.todoapp.entity.User;
import webTech.todoapp.entity.RequestLogin;
import webTech.todoapp.entity.RequestSignUp;
import webTech.todoapp.entity.Response;
import webTech.todoapp.repository.UserRepository;
import webTech.todoapp.service.UserService;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/user/")
public class AuthController {
    @Autowired
    private UserService loginService;
    @Autowired
    private UserRepository userRepository;

    /*
     @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;


    */
    @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RequestLogin req, HttpServletResponse response) {
/*
* Optional<T> is a container object that may or may not contain a non-null value.
* It is part of the java.util package and is primarily used to handle cases where a value
*  might be absent, instead of using null values.
*  */
       Optional<User> user = userRepository.findByUsername(req.getUsername());
       //  System.out.println(user.isPresent() && user.get().getPassword().equals(req.getPassword()));
       if (user.isPresent() && user.get().getPassword().equals(req.getPassword())) {

           // Erstelle ein Cookie für den Benutzernamen
           Cookie cookie = new Cookie("username", user.get().getUsername());
           cookie.setPath("/");
           cookie.setMaxAge(24 * 60 * 60); // Cookie für 1 Tag gültig (in Sekunden)

           // Füge das Cookie zur HTTP-Antwort hinzu
           response.addCookie(cookie);

           // JSON-Antwort zurückgeben
           return ResponseEntity.ok(Map.of("message", "Login successful", "username",req.getUsername()));
       } else {

           return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                   .body(Map.of("error", "Invalid credentials")); // Fehler 401
       }
    }


    @CrossOrigin("http://localhost:4200/")
    @PostMapping("/signup")
    public ResponseEntity<?> signup( @RequestBody RequestSignUp request) {
        //System.out.println(request.getEmail());
        return new ResponseEntity<>(loginService.register(request), HttpStatus.CREATED);

    }

    @CrossOrigin(origins = "http://localhost:4200", allowCredentials = "true")
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Lösche das Cookie, indem ein neues Cookie mit derselben Name erstellt wird
        Cookie cookie = new Cookie("username", null);
        cookie.setPath("/"); // Path anpassen, damit es die gleiche Reichweite wie das Original-Cookie hat
        cookie.setMaxAge(0); // Sofortiges Löschen durch Setzen der Lebensdauer auf 0
        response.addCookie(cookie);

        // Rückmeldung für den Frontend
        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }


}
