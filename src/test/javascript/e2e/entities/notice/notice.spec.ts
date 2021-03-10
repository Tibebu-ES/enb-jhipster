import { browser, element, by } from 'protractor';

import NavBarPage from './../../page-objects/navbar-page';
import SignInPage from './../../page-objects/signin-page';
import NoticeComponentsPage from './notice.page-object';
import NoticeUpdatePage from './notice-update.page-object';
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

describe('Notice e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let noticeComponentsPage: NoticeComponentsPage;
  let noticeUpdatePage: NoticeUpdatePage;

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
    noticeComponentsPage = new NoticeComponentsPage();
    noticeComponentsPage = await noticeComponentsPage.goToPage(navBarPage);
  });

  it('should load Notices', async () => {
    expect(await noticeComponentsPage.title.getText()).to.match(/Notices/);
    expect(await noticeComponentsPage.createButton.isEnabled()).to.be.true;
  });

  it('should create and delete Notices', async () => {
    const beforeRecordsCount = (await isVisible(noticeComponentsPage.noRecords)) ? 0 : await getRecordsCount(noticeComponentsPage.table);
    noticeUpdatePage = await noticeComponentsPage.goToCreateNotice();
    await noticeUpdatePage.enterData();

    expect(await noticeComponentsPage.createButton.isEnabled()).to.be.true;
    await waitUntilDisplayed(noticeComponentsPage.table);
    await waitUntilCount(noticeComponentsPage.records, beforeRecordsCount + 1);
    expect(await noticeComponentsPage.records.count()).to.eq(beforeRecordsCount + 1);

    await noticeComponentsPage.deleteNotice();
    if (beforeRecordsCount !== 0) {
      await waitUntilCount(noticeComponentsPage.records, beforeRecordsCount);
      expect(await noticeComponentsPage.records.count()).to.eq(beforeRecordsCount);
    } else {
      await waitUntilDisplayed(noticeComponentsPage.noRecords);
    }
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
