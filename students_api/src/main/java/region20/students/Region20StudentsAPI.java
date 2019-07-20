package region20.students;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan("region20.students")
public class Region20StudentsAPI {

	public static void main(String[] args) {
		SpringApplication.run(Region20StudentsAPI.class, args);
	}

}
