import React, { useState, useEffect } from 'react';
import {Modal} from 'react-bootstrap'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import innerContext from '../innerContext'
import FormRow from './FormRow'
import nec from '../commands/init'

let message;

const Settings = (props) => {

    useEffect(() => {
        document.querySelector('#wcont').scrollTo(0,0);
        props.changeActivePage('Settings');
    }, [])

    const [validity, setValidity] = useState({
        line1: true,
        line2: true,
        line3: true,
    });

    const [show, setShow] = useState(false);
    const [showF, setShowF] = useState(false);

    const checkFields = ()=>{
        let form = changePswdForm;
        let line1 = /^[a-zA-Z0-9]{4,20}$/.test(form.oldPswd.value);
        let line2 = /^[a-zA-Z0-9]{4,20}$/.test(form.newPswd.value);
        let line3 = /^[a-zA-Z0-9]{4,20}$/.test(form.repeatNewPswd.value);

        let eq = line2==line3;

        let newValidity;
        let allValid = false;
        
        if(!line1){
            newValidity = {line1: false, line2: true,line3: true};
            allValid = false;
        } else {
            if(line2&&line3){
                if(form.newPswd.value==form.repeatNewPswd.value){

                    newValidity = {line1: true, line2: true,line3: true};
                    allValid = true;
                } else {
                    newValidity = {line1: true, line2: true,line3: false};
                    message = 'Пароли не совпадают';
                    allValid = false;
                }
            } else {
                newValidity = {line1: true, line2, line3};
                message = 'Не правильный формат пароля'
                allValid = false;
            }
        }

        if (allValid) {
            updatePswd('admin',form.oldPswd.value, form.newPswd.value);
        }
        else setValidity(newValidity);
    }

    const updatePswd = (username, passwd, newPasswd)=>{
        nec.c.update(username, passwd, newPasswd).then(r=>{
            if(r) setShow(true);
            else {
                changePswdForm.reset();
                setShowF(true);
            }
        })

    }

    return (
        <div className='col-12' style={{minWidth: 400}}>
            <div className='card rounded-0 shadow ' style={{ minHeight: '100%' }}>
                <div className='card-header'>
                    <span >{innerContext.st_title}</span>
                </div>

                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex p-0">
                        <div className='w-25 p-4 d-flex justify-content-end align-items-center '>{innerContext.st_passw_ch}</div>
                        <form id='changePswdForm' className='w-75 d-flex flex-column border-left align-items-stretch p-4'>
                            <FormRow valid={validity.line1} 
                                     label={innerContext.st_enterP} 
                                     name='oldPswd' 
                                     inputType='password' 
                                     placeholder='[a-zA-Z0-9]' 
                                     invalidMessage='Неправильный формат пароля'
                            />
                            <FormRow valid={validity.line2} 
                                     label={innerContext.st_enterNP} 
                                     name='newPswd' 
                                     inputType='password' 
                                     placeholder='[a-zA-Z0-9]' 
                                     invalidMessage='Не правильный формат пароля'
                            />
                            <FormRow valid={validity.line3} 
                                     label={innerContext.st_repeatNP} 
                                     name='repeatNewPswd' 
                                     inputType='password' 
                                     placeholder='[a-zA-Z0-9]' 
                                     invalidMessage={message}
                            />
                            <div className='d-flex justify-content-center mt-4'>
                                <button className='btn btn-sm btn-secondary mr-3' type='button' onClick={checkFields}>{innerContext.st_save}</button>
                                <button className='btn btn-sm btn-warning' type='reset' onClick={()=>setValidity({line1:true, line2: true, line3: true})}>{innerContext.st_clear}</button>
                            </div>
                        </form>
                    </li>
                    <li className="list-group-item d-flex p-0"></li>
                </ul>

            </div>
            <Modal show={show} onHide={()=>null} >
                <h5 className='modal-body text-center'>
                    Пароль поменян, необходимо перелогиниться.
                   </h5>
                <div className='modal-footer justify-content-center'>
                    <button className="btn btn-sm btn-info px-4" onClick={() => nec.c.logout()}>Ок</button>
                    
                </div>
            </Modal>
            <Modal show={showF} onHide={()=>setShowF(false)} >
                <h5 className='modal-body text-center'>
                    При смене пароля произошла ошибка.
                   </h5>
                <div className='modal-footer justify-content-center'>
                    <button className="btn btn-sm btn-info px-4" onClick={() => setShowF(false)}>Ок</button>
                    
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




export default connect(null, mapDispatch)(Settings);
