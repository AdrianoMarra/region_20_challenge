package region20.students.model;

import org.hibernate.search.annotations.Indexed;
import org.hibernate.search.annotations.Field;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Column;

import javax.validation.constraints.NotEmpty;

@Indexed
@Entity
@Table(name = "students")
public class Student {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "student_id", unique = true)
	@NotEmpty(message = "*Please provide a student id")
	@Field
	private String studentId;

	@Column(name = "name")
	@NotEmpty(message = "*Please provide a name")
	@Field
	private String name;

	@Column(name = "school_year")
	@Field
	private Integer schoolYear;

	@Column(name = "campus")
	@Field
	private String campus;

	@Column(name = "entry_date")
	@Field
	private String entryDate;

	@Column(name = "grade_level")
	@Field
	private Integer gradeLevel;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSchoolYear() {
		return this.schoolYear;
	}

	public void setSchoolYear(Integer schoolYear) {
		this.schoolYear = schoolYear;
	}

	public String getCampus() {
		return this.campus;
	}

	public void setCampus(String campus) {
		this.campus = campus;
	}

	public String getStudentId() {
		return this.studentId;
	}

	public void setStudentId(String studentId) {
		this.studentId = studentId;
	}

	public String getEntryDate() {
		return this.entryDate;
	}

	public void setEntryDate(String entryDate) {
		this.entryDate = entryDate;
	}

	public Integer getGradeLevel() {
		return this.gradeLevel;
	}

	public void setGradeLevel(Integer gradeLevel) {
		this.gradeLevel = gradeLevel;
	}
}