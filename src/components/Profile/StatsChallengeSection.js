import React, { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2';
import StatsDownloadSection from "./StatsDownloadSection";
import { getPastChallenges } from "../../routes/statistics";
import "../../css/Shared/button.css";

const StatsChallengeSection = () => {
  const [load, setLoad] = useState(false);

  const [labels, setLabels] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [failedData, setFailedData] = useState([]);

  const [graphChange, setGraphChange] = useState([]);

  const options = {
    plugins: {
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title:{
          display: true,
          text: "Date"
        }
      },
      y: {
        stacked: true,
        title:{
          display: true,
          text: "Number of Challenges"
        }
      },
    },
  };

  const [config, setConfig] = useState({
    labels,
    stacked:true,
    datasets: [
      {
        label: 'Succesful Challenges',
        data: completedData,
        backgroundColor: "rgba(1, 68, 33, 0.7)",
      },
      {
        label: 'Failed Challenges',
        data: failedData,
        backgroundColor: "rgb(138, 12, 12, 0.7)",
      }
    ]
  });

  useEffect(() => {
    if (!load) {
      getPastChallenges(determineLabels);
      setLoad(true);
    }
  }, [load]);

  useEffect(() => {
    if (completedData) {
      setGraphChange(true);
    }
  }, [completedData]);

  useEffect(() => {
    if (failedData) {
      setGraphChange(true);
    }
  }, [failedData]);

  useEffect(() => {
    if (labels) {
      setGraphChange(true);
    }
  }, [labels]);

  useEffect(() => {
    if (graphChange) {
      setConfig({
        labels,
        stacked:true,
        datasets: [
          {
            label: 'Succesful Challenges',
            data: completedData,
            backgroundColor: "rgba(1, 68, 33, 0.7)",
          },
          {
            label: 'Failed Challenges',
            data: failedData,
            backgroundColor: "rgb(138, 12, 12, 0.7)",
          },

        ]
      })
    setGraphChange(false);
    }
  }, [graphChange]);

  const determineData = (data, labels, firstChallenge) => {
    let completeList = [];
    let failedList = [];

    labels.forEach((day) => {
      completeList.push(0);
      failedList.push(0);
    });

    data.forEach(element => {
      let ifComplete = element.completed;
      let index = (Date.parse(element.dueDate) - firstChallenge)/(24*60*60*1000);
      if (ifComplete){
        completeList[index] += 1;
      }
      else{
        failedList[index] += 1;
      }
    });

    setCompletedData(completeList);
    setFailedData(failedList);
  }

  const getDate = (unixTimestamp) => {
    let date = new Date(unixTimestamp);
    return date.toISOString().split("T")[0];
  }

  const determineLabels = (data) => {
    // Grab the first day, and make the labels up to today
    let firstChallenge = Date.parse(data[0].dueDate);
    let today = Date.now();

    let dayLabels = [];
    for (let i = firstChallenge; i <= today; i += 24 * 60 * 60 * 1000) {
      dayLabels.push(getDate(i));
    }

    setLabels(dayLabels);
    determineData(data, dayLabels, firstChallenge);
  }

  return (
    <div data-testid="StatsChallengeSectionComponent" className="challengeStatsSection">
      <div className="downloadButtonHeader">
      <h1>Challenge History</h1>
      <StatsDownloadSection type = "Challenge"/>
      </div>
      <Bar options = {options} data = {config}></Bar>
    </div>
  )
}


export default StatsChallengeSection;