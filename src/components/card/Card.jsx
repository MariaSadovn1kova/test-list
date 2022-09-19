import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCat, faCrow, faDove, faFrog, faFish } from "@fortawesome/free-solid-svg-icons";
import './card.css'

const Card = props => {
    return (
        <div className='card'>
            <div className='card__img'>
                <FontAwesomeIcon  icon={props.item.img} size = "5x"/>
            </div>
            <div className='card__title'>
                <p>{props.item.title}</p>
            </div>
        </div>
    )
}

Card.propTypes = {
    item: PropTypes.object
}

export default Card