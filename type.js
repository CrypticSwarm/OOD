exports.$type = function(obj){
  if (obj == undefined) return false;
  if (obj.$family) return (obj.$family.name == 'number' && !isFinite(obj)) ? false : obj.$family.name;
  if (obj.nodeName){
    switch (obj.nodeType){
      case 1: return 'element';
      case 3: return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
    }
  } else if (typeof obj.length == 'number'){
    if (obj.callee) return 'arguments';
    else if (obj.item) return 'collection';
  }
  return typeof obj;
};