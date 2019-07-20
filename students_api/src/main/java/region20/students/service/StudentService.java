package region20.students.service;

import java.util.List;
import java.util.Optional;

import region20.students.model.Student;

public interface StudentService {
	List<Student> findAll();

	Student save(Student student);

	Optional<Student> findOne(Long id);

	void delete(Long id);
}