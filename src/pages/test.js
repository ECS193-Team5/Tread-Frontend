import RowBox from "../components/Social/RowBox";
import {useState} from "react";
import Bar from "../components/Shared/Bar";
import "./try.css";

const TestDiv = () => {
    const updateFunc = (value) => {
        console.log(value, " clicked")
    }


    return (<div>
        <p>Testing Page</p>

    </div>)
}

export default TestDiv;