import React from 'react'
import Title from './Title'

export default function Dashboard() {
    return (
        <div style={{ width: 'calc(100vw - 4rem)' }}>
            <Title />
            <div className='flex'>
                <div className='basis-1/3 '>
                    <div className="card">test</div>
                </div>
                <div className='basis-1/3'>

                </div>
                <div className='basis-1/3'>

                </div>
            </div>
        </div >

    )
}

