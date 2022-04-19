$(function () {
    let page = $("html, body");
    let enableScroll = false;

    $('body').removeClass('is-preload');

    function shuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    function load_insta() {
        let url = 'https://ngocnhan2003.github.io/ngocnhan2003/assets/files/instacraw.json';
        axios.get(url)
            .then(function (response) {
                for (shortcode of response.data.tag_ngocnhan2003) {
                    let link = 'https://www.instagram.com/p/' + shortcode;
                    $('#grid').append(`<li><img src="https://i2.wp.com/ngocnhan2003.github.io/ngocnhan2003/assets/images/${shortcode}?w=400"></li>`);
                }
                new AnimOnScroll(document.getElementById('grid'), {
                    minDuration: 0.4,
                    maxDuration: 0.7,
                    viewportFactor: 0.2
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    function scrollEvent(page, up = false) {
        page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
            page.stop();
        });

        page.animate({scrollTop: up ? 0 : page[0].scrollHeight}, 120000, 'linear', function () {
            page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
        });
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 5) {
            scrollEvent(page, true);
        }
        if (enableScroll) {
            if ($(window).scrollTop() <= 5) {
                scrollEvent(page);
            }
        }
    });

    load_insta();

    $('#get-started').click(() => {
        setTimeout(() => {
            $('#sound')[0].volume = 0.3;
            $('#sound')[0].play();
        }, 1234);
        $('.avatar').addClass('hide-bf');
        $('.avatar img').hide(800);
        $('.insta').show('slow');
        $('#main').animate({
            opacity: '0.0',
            padding: '0px',
            margin: '0px'
        }, 700, function () {
            $('#wrapper').animate({
                height: '0',
                padding: '0',
                minHeight: '0'
            }, 1700, function () {
                $('#wrapper').hide();
                enableScroll = true;
                scrollEvent(page);

            });
        });
    });

    console.log('%cFEEL FREE TO GET THIS: https://github.com/ngocnhan2003/ngocnhan2003', 'color: red; font-size: 15px; font-weight: bold;');
});
