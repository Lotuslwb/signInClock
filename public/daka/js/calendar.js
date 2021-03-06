;(function ($, window, document, undefined) {

    var monthEnglish = {
        '01': 'January',
        '02': 'February',
        '03': 'March',
        '04': 'April',
        '05': 'May',
        '06': 'June',
        '07': 'July',
        '08': 'August',
        '09': 'September',
        '10': 'October',
        '11': 'November',
        '12': 'December'
    }

    var Calendar = function (elem, options) {
        this.$calendar = elem;

        this.defaults = {
            ifSwitch: true,
            hoverDate: false,
            backToday: false
        };

        this.opts = $.extend({}, this.defaults, options);

    };

    Calendar.prototype = {
        showHoverInfo: function (obj) { // hover 时显示当天信息
            var _dateStr = $(obj).attr('data');
            var offset_t = $(obj).offset().top + (this.$calendar_today.height() - $(obj).height()) / 2;
            var offset_l = $(obj).offset().left + $(obj).width();
            var changeStr = _dateStr.substr(0, 4) + '-' + _dateStr.substr(4, 2) + '-' + _dateStr.substring(6);
            var _week = changingStr(changeStr).getDay();
            var _weekStr = '';

            this.$calendar_today.show();

            this.$calendar_today
                .css({left: offset_l + 30, top: offset_t})
                .stop()
                .animate({left: offset_l + 16, top: offset_t, opacity: 1});

            switch (_week) {
                case 0:
                    _weekStr = '星期日';
                    break;
                case 1:
                    _weekStr = '星期一';
                    break;
                case 2:
                    _weekStr = '星期二';
                    break;
                case 3:
                    _weekStr = '星期三';
                    break;
                case 4:
                    _weekStr = '星期四';
                    break;
                case 5:
                    _weekStr = '星期五';
                    break;
                case 6:
                    _weekStr = '星期六';
                    break;
            }

            this.$calendarToday_date.text(changeStr);
            this.$calendarToday_week.text(_weekStr);
        },

        showCalendar: function () { // 输入数据并显示
            var self = this;
            var year = dateObj.getDate().getFullYear();
            var month = dateObj.getDate().getMonth() + 1;
            var dateStr = returnDateStr(dateObj.getDate());
            var firstDay = new Date(year, month - 1, 1); // 当前月的第一天
            var timeArray = self.opts.TimeArray;
            var articleTime = self.opts.articleTime;
            var articleTimeList = articleTime.filter(function (item) {
                return item * 1 > 1000 ? item * 1 : false;
            });
            var today = returnDateStr(new Date()) * 1;
            var maxTime = Math.max(...articleTimeList);
            var minTime = Math.min(...articleTimeList);
            console.log(maxTime, minTime);

            if (returnDateStr(new Date(year, month - 1, 1)) * 1 <= minTime) {
                this.$arrow_prev = this.$calendar_title.find('.arrow-prev').addClass('disable');
            } else {
                this.$arrow_prev = this.$calendar_title.find('.arrow-prev').removeClass('disable');
            }

            if (returnDateStr(new Date(year, month - 1, 30)) * 1 >= maxTime) {
                this.$arrow_next = this.$calendar_title.find('.arrow-next').addClass('disable');
            } else {
                this.$arrow_next = this.$calendar_title.find('.arrow-next').removeClass('disable');
            }

            this.$calendarTitle_text.text(monthEnglish[dateStr.substr(4, 2)]);
            this.$calendarDate_item.each(function (i) {
                // allDay: 得到当前列表显示的所有天数
                var allDay = new Date(year, month - 1, i + 1 - firstDay.getDay());
                var allDay_str = returnDateStr(allDay);
                $(this).text(allDay.getDate()).attr('data', allDay_str);
                if (returnDateStr(firstDay).substr(0, 6) === allDay_str.substr(0, 6)) {
                    //当前月
                    if ($.inArray(allDay_str + '', timeArray) >= 0 && allDay_str <= today) {
                        // 已读
                        $(this).attr('class', 'item item-curDay');
                    } else if ($.inArray(allDay_str + '', articleTime) >= 0 && allDay_str <= today) {
                        // 未读
                        $(this).attr('class', 'item item-unreadyDay');
                    } else {
                        $(this).attr('class', 'item item-curMonth');
                    }
                } else {
                    //非当前月
                    $(this).attr('class', 'item');
                }
            });
        },

        renderDOM: function () { // 渲染DOM
            this.$calendar_title = $('<div class="calendar-title"></div>');
            this.$calendar_week = $('<ul class="calendar-week"></ul>');
            this.$calendar_date = $('<ul class="calendar-date"></ul>');
            this.$calendar_today = $('<div class="calendar-today"></div>');


            var _titleStr = '<a href="#" class="title"></a>' +
                '<a href="javascript:;" class="number"> <span class="number-icon"></span>已读<br/><span class="number-disable-icon"></span>未读</a>' +
                '<div class="info"></div>';

            _titleStr += '<div class="arrow">' +
                '<img class="arrow-prev" src="/daka/img/arrow-prev.png" />' +
                '<img class="arrow-next" src="/daka/img/arrow-next.png" />' +
                '</div>';

            var _weekStr = '<li class="item">S</li>' +
                '<li class="item">M</li>' +
                '<li class="item">T</li>' +
                '<li class="item">W</li>' +
                '<li class="item">T</li>' +
                '<li class="item">F</li>' +
                '<li class="item">S</li>';
            var _dateStr = '';
            var _dayStr = '<i class="triangle"></i>' +
                '<p class="date"></p>' +
                '<p class="week"></p>';

            for (var i = 0; i < 6; i++) {
                _dateStr += '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>' +
                    '<li class="item">26</li>';
            }

            this.$calendar_title.html(_titleStr);
            this.$calendar_week.html(_weekStr);
            this.$calendar_date.html(_dateStr);
            this.$calendar_today.html(_dayStr);

            this.$calendar.append(this.$calendar_title, this.$calendar_week, this.$calendar_date, this.$calendar_today);
            this.$calendar.show();
        },

        inital: function () { // 初始化
            var self = this;

            this.renderDOM();

            this.$calendarTitle_text = this.$calendar_title.find('.title');
            this.$backToday = $('#backToday');
            this.$arrow_prev = this.$calendar_title.find('.arrow-prev');
            this.$arrow_next = this.$calendar_title.find('.arrow-next');
            this.$calendarDate_item = this.$calendar_date.find('.item');
            this.$calendarToday_date = this.$calendar_today.find('.date');
            this.$calendarToday_week = this.$calendar_today.find('.week');

            this.showCalendar();


            if (this.opts.ifSwitch) {
                this.$arrow_prev.bind('click', function () {
                    if ($(this).hasClass('disable')) {
                        return false;
                    }
                    var _date = dateObj.getDate();
                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() - 1, 1));
                    self.showCalendar();
                });

                this.$arrow_next.bind('click', function () {
                    if ($(this).hasClass('disable')) {
                        return false;
                    }
                    var _date = dateObj.getDate();
                    dateObj.setDate(new Date(_date.getFullYear(), _date.getMonth() + 1, 1));
                    self.showCalendar();
                });
            }

            if (this.opts.backToday) {
                this.$backToday.bind('click', function () {
                    if (!self.$calendarDate_item.hasClass('item-curDay')) {
                        dateObj.setDate(new Date());

                        self.showCalendar();
                    }
                });
            }

            // this.$calendarDate_item.hover(function () {
            //     self.showHoverInfo($(this));
            // }, function () {
            //     self.$calendar_today.css({left: 0, top: 0}).hide();
            // });
        },

        constructor: Calendar
    };

    $.fn.calendar = function (options) {
        var calendar = new Calendar(this, options);

        return calendar.inital();
    };


    // ========== 使用到的方法 ==========

    var dateObj = (function () {
        var _date = new Date();

        return {
            getDate: function () {
                return _date;
            },

            setDate: function (date) {
                _date = date;
            }
        }
    })();

    function returnDateStr(date) { // 日期转字符串
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        month = month <= 9 ? ('0' + month) : ('' + month);
        day = day <= 9 ? ('0' + day) : ('' + day);

        return year + month + day;
    };

    function changingStr(fDate) { // 字符串转日期
        var fullDate = fDate.split("-");

        return new Date(fullDate[0], fullDate[1] - 1, fullDate[2]);
    };


})(jQuery, window, document);