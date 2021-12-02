import React from 'react';
import { Spin } from 'antd';
import './css/load.css'
function Loading() {
    return (
        <div className="load">
             <Spin tip="Carregando..." size="large"></Spin>
        </div>
    )
}

export default Loading
