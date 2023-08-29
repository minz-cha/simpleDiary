import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import DiaryEditor from './DiaryEditor'
import DiaryList from './DiaryList'
import OptimizeTest from './OptimizeTest'

function App() {
  const [data, setData] = useState([])
  const dataId = useRef(0)

  //비동기함수
  const getData = async () => {
    //json값만 호출
    const res = await fetch('https://jsonplaceholder.typicode.com/comments').then((res) => res.json())

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        //emotion 값은 정수 1~5 랜덤값 생성
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime() + 1,
        id: dataId.current++
      }
    })
    setData(initData)
  }

  //Mount
  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 1500)
  }, [])

  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime()
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
        it.id === targetId ? { ...it, content: newContent } : it
      )
    )
  }

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length
    const badCount = data.length - goodCount
    const goodRatio = (goodCount / data.length) * 100
    return { goodCount, badCount, goodRatio }
  }, [data.length])

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis

  return (
    <div className='App'>
      <OptimizeTest />
      <DiaryEditor onCreate={onCreate} />
      <div>전체 일기: {data.length}</div>
      <div>기분 좋은 일기 개수: {goodCount}</div>
      <div>기분 나쁜 일기 개수: {badCount}</div>
      {/* 소수점 둘째자리까지 */}
      <div>기분 좋은 일기 비율: {goodRatio.toFixed(2)}%</div>
      <DiaryList onEdit={onEdit} onRemove={onRemove} diaryList={data} />
    </div>
  );
}

export default App
