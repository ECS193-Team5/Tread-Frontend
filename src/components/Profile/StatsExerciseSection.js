import React, {useState, useEffect} from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import axios from 'axios';
import "../../css/Profile/profile.css";
import { Bar } from 'react-chartjs-2';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const backend_url = process.env.REACT_APP_PROD_BACKEND;


const StatsExerciseSection = () => {
    const [load, setLoad] = useState(false);
    const [graphChange, setGraphChange] = useState(false);

    const [labels, setLabels] = useState([]);

    const [availableExercises, setAvailableExercises] = useState([]);

    const [selectedExerciseName, setSelectedExerciseName] = useState("");
    const [selectedExerciseUnit, setSelectedExerciseUnit] = useState("m");
    const [selectedExerciseUnitType, setSelectedExerciseUnitType] = useState("distance");

    const [data, setData] = useState([]);
    const [config, setConfig] = useState(
        {
            labels,
            datasets: [
              {
                label: selectedExerciseName,
                data: [],
                backgroundColor: 'rgba(1, 68, 33, 0.5)',
              }
            ],
        }
    );

    const options = {
        plugins: {
        },
        responsive: true,
        scales: {
          x: {
            title:{
              display: true,
              text: "Date"
            }
          },
          y: {
            title:{
              display: true,
              text: selectedExerciseUnit
            }
          },
        },
      };


    const [exerciseLog, setExerciseLog] = useState([]);


    useEffect(() => {
        if((["m", "km", "mi", "ft", "yd"]).includes(selectedExerciseUnit)){
            setSelectedExerciseUnitType("distance");

        }
        else if((["s", "min", "hr"]).includes(selectedExerciseUnit)){
            setSelectedExerciseUnitType("time");

        }
        else if((["ct"]).includes(selectedExerciseUnit)){
            setSelectedExerciseUnitType("count");

        }
    },[selectedExerciseUnit]);

    useEffect(() => {
        if(selectedExerciseUnit){
            setGraphChange(true);
        }
    },[selectedExerciseUnit]);

    useEffect(() => {
        if(data){
            recalculateConfig();
        }
    },[data]);

    const recalculateConfig = () => {
        setConfig(
            {
                labels,
                datasets: [
                  {
                    label: selectedExerciseName,
                    data: data,
                    backgroundColor: 'rgba(1, 68, 33, 0.7)',
                  }
                ],
            }
        )

    }
    useEffect(() => {
        if(!load){
            requestExercises();
            setLoad(true);
        }
    },[load]);

    useEffect(() => {
        if(selectedExerciseName){
            setGraphChange(true);
        }
    },[selectedExerciseName]);



    useEffect(() => {
        if(graphChange){
            calculateData();
            setGraphChange(false);
        }
    },[graphChange]);

    const conversion = (amount, toUnit) => {
        let conversionKey = {
            "ct":1,
            "m":1,
            "km":(1/1000),
            "ft": 3.28084,
            "yd": 1.0936133333333,
            "mi": 0.00062137121212119323429,
            "s": 60,
            "min": 1,
            "hr": (1/60)
        }

        return amount * conversionKey[toUnit];
    }
    const calculateData = () => {
        if (exerciseLog.length === 0){
            return;
        }
        let dataList = [];
        let firstDate = Date.parse(exerciseLog[0].loggedDate);


        labels.forEach((day) => {
            dataList.push(0);
        });

        exerciseLog.forEach((exercise) =>
        {

            // Return early if the exercise does not match
            if (exercise.exercise.exerciseName !== selectedExerciseName ||
                exercise.exercise.unitType !== selectedExerciseUnitType){
                    return;
            }

            let convertedAmount = exercise.exercise.convertedAmount;

            let exerciseDate = Date.parse(exercise.loggedDate);
            let index = (exerciseDate - firstDate)/(24*60*60*1000);

            dataList[index] += conversion(convertedAmount, selectedExerciseUnit);
        });

        setData(dataList);
    }
    const calculateFirstDay = (exerciseLog) => {
        let firstExercise = Date.parse(exerciseLog.loggedDate);
        return firstExercise;
    }

    const getDate = (unixTimestamp) =>{
        let date = new Date(unixTimestamp);
        return date.toISOString().split("T")[0];
    }

    const  calculateExerciseDays = (exerciseLog) => {
        let firstDay = calculateFirstDay(exerciseLog[0]);
        let today = Date.now();

        let dayLabels = [];
        for(let i = firstDay; i <= today; i += 24*60*60*1000){
            dayLabels.push(getDate(i))
        }
        setLabels(dayLabels);
    }

    const calculateExerciseOptions = (exerciseLog) => {

        let reducedExerciseList =  new Set();

        exerciseLog.forEach((newItem) => {
            reducedExerciseList.add(newItem.exercise.exerciseName);
        });

        let exercises = Array.from(reducedExerciseList);
        setAvailableExercises(exercises)
        setSelectedExerciseName(exercises[0]);
    }



    const requestExercises = () => {
        var config = {
            method : 'post',
            url : backend_url + 'stats/get_exercise_log',
            headers: {
              Accept: 'application/json',
            },
            withCredentials: true,
            credentials: 'include'
          };
          axios(config)
          .then(function(response){
            calculateExerciseOptions(response.data);
            calculateExerciseDays(response.data);
            setExerciseLog(response.data);
          })
          .catch(function(error){
            if(error.response.status===401){
              window.location.href = "/loginPage";
          }
          });

    }


    const changeUnit = (event) => {
        setSelectedExerciseUnit(event.target.value);
    }

    const changeExerciseName = (event) => {
        setSelectedExerciseName(event.target.value);
    }




    return (<div>
        <h1>Exercise History</h1>
        <div >
            <select className = "formSelect exercisePicker" onChange = {changeExerciseName}>
                {availableExercises.map((item) => {return <option value = {item}>{item}</option>})}
            </select>
            <select className = "formSelect exercisePicker" onChange = {changeUnit}>
                <option value = "m">m</option>
                <option value = "km">km</option>
                <option value = "ft">ft</option>
                <option value = "yd">yd</option>
                <option value = "mi">mi</option>

                <option value = "s">s</option>
                <option value = "min">min</option>
                <option value = "hr">hr</option>

                <option value = "ct">ct</option>

            </select>
        </div>
        <Bar options = {options} data = {config}></Bar>
        </div>
        );
}

export default StatsExerciseSection;