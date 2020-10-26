import React, { useEffect, useState } from 'react';
import { DropdownButton, Dropdown, ButtonGroup, Button } from 'react-bootstrap'
import ProductCard from './ProductCard'
import { connect } from 'react-redux'
import nec from '../commands/init'
import innerContext from '../innerContext'
import {scrollingTop} from '../functions'

function ProductsContainer(props) {
    const val1 = 'самые новые';
    const val2 = 'самые дешевые';
    const val3 = 'самые дорогие';
    const [filt, setFilt] = useState(val1);

    let cards = [];
    let paginatorItems = [];

    useEffect(() => {
        scrollingTop();
        store.dispatch({ type: 'SET_CURRENT_PAGE_NAME', currentPageName: props.sortingParam })
        nec.execute('READ_ALL_PRODUCT_CARDS', { key: props.sortingParam, page: 0 });
        setFilt(val1);

    }, [props.sortingParam]);

    

    const filterPostfix = () => {
        let str = '';

        switch (filt) {
            case val1: str = '&sort=id,desc';
                break;
            case val2: str = '&sort=price,asc';
                break;
            case val3: str = '&sort=price,desc';
                break;
        }

        return str;
    }

    if (props.allCardsPage != null && props.allCardsPage.cardList.length > 0) {
        cards = props.allCardsPage.cardList.map((v, i) => {
            return (
                <div key={'card_key_' + i} className='col-12 col-sm-6 col-md-4 py-4'>
                    <ProductCard className=' ' title={v.title} cardId={i} price={v.price} src={innerContext.host + v.links[0]} />
                </div>
            )
        });

        let num = props.allCardsPage.pageNumber;
        let size = props.allCardsPage.totalPages;

        let prevInd = num - 1 < 0 ? undefined : num - 1;
        let nextInd = num + 2 > size ? undefined : num + 1;

        paginatorItems = [];
        paginatorItems.push(
            <li key={'paginatorItem_prev'} className={"page-item " + (prevInd >= 0 ? '' : 'disabled')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                <div data-ind={prevInd ? prevInd : 0} onClick={prevInd >= 0 ? paginatorItemClick : null} className="page-link" href="#">назад</div>
            </li>
        )
        for (let i = 0; i < size; i++) {

            paginatorItems.push(
                <li key={'paginatorItem_' + i} className={'page-item ' + (num == i ? "active" : "")} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <div data-ind={i} className="m-page-link page-link" onClick={paginatorItemClick}>
                        {i + 1}
                    </div>
                </li>
            );

        }
        paginatorItems.push(
            <li key={'paginatorItem_next'} className={"page-item " + (nextInd ? '' : 'disabled')} style={{ cursor: 'pointer', userSelect: 'none' }}>
                <div data-ind={nextInd ? nextInd : num - 1} onClick={nextInd ? paginatorItemClick : null} className="page-link" href="#">вперед</div>
            </li>
        )
    }

    function paginatorItemClick(e) {
        scrollingTop();
        let index = e.target.dataset.ind - 0;
        nec.execute('READ_ALL_PRODUCT_CARDS', { key: props.sortingParam, page: index, filter: filterPostfix() });

    }

    return (
        <div className='row my-4 justify-content-center'>

            <div className='col-md-12 col-lg-8'>
                
                    <div className='border-0 bg-gray-100 rounded-0'>
                        <div className='my-5 d-flex justify-content-end align-items-center'>
                            <span className='h5 m-0 text-dark'>Сортировать</span>

                            <ButtonGroup className='ml-2'>
                                <DropdownButton as={ButtonGroup} variant='outline' title={filt} className='' style={{ border: 'gray solid 1px' }}>

                                    <Dropdown.Item onClick={() => setFilt(val1)}>{val1}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFilt(val2)}>{val2}</Dropdown.Item>
                                    <Dropdown.Item onClick={() => setFilt(val3)}>{val3}</Dropdown.Item>

                                </DropdownButton>

                                <Button variant='secondary'
                                    onClick={() => nec.execute('READ_ALL_PRODUCT_CARDS', { key: props.sortingParam, page: 0, filter: filterPostfix() })}
                                >
                                    Искать
                            </Button>
                            </ButtonGroup>

                        </div>
                    
                </div>
                <div className='row'>
                    {cards}
                </div>
            </div>



            <div className='mt-4 col-12'>
                <ul className="pagination justify-content-center " >
                    {paginatorItems}
                </ul>
            </div>
        </div>
    )
}


function mapProp(state) {
    return {
        allCardsPage: state.allCardsPage,
    }
}

export default connect(mapProp, null)(ProductsContainer);