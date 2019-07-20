package region20.students.model;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Table(name = "students")
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "student_id", unique = true)
	@NotEmpty(message = "*Please provide a student id")
	private String studentId;

	@Column(name = "name")
	@NotEmpty(message = "*Please provide a name")
	private String name;

	@Column(name = "school_year")
	private Integer schoolYear;

	@Column(name = "campus")
	private String campus;

	@Column(name = "entry_date")
	private String entryDate;

	@Column(name = "grade_level")
	private Integer gradeLevel;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSchoolYear() {
		return schoolYear;
	}

	public void setSchoolYear(Integer schoolYear) {
		this.schoolYear = schoolYear;
	}

	public String getCampus() {
		return campus;
	}

	public void setCampus(String campus) {
		this.campus = campus;
	}

	public String getStudentId() {
		return studentId;
	}

	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getEntryDate() {
		return entryDate;
	}

	public void setEntryDate(String entryDate) {
		this.entryDate = entryDate;
	}

	public Integer getGradeLevel() {
		return gradeLevel;
	}

	public void setGradeLevel(Integer gradeLevel) {
		this.gradeLevel = gradeLevel;
	}
}