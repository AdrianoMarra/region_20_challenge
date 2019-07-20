package region20.students.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import region20.students.model.Student;


@Repository("studentRepository")
public interface StudentRepository extends JpaRepository<Student, Long> {
}