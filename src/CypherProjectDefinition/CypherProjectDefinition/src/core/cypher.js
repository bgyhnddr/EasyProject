var cypher = {
    loading: function (container) {
        var that = new Object();
        that.container = container ? container : $("body");

        that.show = function (text) {
            var loadingDiv = that.container.children("div.loading");


            if (loadingDiv.length == 0) {
                loadingDiv = $('<div class="loading"></div>').appendTo(that.container);


                if (that.container[0].tagName == "BODY") {
                    loadingDiv.css("position", "fixed");
                }
                function cancelBubble(e) {
                    if (e.stopPropagation) { e.stopPropagation(); }
                    else e.cancelBubble = true;
                }

                loadingDiv[0].addEventListener("mousedown", function (e) {
                    //防止冒泡
                    cancelBubble(e);
                    e.preventDefault();
                });

                loadingDiv[0].addEventListener("click", function (e) {
                    //防止冒泡
                    cancelBubble(e);
                    e.preventDefault();
                });
                that.contentDiv = $('<div class="content"></div>').appendTo(loadingDiv);
            }
            else {
                that.contentDiv = loadingDiv.children("div.content");
            }

            if (that.loadingSpan) {
                that.loadingSpan.remove();
            }
            if (that.textSpan) {
                that.textSpan.remove();
            }

            that.loadingSpan = $('<span class="loading"></span>');

            that.contentDiv.append(that.loadingSpan);
            if (text) {
                that.textSpan = $('<span class="text">' + text + '</span>');
                that.contentDiv.append(that.textSpan);
            }

            return that;
        };
        that.hide = function () {
            if (that.loadingSpan) {
                that.loadingSpan.remove();
            }
            if (that.textSpan) {
                that.textSpan.remove();
            }

            if (that.contentDiv.find("span").length == 0) {
                that.container.children("div.loading").remove();
            }
            return that;
        };
        return that;
    }
};


Array.prototype.delete = function (lam) {
    var thisArray = this;
    if ($.isFunction(lam)) {
        var deleteEls = $.grep(thisArray, lam);
        deleteEls.forEach(function (el, index) {
            thisArray.splice(thisArray.indexOf(el), 1);
        });
    }
    else
    {
        thisArray.splice(thisArray.indexOf(lam), 1);
    }
};