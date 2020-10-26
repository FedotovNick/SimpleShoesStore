

export default function resizeShower() {
    function shs() {
        let size = document.documentElement.clientWidth;

        let sm = 566;
        let md = 758;
        let lg = 982;
        let xl = 1190;

        let lab;

        if(size < sm) lab='XS';
        if(size >= sm && size < md) lab='SM';
        if(size >= md && size < lg) lab='MD';
        if(size >= lg && size < xl) lab='LG';
        if(size >= xl) lab = 'XL';

        if (counter) counter.innerHTML = '' + size + ' '+lab;
    }
    
    window.addEventListener('resize', shs);
}