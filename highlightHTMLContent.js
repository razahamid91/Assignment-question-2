// highlightHTMLContent.js

function highlightHTMLContent(htmlContent, plainText, plainTextPositions) {
    function findHTMLPositions(plainTextPos) {
      const plainTextStart = plainText.slice(0, plainTextPos.start);
      const plainTextEnd = plainText.slice(0, plainTextPos.end);
      const htmlStart = htmlContent.indexOf(plainTextStart);
      const htmlEnd = htmlContent.indexOf(plainTextEnd, htmlStart) + plainTextEnd.length;
      return { start: htmlStart, end: htmlEnd };
    }
  
    plainTextPositions.sort((a, b) => a.start - b.start);
  
    let modifiedHTML = htmlContent;
    let offset = 0;
  
    for (const pos of plainTextPositions) {
      const { start, end } = findHTMLPositions(pos);
  
      const openTag = '<mark>';
      const closeTag = '</mark>';
      const openTagWithOffset = openTag.length + offset;
      const closeTagWithOffset = closeTag.length + offset;
  
      modifiedHTML = modifiedHTML.slice(0, start + offset) + openTag + modifiedHTML.slice(start + offset);
      offset += openTagWithOffset;
  
      modifiedHTML = modifiedHTML.slice(0, end + offset) + closeTag + modifiedHTML.slice(end + offset);
      offset += closeTagWithOffset;
    }
  
    return modifiedHTML;
  }
  
  module.exports = highlightHTMLContent;
  