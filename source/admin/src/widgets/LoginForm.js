import React from 'react'
import { bindActionCreators } from 'redux'
import loginAction from '../store/actions/loginAction'
import { connect } from 'react-redux'
import nec from '../commands/init'
import { withRouter } from 'react-router'


function LoginForm(props) {

    const fun = () => {
        if(loginInput.value==''||pswdInput.value=='') return null;

        nec.c.login(loginInput.value, pswdInput.value);
        
    }

    

    return (
        <div className='bg-light  vh-100 row no-gutters justify-content-center align-items-start py-0 py-sm-5' >
            <div className='card shadow-lg rounded-0' style={{width: 400}}>
                <div className='card-header text-secondary'>Login form</div>
                <div className='card-body'>
                    <input id='loginInput' className='form-control rounded-0' placeholder='login' type='text' />
                    <input id='pswdInput' className='form-control mt-2 rounded-0' placeholder='password' type='password' />
                </div>
                <div className='card-footer'>
                    <button className='btn btn-success px-4 py-1' onClick={fun}>ok</button>
                </div>
            </div>
        </div>
    )
}

const mapProps = (state) => {
    return {
        login: state.login,
    }
}

const mapDispatch = (dispatch) => {
    return {
        changeLogin: bindActionCreators(loginAction, dispatch),
    }
}

export default withRouter(connect(mapProps, mapDispatch)(LoginForm));