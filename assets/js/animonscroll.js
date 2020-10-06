!(function (window) {
    "use strict";
    var docElem = window.document.documentElement;
    function getViewportH() {
        var client = docElem.clientHeight,
            inner = window.innerHeight;
        return client < inner ? inner : client;
    }
    function scrollY() {
        return window.pageYOffset || docElem.scrollTop;
    }
    function getOffset(el) {
        var offsetTop = 0,
            offsetLeft = 0;
        do {
            isNaN(el.offsetTop) || (offsetTop += el.offsetTop), isNaN(el.offsetLeft) || (offsetLeft += el.offsetLeft);
        } while ((el = el.offsetParent));
        return { top: offsetTop, left: offsetLeft };
    }
    function inViewport(el, h) {
        var elH = el.offsetHeight,
            scrolled = scrollY(),
            viewed = scrolled + getViewportH(),
            elTop = getOffset(el).top,
            elBottom,
            h;
        return elTop + elH * (h = h || 0) <= viewed && elTop + elH - elH * h >= scrolled;
    }
    function extend(a, b) {
        for (var key in b) b.hasOwnProperty(key) && (a[key] = b[key]);
        return a;
    }
    function AnimOnScroll(el, options) {
        (this.el = el), (this.options = extend(this.defaults, options)), this._init();
    }
    (AnimOnScroll.prototype = {
        defaults: { minDuration: 0, maxDuration: 0, viewportFactor: 0 },
        _init: function () {
            (this.items = Array.prototype.slice.call(document.querySelectorAll("#" + this.el.id + " > li"))), (this.itemsCount = this.items.length), (this.itemsRenderedCount = 0), (this.didScroll = !1);
            var self = this;
            imagesLoaded(this.el, function () {
                new Masonry(self.el, { itemSelector: "li", transitionDuration: 0 }),
                    Modernizr.cssanimations &&
                        (self.items.forEach(function (el, i) {
                            inViewport(el) && (self._checkTotalRendered(), classie.add(el, "shown"));
                        }),
                        window.addEventListener(
                            "scroll",
                            function () {
                                self._onScrollFn();
                            },
                            !1
                        ),
                        window.addEventListener(
                            "resize",
                            function () {
                                self._resizeHandler();
                            },
                            !1
                        ));
            });
        },
        _onScrollFn: function () {
            var self = this;
            this.didScroll ||
                ((this.didScroll = !0),
                setTimeout(function () {
                    self._scrollPage();
                }, 60));
        },
        _scrollPage: function () {
            var self = this;
            this.items.forEach(function (el, i) {
                classie.has(el, "shown") ||
                    classie.has(el, "animate") ||
                    !inViewport(el, self.options.viewportFactor) ||
                    setTimeout(function () {
                        var perspY = scrollY() + getViewportH() / 2;
                        if (
                            ((self.el.style.WebkitPerspectiveOrigin = "50% " + perspY + "px"),
                            (self.el.style.MozPerspectiveOrigin = "50% " + perspY + "px"),
                            (self.el.style.perspectiveOrigin = "50% " + perspY + "px"),
                            self._checkTotalRendered(),
                            self.options.minDuration && self.options.maxDuration)
                        ) {
                            var randDuration = Math.random() * (self.options.maxDuration - self.options.minDuration) + self.options.minDuration + "s";
                            (el.style.WebkitAnimationDuration = randDuration), (el.style.MozAnimationDuration = randDuration), (el.style.animationDuration = randDuration);
                        }
                        classie.add(el, "animate");
                    }, 25);
            }),
                (this.didScroll = !1);
        },
        _resizeHandler: function () {
            var self = this;
            function delayed() {
                self._scrollPage(), (self.resizeTimeout = null);
            }
            this.resizeTimeout && clearTimeout(this.resizeTimeout), (this.resizeTimeout = setTimeout(delayed, 1e3));
        },
        _checkTotalRendered: function () {
            ++this.itemsRenderedCount, this.itemsRenderedCount === this.itemsCount && window.removeEventListener("scroll", this._onScrollFn);
        },
    }),
        (window.AnimOnScroll = AnimOnScroll);
})(window);
