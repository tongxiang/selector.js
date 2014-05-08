function traverseDomAndCollectElements(startEl, matchFunc, matchParams) {
  var resultSet = [];
  if (typeof startEl === "undefined") {
    startEl = document.body;
  }
  if (matchFunc(startEl, matchParams)) {
    resultSet.push(startEl);
  }
 
  if (startEl.children.length === 0) {
    return resultSet;
  } else {
    var child, childResultSet;
    for (var i = 0; i < startEl.children.length; i++) {
      child = startEl.children[i];
      childResultSet = traverseDomAndCollectElements(child, matchFunc, matchParams);
      resultSet = resultSet.concat(childResultSet);
    }
    return resultSet;
  }
};
 
// $("div.big")
 
var $ = function(selector) {
  // figure out which selector this is. say if this is a tag selector
  if (selector.indexOf(".") < 0 && selector.indexOf("#") < 0) {
    traverseDomAndCollectElements(document.body, matchesAllParams, {tagName: selector}) //if there aren't any at all 
    
  } else if (selector.indexOf(".") === 0) {
    traverseDomAndCollectElements(document.body, matchesAllParams, {
      className: selector.slice(1,selector.length)
    });
  } else if (selector.indexOf(".") > 0) { //if there multiple differentts 
    var selectorComponents = selector.split(".");
    var extractedTagName = selectorComponents[0];
    var extractedClassName = selectorComponents[1];
    
    traverseDomAndCollectElements(document.body, matchesAllParams, {
      className: extractedClassName,
      tagName: extractedTagName
    });
  }
  
   // else if (selector is a tag.className selector) {
   //  var extractedTagName = ...;
   //  var extractedClassName = ...;
   //  
   //  traverseDomAndCollectElements(document.body, matchesAllParams, {
   //    className: extractedClassName,
   //    tagName: extractedTagName
   //  });
    
  // }
};
 
// element = startEl
// matchParams= {className: "big", tagName: "div", id: "jam"}
// $('div.big')
 

function matchesAllParams(element, matchParams) {
  for (key in matchParams) {
    if (key === 'className') {
      if (!element.classList.contains(matchParams[key])) {
        return false;
      }
    } else {
      if (element[key].toLowerCase() !== matchParams[key].toLowerCase())  {
        return false;
      }
    }
  }
  return true;  
}