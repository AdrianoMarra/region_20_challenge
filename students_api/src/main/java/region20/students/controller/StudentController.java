package region20.students.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import region20.students.model.Student;
import region20.students.service.HibernateSearchService;
import region20.students.service.StudentService;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping(value="/api/students", produces = MediaType.APPLICATION_JSON_VALUE)
public class StudentController {

    @Autowired
    private HibernateSearchService searchservice;

    @Autowired
    private StudentService studentService;

    @GetMapping()
    public ResponseEntity<List<Student>> search(@RequestParam(value = "name", required = false) String name,
                                                @RequestParam(value = "studentId", required = false) String studentId,
                                                @RequestParam(value = "schoolYear", required = false) Integer schoolYear,
                                                @RequestParam(value = "campus", required = false) String campus,
                                                @RequestParam(value = "entryDate", required = false) String entryDate,
                                                @RequestParam(value = "gradeLevel", required = false) Integer gradeLevel) {

        List<Student> searchResults = null;

        // If the search params are empty simply return all students.
        if (name == null && studentId == null &&
            schoolYear == null && campus == null &&
            entryDate == null && gradeLevel == null) {

            searchResults = studentService.findAll();
            return new ResponseEntity<List<Student>>(searchResults, HttpStatus.OK);
        }

        try {
            searchResults = searchservice.executeSearch(name, studentId, schoolYear, campus, entryDate, gradeLevel);

        } catch (Exception ex) {
            System.out.println(ex);
        }

        return new ResponseEntity<List<Student>>(searchResults, HttpStatus.OK);

    }

    @GetMapping(value = "/{id}")
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {

        Optional<Student> student = studentService.findOne(id);
        return new ResponseEntity<Student>(student.get(), HttpStatus.OK);
    }

    @PostMapping()
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {

        Student newStudent = studentService.save(student);
        return new ResponseEntity<Student>(newStudent, HttpStatus.OK);
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<Student> editStudent(@PathVariable Long id, @Valid @RequestBody Student student) {

        Optional<Student> studentToUpdate = studentService.findOne(id);
        studentToUpdate.get().setStudentId(student.getStudentId());
        studentToUpdate.get().setName(student.getName());
        studentToUpdate.get().setCampus(student.getCampus());
        studentToUpdate.get().setEntryDate(student.getEntryDate());
        studentToUpdate.get().setSchoolYear(student.getSchoolYear());
        studentToUpdate.get().setGradeLevel(student.getGradeLevel());

        Student updated = studentService.save(studentToUpdate.get());
        return new ResponseEntity<Student>(updated, HttpStatus.OK);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Student> deleteStudent(@PathVariable Long id) {

        Optional<Student> student = studentService.findOne(id);
        studentService.delete(id);
        return new ResponseEntity<Student>(student.get(), HttpStatus.OK);
    }

}
