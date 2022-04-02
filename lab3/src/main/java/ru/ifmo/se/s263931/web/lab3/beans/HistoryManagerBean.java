package ru.ifmo.se.s263931.web.lab3.beans;

import ru.ifmo.se.s263931.web.lab3.entities.RequestEntity;

import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.EntityTransaction;
import javax.persistence.Persistence;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.function.Function;

@ManagedBean(name = "historyManager")
@SessionScoped
public class HistoryManagerBean implements Serializable {
    private final EntityManagerFactory entityManagerFactory =
            Persistence.createEntityManagerFactory("testPersistenceUnit");

    private EntityManager getEntityManager() {
        return entityManagerFactory.createEntityManager();
    }

    private <T> T wrapDBTransaction(Function<EntityManager, T> func) {
        EntityManager entityManager = getEntityManager();
        EntityTransaction transaction = null;
        try {
            transaction = entityManager.getTransaction();
            transaction.begin();
            T result = func.apply(entityManager);
            transaction.commit();
            return result;
        } catch (RuntimeException e) {
            e.printStackTrace();
            if (transaction != null && transaction.isActive()) {
                transaction.rollback();
            }
            return null;
        } finally {
            entityManager.close();
        }
    }

    public List<RequestEntity> getAll() {
        return wrapDBTransaction(em -> em.createNamedQuery("RequestEntry.findAll", RequestEntity.class).getResultList());
    }

    public List<RequestEntity> getByRadius(BigDecimal radius) {
        return wrapDBTransaction(em -> em
                .createNamedQuery("RequestEntry.findByRadius", RequestEntity.class)
                .setParameter("radius", radius)
                .getResultList());
    }

    public void add(RequestEntity entry) {
        wrapDBTransaction(em -> {
            em.persist(entry);
            return null;
        });
    }

    public void clear() {
        wrapDBTransaction(em -> {
            em.createNamedQuery("RequestEntry.removeAll").executeUpdate();
            return null;
        });
    }
}
