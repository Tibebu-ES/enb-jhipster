import { element, by, ElementFinder } from 'protractor';
import { waitUntilDisplayed, waitUntilHidden, isVisible } from '../../util/utils';

const expect = chai.expect;

export default class NoticeUpdatePage {
  pageTitle: ElementFinder = element(by.id('enbApp.notice.home.createOrEditLabel'));
  saveButton: ElementFinder = element(by.id('save-entity'));
  cancelButton: ElementFinder = element(by.id('cancel-save'));
  titleInput: ElementFinder = element(by.css('input#notice-title'));
  messageInput: ElementFinder = element(by.css('textarea#notice-message'));
  openTimeInput: ElementFinder = element(by.css('input#notice-openTime'));
  closingTimeInput: ElementFinder = element(by.css('input#notice-closingTime'));
  editorSelect: ElementFinder = element(by.css('select#notice-editor'));

  getPageTitle() {
    return this.pageTitle;
  }

  async setTitleInput(title) {
    await this.titleInput.sendKeys(title);
  }

  async getTitleInput() {
    return this.titleInput.getAttribute('value');
  }

  async setMessageInput(message) {
    await this.messageInput.sendKeys(message);
  }

  async getMessageInput() {
    return this.messageInput.getAttribute('value');
  }

  async setOpenTimeInput(openTime) {
    await this.openTimeInput.sendKeys(openTime);
  }

  async getOpenTimeInput() {
    return this.openTimeInput.getAttribute('value');
  }

  async setClosingTimeInput(closingTime) {
    await this.closingTimeInput.sendKeys(closingTime);
  }

  async getClosingTimeInput() {
    return this.closingTimeInput.getAttribute('value');
  }

  async editorSelectLastOption() {
    await this.editorSelect.all(by.tagName('option')).last().click();
  }

  async editorSelectOption(option) {
    await this.editorSelect.sendKeys(option);
  }

  getEditorSelect() {
    return this.editorSelect;
  }

  async getEditorSelectedOption() {
    return this.editorSelect.element(by.css('option:checked')).getText();
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
    await this.setTitleInput('title');
    expect(await this.getTitleInput()).to.match(/title/);
    await waitUntilDisplayed(this.saveButton);
    await this.setMessageInput('message');
    expect(await this.getMessageInput()).to.match(/message/);
    await waitUntilDisplayed(this.saveButton);
    await this.setOpenTimeInput('01-01-2001');
    expect(await this.getOpenTimeInput()).to.eq('2001-01-01');
    await waitUntilDisplayed(this.saveButton);
    await this.setClosingTimeInput('01-01-2001');
    expect(await this.getClosingTimeInput()).to.eq('2001-01-01');
    await this.editorSelectLastOption();
    await this.save();
    await waitUntilHidden(this.saveButton);
    expect(await isVisible(this.saveButton)).to.be.false;
  }
}
