import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

let sem = false;

export default function ImgsDetails(props) {
	const links = props.links;
	const linksSize = props.links.length;
	const [ind, setInd] = useState(0);
	const [show, setShow] = useState(false);

	const lfs = [];
	let bm = [];
	const size = 3;

	function changeInd(newInd) {
		setInd(newInd);
	}

	for (let i = 0; i < linksSize; i++) {
		bm.push({ src: links[i], index: i });
		if (bm.length == size) {
			lfs.push(
				<FrameRow key={'fr-row-' + lfs.length} frames={Array.from(bm)} size={size} changeInd={changeInd} />
			)

			bm = [];
		}
	}
	if (bm.length > 0) {

		lfs.push(
			<FrameRow key={'fr-row-' + lfs.length} frames={Array.from(bm)} size={size} changeInd={changeInd} />
		)
		bm = [];
	}

	const ftop = (e) => {

		if (sem) return null;
		sem = true;
		scrollElem(e.currentTarget.parentElement.querySelector('.m-sub-lfcon'), false, resetSem);
	}

	const fbottom = (e) => {
		if (sem) return null;
		sem = true;
		scrollElem(e.currentTarget.parentElement.querySelector('.m-sub-lfcon'), true, resetSem);
	}

	const resetSem = () => {
		sem = false;
	}

	const bfClickHandler = (e) => {
		let direction = e.currentTarget.dataset.direct;

		let i = ind;
		switch (direction) {
			case 'left':
				if (i < 1) return;
				setInd(--i);
				break;
			case 'right':
				if (i + 1 == linksSize) return;
				setInd(++i);
				break;
		}

	}

	const scrollHandler = (e) => {
		e.preventDefault();
		e.stopPropagation();

		if (sem) return null;
		sem = true;
		let b = e.deltaY > 0;
		scrollElem(e.currentTarget.querySelector('.m-sub-lfcon'), b, resetSem);
	}

	return (
		<div className={'p-0 offset-lg-3 col-12 col-lg-9 '+(props.className?props.className:"")}>
			<div className='m-big-frame' >
				<div onClick={()=>setShow(true)} style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, overflow: 'hidden' }}>
					<img src={links[ind]} style={{ width: '100%', position: 'absolute', left: 0, top: 0 }} />
				</div>

				<div className='m-bigfr-left-but m-bigfr-but' data-direct='left' onClick={bfClickHandler}>
					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M13 7v-6l11 11-11 11v-6h-13v-10z" /></svg>
				</div>

				<div className='m-bigfr-right-but m-bigfr-but' data-direct='right' onClick={bfClickHandler}>
					<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M13 7v-6l11 11-11 11v-6h-13v-10z" /></svg>
				</div>

				<div className='m-lfcon d-none d-lg-block' onWheel={scrollHandler}>
					<div className={'m-but m-but-top ' + (lfs.length < 2 ? 'd-none' : '')} onClick={ftop}>
						<svg fill='lightgray' xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" /></svg>
					</div>

					<div className='m-sub-lfcon'>
						{lfs}
					</div>

					<div className={'m-but m-but-bottom ' + (lfs.length < 2 ? 'd-none' : '')} onClick={fbottom}>
						<svg fill='lightgray' xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" /></svg>
					</div>
				</div>
			</div>

			<Modal centered show={show} className='m-bfr-modal' onHide={() => setShow(false)}>
				<img width='100%' src={links[ind]} />
			</Modal>

		</div>
	)
}


function scrollElem(elem, direction, rs) {

	let panel = elem;
	let shift = parseInt(getComputedStyle(panel).height);

	let count = 0;
	let a = 20;
	let interval = setInterval(() => {
		count += a;
		if (count > shift - a) {
			panel.scrollBy(0, direction ? shift - count : -(shift - count));

			rs();
			clearInterval(interval);
		}
		panel.scrollBy(0, direction ? a : -a);

	}, 20);
}

function FrameRow(props) {
	let mas = props.frames;

	const clickHandler = (e) => {
		let newInd = parseInt(e.currentTarget.dataset.ind);
		props.changeInd(newInd);
	}

	const frames = mas.map((v, i) => {
		return (
			<div key={'th-fr-' + i} data-ind={v.index} className='m-thumbs-frame' onClick={clickHandler}>
				<img style={{ height: '100%', position: 'absolute', left: 0, top: 0 }} src={v.src} />
			</div>
		)
	});

	for (let j = 0; j < props.size - 1; j++) {
		if (frames.length < props.size) frames.push(
			<div key={'th-fr-stub-' + j} className='m-thumbs-frame' style={{ background: 'transparent' }} ></div>
		)
	}

	return (
		<div className='d-flex flex-column justify-content-around' style={{ border: 'solid 2px transparent', height: '100%', background: '' }}>
			{frames}
		</div>
	)
}

