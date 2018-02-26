function hasClass(el, className) {
  var reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
function removeClass(el, className) {
  if (hasClass(el, className)) {
    var newClass = ' ' + el.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + className + ' ') >= 0) {
      newClass = newClass.replace(' ' + className + ' ', ' ');
    }
    el.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}
function removeOtherStyle(el, activeClassName) {
  for(var i = 0; i < el.length; i++) {
    removeClass(el[i], activeClassName)
  }
}