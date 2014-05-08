var traverseDomAndCollectElements = function(startEl, matchParams){
  var resultSet = [];

  if (typeof startEl == "undefined") {
    startEl = document.body;
  }

  if (startEl.children.length === 1){
    resultSet.push(startEl.children[0]);
  } else {
    if (Object.keys(matchParams).length > 1){ //for those cases with multiple search params
      if ('elementId' in matchParams){
        
      } else if ('elementClass' in matchParams){

      } else {

      }
    } else { //for cases with only one search param 
      if ('elementId' in matchParams){

      } else if ('elementClass' in matchParams){
        
      } else {
        
      }
    }  
  }
  return resultSet;
};

var $ = function(selector) {
  //selects for tags
  if (selector.indexOf('#') === 0){
    var searchId = selector.slice(1);
    traverseDomAndCollectElements(undefined, {elementId: searchId})
  } else if (selector.indexOf('.') === 0){
    var searchClass = selector.slice(1);
    traverseDomAndCollectElements(undefined, {elementClass: searchClass})
  } else if (selector.indexOf('.') > 0){
    var separatingIndex = selector.indexOf('.')
    var searchClass = selector.slice(separatingIndex);
    var searchTag = selector.slice(0, separatingIndex);
    traverseDomAndCollectElements(undefined, {elementTag: searchTag, elementClass: searchClass});
  } else {
    traverseDomAndCollectElements(undefined, {elementTag: selector});
  }
};