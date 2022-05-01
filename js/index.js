        var oMenu = document.getElementById('menu');
        var oLeftBar = document.getElementById('leftBar');
        var menuFrom = document.getElementById('menu-form');

        oMenu.onclick = function() {
            if (oLeftBar.offsetLeft == 0) {
                oLeftBar.style.left = -249 + 'px';
            }
            else {
                oLeftBar.style.left = 0;
            }
        }


        // 监听页面宽度变化
        window.onresize = function() {
            judgeWidth();
            // console.log(document.documentElement.clientWidth);
        };

        // 判断页面宽度
        function judgeWidth() {
            if (document.documentElement.clientWidth > 481) {
                oLeftBar.style.left = 0;
            } else {
                oLeftBar.style.left = -249 + 'px';
            }
        }


        var oNavItem = document.getElementById('navItem');
        var aA = oNavItem.getElementsByTagName('a');
        for (var i = 0; i < aA.length; i++) {
            aA[i].onclick = function() {
                for (var j = 0; j < aA.length; j++) {
                    aA[j].className = '';
                }
                this.className = 'active';
                if (oLeftBar.offsetLeft == 0) {
                    if (document.documentElement.clientWidth <= 481) {
                        oLeftBar.style.left = -249 + 'px';
                        menuFrom.checked = false;

                    }
                }
            }
        }


        $(window).scroll(function() {
            if($(window).scrollTop() >= 200){
                $('#fixedBar').fadeIn(300);
            }else{
                $('#fixedBar').fadeOut(300);
            }
        });
        $('#fixedBar').click(function() {
            $('html,body').animate({scrollTop:'0px'},800);
        })