import React, {useState} from 'react'
import DefaultLayout from '../../containers/DefaultLayout'

import logo from '../../assets/bk.jpg'
import vector from '../../assets/vector.png'

const Home = (props) => {

    return(
        <DefaultLayout component="main" maxWidth="xs">
            <div className="page-home">
                <img src={logo}></img>

           </div>
        </DefaultLayout>
    )
}


export default Home;