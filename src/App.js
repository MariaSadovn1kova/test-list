import './App.css';
import {listData} from '../src/assets/listData'
import DraggableList from './components/list/DraggableList';
import Card from './components/card/Card';

function App() {
  return (
    <>
      <h1 className='header'>
        Выбери себе питомца
      </h1>
      <DraggableList
        data = {listData}
        renderItemContent={(item) => AnimalCard(item)}
      />
    </>
  );
}

const AnimalCard = item => <Card item = {item}/>

export default App;
