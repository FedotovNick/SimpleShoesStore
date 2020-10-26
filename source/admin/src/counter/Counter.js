import React from 'react';
import resizeShower from './resizeShower'

resizeShower();


export default function Counter() {
    function f(){
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
        return ''+size+' '+lab;
    }
	return (
		<div id='counter' style={{fontSize: 10, position: 'fixed', left: 20, top: 0, fontWeight: 900, color: 'orange', zIndex: 3000}}>{f()}</div>	
	)
}