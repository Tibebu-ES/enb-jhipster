package org.jhipster.enb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Notice.
 */
@Entity
@Table(name = "notice")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Notice implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    
    @Lob
    @Type(type = "org.hibernate.type.TextType")
    @Column(name = "message", nullable = false)
    private String message;

    @NotNull
    @Column(name = "open_time", nullable = false)
    private LocalDate openTime;

    @NotNull
    @Column(name = "closing_time", nullable = false)
    private LocalDate closingTime;

    @OneToMany(mappedBy = "notice")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private Set<NoticeContent> contents = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "notices", allowSetters = true)
    private User editor;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public Notice title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getMessage() {
        return message;
    }

    public Notice message(String message) {
        this.message = message;
        return this;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDate getOpenTime() {
        return openTime;
    }

    public Notice openTime(LocalDate openTime) {
        this.openTime = openTime;
        return this;
    }

    public void setOpenTime(LocalDate openTime) {
        this.openTime = openTime;
    }

    public LocalDate getClosingTime() {
        return closingTime;
    }

    public Notice closingTime(LocalDate closingTime) {
        this.closingTime = closingTime;
        return this;
    }

    public void setClosingTime(LocalDate closingTime) {
        this.closingTime = closingTime;
    }

    public Set<NoticeContent> getContents() {
        return contents;
    }

    public Notice contents(Set<NoticeContent> noticeContents) {
        this.contents = noticeContents;
        return this;
    }

    public Notice addContents(NoticeContent noticeContent) {
        this.contents.add(noticeContent);
        noticeContent.setNotice(this);
        return this;
    }

    public Notice removeContents(NoticeContent noticeContent) {
        this.contents.remove(noticeContent);
        noticeContent.setNotice(null);
        return this;
    }

    public void setContents(Set<NoticeContent> noticeContents) {
        this.contents = noticeContents;
    }

    public User getEditor() {
        return editor;
    }

    public Notice editor(User user) {
        this.editor = user;
        return this;
    }

    public void setEditor(User user) {
        this.editor = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Notice)) {
            return false;
        }
        return id != null && id.equals(((Notice) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Notice{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", message='" + getMessage() + "'" +
            ", openTime='" + getOpenTime() + "'" +
            ", closingTime='" + getClosingTime() + "'" +
            "}";
    }
}
