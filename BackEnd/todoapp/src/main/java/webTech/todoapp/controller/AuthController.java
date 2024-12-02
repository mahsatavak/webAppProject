package webTech.todoapp.controller;


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
    @CrossOrigin("http://localhost:4200/")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody RequestLogin req) {
       Response loginResponse = new Response();
       Optional<User> user = userRepository.findByUsername(req.getUsername());

       if (user.isPresent()) {
           // Hier könnte der Loginprozess weitergehen, z. B. durch Authentifizierung
           loginResponse.setResponse("Token details");  // Stelle sicher, dass ein Token generiert und zurückgegeben wird
           return new ResponseEntity<>(loginResponse, HttpStatus.OK);  // Erfolgreiche Antwort
       } else {
           loginResponse.setResponse("User not found");
           return new ResponseEntity<>(loginResponse, HttpStatus.UNAUTHORIZED);  // Fehler 401
       }
    }


    @CrossOrigin("http://localhost:4200/")
    @PostMapping("/signup")
    public ResponseEntity<?> signup( @RequestBody RequestSignUp request) {
        System.out.println(request.getEmail());
        return new ResponseEntity<>(loginService.register(request), HttpStatus.CREATED);

    }




}
