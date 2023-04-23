import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../css/Shared/page3.css";
import StatsCalculatorSection from '../components/Profile/StatsCalculatorSection';
const backend_url = process.env.REACT_APP_PROD_BACKEND;
const TestDiv = () => {

    return(
        <div>
            <StatsCalculatorSection/>


        </div>
    );
}

export default TestDiv;