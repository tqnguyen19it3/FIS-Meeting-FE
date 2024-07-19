import React, { useCallback, useEffect, useState } from "react";
import HeaderRow from "./HeaderRow";
import TimeCol from "./TimeCol";
import MeetingCard from "./MeetingCard";
import axios from "axios";
import { toast } from "react-toastify";

const Schedule = () => {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await axios.get("http://localhost:3030/api/v1/meeting/get-meeting-list");
        if(response.data.error){
            toast.error(`Error: ${response.data.error + " " + response.data.message}`);
        }else {
            toast.success(`Success: ${response.data.message}`);
            setMeetings(response.data.data);
            // console.log(response.data.data);
        }
      } catch (error) {
        toast.error(`Error: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    fetchMeetings();
}, []);

  return (
    <>
        <div className="flex flex-col mx-20 rounded-xl overflow-hidden shadow-md">
            <HeaderRow />
            <div className="overflow-auto flex">
                <TimeCol />
                <MeetingCard meetings={meetings} loading={loading}/>
            </div>
        </div>
    </>
  );
};

export default Schedule;
