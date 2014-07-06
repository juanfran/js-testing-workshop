/*
  Testing dom with chai-jquery
*/

describe('testing the dom', function () {
    beforeEach(function () {
        document.body.innerHTML = window.__html__['spec/fixtures/combo.html'];
    });

    it('open the combo', function () {
        expect($('#list')).to.be.hidden;

        test3.combo($('#combo'));

        $("#show").click();

        expect($('#list')).to.be.visible;
    })

    it('remove last combo option', function () {
        test3.combo($('#combo'));

        $("#remove").click();

        expect($('#list li').length).to.be.equal(1);
    })

    afterEach(function(){
        document.body.innerHTML = '';
    });
})
