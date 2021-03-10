import { element, by, ElementFinder, ElementArrayFinder } from 'protractor';

import { waitUntilAnyDisplayed, waitUntilDisplayed, click, waitUntilHidden, isVisible } from '../../util/utils';

import NavBarPage from './../../page-objects/navbar-page';

import NoticeUpdatePage from './notice-update.page-object';

const expect = chai.expect;
export class NoticeDeleteDialog {
  deleteModal = element(by.className('modal'));
  private dialogTitle: ElementFinder = element(by.id('enbApp.notice.delete.question'));
  private confirmButton = element(by.id('jhi-confirm-delete-notice'));

  getDialogTitle() {
    return this.dialogTitle;
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }
}

export default class NoticeComponentsPage {
  createButton: ElementFinder = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('div table .btn-danger'));
  title: ElementFinder = element(by.id('notice-heading'));
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
    await navBarPage.getEntityPage('notice');
    await waitUntilAnyDisplayed([this.noRecords, this.table]);
    return this;
  }

  async goToCreateNotice() {
    await this.createButton.click();
    return new NoticeUpdatePage();
  }

  async deleteNotice() {
    const deleteButton = this.getDeleteButton(this.records.last());
    await click(deleteButton);

    const noticeDeleteDialog = new NoticeDeleteDialog();
    await waitUntilDisplayed(noticeDeleteDialog.deleteModal);
    expect(await noticeDeleteDialog.getDialogTitle().getAttribute('id')).to.match(/enbApp.notice.delete.question/);
    await noticeDeleteDialog.clickOnConfirmButton();

    await waitUntilHidden(noticeDeleteDialog.deleteModal);

    expect(await isVisible(noticeDeleteDialog.deleteModal)).to.be.false;
  }
}
