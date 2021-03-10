package org.jhipster.enb.repository;

import org.jhipster.enb.domain.NoticeContent;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NoticeContent entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoticeContentRepository extends JpaRepository<NoticeContent, Long> {
}
