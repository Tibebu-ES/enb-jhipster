package org.jhipster.enb.web.rest;

import org.jhipster.enb.EnbApp;
import org.jhipster.enb.domain.NoticeContent;
import org.jhipster.enb.repository.NoticeContentRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.jhipster.enb.domain.enumeration.NCType;
/**
 * Integration tests for the {@link NoticeContentResource} REST controller.
 */
@SpringBootTest(classes = EnbApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class NoticeContentResourceIT {

    private static final NCType DEFAULT_NC_TYPE = NCType.IMAGE;
    private static final NCType UPDATED_NC_TYPE = NCType.VIDEO;

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    @Autowired
    private NoticeContentRepository noticeContentRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restNoticeContentMockMvc;

    private NoticeContent noticeContent;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NoticeContent createEntity(EntityManager em) {
        NoticeContent noticeContent = new NoticeContent()
            .ncType(DEFAULT_NC_TYPE)
            .url(DEFAULT_URL);
        return noticeContent;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static NoticeContent createUpdatedEntity(EntityManager em) {
        NoticeContent noticeContent = new NoticeContent()
            .ncType(UPDATED_NC_TYPE)
            .url(UPDATED_URL);
        return noticeContent;
    }

    @BeforeEach
    public void initTest() {
        noticeContent = createEntity(em);
    }

    @Test
    @Transactional
    public void createNoticeContent() throws Exception {
        int databaseSizeBeforeCreate = noticeContentRepository.findAll().size();
        // Create the NoticeContent
        restNoticeContentMockMvc.perform(post("/api/notice-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(noticeContent)))
            .andExpect(status().isCreated());

        // Validate the NoticeContent in the database
        List<NoticeContent> noticeContentList = noticeContentRepository.findAll();
        assertThat(noticeContentList).hasSize(databaseSizeBeforeCreate + 1);
        NoticeContent testNoticeContent = noticeContentList.get(noticeContentList.size() - 1);
        assertThat(testNoticeContent.getNcType()).isEqualTo(DEFAULT_NC_TYPE);
        assertThat(testNoticeContent.getUrl()).isEqualTo(DEFAULT_URL);
    }

    @Test
    @Transactional
    public void createNoticeContentWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = noticeContentRepository.findAll().size();

        // Create the NoticeContent with an existing ID
        noticeContent.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restNoticeContentMockMvc.perform(post("/api/notice-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(noticeContent)))
            .andExpect(status().isBadRequest());

        // Validate the NoticeContent in the database
        List<NoticeContent> noticeContentList = noticeContentRepository.findAll();
        assertThat(noticeContentList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNcTypeIsRequired() throws Exception {
        int databaseSizeBeforeTest = noticeContentRepository.findAll().size();
        // set the field null
        noticeContent.setNcType(null);

        // Create the NoticeContent, which fails.


        restNoticeContentMockMvc.perform(post("/api/notice-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(noticeContent)))
            .andExpect(status().isBadRequest());

        List<NoticeContent> noticeContentList = noticeContentRepository.findAll();
        assertThat(noticeContentList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllNoticeContents() throws Exception {
        // Initialize the database
        noticeContentRepository.saveAndFlush(noticeContent);

        // Get all the noticeContentList
        restNoticeContentMockMvc.perform(get("/api/notice-contents?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(noticeContent.getId().intValue())))
            .andExpect(jsonPath("$.[*].ncType").value(hasItem(DEFAULT_NC_TYPE.toString())))
            .andExpect(jsonPath("$.[*].url").value(hasItem(DEFAULT_URL)));
    }
    
    @Test
    @Transactional
    public void getNoticeContent() throws Exception {
        // Initialize the database
        noticeContentRepository.saveAndFlush(noticeContent);

        // Get the noticeContent
        restNoticeContentMockMvc.perform(get("/api/notice-contents/{id}", noticeContent.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(noticeContent.getId().intValue()))
            .andExpect(jsonPath("$.ncType").value(DEFAULT_NC_TYPE.toString()))
            .andExpect(jsonPath("$.url").value(DEFAULT_URL));
    }
    @Test
    @Transactional
    public void getNonExistingNoticeContent() throws Exception {
        // Get the noticeContent
        restNoticeContentMockMvc.perform(get("/api/notice-contents/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateNoticeContent() throws Exception {
        // Initialize the database
        noticeContentRepository.saveAndFlush(noticeContent);

        int databaseSizeBeforeUpdate = noticeContentRepository.findAll().size();

        // Update the noticeContent
        NoticeContent updatedNoticeContent = noticeContentRepository.findById(noticeContent.getId()).get();
        // Disconnect from session so that the updates on updatedNoticeContent are not directly saved in db
        em.detach(updatedNoticeContent);
        updatedNoticeContent
            .ncType(UPDATED_NC_TYPE)
            .url(UPDATED_URL);

        restNoticeContentMockMvc.perform(put("/api/notice-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedNoticeContent)))
            .andExpect(status().isOk());

        // Validate the NoticeContent in the database
        List<NoticeContent> noticeContentList = noticeContentRepository.findAll();
        assertThat(noticeContentList).hasSize(databaseSizeBeforeUpdate);
        NoticeContent testNoticeContent = noticeContentList.get(noticeContentList.size() - 1);
        assertThat(testNoticeContent.getNcType()).isEqualTo(UPDATED_NC_TYPE);
        assertThat(testNoticeContent.getUrl()).isEqualTo(UPDATED_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingNoticeContent() throws Exception {
        int databaseSizeBeforeUpdate = noticeContentRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restNoticeContentMockMvc.perform(put("/api/notice-contents")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(noticeContent)))
            .andExpect(status().isBadRequest());

        // Validate the NoticeContent in the database
        List<NoticeContent> noticeContentList = noticeContentRepository.findAll();
        assertThat(noticeContentList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteNoticeContent() throws Exception {
        // Initialize the database
        noticeContentRepository.saveAndFlush(noticeContent);

        int databaseSizeBeforeDelete = noticeContentRepository.findAll().size();

        // Delete the noticeContent
        restNoticeContentMockMvc.perform(delete("/api/notice-contents/{id}", noticeContent.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<NoticeContent> noticeContentList = noticeContentRepository.findAll();
        assertThat(noticeContentList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
