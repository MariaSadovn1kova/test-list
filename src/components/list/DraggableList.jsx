import React, {useState} from 'react';
import PropTypes from 'prop-types';

import './draggable-list.css'
import DraggableListItem from './DraggableListItem';

const DraggableList = props => {
    const [data, setData] = useState(props.data);
    const [dragStartIndex, setdragStartIndex] = useState(null);

    // Получаем индекс объекта, который тянут
    const onDragStart = (index) => setdragStartIndex(index)

    const onDrop = (dropIndex) => {
        const dragItem = data[dragStartIndex]
        const list = [... data]
        list.splice(dragStartIndex, 1)

        if (dragStartIndex < dropIndex){
            setData([
                ...list.splice(0, dropIndex - 1),
                dragItem,
                ...list.splice(dropIndex - 1, list.length)
            ])
        } else {
            setData([
                ...list.splice(0, dropIndex),
                dragItem,
                ...list.splice(dropIndex, list.length)
            ])
        }
    } 

    return (
        <ul className='draggable-list'>
            {
                data.map((item, index) =>   (
                    <DraggableListItem 
                        key = {index}
                        index = {index}
                        onDragStart = {(index) => onDragStart(index)}
                        onDrop = {(index) => onDrop(index)}
                    >
                        {
                            props.renderItemContent(item)
                        }
                    </DraggableListItem>
                ))
            }
            {
                <DraggableListItem
                    key={data.lenght}
                    draggale = {false}
                    index = {data.lenght}
                    onDrop = {(index) => onDrop(index)}
                />
            }
        </ul>
    )
}

DraggableList.propTypes = {
    data: PropTypes.array,
    renderItemContent: PropTypes.func
}

export default DraggableList