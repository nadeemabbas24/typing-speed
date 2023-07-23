import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import TableUserData from "../Components/TableUserData";
import Graph from "../Components/Graph";
import UserInfo from "../Components/UserInfo";

const UserPage = () => {
  const [data, setData] = useState();
  const [user, loading] = useAuthState(auth);
  const [graphData, setGraphData] = useState([]);
  const navigate = useNavigate();

  const fetchUserData = () => {
    const resultRef = db.collection("Results");
    const { uid } = auth.currentUser;

    let tempData = [];
    let tempGraphData = [];
    resultRef
      .where("userId", "==", uid)
      .orderBy("timeStamp", "desc")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          tempData.push({ ...doc.data() });
          tempGraphData.push([
            doc.data().timeStamp.toDate().toLocaleString().split(",")[0],
            doc.data().wpm,
          ]);
        });
        setData(tempData);
        setGraphData(tempGraphData.reverse());
        // console.log(tempData);
      });
  };

  useEffect(() => {
    if (!loading) {
      fetchUserData();
    }
    if (!loading && !user) navigate("/");
  }, [loading]);
  if (loading)
    return (
      <div className="center-screen">
        <CircularProgress size={300} />
      </div>
    );

  return (
    <div className="canvas">
      {data && (
        <div>
          <UserInfo totalTestTaken={data.length} />
          <div className="graph">
            <Graph graphData={graphData} />
          </div>
          <TableUserData data={data} />
        </div>
      )}
    </div>
  );
};

export default UserPage;
