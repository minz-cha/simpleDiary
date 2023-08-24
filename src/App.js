import { useRef, useState } from 'react';
import './App.css';
import DiaryEditor from './DiaryEditor';
import DiaryList from './DiaryList';

function App() {
  const [data, setData] = useState([]);

  const dataId = useRef(0)

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author, content, emotion, created_date,
      id: dataId.current
    }
    //기존 데이터의 위에 새로운 data 추가
    dataId.current += 1
    setData([newItem, ...data])
  }

  const onRemove = (targetId) => {
    const newDiaryList = data.filter((it) => it.id !== targetId)
    setData(newDiaryList)
  }

  const onEdit = (targetId, newContent) => {
    setData(
      data.map((it) =>
        it.id === targetId ? { ...it, content: newContent } : it)
    )
  }

  return (
    <div className='App'>
      <DiaryEditor onCreate={onCreate} />
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App;
