export interface StaticPages {
  /**
   * Available data: {@link PageGenerator#createProductOverview}
   */
  home: Page;

  /**
   * Available data: {@link PageGenerator#createProductDetails}
   */
  productDetail: Page;

  /**
   * Available data: {@link PageGenerator#createProductDetails}
   */
  collection: Page;
}

export interface Page {
  slug: string;
  template: string;
}
