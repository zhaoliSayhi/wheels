(function() {
  var Tabs = function(options) {
    var defaultOptions = {
      element: '',
      navSelector: '.tabs-nav',
      panesSelector: '.tabs-panes',
      activeClassName: 'active'
    }
    this.options = Object.assign({}, defaultOptions, options)
    this.checkOptions()
    this.bindEvents()
    this.setDefaultTab()
  }
  Tabs.prototype = {
    checkOptions: function() {
      if (!this.options.element) {
        throw new Error('elemet is required')
      }
      return this
    },
    bindEvents: function() {
      var _this = this
      var tabNav = this.options.element.querySelector(this.options.navSelector)
      tabNav.addEventListener('click', function(e) {
        var li = e.target
        var navs = tabNav.querySelectorAll('li')
        var navArr = Array.prototype.slice.call(navs)
        var index = navArr.indexOf(li) // 选择的索引
        navStyle = navArr[index]
        removeOtherStyle(navs, _this.options.activeClassName)
        addClass(navStyle, _this.options.activeClassName)

        var panesNav = _this.options.element.querySelector(_this.options.panesSelector)
        var panes = panesNav.querySelectorAll('li')
        var panesArr = Array.prototype.slice.call(panes)
        var panseShow = panesArr[index]

        removeOtherStyle(panes, _this.options.activeClassName)
        addClass(panseShow, _this.options.activeClassName)
      })
    },
    setDefaultTab: function() {
      this.options.element.querySelector(this.options.navSelector + '> li:first-child').click()
    }
  }
  window['Tabs'] = Tabs
})()