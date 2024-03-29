package region20.students.service;
import region20.students.model.Student;

import org.apache.lucene.search.BooleanClause.Occur;
import org.apache.lucene.search.BooleanQuery.Builder;
import org.apache.lucene.search.Query;

import org.hibernate.search.jpa.FullTextEntityManager;
import org.hibernate.search.jpa.Search;
import org.hibernate.search.query.dsl.QueryBuilder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import java.util.List;

@Service
public class HibernateSearchService {


    @Autowired
    private final EntityManager entityManager;


    @Autowired
    public HibernateSearchService(EntityManager entityManager) {
        super();
        this.entityManager = entityManager;
    }

    public void initializeHibernateSearch() {

        try {
            FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
            fullTextEntityManager.createIndexer().startAndWait();

        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }

    @Transactional
    public List<Student> executeSearch(String name, String studentId, Integer schoolYear, String campus, String entryDate, Integer gradeLevel) {
        FullTextEntityManager fullTextEntityManager = Search.getFullTextEntityManager(entityManager);
        QueryBuilder qb = fullTextEntityManager.getSearchFactory().buildQueryBuilder().forEntity(Student.class).get();
            	
    	Builder builder = new Builder();
        
        if (name != null) {

            builder.add(qb.keyword()
                        .fuzzy()
                        .withPrefixLength(1)
                        .onField("name")
                        .matching(name)
                        .createQuery()
                    , Occur.MUST);

        }

        if (studentId != null) {

            builder.add(qb.keyword()
                        .wildcard()
                        .onFields("studentId")
                        .matching(studentId+"*")
                        .createQuery()
                    , Occur.MUST);
        }

        if (schoolYear != null) {

            builder.add(qb.keyword()
                            .wildcard()
                            .onFields("schoolYear")
                            .matching(schoolYear)
                            .createQuery()
                    , Occur.MUST);
		}


        if (campus != null) {

            builder.add(qb.keyword()
                            .wildcard()
                            .onFields("campus")
                            .matching(campus+"*")
                            .createQuery()
                    , Occur.MUST);
		}

        if (gradeLevel != null) {

            builder.add(qb.keyword()
                            .wildcard()
                            .onFields("gradeLevel")
                            .matching(gradeLevel)
                            .createQuery()
                    , Occur.MUST);
        }

        if (entryDate != null) {

            builder.add(qb.phrase()
                        .onField("entryDate")
                        .sentence(entryDate)
                        .createQuery()
                    , Occur.MUST);

        }

        Query luceneQuery = builder.build();
        javax.persistence.Query jpaQuery = fullTextEntityManager.createFullTextQuery(luceneQuery, Student.class);

        // execute search
        List<Student> studentsList = null;

        try {
            studentsList = jpaQuery.getResultList();
        } catch (NoResultException nre) {
           System.out.println(nre);
        }

        return studentsList;
    }
}
