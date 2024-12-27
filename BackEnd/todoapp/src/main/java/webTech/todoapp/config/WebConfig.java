package webTech.todoapp.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Erlaube Anfragen von localhost:4200
        registry.addMapping("/api/**")
                .allowedOrigins("http://188.68.51.112:8080")  // Nur lokale Frontend-Domain erlauben http://localhost:4200
                .allowedMethods("GET", "POST", "PUT", "DELETE")
                //.allowedHeaders("*")
                .allowCredentials(true);  // Dies erlaubt, dass auch Cookies und Auth-Header mit gesendet werden
    }
}
