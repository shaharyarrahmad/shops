/**
 * Removes all HTML from Vendure description
 * @param str
 * @returns {string}
 */
function getRawText(str) {
    if(!str) {
        return;
    }
    str = str.replace(/<[^>]*>?/gm, ' '); // replace html
    str = str.replace(/&nbsp;/g, ' '); // replace &nbsp;
    return str.replace(/\s\s+/g, ' '); // repalce double spaces
}

module.exports = {
    getRawText
}