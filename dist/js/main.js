$(document).ready(function () {
    initCustomSelect();
    initAddFormInput();
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