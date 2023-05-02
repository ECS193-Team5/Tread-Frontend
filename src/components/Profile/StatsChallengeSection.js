import { useState, useEffect } from "react";
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import "../../css/Shared/button.css";
import StatsDownloadSection from "./StatsDownloadSection";

const backend_url = process.env.REACT_APP_PROD_BACKEND;
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
      requestChallenges();
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

  const requestChallenges = () => {
    var config = {
      method: 'post',
      url: backend_url + 'stats/get_past_challenges',
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
      credentials: 'include'
    };
    axios(config)
      .then(function (response) {
        determineLabels(response.data);
      })
      .catch(function (error) {
        if (error.response.status === 401) {
          window.location.href = "/loginPage";
        }
      });
  }

  return (
    <div className="challengeStatsSection">
      <div className="downloadButtonHeader">
      <h1>Challenge History</h1>
      <StatsDownloadSection type = "Challenge"/>
      </div>
      <Bar options = {options} data = {config}></Bar>
    </div>
  )
}


export default StatsChallengeSection;