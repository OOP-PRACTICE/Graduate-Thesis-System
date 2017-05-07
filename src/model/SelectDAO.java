package model;

import java.util.List;

import org.hibernate.LockOptions;
import org.hibernate.Query;
import org.hibernate.Transaction;
import org.hibernate.criterion.Example;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * A data access object (DAO) providing persistence and search support for
 * Select entities. Transaction control of the save(), update() and delete()
 * operations can directly support Spring container-managed transactions or they
 * can be augmented to handle user-managed Spring transactions. Each of these
 * methods provides additional information for how to configure it for the
 * desired type of transaction control.
 * 
 * @see model.Select
 * @author MyEclipse Persistence Tools
 */
public class SelectDAO extends BaseHibernateDAO {
	private static final Logger log = LoggerFactory.getLogger(SelectDAO.class);

	public void save(Select transientInstance) {
		log.debug("saving Select instance");
		try {
			org.hibernate.Transaction tran =  getSession().beginTransaction();
			getSession().save(transientInstance);
			getSession().flush();
			tran.commit();
			log.debug("save successful");
		} catch (RuntimeException re) {
			log.error("save failed", re);
			throw re;
		}
	}

	public void delete(Select persistentInstance) {
		log.debug("deleting Select instance");
		try {
			
			Transaction tran =  getSession().beginTransaction();
			getSession().delete(persistentInstance);
			getSession().flush();
			tran.commit();
			log.debug("delete successful");
		} catch (RuntimeException re) {
			log.error("delete failed", re);
			throw re;
		}
	}

	public Select findById(java.lang.Integer id) {
		log.debug("getting Select instance with id: " + id);
		try {
			Select instance = (Select) getSession().get("model.Select", id);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}
	

	public Select findByStuid(String stuid) {
		log.debug("getting Select instance with stuid: " + stuid);
		try {
			Select instance = (Select) getSession().get("model.Select", stuid);
			return instance;
		} catch (RuntimeException re) {
			log.error("get failed", re);
			throw re;
		}
	}

	public List findByExample(Select instance) {
		log.debug("finding Select instance by example");
		try {
			List results = getSession().createCriteria("model.Select")
					.add(Example.create(instance)).list();
			log.debug("find by example successful, result size: "
					+ results.size());
			return results;
		} catch (RuntimeException re) {
			log.error("find by example failed", re);
			throw re;
		}
	}

	public List findByProperty(String propertyName, Object value) {
		log.debug("finding Select instance with property: " + propertyName
				+ ", value: " + value);
		try {
			String queryString = "from Select as model where model."
					+ propertyName + "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}
	
	public List findByProperty(Student value) {
		log.debug("finding Select instance with property:stuid"
				+ ", value: " + value);
		try {
			String queryString = "from Select as model where model.student.stuid"+ "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value.getStuid());
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}
	
	public List findByPropertysub(Subject value) {
		log.debug("finding Select instance with property:subid"
				+ ", value: " + value);
		try {
			String queryString = "from Select as model where model.subject.subid"+ "= ?";
			Query queryObject = getSession().createQuery(queryString);
			queryObject.setParameter(0, value.getSubid());
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find by property name failed", re);
			throw re;
		}
	}


	public List findAll() {
		log.debug("finding all Select instances");
		try {
			String queryString = "from Select";
			Query queryObject = getSession().createQuery(queryString);
			return queryObject.list();
		} catch (RuntimeException re) {
			log.error("find all failed", re);
			throw re;
		}
	}

	public Select merge(Select detachedInstance) {
		log.debug("merging Select instance");
		try {
			Select result = (Select) getSession().merge(detachedInstance);
			log.debug("merge successful");
			return result;
		} catch (RuntimeException re) {
			log.error("merge failed", re);
			throw re;
		}
	}

	public void attachDirty(Select instance) {
		log.debug("attaching dirty Select instance");
		try {
			getSession().saveOrUpdate(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void attachClean(Select instance) {
		log.debug("attaching clean Select instance");
		try {
			getSession().buildLockRequest(LockOptions.NONE).lock(instance);
			log.debug("attach successful");
		} catch (RuntimeException re) {
			log.error("attach failed", re);
			throw re;
		}
	}

	public void update(Select transientInstance,String gr){
		log.debug("update Books instance");
		try{
			getSession().getTransaction().begin();
			getSession().update(transientInstance);
			transientInstance.setGrade(gr);
			getSession().getTransaction().commit();
			getSession().flush();
		}catch(RuntimeException re){
			log.error("update failed",re);
			throw re;
		}
	}

}