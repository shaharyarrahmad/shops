export interface StaticPages {
  /**
   * Available data: {@link PageGenerator#createProductOverview}
   */
  home: Page;

  /**
   * Available data: {@link PageGenerator#createProductDetails}
   */
  productDetail: DetailPage;

  /**
   * Available data: {@link PageGenerator#createCollectionDetails}
   */
  collectionDetail: DetailPage;
}

export interface Page {
  slug: string;
  template: string;
}

export interface DetailPage {
  slugPrefix?: string;
  template: string;
}
