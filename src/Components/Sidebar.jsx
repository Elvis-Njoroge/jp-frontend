import React from 'react';
import "../App.css"
import {SidebarData} from './SidebarData'

function Sidebar (){

    const user={
        avatar:'https://cdn-icons-png.flaticon.com/512/147/147133.png'
    }
    return(
        <div className='Sidebar'>
            <div className='title-container'>
                <h3 id='title'>JiPange</h3>        
            </div>
            <div className='avatar-container'>
            <img
                className='avatar'
                alt='avatar'
                src= {user.avatar}>
            </img>                
            </div>
            <ul className='SidebarList'>
            {SidebarData.map((val,key)=>{
                return(<li key={key} 
                    className='row'
                    id={window.location.pathname === val.link ? "active" : ""} 
                    onClick={()=>{window.location.pathname =  val.link}}
                    >
                    <div id='icon'>{val.icon}</div>
                    <div id='title'>{val.title}</div>
                </li>)
            })}
            </ul>
        </div>
    )
}

export default Sidebar;