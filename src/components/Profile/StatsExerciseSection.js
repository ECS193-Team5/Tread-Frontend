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
import "../../css/Profile/profile.css";
import "../../css/Shared/button.css";
import { Bar } from 'react-chartjs-2';
import StatsDownloadSection from './StatsDownloadSection';
import hardCodedInfo from "../../helpers/SharedHardCodeInfo.json";
import { getPastExercises } from '../../routes/statistics';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const StatsExerciseSection = () => {
    const [load, setLoad] = useState(false);
    const [graphChange, setGraphChange] = useState(false);

    const [labels, setLabels] = useState([]);

    const [availableExercises, setAvailableExercises] = useState([]);
    const [availableUnits, setAvailableUnits] = useState([]);

    const [selectedExerciseName, setSelectedExerciseName] = useState("");
    const [selectedExerciseUnit, setSelectedExerciseUnit] = useState("");
    const [selectedExerciseUnitType, setSelectedExerciseUnitType] = useState("");
    const [exerciseLog, setExerciseLog] = useState([]);
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




    useEffect(() => {
        if(selectedExerciseUnit){
            if((hardCodedInfo.distanceUnits).includes(selectedExerciseUnit)){
                setSelectedExerciseUnitType("distance");
            }
            else if((hardCodedInfo.timeUnits).includes(selectedExerciseUnit)){
                setSelectedExerciseUnitType("time");
            }
            else{
                setSelectedExerciseUnitType("count");
            }
        }
    },[selectedExerciseUnit]);

    useEffect(() => {
        setGraphChange(true);
    },[selectedExerciseUnit]);

    useEffect(() => {
        setGraphChange(true);
    },[availableUnits]);

    useEffect(() => {
        if(data.length>0){
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
            getPastExercises(processPastExercise);
            setLoad(true);
        }
    },[load]);

    const calculateAvailableUnits = (exerciseName) => {
        let unitTypeOptions = new Set();

        exerciseLog.forEach((log) =>{
            if (log.exercise.exerciseName === selectedExerciseName){
                unitTypeOptions.add(log.exercise.unitType);
            }
        })

        let unitOptions = [];

        if (unitTypeOptions.has("distance")){
            hardCodedInfo.distanceUnits.forEach(unit => {unitOptions.push(unit)});
        }
        if (unitTypeOptions.has("time")){
            hardCodedInfo.timeUnits.forEach(unit => {unitOptions.push(unit)});
        }
        if (unitTypeOptions.has("count")){
            hardCodedInfo.countUnits.forEach(unit => {unitOptions.push(unit)});
        }

        setSelectedExerciseUnit(unitOptions[0]);
        setAvailableUnits(unitOptions);
    }

    useEffect(() => {
        if(selectedExerciseName){
            calculateAvailableUnits();
        }
    },[selectedExerciseName]);

    useEffect(() => {
        if(graphChange){
            calculateData();
            setGraphChange(false);
        }
    },[graphChange]);

    const conversion = (amount, toUnit) => {
        return amount * hardCodedInfo.conversionKey[toUnit];
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
            let index = Math.floor((exerciseDate - firstDate)/(24*60*60*1000));
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
        if (exerciseLog.length === 0){
            return;
        }

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

    const processPastExercise = (data) =>{
        calculateExerciseOptions(data);
        calculateExerciseDays(data);
        setExerciseLog(data);
    }

    const changeUnit = (event) => {
        setSelectedExerciseUnit(event.target.value);
    }

    const changeExerciseName = (event) => {
        setSelectedExerciseName(event.target.value);
    }

    return (<div data-testid="StatsExerciseSectionComponent" className='exerciseStatsSection'>
        <div className = "downloadButtonHeader">
            <h2 >Exercise History</h2>
            <StatsDownloadSection type = "Exercise"/>
        </div>
        <div >
            <select data-testid="StatsExerciseSectionExerciseNameSelect" className = "formSelect exercisePicker" onChange = {changeExerciseName} defaultValue={"none"}>
                {availableExercises.map((item, index) => {return <option key = {index} value = {item}>{item}</option>})}
            </select>
            <select data-testid="StatsExerciseSectionExerciseUnitSelect" id = "challengeExerciseUnitPicker" className = "formSelect exercisePicker" onChange = {changeUnit} defaultValue={"none"}>
                {availableUnits.map((item, index) =>{ return <option key = {index} value = {item}> {hardCodedInfo.fullUnitName[item]}</option> })}
            </select>
        </div>
        <div class="chart-container statsChallengeHistory" style={{position: 'relative', width:"100%", height:"60vw", maxHeight:"400px"}}>
        <Bar options = {options} data = {config}></Bar>
        </div>
        </div>
        );
}

export default StatsExerciseSection;