import {
  BasicCollection,
  CalculatedProduct,
  SortableCollection,
} from '../vendure/types';
import {
  CollectionFieldsFragment,
  ProductFieldsFragment,
} from '../generated/graphql';
import { deduplicate, setCalculatedFields } from './product.util';

/**
 * By default the collection graphql query returns all child and parent collections in one flat array.
 * This function sets the correct childCollections for each topLevel collection.
 */
export function unflatten(
  allCollections: BasicCollection[]
): SortableCollection[] {
  // Get toplevel collections
  let collections = allCollections.filter(
    (col) => col.parent?.name === '__root_collection__'
  );
  // Find and set child collections, because queried children only have id and name fields
  return collections.map((collection) =>
    getChildCollection(collection, allCollections)
  );
}

/**
 * Recursively gets childCollections for given collection
 */
export function getChildCollection(
  collection: BasicCollection,
  allCollections: BasicCollection[]
): SortableCollection {
  const fullChildren = collection.children?.map((originalChild) => {
    let fullChildCollection = allCollections.find(
      (c) => c.id === originalChild.id
    );
    if (!fullChildCollection) {
      throw Error(
        `Child collection ${originalChild.name} is not in allCollections list`
      );
    }
    if (fullChildCollection?.children?.length) {
      fullChildCollection = getChildCollection(
        fullChildCollection,
        allCollections
      );
    }
    return fullChildCollection;
  });
  return {
    ...collection,
    children: fullChildren,
  } as SortableCollection;
}

/**
 * Find products that belong to the given Collection
 */
export function getProductsForCollection(
  collection: CollectionFieldsFragment,
  allProducts: ProductFieldsFragment[]
): CalculatedProduct<ProductFieldsFragment>[] {
  let productsPerCollection: ProductFieldsFragment[] =
    collection.productVariants.items
      .map((variant) =>
        allProducts.find((product) => product.id === variant.product.id)
      )
      .filter((product): product is ProductFieldsFragment => !!product);
  productsPerCollection = deduplicate(productsPerCollection);
  return productsPerCollection.map((p) => setCalculatedFields(p));
}
