package org.jhipster.enb.web.rest;

import org.jhipster.enb.EnbApp;
import org.jhipster.enb.domain.Notice;
import org.jhipster.enb.repository.NoticeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link NoticeResource} REST controller.
 */
@SpringBootTest(classes = EnbApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class NoticeResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_OPEN_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_OPEN_TIME = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_CLOSING_TIME = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CLOSING_TIME = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private NoticeRepository noticeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNoticeMockMvc;

    private Notice notice;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notice createEntity(EntityManager em) {
        Notice notice = new Notice()
            .title(DEFAULT_TITLE)
            .message(DEFAULT_MESSAGE)
            .openTime(DEFAULT_OPEN_TIME)
            .closingTime(DEFAULT_CLOSING_TIME);
        return notice;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Notice createUpdatedEntity(EntityManager em) {
        Notice notice = new Notice()
            .title(UPDATED_TITLE)
            .message(UPDATED_MESSAGE)
            .openTime(UPDATED_OPEN_TIME)
            .closingTime(UPDATED_CLOSING_TIME);
        return notice;
    }

    @BeforeEach
    public void initTest() {
        notice = createEntity(em);
    }

    @Test
    @Transactional
    public void createNotice() throws Exception {
        int databaseSizeBeforeCreate = noticeRepository.findAll().size();
        // Create the Notice
        restNoticeMockMvc.perform(post("/api/notices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notice)))
            .andExpect(status().isCreated());

        // Validate the Notice in the database
        List<Notice> noticeList = noticeRepository.findAll();
        assertThat(noticeList).hasSize(databaseSizeBeforeCreate + 1);
        Notice testNotice = noticeList.get(noticeList.size() - 1);
        assertThat(testNotice.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testNotice.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testNotice.getOpenTime()).isEqualTo(DEFAULT_OPEN_TIME);
        assertThat(testNotice.getClosingTime()).isEqualTo(DEFAULT_CLOSING_TIME);
    }

    @Test
    @Transactional
    public void createNoticeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noticeRepository.findAll().size();

        // Create the Notice with an existing ID
        notice.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoticeMockMvc.perform(post("/api/notices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notice)))
            .andExpect(status().isBadRequest());

        // Validate the Notice in the database
        List<Notice> noticeList = noticeRepository.findAll();
        assertThat(noticeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTitleIsRequired() throws Exception {
        int databaseSizeBeforeTest = noticeRepository.findAll().size();
        // set the field null
        notice.setTitle(null);

        // Create the Notice, which fails.


        restNoticeMockMvc.perform(post("/api/notices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notice)))
            .andExpect(status().isBadRequest());

        List<Notice> noticeList = noticeRepository.findAll();
        assertThat(noticeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkOpenTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = noticeRepository.findAll().size();
        // set the field null
        notice.setOpenTime(null);

        // Create the Notice, which fails.


        restNoticeMockMvc.perform(post("/api/notices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notice)))
            .andExpect(status().isBadRequest());

        List<Notice> noticeList = noticeRepository.findAll();
        assertThat(noticeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClosingTimeIsRequired() throws Exception {
        int databaseSizeBeforeTest = noticeRepository.findAll().size();
        // set the field null
        notice.setClosingTime(null);

        // Create the Notice, which fails.


        restNoticeMockMvc.perform(post("/api/notices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notice)))
            .andExpect(status().isBadRequest());

        List<Notice> noticeList = noticeRepository.findAll();
        assertThat(noticeList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNotices() throws Exception {
        // Initialize the database
        noticeRepository.saveAndFlush(notice);

        // Get all the noticeList
        restNoticeMockMvc.perform(get("/api/notices?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(notice.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE.toString())))
            .andExpect(jsonPath("$.[*].openTime").value(hasItem(DEFAULT_OPEN_TIME.toString())))
            .andExpect(jsonPath("$.[*].closingTime").value(hasItem(DEFAULT_CLOSING_TIME.toString())));
    }
    
    @Test
    @Transactional
    public void getNotice() throws Exception {
        // Initialize the database
        noticeRepository.saveAndFlush(notice);

        // Get the notice
        restNoticeMockMvc.perform(get("/api/notices/{id}", notice.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(notice.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE.toString()))
            .andExpect(jsonPath("$.openTime").value(DEFAULT_OPEN_TIME.toString()))
            .andExpect(jsonPath("$.closingTime").value(DEFAULT_CLOSING_TIME.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingNotice() throws Exception {
        // Get the notice
        restNoticeMockMvc.perform(get("/api/notices/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNotice() throws Exception {
        // Initialize the database
        noticeRepository.saveAndFlush(notice);

        int databaseSizeBeforeUpdate = noticeRepository.findAll().size();

        // Update the notice
        Notice updatedNotice = noticeRepository.findById(notice.getId()).get();
        // Disconnect from session so that the updates on updatedNotice are not directly saved in db
        em.detach(updatedNotice);
        updatedNotice
            .title(UPDATED_TITLE)
            .message(UPDATED_MESSAGE)
            .openTime(UPDATED_OPEN_TIME)
            .closingTime(UPDATED_CLOSING_TIME);

        restNoticeMockMvc.perform(put("/api/notices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNotice)))
            .andExpect(status().isOk());

        // Validate the Notice in the database
        List<Notice> noticeList = noticeRepository.findAll();
        assertThat(noticeList).hasSize(databaseSizeBeforeUpdate);
        Notice testNotice = noticeList.get(noticeList.size() - 1);
        assertThat(testNotice.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testNotice.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testNotice.getOpenTime()).isEqualTo(UPDATED_OPEN_TIME);
        assertThat(testNotice.getClosingTime()).isEqualTo(UPDATED_CLOSING_TIME);
    }

    @Test
    @Transactional
    public void updateNonExistingNotice() throws Exception {
        int databaseSizeBeforeUpdate = noticeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoticeMockMvc.perform(put("/api/notices")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(notice)))
            .andExpect(status().isBadRequest());

        // Validate the Notice in the database
        List<Notice> noticeList = noticeRepository.findAll();
        assertThat(noticeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNotice() throws Exception {
        // Initialize the database
        noticeRepository.saveAndFlush(notice);

        int databaseSizeBeforeDelete = noticeRepository.findAll().size();

        // Delete the notice
        restNoticeMockMvc.perform(delete("/api/notices/{id}", notice.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Notice> noticeList = noticeRepository.findAll();
        assertThat(noticeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
