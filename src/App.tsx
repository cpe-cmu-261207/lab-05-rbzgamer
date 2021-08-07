import React from 'react';
import Header from './Header';
import Todolist from './TodoList';
import Footer from './Footer'
import { useState } from 'react'
import Task from './Task';

function App() {

    const onKeyDownCallback = (ev: React.KeyboardEvent<HTMLInputElement>) => {
        /* check pressing enter key here */
    }

    return (
        <div>
            {/*Header Section*/}
            <Header></Header>

            {/* todo section */}
            <Todolist></Todolist>

            {/*Footer Section*/}
            <Footer></Footer>
        </div>
    );
}

export default App;
