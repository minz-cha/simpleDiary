import React, { useEffect, useState } from "react"

const CounterA = React.memo(({ count }) => {
    useEffect(() => {
        console.log(`CounterA Update - count : ${count}`)
    })
    return <div>{count}</div>
})

const CounterB = ({ obj }) => {
    useEffect(() => {
        console.log(`CounterB Update - count : ${obj.count}`)
    })
    return <div>{obj.count}</div>
}

const areEqual = (preProps, nextProps) => {
    // 이전 props === 현재 props -> 리렌더링 발생X, return true
    return preProps.obj.count === nextProps.obj.count
}

const MemoizedCounterB = React.memo(CounterB, areEqual)

const OptimizeTest = () => {
    const [count, setCount] = useState(1)
    const [obj, setObj] = useState({
        count: 1
    })

    return (
        <div style={{ padding: 50 }}>
            <div>
                <h2>Counter A</h2>
                <CounterA count={count} />
                {/* 버튼 클릭시 : 값이 바뀌지 않으므로 useEffect에 대한 console도 뜨지 않음 */}
                <button onClick={() => setCount(count)}>A button</button>
            </div>
            <div>
                <h2>Counter B</h2>
                <MemoizedCounterB obj={obj} />
                {/* 버튼 클릭시 : 값은 1이지만 useEffect 실행되어 console 나타남 */}
                <button onClick={() => setObj({ count: 1 })}>B button</button>
            </div>
        </div >
    )
}

export default OptimizeTest