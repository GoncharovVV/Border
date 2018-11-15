$(document).ready(function () {
    initCustomSelect();
    initAddFormInput();
    initAlbum();
    initToggleBlock();
    initToggleMenu();
    scrollToSection();
});

function initCustomSelect() {
    $('.js-single-select').select2();
}

function initAddFormInput() {
    var counter = 0;
    $('.js-clone').click(function () {
        counter++;

        $('.js-single-select').select2('destroy');
        $('[data-clone="select"]').clone()
            .removeAttr('data-clone')
            .insertBefore($(this).parent())
            .children('select').attr('name', $('[data-clone="select"]').children('select').attr('name') + counter);
        $('[data-clone="input"]').clone()
            .removeAttr('data-clone')
            .insertBefore($(this).parent())
            .children('input').attr('name', $('[data-clone="input"]').children('input').attr('name') + counter);

        initCustomSelect();
    });
}

function initAlbum() {
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
            }
        }
    });
}

function initToggleBlock() {
    $('.js-show-description').on('click', showBlock);

    function showBlock() {
        var selector = $(this).attr('data-block'),
            targetHeight = $(this).prev(selector).prop('scrollHeight') + 'px',
            currentHeight = $(this).prev(selector).css('height');

        if ($(this).attr('data-min')) {
            if (parseInt(currentHeight) < parseInt(targetHeight)) {
                $(this).addClass('open').prev(selector).animate({
                    maxHeight: targetHeight
                }, 100);
            } else {
                $(this).removeClass('open').prev(selector).animate({
                    maxHeight: $(this).attr('data-min')
                }, 100);
            }
        } else {
            $(this).addClass('open').attr('data-min', currentHeight).prev(selector).animate({
                maxHeight: targetHeight
            }, 100);
        }
    }
}

function initToggleMenu() {
    $('.js-toggle').on('click', showBlock);

    function showBlock() {
        var thatClass = $(this).attr('data-class'),
            targetNode = $($(this).attr('data-parent'));
        $('[data-class]').each(function () {
            var checkVal = $(this).attr('data-class');
            if ((targetNode).hasClass(checkVal) && checkVal !== thatClass) {
                targetNode.removeClass(checkVal);
            }
        });

        if ((targetNode).hasClass(thatClass)) {
            targetNode.removeClass(thatClass);
        } else {
            targetNode.addClass(thatClass);
        }
    }

    function checkPrevios() {

    }
}
function scrollToSection() {
    $(".nav__link").click(function (){
        var targetId = $(this).attr('href');
        $('html, body').animate({
            scrollTop: $(targetId).offset().top
        }, 1000);
    });
}