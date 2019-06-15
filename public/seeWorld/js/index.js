var mySwiper;
var timer;
var dataset = {
    name: '', //宝贝名字
    gender: '', //宝贝性别
    landScore: 0, //去过的大洲计分
    countryScore: 0, //去过的国家计分
    country: [], //去过的国家列表
    posterCountry: '', //今年去的国家
    uploadImg: '', //用户上传的图片key
};

function indexHanlder() {
    this.init();
    this.initUpload();
}
indexHanlder.prototype = {
    init: function () {
        this.countryScore = 0;
        this.initMain();
        this.bindEvnet(this);
        this.initQcode();

        //test
        this.genPoster();
    },
    genPoster: function () {
        $('.file-img')[0].onload(function () {
            html2canvas(document.querySelector("#tpl")).then(function (canvas) {
                $('.poster-page .canvas').append(canvas);
            });
        })
    },
    initQcode: function () {
        new QRCode($('#qcode')[0], {
            text: window.location.href,
            width: 140,
            height: 140,
            correctLevel: QRCode.CorrectLevel.H
        });
    },
    initPoster: function () {
        var percent = getPercent(dataset.countryScore) + '%';
        var tab = `·${ getTab(dataset.countryScore)}·`;
        $('.file-img').attr('src', '/qiniuProxy/' + dataset.uploadImg);
        $('.fill-posterCountry').text(dataset.posterCountry);
        $('.panel .fill-name').text(dataset.name);
        $('.panel .fill-landScore').text(dataset.landScore);
        $('.panel .fill-countryScore').text(dataset.countryScore);
        $('.panel .fill-percent').text(percent);
        $('.panel .fill-tab').text(tab);

        function getPercent(countryScore) {
            return 79.00 + countryScore * 0.5;
        }

        function getTab(countryScore) {
            if (countryScore <= 10) {
                return '环球旅行家';
            } else if (countryScore <= 20) {
                return '世界小公民';
            } else if (countryScore <= 30) {
                return '联合国大使';
            } else {
                return '空中小飞人';
            }
        }
    },
    initUpload: function () {
        var me = this;
        qiniuInit();
        $('#J-upload').change(function () {
            var file = this.files[0];
            lrz(file).then(function (rst) {
                var img = new Image();
                img.src = rst.base64;
                img.onload = function () {
                    me.width = img.width, me.height = img.height;
                    $('.m-clip-box').addClass('active').find('.editPic-box').html(img);
                    var $img = $('.m-clip-box .editPic-box').find('img').addClass('J-img');
                    handleImg($img);
                };
            })
        })

        $('.J-pic-cancel').click(function () {
            $('.m-clip-box').removeClass('active');
        })

        $('.J-compose').click(function () {
            var targetBoxLeft = 52,
                targetBoxTop = 252;

            var canvas = $('#myCanvas')[0];
            var canvasContext = canvas.getContext("2d");
            var sx = $('.J-img').offset().left - targetBoxLeft;
            var sh = $('.J-img').offset().top - targetBoxTop;
            var imgW = $(".J-img").width(),
                imgH = $('.J-img').height();
            canvasContext.save();

            canvasContext.rect(0, 0, 658, 440);
            canvasContext.fillStyle = "#ffffff";
            canvasContext.fill();

            canvasContext.drawImage($(".J-img")[0], 0, 0, me.width, me.height, sx, sh, imgW, imgH);
            canvasContext.restore();

            var png = Canvas2Image.convertToJPEG(canvas, 658, 440);
            $('.uploadBox').find('.J-file').html(png);
            $('.m-clip-box').removeClass('active');
            var imgData = $(png).attr('src');
            qiniuUpload(convertBase64UrlToBlob(imgData), function (data) {
                me.uploadImg = dataset['uploadImg'] = data.key;
                checkGen()
            });
        });

        $('.J-posterCountry').on('input', function () {
            checkGen();
            dataset['posterCountry'] = $(this).val();
        })

        function checkGen() {
            if (me.uploadImg && $('.J-posterCountry').val()) {
                $('.genposter-page .btn').addClass('active')
            } else {
                $('.genposter-page .btn').removeClass('active')
            }
            console.log(dataset);
        }


        function qiniuInit() {
            $.ajax({
                type: 'get',
                data: {
                    scope: 'xmly'
                },
                url: '/qiniu/api/getToken',
                success: function (data) {
                    if (data.status == 200) {
                        me.qiniuToken = data.data.uploadToken;
                        console.log(data);
                    } else {
                        console.error(data)
                    }
                },
                dataType: 'json'
            });
        }

        function qiniuUpload(file, cb) {
            console.log(file);
            var observable = qiniu.upload(file, new Date() * 1, me.qiniuToken, {}, {
                useCdnDomain: false,
                region: qiniu.region.z0
            })
            observable.subscribe({
                next(res) {
                    console.log(res);
                },
                error(err) {
                    console.log(err);
                },
                complete(res) {
                    cb(res);
                    console.log(res, 'complete');
                }
            }) // 上传开始
        }

        function handleImg($img) {
            $img.pep({
                shouldEase: false,
                useCSSTranslation: false
            });

            //固定的Selection长宽
            var SelectHeight = $('body').height(),
                SelectWidth = $('body').width();

            // mover 缩放
            var imgW = $img.width(),
                imgH = $img.height();

            touch.on('.J-img', 'touchstart', function (ev) {
                ev.preventDefault();
            });
            touch.on('.J-img', 'touchend', function (ev) {

            });
            touch.on('.J-img', 'pinchstart', function (ev) {
                ev.preventDefault();

                imgW = $img.width();
                imgH = $img.height();

                $.pep.unbind($img);
            });
            touch.on('.J-img', 'pinchend', function (ev) {
                $(".selecton").css({
                    "height": 0
                });
                $($img).pep({
                    shouldEase: false,
                    useCSSTranslation: false
                });
            });
            touch.on('.J-img', 'pinch', function (ev) {
                var imgScale = imgW / imgH;
                var minScale = 0.2,
                    maxScale = 1.5;
                var base = ev.scale;
                var w = imgW * base;
                var h = imgH * base;
                if (h > SelectHeight * maxScale) {
                    h = SelectHeight * maxScale;
                    w = SelectHeight * maxScale * imgScale;
                }
                if (w > SelectWidth * maxScale) {
                    w = SelectWidth * maxScale;
                    h = SelectWidth * maxScale / imgScale;
                }
                if (h < imgH * minScale) {
                    h = imgH * minScale;
                    w = imgH * minScale * imgScale;
                }
                if (w < imgW * minScale) {
                    w = imgW * minScale;
                    h = imgW * minScale / imgScale;
                }
                //alert(JSON.stringify({"width": imgW, "height": imgH}));
                $img.css({
                    "width": w,
                    "height": h
                });
            });
        }

        /**
         * 将以base64的图片url数据转换为Blob
         * @param urlData
         * 用url方式表示的base64图片数据
         */
        function convertBase64UrlToBlob(urlData) {

            var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte

            //处理异常,将ascii码小于0的转换为大于0
            var ab = new ArrayBuffer(bytes.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < bytes.length; i++) {
                ia[i] = bytes.charCodeAt(i);
            }

            return new Blob([ab], {
                type: 'image/jpeg'
            });
        }
    },
    initMain: function () {
        var html = '';
        mainlandInfo.map(item => {
            html +=
                `<div class="mainlandBox ${item.key
                }" data-land='${item.key}'><span class="shou"></span><img src="./img/${item.key}.png" alt="" class="mainland"></div>`
        })
        $('.mainlandList').html(html);
        $('.mainlandList .mainlandBox').eq(0).addClass('active');
    },
    bindEvnet: function () {
        var me = this;

        $('.J-slideNext').click(function () {
            if ($(this).hasClass('active')) {
                if ($(this).parents('.swiper-slide').data('page') == 'gender') {
                    var gender = $("[data-name='gender']").find('.Q-item.active').data('value');
                    $('.main-page .person').addClass(gender);
                    me.gotoLand('Europe');
                    dataset['gender'] = gender;
                    dataset['name'] = $('.gender-page .J-input').val();
                } else if ($(this).parents('.swiper-slide').data('page') == 'genPoster') {
                    me.initPoster();
                }
                mySwiper.slideNext();
            }
        })
        $('.Q-item').click(function () {
            var $page = $(this).parents('.swiper-slide');
            $(this).addClass('active').siblings('.Q-item').removeClass('active');
            checkpage($page);
        })

        $('.J-alert-list').on('click', '.Q-item', function () {
            if ($(this).hasClass('lock')) {
                return false;
            }

            var v = $(this).data('value');
            if (v == 0) {
                $(this).addClass('active').siblings('.Q-item').removeClass('active');
            } else {
                $(this).siblings('.Q-item[data-value=0]').removeClass('active');
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active')
                } else {
                    $(this).addClass('active')
                }
            }
        });
        $('.J-alert-list').on('click', '.singleQ-item', function () {
            $(this).addClass('active').siblings('.singleQ-item').removeClass('active');
        });

        $('.main-page .overlay').on('click', '.next-land', function () {
            var $list = $(this).parents('.main-page').find('.J-alert-list');
            var currentLand = $list.data('land');
            var currentIndex = mainlandInfo.findIndex(item => item.key == currentLand)
            var nextIndex = currentIndex + 1;
            var nextLandObj = mainlandInfo[nextIndex];
            var countryScore = 0;
            $('.mainlandBox').eq(currentIndex).hide();
            $('.mainlandBox').eq(nextIndex).addClass('active').siblings().removeClass('active');
            $('.main-page .overlay').removeClass('active');
            me.gotoLand(nextLandObj.key);

            //保存数据
            $list.find('.Q-item.active').each(function () {
                countryScore += $(this).data('value') * 1;
                dataset['country'].push($(this).data('country'));
            })
            dataset['countryScore'] += countryScore * 1;
            if (countryScore > 0) {
                dataset['landScore']++;
            }
            // console.log(dataset);
        })
        $('.main-page .overlay').on('click', '.finished-land', function () {
            var $list = $(this).parents('.main-page').find('.J-alert-list');
            //保存数据
            $list.find('.Q-item.active').each(function () {
                if ($(this).data('value') * 1 > 0) {
                    dataset['country'].push($(this).data('country'));
                    dataset['countryScore'] += 1;
                    dataset['landScore'] += 1;
                }
            })
            console.log(dataset);

            $('.main-page .overlay').removeClass('active');
            me.gotoLand('Finished');
        })


        $('.mainlandBox').click(function () {
            if (!$(this).hasClass('active')) return false;
            var land = $(this).data('land');
            var data = mainlandInfo.find(item => item.key == land);
            var isAntarctica = (land == 'Antarctica')
            me.genQitem(data, isAntarctica);
            $('.main-page .overlay').addClass('active');
        })

        $('.J-input').on('input', function () {
            var $page = $(this).parents('.swiper-slide');
            checkpage($page);
        });

        function checkpage($page) {
            var flag = true;
            $page.find('.input').each(function () {
                if (!$(this).val()) {
                    flag = false;
                }
            });

            $page.find('.Q-list').each(function () {
                if ($(this).find('.Q-item.active').length == 0) {
                    flag = false;
                }
            })

            if (flag) {
                $page.find('.btn').addClass('active')
            } else {
                $page.find('.btn').removeClass('active')
            }
        }
    },
    genQitem: function (data, isAntarctica) {
        var html = '',
            title = '';
        var options = data.options;
        options.map(item => {
            if (isAntarctica) {
                title = '你家宝贝是否去过南极洲';
                html +=
                    `<div class="Q-item singleQ-item" data-country="南极洲" data-value="${item.value}"><span class="radio"></span><span class="text">${item.text}</span></div>`;
                $('.finished-land').show();
                $('.next-land').hide();
            } else {
                $('.finished-land').hide();
                $('.next-land').show();

                title = `选择你家宝贝曾去过的${data.label}国家`;
                var otherClass = '';
                if (item.code == 'china') {
                    otherClass = 'active lock';
                }

                html +=
                    `<div class="Q-item ${otherClass}" data-country="${item.text}" data-value="${item.value}"><span class="radio"></span><span class="text">${item.text}</span></div>`;
            }
        })
        $('.J-alert-title').html(title)
        $('.J-alert-list').html(html).data('land', data.key);
    },
    gotoLand: function (land) {
        $('.main-page .person').addClass(land).addClass('active');
        $('.main-page .long-bg').addClass(land).addClass('active');
        $('.main-page .person').on('transitionend', function () {
            $(this).removeClass('active')
        })
    }
}
var page = new indexHanlder();