(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-44466fcf"],{1545:function(t,e,n){},2679:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("van-row",{attrs:{type:"flex",justify:"center"}},[a("van-col",{staticClass:"cell-upload-text"},[a("img",{staticClass:"select-text",attrs:{src:n("accf")}})])],1),a("van-row",{staticClass:"cell-photo",attrs:{type:"flex",justify:"center"}},[a("van-col",{staticClass:"photo"},[t.photo?a("img",{staticClass:"my-photo",attrs:{src:t.photo,width:"180"},on:{click:this.onUploadAgain}}):a("van-uploader",{attrs:{"after-read":t.onRead}},[a("van-row",{staticClass:"upload-photo",attrs:{type:"flex",justify:"center",align:"center"}},[a("van-icon",{attrs:{color:"#ddd",size:"40px",name:"photograph"}})],1)],1)],1)],1),a("van-row",{attrs:{type:"flex",justify:"center"}},[a("van-col",{staticClass:"cell-input-text"},[a("img",{staticClass:"select-text",attrs:{src:n("c6cd")}})])],1),a("van-row",{staticClass:"cell-input",attrs:{type:"flex",justify:"center"}},[a("van-col",[a("van-cell-group",[a("van-field",{staticClass:"input",model:{value:t.name,callback:function(e){t.name=e},expression:"name"}})],1)],1)],1),a("van-row",{staticClass:"cell-btn",attrs:{type:"flex",justify:"center",align:"center"}},[a("van-col",[a("img",{staticClass:"upload-btn",attrs:{src:n("4440")},on:{click:t.onGeneratePost}})])],1)],1)},o=[],s=(n("433b"),n("d399")),c=(n("7f7f"),n("bc3a")),i=n.n(c),r=(n("6199"),n("9579")),l=n.n(r),f={data:function(){return{name:"",photo:""}},mounted:function(){l.a.pgv(),this.getSignature((function(t){t&&wx.config({debug:!1,appId:t.appId,timestamp:t.timestamp,nonceStr:t.nonceStr,signature:t.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage"]})})),wx.ready((function(){wx.onMenuShareTimeline({title:"定制宝贝环球足迹",link:"https://www.mufenggame.com/efkids2/?CKTAG=mta_share.wechat_moments",imgUrl:"https://www.mufenggame.com/loading/loading.png",success:function(){l.a.clickShare("wechat_moments"),l.a.clickStat("wechat_moments")}}),wx.onMenuShareAppMessage({title:"定制宝贝环球足迹",desc:"世界这么大，宝贝都去过哪些地方？",link:"https://www.mufenggame.com/efkids2/?CKTAG=mta_share.wechat_friend",imgUrl:"https://www.mufenggame.com/loading/loading.png",type:"",dataUrl:"",success:function(){l.a.clickShare("wechat_friend"),l.a.clickStat("wechat_friend")}})}))},methods:{onRead:function(t){this.photo=t.content},onUploadAgain:function(){this.photo=""},onGeneratePost:function(){this.photo?this.name?(this.$store.commit("onGetPhoto",this.photo),this.$store.commit("onInputName",this.name),this.$router.push("/passport")):s["a"].fail({message:"您还没有输入宝贝昵称",duration:1500}):s["a"].fail({message:"您还没有上传宝贝照片",duration:1500})},getSignature:function(t){var e="https://ma.eldesign.cn/api/getWxSDK",n=window.location.href;i.a.get("".concat(e,"?originalUrl=").concat(n)).then((function(e){if(console.log(e),200===e.status){var n=e.data.wxConfig;t(n)}})).catch((function(t){console.log(t)}))},getRandomString:function(t){t=t||32;for(var e="ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678",n=e.length,a="",o=0;o<t;o++)a+=e.charAt(Math.floor(Math.random()*n));return a}}},u=f,h=(n("5a92"),n("2877")),p=Object(h["a"])(u,a,o,!1,null,"95091fcc",null);e["default"]=p.exports},4440:function(t,e,n){t.exports=n.p+"img/generatePost.5b4b7ade.png"},"5a92":function(t,e,n){"use strict";var a=n("1545"),o=n.n(a);o.a},accf:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAo8AAABSCAMAAAACcc6RAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAALdQTFRF////+Pj4+fn5+/v709PT6Ojo9fX19vb28/PzwcHB2dnZ1tbWz8/P6enpwMDA/Pz8/f398fHx/v7+5eXl7Ozs9/f339/f2NjYxMTEyMjI1dXV19fX4eHh+vr67+/v7e3t9PT08PDw5ubm6urq7u7u4+Pj8vLy3Nzc5+fn1NTU0tLS3d3d6+vrzc3N4ODg4uLi5OTk0NDQ3t7eysrK2tra0dHRzs7OxsbG29vbycnJzMzMx8fH////BJLwLAAAAD10Uk5T////////////////////////////////////////////////////////////////////////////////AAkvrF8AAAlmSURBVHja7N3pYto4EABgYafApoeBhKZtIEA4cpFj07vr93+ubZpAZXtGmpHGxoD0r9SWhf0hSzOyo1JbUU+ll8qU6KmyyLBB/LRBM61N6SjJEnEP3Cx8MmQ1f2hsTkPwRP05UszYofe0Q1Gbeadk3fZY9trCW4zW/z+uVN0D1jAlXVq0BhUNL9YfvCJ/rZG9PdmLbCsLKxNFbFqMnXDiXhIgtcouwQ3ealtU2UcuteO+0f/jQNwjrU+6z5NJx9oHJ8SvNSU05+6loyKWGd7VvZQJk2MOpNljX9vNu8fq6l8sgbY40TaYV8exgYJ5J+/xhD0c+NOgU+2Dj8TvRfo1JekrTvPBAzUVt9/SYXXoHlvabm1RjxE2uFyVL3L3JPcOrASPB2g/SPaojmmn5g1tSDvnND/eH48x5ado2We7PA6Um0fk9hI8+npMvLT8Lldb7fEfZ4+k6VLwyPTodEHxkV/wqFSX73EWPD57PHe6oIfBo6F85XvsBY/PHi+UbwcZPJqaT/TIGjUFj0YwJXhMMY8XAnFXB4+vUxGPR+uPF0DKKHer6mCXLXg0exSP9qh7zONP5y/e9vF4nsp41A57XvQYGyIbb/fF46MTmDdoCyVKNur/DgscusfbTR4N6e1LT48/tLqOgWMeFn8C4HXbZY9NJzHdChOJVXpcmit57+fxffBoj/e4RLNb6W56/MW5hMFj+fmZIZBa3XSpsn90rb0XPJaUv84MnKnHG4sO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"},c6cd:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXEAAABSCAMAAACVFhS6AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAZQTFRF////////VXz1bAAAAAJ0Uk5T/wDltzBKAAADcklEQVR42uzd227sIAwF0O3//+nqSEdVk4BvmLt5myahZnUmMYa2oH8N/xuVG/St6WKxL1twngjI0h7XaHvAKyJqJYsDVwHIl/f5OT87Fg17iiMSXA5fvhq9yP3i0jecK45G8SE3s8/LoW+SaHFMFddeEhcy5otzA+gtDp9405lXiyNcHHuI4yBx9BaPieVqcXHYeh398yVSXOxjLXHFwJsVi9mXvktHErGUuE5TKWlKe+3i/kR5XK4iPjs9I29EbBWnSHHS3vhtzwl9rhF4D9hEXHW7t5HzY/PlDEeK2x5DPKJanK4WJyd4of8AcUrxHuLNQNeKEytefQRbysUpzsVEtWTxccjyc0xxbpKgFLd8dM7MDk25CjcR5sXJsxC1rjjixNFLPLTNF4eZ0lfYrNceSBTvtX4wSbzLGpAqjfh9f2ufnNHV7C3E3SPm1gs6iGNrcWoQL90ZngdSPGIl/638EX+eluLdxV/ZX4oHlGC5LVop3mNVfLb4rrmKe88lBYpTJPja4t5NaxA2flrF95tzCku+MdHzd6BrxFH6SpS32NOV4uK2hp7hx4nrntArVGu14lzqvYC4cjyqWvoa4qVu+dtFPSIUf9toiDgWWAPSiRf7FWedxZO6ZId3iCtKWYUr4/NxpDgnHjTnRIoPEOfiTvHR4kjxFD9BXL8xvV4nWkFcnOWvI67emM4tbyxSH99E3EC+ujhtIq4lX/k+vpm4b2dHireIF83paHHMFicpwEPFMVOc7hIvfYonitMV4kjxyeKU4il+tjgtJb54XSVCnIaLcwGeN8sXvEeI42pxGiTOf8r4UtxJ4nz/ceIt7SBxsf8UDxJXB5HioZWsFB9drU3xFE/xFN9Y3JSPp/jYOed5dZXR4ri+rrKCOFM7LEVR7XevHUIB4lCJwyNe/EakEYdbHJ3E42ZAUIrDLl6JVx6HrpBhPB9S2USsqywu/o3WsnDVJG7qnLu2zxpQJ3EuOxQXw6PE0VccK4nD8RZ3g+sutYPbyPcQpyBxihan3cXJL066FiuuvahZnDqJV/eGymhELeRace8/K2jOx/lXbvFa6AozMjS/ODvZiRAvJ85lxT/HhA0DVJlW1iJXkJGteT5DYH4D35ZE6UpMJCL+PVQ9+/W6eEgzaW7hVvSguWN7nxKv0X//aoU87O+BHwEGAJejMY4cFmRFAAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=chunk-44466fcf.e94f766d.js.map