import { BiostimeTreePage } from './app.po';

describe('biostime-tree App', () => {
  let page: BiostimeTreePage;

  beforeEach(() => {
    page = new BiostimeTreePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
