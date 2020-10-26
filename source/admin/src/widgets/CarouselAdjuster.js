import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import nec from '../commands/init'
import { bindActionCreators } from 'redux';
import innerContext from '../innerContext'

let files = [];
let currentIndex = 0;

function CarouselAdjuster(props) {

    const [links, setLinks] = useState([]);
    const [show, setShow] = useState(false);
    const [successShow, setSuccessShow] = useState(false);

    useEffect(() => {
        document.querySelector('#wcont').scrollTo(0, 0);
        props.changeActivePage('Carousel');

        files = [];
        nec.execute('READ_CAROUSEL_IMGS')
            .then(r => r.json())
            .then(r => {
                if(r.status && r.status != 200) return;
                r.links.forEach((v) => {
                    files.push(null);
                })

                setLinks(r.links.map((v) => { return innerContext.host + v }));
            })
            .catch(e => console.log(e));
    }, []);


    function loadImg(e) {
        let file = e.target.files[0];

        let link = URL.createObjectURL(file);
        let newLinks = Array.from(links);

        newLinks.push(link);
        files.push(file);

        setLinks(newLinks);

    }

    function deleteImg(e) {
        let index = e.currentTarget.parentElement.parentElement.parentElement.dataset.ind;
        let newLinks = Array.from(links);
        newLinks = newLinks.filter((v, i) => {
            if (index == i) return false;
            else return true;
        });

        files = files.filter((v, i) => {
            if (index == i) return false;
            else return true;
        })

        setLinks(newLinks);

        e.stopPropagation();
    }


    function sendImgs() {

        if (links.length != files.length) {
            alert('ошибка отправки данных на сервер. длины массивов links и files не совпадают');
            return;
        }

        let newLinks = Array.from(links);
        let newFiles = [];

        for (let i = 0; i < newLinks.length; i++) {
            if (files[i] != null) newLinks[i] = 'empty';
            else newLinks[i] = newLinks[i].substring(innerContext.host.length);
        }

        if (files.length > 0) {

            newFiles = files.filter((v) => {
                if (v == null) return false;
                else return true;
            });
        }

        if (newLinks.length == 0) newLinks.push('delete');

        const obj = { links: newLinks, files: newFiles };

        const fdata = new FormData();
        newFiles.forEach((v) => {
            fdata.append('files', v);
        });
        newLinks.forEach((v) => {
            fdata.append('links', v);
        })

        nec.execute('SET_CAROUSEL_IMGS', { fdata })
            .then(r => {
                setSuccessShow(true);
            });
    }


    function updateFun(e) {

        let index = e.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.ind;

        let file = e.target.files[0];
        let src = URL.createObjectURL(file);

        files[index] = file;
        let newLinks = Array.from(links);
        newLinks[index] = src;

        setLinks(newLinks);

    }


    function leftBut(e) {
        e.stopPropagation();
        let i = e.currentTarget.parentElement.parentElement.parentElement.dataset.ind;
        if (links.length < 2) return;

        if (i - 1 < 0) return;

        let newLinks = Array.from(links);
        let accum = newLinks[i];
        newLinks[i] = newLinks[i - 1];
        newLinks[i - 1] = accum;

        accum = files[i];
        files[i] = files[i - 1];
        files[i - 1] = accum;

        setLinks(newLinks);

    }

    function imgExpand(e) {
        currentIndex = e.currentTarget.dataset.ind - 0;
        setShow(true);
    }

    function rightBut(e) {
        let i = e.currentTarget.parentElement.parentElement.parentElement.dataset.ind - 0;
        if (links.length < 2) return;

        if (i > links.length - 2) return;

        let newLinks = Array.from(links);

        let accum = newLinks[i + 1];
        newLinks[i + 1] = newLinks[i];
        newLinks[i] = accum;

        accum = files[i + 1];
        files[i + 1] = files[i];
        files[i] = accum;

        setLinks(newLinks);

        e.stopPropagation();
    }


    const cards = links.map((v, i) => {
        return (
            <div id='carouselWidget' className='col-12 col-md-6 p-2' key={'imgcarousel_' + i}>
                <div data-ind={i} className='card rounded-0 shadow' onClick={imgExpand}>
                    <div className='m-carousel-frame position-relative'>
                        <img className='card-img rounded-0' style={{ position: 'absolute', left: 0, top: 0 }} src={v}></img>

                        <div className='d-flex flex-nowrap m-carousel-right-panel' style={{ background: 'lightgray' }} >
                            <div className='col p-2 text-center m-carousel-but' onClick={leftBut}>
                                <span>&lt;</span>
                            </div>
                            <div className='col p-2 text-center m-carousel-but' onClick={rightBut}>
                                <span>&gt;</span>
                            </div>

                            <label className='m-0 col p-2 m-carousel-but' onClick={(e) => { e.stopPropagation() }}>
                                <input type='file' className='d-none' onChange={updateFun} />
                                <div className='' >
                                    <svg fill='gray' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M10.187 9.125l1.831 1.832c.199.918-1.131 2.264-2.061 2.061l-1.832-1.832c-.083.284-.125.577-.125.871 0 .779.295 1.556.889 2.15.656.656 1.537.951 2.396.884.453-.034.899.131 1.222.452l2.033 2.034c.28.282.649.423 1.018.423.809 0 1.459-.663 1.442-1.472-.009-.358-.149-.714-.422-.988l-2.034-2.034c-.321-.322-.487-.769-.452-1.222.066-.858-.229-1.739-.885-2.395-.595-.595-1.372-.889-2.15-.889-.293 0-.586.042-.87.125zm5.841 7.417c0 .269-.219.486-.486.486-.269 0-.486-.218-.486-.486s.218-.485.486-.485.486.217.486.485zm-9.944-12.542c1.379 1.612 2.576 3 4.916 3h11v13h-20v-16h4.084zm.916-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z" /></svg>
                                    <span className='ml-2 small text-truncate'>изменить</span>
                                </div>
                            </label>

                            <div className='col p-2 m-carousel-but' onClick={deleteImg}>
                                <svg fill='gray' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z" /></svg>
                                <span className='ml-2 p-2 small text-truncate'>удалить</span>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className="col-12" style={{ minWidth: 400 }}>
            <div className='card shadow' style={{ minHeight: '100%' }}>

                <div className='card-header p-2 pb-3' style={{ background: 'rgba(251, 236, 156, 0.2)' }} >
                    <div className='row no-gutters'>
                        <div className='col-12 col-md-4 p-1' style={{ maxWidth: 250 }}>
                            <button className='btn w-100 btn-sm btn-secondary' onClick={sendImgs}>Сохранить все изменения</button>
                        </div>
                        <label className=' p-1 col-12 col-md-4' style={{ maxWidth: 250 }}>
                            <input type='file' className='d-none' onChange={loadImg} />
                            <div className='w-100 btn btn-sm btn-warning text-white'>Добавить новое изображение</div>
                        </label>
                    </div>

                </div>
                <div className='card-header p-2 small text-muted' style={{ textIndent: '1rem', background: 'rgba(251, 236, 156, 0.2)' }}>
                    <p className='text-center my-2'>Изменяйте и добавляйте новое изображение в виджете 'Карусель' на главной странице сайта. Также с помощью стрелочек можно менять очередность следования картинок.</p>
                </div>
                <div className='col'>
                    <div className='row p-2'>
                        {cards}
                    </div>
                </div>

                <Modal className='m-carousel-modal' show={show} onHide={() => setShow(false)}>
                    <div className='m-carousel-imgframe'>

                        <img src={links[currentIndex]} />
                        <div style={{ cursor: 'pointer', userSelect: 'none' }} onClick={(e) => {
                            currentIndex = currentIndex == 0 ? links.length - 1 : currentIndex - 1;
                            e.currentTarget.parentElement.firstElementChild.src = links[currentIndex];
                        }}>
                            <svg style={{ position: 'absolute', left: 0, top: '50%', transform: 'rotate(180deg)' }} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" /></svg>
                        </div>
                        <div style={{ cursor: 'pointer', userSelect: 'none' }} onClick={(e) => {
                            currentIndex = currentIndex < links.length - 1 ? currentIndex + 1 : 0;
                            e.currentTarget.parentElement.firstElementChild.src = links[currentIndex];
                        }}>
                            <svg style={{ position: 'absolute', right: 0, top: '50%', }} xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" /></svg>
                        </div>
                    </div>
                </Modal>

                <Modal show={successShow} onHide={() => setSuccessShow(false)}>
                    <h5 className='modal-body text-center'>
                        Данные успешно сохранены на сервере!
                   </h5>
                    <div className='modal-footer justify-content-center'>
                        <button className="btn btn-success px-4" onClick={() => setSuccessShow(false)}>ok</button>
                    </div>
                </Modal>

            </div>

        </div>
    )
}

function localAC1(pageName) {
    return {
        type: 'SET_ACTIVE_PAGE',
        activePage: pageName,
    }
}

function mapDispatch(d) {
    return {
        changeActivePage: bindActionCreators(localAC1, d),
    }
}

function mapProps(state) {
    return {
        carouselImgs: state.carouselImgs,
    }
}



export default connect(mapProps, mapDispatch)(CarouselAdjuster);