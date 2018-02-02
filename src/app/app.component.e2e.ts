import { browser, by, element } from 'protractor';

import { } from 'jasmine';
import { protractor } from 'protractor/built/ptor';

describe('AppComponent', () => {

  beforeAll(async () => {
    await browser.get('http://localhost:4200');
  });

  it('should have a page title', async () => {
    const subject = await browser.getTitle();
    expect(subject).toEqual('Angular Todo List');
  });

  it('should create new todo', async () => {
    const createNewTodoButton = await element(by.id('createNewTodoButton'));
    await createNewTodoButton.click();

    await browser.driver.sleep(2000);

    await element(by.id('title-field')).sendKeys('blabla');
    await element(by.id('description-field')).sendKeys('blublu');
    await element(by.id('urgentTask-field')).click();
    await element(by.className('btn-warning')).click();
    const todoCount = await element(by.className('badge-info')).getText();
    expect(todoCount).toBeTruthy();
  });

  it('should search through todos', async () => {
    await element(by.id('example-search-input')).sendKeys('sdv');
    await browser.actions().sendKeys(protractor.Key.ENTER).perform();

    const todoCount = await element(by.className('badge-info')).getText();
    expect(todoCount).toBe('0');

    const noTodos = await element(by.id('noTodos')).getText();

    expect(noTodos).toEqual('No todos found !');
  });
});
