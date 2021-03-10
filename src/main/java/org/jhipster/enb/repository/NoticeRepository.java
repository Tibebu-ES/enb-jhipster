package org.jhipster.enb.repository;

import org.jhipster.enb.domain.Notice;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Spring Data  repository for the Notice entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {

    @Query("select notice from Notice notice where notice.editor.login = ?#{principal.username}")
    List<Notice> findByEditorIsCurrentUser();
}
