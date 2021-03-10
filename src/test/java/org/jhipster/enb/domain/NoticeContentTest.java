package org.jhipster.enb.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.jhipster.enb.web.rest.TestUtil;

public class NoticeContentTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(NoticeContent.class);
        NoticeContent noticeContent1 = new NoticeContent();
        noticeContent1.setId(1L);
        NoticeContent noticeContent2 = new NoticeContent();
        noticeContent2.setId(noticeContent1.getId());
        assertThat(noticeContent1).isEqualTo(noticeContent2);
        noticeContent2.setId(2L);
        assertThat(noticeContent1).isNotEqualTo(noticeContent2);
        noticeContent1.setId(null);
        assertThat(noticeContent1).isNotEqualTo(noticeContent2);
    }
}
