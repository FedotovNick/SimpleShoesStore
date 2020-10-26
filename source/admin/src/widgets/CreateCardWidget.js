import React, { useState, useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { Col, Form, Modal } from 'react-bootstrap';
import { connect } from 'react-redux'
import FormRow from './FormRow'
import nec from '../commands/init'
import innerContext from '../innerContext'



let tempTarget;

function CreateCardWidget(props) {

    const [validity, setValidity] = useState({
        line1: true,
        line2: true,
        line3: true,
        line4: true,
        line5: true,
    });

    const [saveSuccessShow, setSaveSuccessShow] = useState(false);

    const [files, setFiles] = useState([]);

    useEffect(() => {
        document.querySelector('#wcont').scrollTo(0, 0);
        props.changeActivePage('AddProduct');
    }, [])

    function changeFile(e) {
        let index = e.currentTarget.parentElement.parentElement.parentElement.parentElement.dataset.ind;

        let parentElem = e.target.parentElement.parentElement.parentElement;

        let inputFile = parentElem.querySelector('input[type=file]');
        let fileSrc = URL.createObjectURL(inputFile.files[0]);
        let imgElem = parentElem.querySelector('img');

        imgElem.src = fileSrc;

        let newmas = Array.from(files);
        newmas[index] = inputFile.files[0];

        setFiles(newmas);

    }

    function addFile(e) {
        let parentElem = e.target.parentElement;
        let inputFile = parentElem.querySelector('input[type=file]');

        let newmas = Array.from(files);
        newmas.push(inputFile.files[0]);

        setFiles(newmas);
    }

    function sendCard(e) {

        let form = createCardForm;

        let formData = new FormData(form);

        for (let i = 0; i < files.length; i++) formData.append('files', files[i]);

        nec.execute('CREATE_CARD', { formData })
            .then(r => {
                if (r.status == 201) {
                    setSaveSuccessShow(true);
                    nec.execute('READ_CARDS', { size: innerContext.pageSize, page: 0 });
                }
            });
    }

    function imgDel(e) {
        let index = e.currentTarget.parentElement.parentElement.parentElement.dataset.ind;

        let newmas = files.filter((f, i) => {
            if (i != index) return f;
        })

        setFiles(newmas);

    }

    function checkForm() {

        let form = createCardForm;
        let line1 = /^[a-zA-Zа-яА-Я ][a-zA-Zа-яА-Я0-9.,;? -]{20,}$/.test(form.title.value);
        let line2 = /^[a-zA-Zа-яА-Я ][a-zA-Zа-яА-Я0-9.,;? -]{20,}$/.test(form.description.value);
        let line3 = /^[1-9][0-9]{0,6}$/.test(form.price.value);
        let line4 = parseInt(form.sizefrom.value) < parseInt(form.sizeto.value);
        let line5 = /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я0-9]{4,100}$/.test(form.category.value);

        let newValidity = { line1, line2, line3, line4, line5 };
        let allValid = line1 && line2 && line3 && line4 && line5;

        if (allValid) sendCard();

        setValidity(newValidity);
    }

    const cards = files.map((v, i) => {

        return (
            <div className='col-12 col-md-4 p-2' key={'imgcard' + i} data-ind={i}>
                <div className='card rounded-0 shadow '>

                    <div className='card-header px-2 py-1  d-flex justify-content-between'>

                        <label className='m-edit-card-frame-but m-0 p-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M10.187 9.125l1.831 1.832c.199.918-1.131 2.264-2.061 2.061l-1.832-1.832c-.083.284-.125.577-.125.871 0 .779.295 1.556.889 2.15.656.656 1.537.951 2.396.884.453-.034.899.131 1.222.452l2.033 2.034c.28.282.649.423 1.018.423.809 0 1.459-.663 1.442-1.472-.009-.358-.149-.714-.422-.988l-2.034-2.034c-.321-.322-.487-.769-.452-1.222.066-.858-.229-1.739-.885-2.395-.595-.595-1.372-.889-2.15-.889-.293 0-.586.042-.87.125zm5.841 7.417c0 .269-.219.486-.486.486-.269 0-.486-.218-.486-.486s.218-.485.486-.485.486.217.486.485zm-9.944-12.542c1.379 1.612 2.576 3 4.916 3h11v13h-20v-16h4.084zm.916-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z" /></svg>
                            <span className='ml-2 small text-dark'>{innerContext.ccw_editImg}</span>
                            <input type='file' className='d-none' onChange={changeFile} />
                        </label>
                        <div className='ml-2 m-edit-card-frame-but p-2' onClick={imgDel}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z" /></svg>
                            <span className='ml-2 small text-dark'>{innerContext.ccw_deleteCard}</span>
                        </div>

                    </div>

                    <div className='m-edit-card-frame position-relative' >
                        <img className='card-img rounded-0 position-absolute' src={URL.createObjectURL(v)} />
                    </div>
                </div>
            </div>
        )
    })

    return (

        <div className="col-12 col-lg-10" style={{ minWidth: 400 }}>

            <div className='w-100 card rounded-0 shadow ' style={{ minHeight: '100%' }}>
                <div className='card-header'>{innerContext.ccw_title}</div>
                <div className='card-header px-3 py-2'>
                    <label className='mr-2'>
                        <div className="btn btn-warning btn-sm">Добавить новое фото</div>
                        <input type='file' className='d-none' onChange={addFile} />
                    </label>

                    <button className='btn mr-2 btn-secondary btn-sm' onClick={checkForm} >{innerContext.ccw_createButton}</button>

                </div>

                <div className='card-body'>
                    <Form noValidate id='createCardForm'>
                        <FormRow name='title'
                            label={innerContext.ccw_cardName}
                            valid={validity.line1}
                            invalidMessage={innerContext.ccw_wrongName}
                            placeholder=''
                        />

                        <FormRow name='description'
                            label={innerContext.ccw_cardDescription}
                            valid={validity.line2}
                            invalidMessage={innerContext.ccw_wrongDescription}
                            placeholder=''
                        />

                        <FormRow name='price'
                            label={innerContext.ccw_cardPrice}
                            valid={validity.line3}
                            invalidMessage={innerContext.ccw_wrongPrice}
                            placeholder=''
                        />

                        <FormRow name='category'
                            label={innerContext.ccw_cardCategory}
                            valid={validity.line5}
                            invalidMessage={innerContext.ccw_wrongCategory}
                            placeholder='мужская | женская'
                        />


                        <div className="d-flex align-items-center">
                            <Col xs={4} className="text-right p-0 pr-3">
                                <Form.Label>{innerContext.ccw_cardSize}</Form.Label>
                            </Col>

                            <Form.Control name='sizefrom' as="select" defaultValue="35" className='select_sizes'>
                                <option>35</option>
                                <option>36</option>
                                <option>37</option>
                                <option>38</option>
                                <option>39</option>
                                <option>40</option>
                                <option>41</option>
                                <option>42</option>
                                <option>43</option>
                                <option>44</option>
                                <option>45</option>
                            </Form.Control>

                            <div className='px-2'> - </div>
                            <Form.Control name='sizeto' as="select" defaultValue="45" className='select_sizes wrong_sizes' >
                                <option>35</option>
                                <option>36</option>
                                <option>37</option>
                                <option>38</option>
                                <option>39</option>
                                <option>40</option>
                                <option>41</option>
                                <option>42</option>
                                <option>43</option>
                                <option>44</option>
                                <option>45</option>
                            </Form.Control>

                            <div className={'invalid-feedback wrong_sizes ml-3' + (validity.line4 ? ' d-none' : ' d-block')}>{innerContext.ccw_wrongSize}</div>
                        </div>

                    </Form>

                    <div className="row mt-4">
                        {cards}
                    </div>

                </div>

            </div>
            <Modal show={saveSuccessShow} onHide={() => props.history.push('/admin/all-cards')}>
                <h5 className='modal-body text-center'>
                    Данные успешно сохранены на сервере!
                   </h5>
                <div className='modal-footer justify-content-center'>
                    <button className="btn btn-success px-4" onClick={() => { props.history.push('/admin/all-cards') }}>ok</button>
                </div>
            </Modal>

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


export default connect(null, mapDispatch)(CreateCardWidget);
