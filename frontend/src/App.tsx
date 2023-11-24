import {Route, Routes} from "react-router-dom";
import AddPage from "./pages/AddPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import {useEffect, useState} from "react";
import {Workout} from "./types/types.ts";
import axios from "axios";
import DetailsPage from "./pages/DetailsPage.tsx";

function App() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const userId = "655b5b283f332f4fcfbf02c0";

    function fetchWorkouts() {
        axios.get(`api/workouts/${userId}`)
            .then((response) => {
                setWorkouts(response.data);
            })
            .catch(error => {
                console.error("Fehler beim Abrufen des Workouts: " + error);
            });
    }

    useEffect(() => {
        fetchWorkouts();
    }, []);

    return (
        <>
            <Routes>
                <Route path={"/"} element={<HomePage userId={userId} workouts={workouts} />} />
                <Route path={"/workout/add"} element={<AddPage userId={userId} onWorkoutChange={fetchWorkouts}/>} />
                <Route path={"/workout/:id"} element={<DetailsPage />} />
            </Routes>
        </>
    )
}

export default App
