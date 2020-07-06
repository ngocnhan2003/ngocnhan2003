$(function () {
    let loaded = false;
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

    function load_insta(end_cursor = '') {
        let url = 'https://www.instagram.com/graphql/query/?query_hash=3e7706b09c6184d5eafd8b032dbcf487&variables={"tag_name":"ngocnhan2003","first":0,"after":"end_cursor"}';
        axios.get(url.replace('end_cursor', end_cursor))
            .then(function (response) {
                let edge_hashtag_to_media = response.data.data.hashtag.edge_hashtag_to_media;
                let edges = shuffle(edge_hashtag_to_media.edges);
                for (let edge of edges) {
                    let link = 'https://www.instagram.com/p/' + edge.node.shortcode;
                    $('#grid').append(`<li><img src="${edge.node.display_url}"></li>`);
                }
                if (edge_hashtag_to_media.page_info.has_next_page) {
                    load_insta(edge_hashtag_to_media.page_info.end_cursor);
                } else {
                    loaded = true;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                if (loaded) {
                    new AnimOnScroll(document.getElementById('grid'), {
                        minDuration: 0.4,
                        maxDuration: 0.7,
                        viewportFactor: 0.2
                    });
                }
            });
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
        $('.avatar').addClass('hide-bf');
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

});
