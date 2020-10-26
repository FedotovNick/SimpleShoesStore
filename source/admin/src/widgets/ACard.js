import React from 'react';
import nec from '../commands/init'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import innerContext from '../innerContext'


function ACard(props) {
	const index = props.cardId;

	function delFun() {
		props.delFun(props.cardId);
	}

	function updateFun(e){

		for (let i=0; i<props.cards.cardList.length; i++){
			if(props.cards.cardList[i].id == index){
				nec.execute('EDIT_CARD',{cardIndex: i});
				props.history.push('/admin/edit-card');

			} 
		}
		
	}

	return (
		<div className='card rounded-0 shadow' >
			<div className='card-header text-center text-truncate'>{props.title}</div>
			<div className='position-relative m-card-frame' onClick={updateFun}>
				<img className='card-img-top rounded-0' style={{position: 'absolute',left:0, top:0 }} variant="top" src={props.src} />
			</div>
			
			<div className='card-body'>
				<div className='card-title' >{props.price} UAH</div>

				<button className='btn btn-light mr-2' onClick={updateFun}>
					{innerContext.butUpdate}
					<svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M10.187 9.125l1.831 1.832c.199.918-1.131 2.264-2.061 2.061l-1.832-1.832c-.083.284-.125.577-.125.871 0 .779.295 1.556.889 2.15.656.656 1.537.951 2.396.884.453-.034.899.131 1.222.452l2.033 2.034c.28.282.649.423 1.018.423.809 0 1.459-.663 1.442-1.472-.009-.358-.149-.714-.422-.988l-2.034-2.034c-.321-.322-.487-.769-.452-1.222.066-.858-.229-1.739-.885-2.395-.595-.595-1.372-.889-2.15-.889-.293 0-.586.042-.87.125zm5.841 7.417c0 .269-.219.486-.486.486-.269 0-.486-.218-.486-.486s.218-.485.486-.485.486.217.486.485zm-9.944-12.542c1.379 1.612 2.576 3 4.916 3h11v13h-20v-16h4.084zm.916-2h-7v20h24v-17h-13c-1.629 0-2.305-1.058-4-3z"/></svg>
					
				</button>

				<button className='btn btn-light' onClick={delFun}>
					{innerContext.butDelete}
					<svg className='ml-2' xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M9 19c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5-17v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712zm-3 4v16h-14v-16h-2v18h18v-18h-2z"/></svg>
					
				</button>
			</div>
		</div>

	)
}


function mapProps(state){
	return {
		cards: state.cards,
	}
}

export default withRouter(connect(mapProps, null)(ACard));