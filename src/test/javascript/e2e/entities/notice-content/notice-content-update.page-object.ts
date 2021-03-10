import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class NoticeContentUpdatePage {
  pageTitle: ElementFinder = element(by.id('enbApp.noticeContent.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  ncTypeSelect: ElementFinder = element(by.css('select#notice-content-ncType'));
  urlInput: ElementFinder = element(by.css('input#notice-content-url'));
  noticeSelect: ElementFinder = element(by.css('select#notice-content-notice'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setNcTypeSelect(ncType) {
    await this.ncTypeSelect.sendKeys(ncType);
  }

  async getNcTypeSelect() {
    return this.ncTypeSelect.element(by.css('option:checked')).getText();
  }

  async ncTypeSelectLastOption() {
    await this.ncTypeSelect.all(by.tagName('option')).last().click();
  }
  async setUrlInput(url) {
    await this.urlInput.sendKeys(url);
  }

  async getUrlInput() {
    return this.urlInput.getAttribute('value');
  }

  async noticeSelectLastOption() {
    await this.noticeSelect.all(by.tagName('option')).last().click();
  }

  async noticeSelectOption(option) {
    await this.noticeSelect.sendKeys(option);
  }

  getNoticeSelect() {
    return this.noticeSelect;
  }

  async getNoticeSelectedOption() {
    return this.noticeSelect.element(by.css('option:checked')).getText();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  getSaveButton() {
    return this.saveButton;
  }

  async enterData() {
    await waitUntilDisplayed(this.saveButton);
    await this.ncTypeSelectLastOption();
    await waitUntilDisplayed(this.saveButton);
    await this.setUrlInput('url');
    expect(await this.getUrlInput()).to.match(/url/);
    await this.noticeSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
