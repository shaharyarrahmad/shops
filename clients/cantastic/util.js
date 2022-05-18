/**
 * Set html color on variant.bgColor and
 * inverted color for variant.textColor
 * for all variants of swatchable products
 */
function setSwatchColors(product, facetCode, defaultColor) {
  try {
    const colorChart = require(`./src/data/${facetCode}.json`);
    product.variants.forEach((variant) => {
      variant.bgColor = colorChart[variant.options[0].name] || defaultColor;
      variant.textColor = getContrastingColor(variant.bgColor);
    });
    product.variants = sortByColorChart(product.variants, colorChart);
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      // Re-throw not "Module not found" errors
      throw e;
    }
    throw Error(
      `No colorChart found for product ${product.name} with name '${facetCode}.json'`
    );
  }
}

/**
 * Sort variants based on the defined order in colorChart
 * Undefined colors are moved to bottom
 */
function sortByColorChart(variants, colorChart) {
  const orderedColors = Object.keys(colorChart);
  return variants.sort((a, b) => {
    const posA = orderedColors.indexOf(a.options[0].name);
    const posB = orderedColors.indexOf(b.options[0].name);
    if (posB === -1) {
      return -1; // If no posB, move A up
    } else if (posA === -1) {
      return 1; // If no posB, move B up
    } else {
      return posA - posB;
    }
  });
}

/**
 * Determine black or white contract depending on given background color
 */
function getContrastingColor(bgColor) {
  const color = bgColor.charAt(0) === '#' ? bgColor.substring(1, 7) : bgColor;
  const r = parseInt(color.substring(0, 2), 16); // hexToR
  const g = parseInt(color.substring(2, 4), 16); // hexToG
  const b = parseInt(color.substring(4, 6), 16); // hexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? '#000000' : '#ffffff';
}

module.exports = { setSwatchColors, sortByColorChart, getContrastingColor };
