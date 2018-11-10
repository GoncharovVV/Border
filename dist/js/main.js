$(document).ready(function () {
    initCustomSelect();
    initAddFormInput();
    initAlbum();
    initToggleBlock();
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
			preload: [0,1] // Will preload 0 - before current, and 1 after the current image
		},
		image: {
			tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
			titleSrc: function(item) {
				return item.el.attr('title') + '<small>by Marsel Van Oosten</small>';
			}
		}
	});
}

function initToggleBlock() {
    $('.js-show-description').on('click',showBlock);
    function hideBlock(){
        $('.js-hide-description').click(function () {
            console.log('1');
            var selector = $(this).attr('data-block');
            $(this).addClass('js-show-description').removeClass('js-hide-description');
            $(this).prev(selector).animate({maxHeight : $(this).attr('data-current')},100);
            $('.js-show-description').on('click',showBlock);
        });
    }
    function showBlock() {
        var selector = $(this).attr('data-block'),
            targetHeight = $(this).prev(selector).prop('scrollHeight') + 'px',
            currentHeight = $(this).prev(selector).css('height');
        console.log('0');
        $(this).addClass('js-hide-description').removeClass('js-show-description').attr('data-current',currentHeight);
        $(this).prev(selector).animate({maxHeight : targetHeight},100);
        $(this).off('click',showBlock);
        hideBlock();
    }
}