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
        this.countdown = 60;
        this.timer = null;

        this.initMain();
        this.bindEvnet(this);
        this.initCity();
        this.initSubmitData();
        this.initQcode();
    },
    initSubmitData: function () {
        var me = this;
        var paramsObj = queryURL();
        var channel = paramsObj.Channel;
        var SourceCode = paramsObj.SourceCode;
        var Etag = paramsObj.Etag;

        $('.J-skipForm').click(function () {
            $('.loading-page').fadeIn();
            setTimeout(function () {
                $('.loading-page').fadeOut();
            }, 3000)
            mySwiper.slideNext();
        })

        $('.J-submit').click(function () {
            if (!$(this).hasClass('active')) {
                return false;
            }

            if (!checkTel($('.J-tel').val())) {
                toast('手机号格式有误');
                return false;
            }

            if (!$('.J-rightChecked .checkbox').hasClass('active')) {
                toast('请勾选隐私策略');
                return false;
            }

            //The main object to be sent with the submission request
            var submissionData = new Object();
            //Individual properties of the main object
            var customer = new Object();
            var extendedDetail = new Object();
            var weChatData = new Object();
            var trackingData = new Object();
            var campaigndata = new Object();

            customer.FirstName = dataset['name'].substr(1, dataset['name'].length - 1);
            customer.LastName = dataset['name'].substr(0, 1);
            customer.MobilePhone = $('.J-tel').val();
            // customer.DateOfBirth = new Date(year + '-' + month + '-' + date); // January 9th, 1975 (0-based index for months)
            customer.StateRegionName = $('.J-city').find("option:selected").text();
            customer.StateRegionCode = "CN-" + $('.J-city').find("option:selected").val();
            customer.CountryOfResidence = "CN";
            customer.Gender = dataset['gender'] == 'male' ? "M" : "F";
            customer.Comments = '用户去过的国家:' + dataset['country'].toString();
            customer.City = $('.J-city-child').find("option:selected").text();
            customer.Email = customer.MobilePhone + "@noemail.com";


            // Tracking
            trackingData.Etag = channel + "_" + Etag;
            trackingData.EntrySourceCode = SourceCode;

            //Campaign Data
            campaigndata.CampaignName = "Footprint2019Summer";
            campaigndata.CampaignAllocationPrograms = "LT";
            campaigndata.CampaignAllocationCode = "single";

            //Extended Details
            extendedDetail.WantsMoreInfo = true;
            extendedDetail.WantsBrochure = $('.J-WantsBrochure .checkbox').hasClass('active');



            //Assigning individual classes to the main object
            submissionData.customer = customer;
            submissionData.extendedDetail = extendedDetail;
            submissionData.tracking = trackingData;
            submissionData.weChat = weChatData;
            submissionData.campaignData = campaigndata;
            submissionData.qcode = $('.qcode-input').val();
            console.log(submissionData);

            /** debug */
            // $('.loading-page').fadeIn();
            // setTimeout(function () {
            //     $('.loading-page').fadeOut();
            // }, 3000)
            // mySwiper.slideNext();
            // return false;
            $.ajax({
                url: '/tourTest/form',
                dataType: 'json',
                crossDomain: true,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(submissionData),
                success: function (res) {
                    console.log(res);
                    if (res.status == 999) {
                        toast(res.data)
                    } else {
                        var address = $('.J-city').find("option:selected").text() + $('.J-city-child').find("option:selected").text() + $('.J-detailAddress').val();
                        $.ajax({
                            url: '/EFAdmin/h5Api/yx/leads',
                            dataType: 'json',
                            type: 'POST',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                name: dataset['name'],
                                gender: dataset['gender'] == 'male' ? "M" : "F",
                                tel: $('.J-tel').val(),
                                address: [address, $('.J-addressName').val(), $('.J-tel').val()].toString(),
                                etag: channel + "_Footprint2019summer_" + Etag,
                                comments: dataset['country'].toString(),
                                other1: [dataset['countryScore'], dataset['landScore'], dataset['uploadImg'], dataset['posterCountry']].toString(),
                            }),
                            success: function (res) {
                                if (res.code == 998) {
                                    toast('您已注册过，请勿重复提交')
                                } else {
                                    $('.loading-page').fadeIn();
                                    setTimeout(function () {
                                        $('.loading-page').fadeOut();
                                    }, 3000)
                                    mySwiper.slideNext();
                                }
                                console.log(res);
                            }
                        })
                    }
                }
            });
        });

        function checkTel(tel) {
            var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
            return reg.test(tel);
        }

        function queryURL() {
            var url = window.location.href;
            var arr1 = url.split("?");
            var obj = {};
            if (arr1.length > 1) {
                var params = arr1[1].split("&");
                for (var i = 0; i < params.length; i++) {
                    var param = params[i].split("=");
                    obj[param[0]] = param[1]; //为对象赋值
                }
            }
            return obj;
        }

    },
    initCity: function () {
        $('.iframe').attr('src', $('.iframe').data('src'));
        var html = this.genOptions(StateRegion);
        $(".J-city").append(html);
    },
    genOptions: function (data) {
        var html = '';
        data.map(function (item) {
            html += `<option data-id="${item.id}" value="${item.value}">${item.text}</option>`
        });
        return html;
    },
    genPoster: function () {
        html2canvas(document.querySelector("#tpl")).then(function (canvas) {
            dataURL = canvas.toDataURL('image/jpeg'); //转换图片为dataURL
            $('.poster-page .canvas').append(`<img src='${dataURL}'>`);
        });
        $("#tpl").hide();
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
            me.loadingTxtStart();
            $('.loading-page').show();
            var file = this.files[0];
            var fileSize = file.size;
            if (fileSize > 20 * 1024 * 1024) {
                toast('图片不能超过20M');
                return false;
            }
            lrz(file).then(function (rst) {
                var img = new Image();
                img.src = rst.base64;
                img.onload = function () {
                    me.width = img.width, me.height = img.height;
                    $('.m-clip-box').addClass('active').find('.editPic-box').html(img);
                    var $img = $('.m-clip-box .editPic-box').find('img').addClass('J-img');
                    handleImg($img);
                    $('.loading-page').hide();
                    me.loadingTxtStop();
                };
            })
        })

        $('.J-pic-cancel').click(function () {
            $('.m-clip-box').removeClass('active');
        })

        $('.J-compose').click(function () {

            // 如果不在可视区域内，offset返回错误，所以先处理offset再show loading
            var targetBoxLeft = 52,
                targetBoxTop = 252;
            var sx = $('.J-img').offset().left - targetBoxLeft;
            var sh = $('.J-img').offset().top - targetBoxTop;
            $('.loading-page').show();
            me.loadingTxtStart();

            //优先显示loading，让canvas处理滞后
            setTimeout(function () {

                var ratio = 3;
                var canvas = $('#myCanvas')[0];
                canvas.width = ratio * 658, canvas.height = ratio * 440;
                var canvasContext = canvas.getContext("2d");
                var imgW = $(".J-img").width(),
                    imgH = $('.J-img').height();

                canvasContext.save();

                canvasContext.rect(0, 0, canvas.width, canvas.height);
                canvasContext.fillStyle = "#ffffff";
                canvasContext.fill();

                canvasContext.drawImage($(".J-img")[0], 0, 0, me.width, me.height, sx * ratio, sh * ratio, imgW * ratio, imgH * ratio);
                canvasContext.restore();
                $('.uploadBox').find('.J-file').html(canvas);
                $('.m-clip-box').removeClass('active');

                var imgData = canvas.toDataURL("image/png");
                qiniuUpload(convertBase64UrlToBlob(imgData), function (data) {
                    me.uploadImg = dataset['uploadImg'] = data.key;
                    var newImg = new Image();
                    newImg.src = '/qiniuProxy/' + dataset.uploadImg;
                    newImg.onload = function () {
                        $('.loading-page').hide();
                        me.loadingTxtStop();
                    }
                    checkGen()
                });
            }, 10)
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
            //固定的Selection长宽
            var SelectHeight = $('body').height(),
                SelectWidth = $('body').width();

            // mover 缩放
            var imgW = $img.width(),
                imgH = $img.height();
            $img.pep({
                shouldEase: false,
                useCSSTranslation: false,
                startPos: {
                    left: (SelectWidth - imgW) / 2,
                    top: 470 - imgH / 2
                }
            });

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
                $($img).pep({
                    shouldEase: false,
                    useCSSTranslation: false
                });
            });
            touch.on('.J-img', 'pinch', function (ev) {
                var imgScale = imgW / imgH;
                var minScale = 0.2,
                    maxScale = 2;
                var minW = 658,
                    minH = 440;
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
                if (h < minH) {
                    h = minH;
                    w = minH * imgScale;
                }
                if (w < minW) {
                    w = minW;
                    h = minW / imgScale;
                }
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
            if (item.key == 'Europe') {
                html +=
                    `<div class="mainlandBox ${item.key}" data-land='${item.key}'><span class="shou"></span><img src="./img/${item.key}.png" alt="" class="mainland"></div>`
            } else {
                html +=
                    `<div class="mainlandBox ${item.key}" data-land='${item.key}'><img src="./img/${item.key}.png" alt="" class="mainland"></div>`
            }
        })
        $('.mainlandList').html(html);
    },
    bindEvnet: function () {
        var me = this;

        $('.J-rightChecked').click(function () {
            var $checkbox = $(this).find('.checkbox');
            $checkbox.hasClass('active') ? $checkbox.removeClass('active') : $checkbox.addClass(
                'active');
        })

        $('.href').click(function (e) {
            e.stopPropagation();
            $('.right-pop').show();
        })
        $('.closed').click(function () {
            $('.right-pop').hide();
        })

        $('.J-city').change(function () {
            var id = $(this).find("option:selected").data('id');
            $.ajax({
                url: '/tourTest/queryCity',
                dataType: 'json',
                crossDomain: true,
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({
                    id: id
                }),
                success: function (res) {
                    console.log(res);
                    var data = res.data[0].map(item => {
                        return {
                            value: item.id,
                            text: item.name
                        }
                    });
                    var str = me.genOptions(data);
                    $(".J-city-child").html(str);
                }
            });
        })


        // 获取验证码
        $('.J-sendSMS').click(function () {
            var $self = $(this);
            if ($self.parent().hasClass('disabled')) {
                return false;
            }
            var tel = $('input[name=telPhone]').val();
            if (!tel) {
                toast('请输入手机号');
                return false;
            }
            if (!/^1[3|4|5|7|8|9][0-9]{9}$/.test(tel)) {
                toast('请输入正确的手机号');
                return false;
            }
            startTimer();

            $.ajax({
                type: 'POST',
                url: '/tourTest/api/sendSMS',
                data: {
                    tel: tel,
                },
                success: function (data) {
                    if (data.status == 200) {
                        toast('短信发送成功');
                    } else {
                        toast(data.data);
                    }
                },
                dataType: 'json'
            });
        });


        $('.J-slideNext').click(function () {
            if ($(this).hasClass('active')) {
                if ($(this).parents('.swiper-slide').data('page') == 'gender') {
                    var gender = $("[data-name='gender']").find('.Q-item.active').data('value');
                    $('.main-page .person').addClass(gender);
                    me.gotoLand('Europe');
                    dataset['gender'] = gender;
                    dataset['name'] = $('.gender-page .J-input').val();
                    $('.mainlandList .mainlandBox').eq(0).addClass('active');
                } else if ($(this).parents('.swiper-slide').data('page') == 'genPoster') {
                    me.initPoster();
                } else if ($(this).parents('.swiper-slide').data('page') == 'posterIndex') {
                    me.genPoster();
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

        $('body').on('click', '.next-land', function () {
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
            $(this).removeClass('active');
        })

        $('.J-input').on('input', function () {
            var $page = $(this).parents('.swiper-slide');
            checkpage($page);
        });

        $('.J-input').on('change', function () {
            var $page = $(this).parents('.swiper-slide');
            checkpage($page);
        });

        function checkpage($page) {
            var flag = true;
            $page.find('.J-input').each(function () {
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

        function startTimer() {
            var $self = $('.J-sendSMS');
            var countdown = me.countdown;

            $self.text('已发送(' + countdown + 's)')
            $self.parent().addClass('disabled');

            me.timer = setInterval(function () {
                countdown -= 1;
                $self.text('已发送(' + countdown + 's)')
                $self.parent().addClass('disabled');
                if (countdown <= 0) {
                    stopTimer();
                }
            }, 1000);
        }

        function stopTimer() {
            var $self = $('.J-sendSMS');
            clearInterval(me.timer);
            $self.text('获取验证码')
            $self.parent().removeClass('disabled');
        }
    },
    loadingTxtStart: function () {
        var loaded_txt = ['宝贝的照片正在上传中...', '请耐心等待O(∩_∩)O~', '努力中...  努力中...', '马上就好了...', '请不要走开哦~'];
        var index = 0;
        var $txt = $('.J-loading-txt');
        var text = loaded_txt[index];

        $txt.fadeOut(function () {
            $txt.text(text).fadeIn();
        });
        ++index >= loaded_txt.length ? index = 0 : '';

        this.loadingTxtTimer = setInterval(function () {
            var text = loaded_txt[index];
            $txt.fadeOut(function () {
                $txt.text(text).fadeIn();
            });
            ++index >= loaded_txt.length ? index = 0 : '';
        }, 2000)
    },
    loadingTxtStop: function () {
        $('.J-loading-txt').text('');
        clearInterval(this.loadingTxtTimer);
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
            $(this).removeClass('active');
            if (land == 'Europe') {
                $('.mainlandBox.Europe .shou').show();
            } else if (land == 'Finished') {
                $('.photoshop-text').addClass('active');
                setTimeout(function () {
                    $('.photoshop-text .shou').addClass('active');
                }, 2000)
            } else {
                setTimeout(function () {
                    $('.mainlandBox.active').click();
                }, 500)
            }
        })
    }
}
var page = new indexHanlder();