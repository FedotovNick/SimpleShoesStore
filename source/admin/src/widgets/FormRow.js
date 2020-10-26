import React from 'react';



const FormRow = (props) => {

    const name = props.name;
    const label = props.label || 'Label';
    const placeholder = props.placeholder || 'Enter your value ...';
    const invalidMessage = props.invalidMessage || 'Wrong value!';
    const defaultValue = props.defaultValue || '';

    const valid = props.valid;

    return (
        <label className={'row m-0 mb-4 mb-lg-3 '+props.className}>
            <div className='col-4 form-control border-0 text-truncate text-right pr-3'>
                {label}
            </div>
            <div className='col-6 col-md-9 col-lg-6 px-0' >
                <input name={name} defaultValue={defaultValue} type={props.inputType||'text'} className={'form-control rounded-0' + (valid ? '' : ' is-invalid')} placeholder={placeholder} />
            </div>
            <div className={'offset-4 col-6 text-danger align-self-center small px-0 justify-content-start pt-2  ' + (valid ? 'd-none' : 'd-inline-block')}>
                {invalidMessage}
            </div>

        </label>
    )
}


export default FormRow;