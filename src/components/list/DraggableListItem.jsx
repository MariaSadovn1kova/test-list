import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const DraggableListItem = props => {

    const itemRef = useRef(null)

    // Когда начинаем перетаскивать объект
    const onDragStart = (e) => {
        // Стираем старые настройки перетаскивания
        e.dataTransfer.effectedAllowed = 'move'
        e.dataTransfer.setDragImage(e.target, 5000, 5000)

        // Создаем новые
        let ghostNode = e.target.cloneNode(true)
        ghostNode.style.position = "absolute"
        ghostNode.style.top = (e.pageY - e.target.offsetHeight/2 ) + 'px'
        ghostNode.style.left = (e.pageX - e.target.offsetWidth/2 ) + 'px'

        ghostNode.style.height = e.target.offsetHeight + 'px'
        ghostNode.style.width = e.target.offsetWidth + 'px'

        ghostNode.style.opacity = '0.8'
        ghostNode.style.pointerEnents = 'none'

        // Добавляем id
        ghostNode.id = 'ghostNode'

        document.body.prepend(ghostNode)
        itemRef.current.classList.add('dragstart')

        if (props.onDrafStart){
            props.onDragStart(props.index)
        }
    }

    // Когда перетаскиваем объект
    const onDrag = (e) => {
        let ghostNode = document.querySelector('#ghostNode')
        ghostNode.style.top = (e.pageY - e.target.offsetHeight/2 ) + 'px'
        ghostNode.style.left = (e.pageX - e.target.offsetWidth/2 ) + 'px'
    }

    // Когда закаанчиваем перетаскивать объект, удаляем все стили из предыдущих действий
    const onDragEnd = () => {
        document.querySelector('#ghostNode').remove()
        itemRef.current.classList.remove('dragstart')
    }

    // Добавляем объект при перетаскивании
    const onDragEnter = () => itemRef.current.classList.add('dragover')

    // Удаляем объект при перетаскивании
    const onDragLeave = () => itemRef.current.classList.remove('dragover')

    const onDragOver = (e) => e.preventDefault()

    const onDrop = () => {
        itemRef.current.classList.remove('dragover')
        props.onDrop(props.index)
    }

    return (
        <li 
            ref = {itemRef}
            className='draggable-list__item'
            draggable = {props.draggable !== undefined ? props.draggable : true}
            onDragStart={onDragStart}
            onDrag = {onDrag}
            onDragEnd = {onDragEnd}
            onDragEnter = {onDragEnter}
            onDragLeave = {onDragLeave}
            onDragOver = {onDragOver}
            onDrop = {onDrop}
        >
            {props.children}
        </li>
    )
}

DraggableListItem.propTypes = {
    draggable: PropTypes.bool,
    index: PropTypes.number,
    onDragStart: PropTypes.func,
    onDrop: PropTypes.func
}

export default DraggableListItem