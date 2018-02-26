(function() {
  var Paging = function(options) {
    var defaultOptions = {
      element: null,
      currentPage: 1,
      totalPage: 10,
      prevTp: '上一页',
      nextTp: '下一页',
      firstTip: '首页',
      lastTip: '末页',
      ellipseTp: '...'
    }
    this.options = Object.assign({}, defaultOptions, options)

    this.checkOptions()
    this.initHtml()

    this.ul = document.querySelector('.paging-list')
    this.li = document.querySelectorAll('.paging-list li')
    this.btn = document.querySelectorAll('.paging-list button')
    this.liArr = Array.prototype.slice.call(this.li)
    this.btnArr = Array.prototype.slice.call(this.btn)
    this.firstTipButton = document.querySelector('.firstTip')
    this.prevTipButton = document.querySelector('.prevTp')
    this.nextTipButton = document.querySelector('.nextTp')
    this.lastTipButton = document.querySelector('.lastTip')

    this.defaultPage()
    this.bindEvents()
  }
  Paging.prototype = {
    checkOptions: function() {
      if (!this.options.element) {
        throw new Error('elemet is required')
      }
      return this
    },
    initHtml: function() {    
      var ul = '<ul class="paging-list"></ul>'
      var lis = []
      var leftButtonStr = '<button class="firstTip lf">' + this.options.firstTip + '</button>' + '<button class="prevTp lf">' + this.options.prevTp + '</button>'
      var rightButtonStr = '<button class="nextTp">' + this.options.nextTp + '</button>' + '<button class="lastTip">' + this.options.lastTip + '</button>'
      var totalPage = this.options.totalPage
      this.options.element.querySelector('.paging').innerHTML = ul
      for(var i = 0; i < totalPage; i++) {
        var domStr = ''
        if (i === 0) {
          domStr = leftButtonStr
        }
        domStr += '<li class="lf">' + (i+1) + '</li>'
        lis.push(domStr)
      }
      lis.push(rightButtonStr)
      var list = lis.toString().replace(/,/g,'')
      document.querySelector('.paging-list').innerHTML = list
    },
    bindEvents: function() {
      var _this= this

      this.liArr.forEach(function(item, index) {
        item.addEventListener('click', function() {
          _this.goToPage(index + 1)
          _this.checkButtons()
        })
      })
      this.btnArr.forEach(function(item, index) {
        item.addEventListener('click', function() {
          switch(index) {
            case 0:
              _this.goToPage(1)
              _this.checkButtons()
              break
            case 1:
              _this.goToPage(_this.options.currentPage -= 1)
              _this.checkButtons()
              break
            case 2:
              _this.goToPage(_this.options.currentPage += 1)
              _this.checkButtons()
              break
            case 3:
              _this.goToPage(_this.options.totalPage)
              _this.checkButtons()
              break
            default:
              break
          }
        })
      })
    },
    goToPage: function(page) {
      if (!page || page > this.options.totalPage) {
        return
      }
      var item = this.liArr[page - 1]
      removeOtherStyle(this.liArr, 'current')
      addClass(item, 'current')
      this.options.currentPage = page
    },
    checkButtons: function() {
      if (this.options.currentPage === 1) {
        this.firstTipButton.setAttribute('disabled', true)
        this.prevTipButton.setAttribute('disabled', true)
        this.nextTipButton.removeAttribute('disabled')
        this.lastTipButton.removeAttribute('disabled')
      } else if (this.options.currentPage === this.options.totalPage) {
        this.nextTipButton.setAttribute('disabled', true)
        this.lastTipButton.setAttribute('disabled', true)
        this.firstTipButton.removeAttribute('disabled')
        this.prevTipButton.removeAttribute('disabled')
      } else {
        this.firstTipButton.removeAttribute('disabled')
        this.prevTipButton.removeAttribute('disabled')
        this.nextTipButton.removeAttribute('disabled')
        this.lastTipButton.removeAttribute('disabled')
      }
    },
    defaultPage() {
      this.goToPage(1)
      this.checkButtons()
    }
  }
  window['Paging'] = Paging
})()