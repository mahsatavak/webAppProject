package webTech.todoapp.service;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import webTech.todoapp.entity.User;
import webTech.todoapp.entity.RequestLogin;
import webTech.todoapp.entity.RequestSignUp;
import webTech.todoapp.entity.Response;
import webTech.todoapp.repository.UserRepository;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Response register(RequestSignUp req) {
        Optional<User> usersnames = userRepository.findByUsername(req.getUsername());
        Optional<User> usersemail = userRepository.findByEmail(req.getEmail());
         Response SignupResponse= new Response();

        if (usersnames.isPresent()) {
            SignupResponse.setResponse("User details Already found");
            return SignupResponse;
        }
        if (usersemail.isPresent()) {
            SignupResponse.setResponse("User details Already found");
            return SignupResponse;
        }

        User user = new User();
        user.setUsername(req.getUsername());
        user.setEmail(req.getEmail());
        user.setPassword(req.getPassword());

        userRepository.save(user);

        SignupResponse.setResponse("User created with id " + user.get_id());
        return SignupResponse;
    }


}
