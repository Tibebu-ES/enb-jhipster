import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import NoticeContentUpdatePage from './notice-content-update.page-object';

const expect = chai.expect;
export class NoticeContentDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('enbApp.noticeContent.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-noticeContent'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class NoticeContentComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('notice-content-heading'));
  noRecords: ElementFinder = element(by.css('#app-view-container .table-responsive div.alert.alert-warning'));
  table: ElementFinder = element(by.css('#app-view-container div.table-responsive > table'));

  records: ElementArrayFinder = this.table.all(by.css('tbody tr'));

  getDetailsButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-info.btn-sm'));
  }

  getEditButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-primary.btn-sm'));
  }

  getDeleteButton(record: ElementFinder) {
    return record.element(by.css('a.btn.btn-danger.btn-sm'));
  }

  async goToPage(navBarPage: NavBarPage) {
    await navBarPage.getEntityPage('notice-content');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateNoticeContent() {
    await this.createButton.click();
    return new NoticeContentUpdatePage();
  }

  async deleteNoticeContent() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const noticeContentDeleteDialog = new NoticeContentDeleteDialog();
    await waitUntilDisplayed(noticeContentDeleteDialog.deleteModal);
    expect(await noticeContentDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/enbApp.noticeContent.delete.question/);
    await noticeContentDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(noticeContentDeleteDialog.deleteModal);

    expect(await isVisible(noticeContentDeleteDialog.deleteModal)).to.be.false;
  }
}
