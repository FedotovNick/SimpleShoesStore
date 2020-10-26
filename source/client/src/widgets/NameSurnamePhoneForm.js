import React, { useState } from 'react';


export default function NameSurnamePhoneForm(props) {
    const [validity, setValidity] = useState({
        line1: true,
        line2: true,
        line3: true,
    })

    const invalidMessages = {
        line1: 'Поле пусто или Вы не правильно ввели имя',
        line2: 'Поле пусто или Вы не правильно ввели фамилию',
        line3: 'Неправильный формат телефона',
    }

    function send(e) {
        let form = document.forms['f1'];
        let names = ['name', 'surname', 'mobilenum'];
        let temporaryValidity = { ...validity };

        if (!testNames(form['name'].value)) temporaryValidity.line1 = false;
        else temporaryValidity.line1 = true;


        if (!testNames(form['surname'].value)) temporaryValidity.line2 = false;
        else temporaryValidity.line2 = true;


        if (!testMobileNum(form['mobilenum'].value)) temporaryValidity.line3 = false;
        else temporaryValidity.line3 = true;

        setValidity(temporaryValidity);

        if (checkValid(temporaryValidity)) {
            let obj = {};
            names.forEach((v, i) => {
                obj[v] = form[v].value;
            })

            if (props.handleResult) props.handleResult(obj);
            
        };

    }

    function cleanValidity() {
        let clearV = { ...validity };

        for (let k in clearV) clearV[k] = true;
        setValidity(clearV);
    }

    function testNames(name) {
        return /^[a-zA-Zа-яА-Я][a-zа-я]{1,100}$/.test(name);
    }

    function testMobileNum(num) {
        return /^\+380[0-9]{9}$/.test(num);
    }

    function checkValid(validObj) {

        for (let k in validObj) {
            if (!validObj[k]) return false;
        }

        return true;
    }

    return (

        <form name='f1' className={'card rounded-0 '+props.className}>
            <div className='card-header bg-gray-200'>Форма заказа</div>

            <div className='card-body'>

                <FormRow name='name' label='Имя' valid={validity.line1} invalidMessage={invalidMessages.line1} placeholder='например: Иван' />
                <FormRow name='surname' label='Фамилия' valid={validity.line2} invalidMessage={invalidMessages.line2} placeholder='например: Федоров' />
                <FormRow name='mobilenum' label='Номер телефона' valid={validity.line3} invalidMessage={invalidMessages.line3} placeholder='например: +380991231231' />

            </div>

            <div className='card-footer bg-gray-200'>
                <button type='button' className='btn btn-sm btn-success' onClick={send}>Оформить</button>
                <button type='reset' className='btn btn-sm btn-secondary ml-2' onClick={cleanValidity}>Очистить</button>
            </div>
        </form>

    )
}


const FormRow = (props) => {

    const name = props.name;

    const label = props.label || 'Label';
    const placeholder = props.placeholder || 'Enter your value ...';
    const invalidMessage = props.invalidMessage || 'Wrong value!';
    const defaultValue = props.defaultValue || '';

    const valid = props.valid;

    return (
        <label className='row m-0 mb-4 mb-lg-3'>
            <div className='col-12 col-md-3 col-lg-3 form-control border-0
							px-0 text-truncate'>
                {label}
            </div>
            <div className='col-12 col-md-9 col-lg-6 px-0' >
                <input name={name} defaultValue={defaultValue} type='text' className={'form-control rounded-0' + (valid ? '' : ' is-invalid')} placeholder={placeholder} />
            </div>
            <div className={'col-12 col-lg-3 text-danger align-self-center small px-0 justify-content-center	justify-content-lg-start pl-lg-3 ' + (valid ? 'd-none' : 'd-inline-block')}>
                {invalidMessage}
            </div>

        </label>
    )
}