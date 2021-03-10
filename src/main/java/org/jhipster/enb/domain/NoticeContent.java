package org.jhipster.enb.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

import org.jhipster.enb.domain.enumeration.NCType;

/**
 * url is the path for nc
 */
@ApiModel(description = "url is the path for nc")
@Entity
@Table(name = "notice_content")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class NoticeContent implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "nc_type", nullable = false)
    private NCType ncType;

    @Column(name = "url")
    private String url;

    @ManyToOne
    @JsonIgnoreProperties(value = "contents", allowSetters = true)
    private Notice notice;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public NCType getNcType() {
        return ncType;
    }

    public NoticeContent ncType(NCType ncType) {
        this.ncType = ncType;
        return this;
    }

    public void setNcType(NCType ncType) {
        this.ncType = ncType;
    }

    public String getUrl() {
        return url;
    }

    public NoticeContent url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Notice getNotice() {
        return notice;
    }

    public NoticeContent notice(Notice notice) {
        this.notice = notice;
        return this;
    }

    public void setNotice(Notice notice) {
        this.notice = notice;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NoticeContent)) {
            return false;
        }
        return id != null && id.equals(((NoticeContent) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NoticeContent{" +
            "id=" + getId() +
            ", ncType='" + getNcType() + "'" +
            ", url='" + getUrl() + "'" +
            "}";
    }
}
