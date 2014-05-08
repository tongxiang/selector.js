var matchFunc = function(element, matchParams){
  var isTargetElement = false;
  for (key in matchParams){
    if (key === 'className' && (matchParams[key] === element.className)){
      isTargetElement = true;  
    } else if (key === 'className' && matchParams[key] != element.className){
      return false; 
    }

    if (key === 'id' && (matchParams[key] === element.id)){
      isTargetElement = true;
    } else if (key === 'id' && (matchParams[key] != element.id)){
      return false;
    }

    if (key === 'tagName' && (matchParams[key] === element.tagName)){
      isTargetElement = true;
    } else if (key === 'tagName' && (matchParams[key] != element.tagName)){
      return false;
    }
  }
  return isTargetElement;
}


var traverseDomAndCollectElements = function(startEl, matchFunc, matchParams){
  var resultSet = [];

  if (typeof startEl == "undefined") {
    startEl = document.body;
  }

  if (matchFunc(startEl, matchParams)){
    resultSet.push(startEl);
  }

  if (startEl.children.length === 0){
    return resultSet;
  } else {
    for (i = 0; i < startEl.children.length; i ++){
      var childResultSet = traverseDomAndCollectElements(startEl.children[i], matchFunc, matchParams);
      resultSet = resultSet.concat(childResultSet);
    }
    return resultSet;
  }
};

var $ = function(selector) {
  //selects for tags
  if (selector.indexOf('#') === 0){
    var searchId = selector.slice(1);
    traverseDomAndCollectElements(undefined, matchFunc, {id: searchId})
  } else if (selector.indexOf('.') === 0){
    var searchClass = selector.slice(1);
    traverseDomAndCollectElements(undefined, matchFunc, {className: searchClass})
  } else if (selector.indexOf('.') > 0){
    var separatingIndex = selector.indexOf('.')
    var searchClass = selector.slice(separatingIndex);
    var searchTag = selector.slice(0, separatingIndex);
    traverseDomAndCollectElements(undefined, matchFunc, {tagName: searchTag, className: searchClass});
  } else {
    traverseDomAndCollectElements(undefined, matchFunc, {tagName: selector});
  }
};