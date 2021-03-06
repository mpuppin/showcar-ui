SURROGATE_PAIR_REGEXP = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
NON_ALPHANUMERIC_REGEXP = /([^#-~| |!])/g;

function encodeEntities(value) {
    return value.replace(/&/g, '&amp;').replace(SURROGATE_PAIR_REGEXP, function (value) {
        var hi = value.charCodeAt(0);
        var low = value.charCodeAt(1);
        return '&#' + (((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000) + ';';
    }).replace(NON_ALPHANUMERIC_REGEXP, function (value) {
        return '&#' + value.charCodeAt(0) + ';';
    }).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
function formatCode(target) {
    var elements = document.querySelectorAll(target);
    for (i = 0; i < elements.length; i++) {
        var content = elements[i].innerHTML;
        if (content) {
            content = content.trim();
            if (content.indexOf('<!--') === 0 && content.lastIndexOf('-->') === (content.length - 3)) {
                content = content.substring(4);
                content = content.substring(0, content.length - 3);
                content.trim();
            }
            elements[i].innerHTML = encodeEntities(content);
        }
    }
}
formatCode('.js-format-code');
