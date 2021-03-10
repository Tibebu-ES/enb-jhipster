import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NoticeContentComponentsPage from './notice-content.page-object';
import NoticeContentUpdatePage from './notice-content-update.page-object';
import {
  waitUntilDisplayed,
  waitUntilAnyDisplayed,
  click,
  getRecordsCount,
  waitUntilHidden,
  waitUntilCount,
  isVisible,
} from '../../util/utils';

const expect = chai.expect;

describe('NoticeContent e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let noticeContentComponentsPage: NoticeContentComponentsPage;
  let noticeContentUpdatePage: NoticeContentUpdatePage;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.waitUntilDisplayed();

    await signInPage.username.sendKeys('admin');
    await signInPage.password.sendKeys('admin');
    await signInPage.loginButton.click();
    await signInPage.waitUntilHidden();
    await waitUntilDisplayed(navBarPage.entityMenu);
    await waitUntilDisplayed(navBarPage.adminMenu);
    await waitUntilDisplayed(navBarPage.accountMenu);
  });

  beforeEach(async () => {
    await browser.get('/');
    await waitUntilDisplayed(navBarPage.entityMenu);
    noticeContentComponentsPage = new NoticeContentComponentsPage();
    noticeContentComponentsPage = await noticeContentComponentsPage.goToPage(navBarPage);
  });

  it('should load NoticeContents', async () => {
    expect(await noticeContentComponentsPage.title.getText()).to.match(/Notice Contents/);
    expect(await noticeContentComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete NoticeContents', async () => {
    const beforeRecordsCount = (await isVisible(noticeContentComponentsPage.noRecords))
      ? 0
      : await getRecordsCount(noticeContentComponentsPage.table);
    noticeContentUpdatePage = await noticeContentComponentsPage.goToCreateNoticeContent();
    await noticeContentUpdatePage.enterData();

    expect(await noticeContentComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(noticeContentComponentsPage.table);
    await waitUntilCount(noticeContentComponentsPage.records, beforeRecordsCount + 1);
    expect(await noticeContentComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await noticeContentComponentsPage.deleteNoticeContent();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(noticeContentComponentsPage.records, beforeRecordsCount);
      expect(await noticeContentComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(noticeContentComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
