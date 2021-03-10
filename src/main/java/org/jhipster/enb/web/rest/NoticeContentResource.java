package org.jhipster.enb.web.rest;

import org.jhipster.enb.domain.NoticeContent;
import org.jhipster.enb.repository.NoticeContentRepository;
import org.jhipster.enb.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.jhipster.enb.domain.NoticeContent}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class NoticeContentResource {

    private final Logger log = LoggerFactory.getLogger(NoticeContentResource.class);

    private static final String ENTITY_NAME = "noticeContent";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final NoticeContentRepository noticeContentRepository;

    public NoticeContentResource(NoticeContentRepository noticeContentRepository) {
        this.noticeContentRepository = noticeContentRepository;
    }

    /**
     * {@code POST  /notice-contents} : Create a new noticeContent.
     *
     * @param noticeContent the noticeContent to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new noticeContent, or with status {@code 400 (Bad Request)} if the noticeContent has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/notice-contents")
    public ResponseEntity<NoticeContent> createNoticeContent(@Valid @RequestBody NoticeContent noticeContent) throws URISyntaxException {
        log.debug("REST request to save NoticeContent : {}", noticeContent);
        if (noticeContent.getId() != null) {
            throw new BadRequestAlertException("A new noticeContent cannot already have an ID", ENTITY_NAME, "idexists");
        }
        NoticeContent result = noticeContentRepository.save(noticeContent);
        return ResponseEntity.created(new URI("/api/notice-contents/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /notice-contents} : Updates an existing noticeContent.
     *
     * @param noticeContent the noticeContent to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated noticeContent,
     * or with status {@code 400 (Bad Request)} if the noticeContent is not valid,
     * or with status {@code 500 (Internal Server Error)} if the noticeContent couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/notice-contents")
    public ResponseEntity<NoticeContent> updateNoticeContent(@Valid @RequestBody NoticeContent noticeContent) throws URISyntaxException {
        log.debug("REST request to update NoticeContent : {}", noticeContent);
        if (noticeContent.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        NoticeContent result = noticeContentRepository.save(noticeContent);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, noticeContent.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /notice-contents} : get all the noticeContents.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of noticeContents in body.
     */
    @GetMapping("/notice-contents")
    public List<NoticeContent> getAllNoticeContents() {
        log.debug("REST request to get all NoticeContents");
        return noticeContentRepository.findAll();
    }

    /**
     * {@code GET  /notice-contents/:id} : get the "id" noticeContent.
     *
     * @param id the id of the noticeContent to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the noticeContent, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/notice-contents/{id}")
    public ResponseEntity<NoticeContent> getNoticeContent(@PathVariable Long id) {
        log.debug("REST request to get NoticeContent : {}", id);
        Optional<NoticeContent> noticeContent = noticeContentRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(noticeContent);
    }

    /**
     * {@code DELETE  /notice-contents/:id} : delete the "id" noticeContent.
     *
     * @param id the id of the noticeContent to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/notice-contents/{id}")
    public ResponseEntity<Void> deleteNoticeContent(@PathVariable Long id) {
        log.debug("REST request to delete NoticeContent : {}", id);
        noticeContentRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
