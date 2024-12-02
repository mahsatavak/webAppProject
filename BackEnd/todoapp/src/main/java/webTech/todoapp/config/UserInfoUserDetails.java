//package webTech.todoapp.config;
//
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import webTech.todoapp.entity.User;
//
//import java.util.Arrays;
//import java.util.Collection;
//import java.util.List;
//import java.util.stream.Collectors;
//
//public class UserInfoUserDetails implements UserDetails {
//
//    //private static final long serialVersionUID = -8773921465190832995L;
//    private String username;
//    private String password;
//    private List<GrantedAuthority> authorities;
//
//    public UserInfoUserDetails(User userInfo) {
//        username = userInfo.getUsername();
//        password = userInfo.getPassword();
//        authorities = Arrays.stream("USER".split(","))
//                .map(SimpleGrantedAuthority::new)
//                .collect(Collectors.toList());
//    }
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return password;
//    }
//
//    @Override
//    public String getUsername() {
//        return username;
//    }
//
//}
