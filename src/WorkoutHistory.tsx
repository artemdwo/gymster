import { useContext, useEffect, useState } from "react";
import { UserContext } from "./App";
import { sbClient } from "./sb-client";
import { Workouts } from "./dbsb.types";
import { WorkoutDetails } from "./WorkoutDetails";

export default function WorkoutHistory() {
  const { session, profile } = useContext(UserContext);
  const [workouts, setWorkouts] = useState<Workouts[]>([]);
  useEffect(() => {
    if (session?.user) {
      sbClient
        .from("workouts")
        .select("*")
        .order("workout_id", { ascending: false })
        .then(({ data }) => {
          setWorkouts(data as Workouts[]);
        });
    }
  });

  return (
    <div className="workout-details-card-wrapper">
      {workouts?.map((workout, i) => {
        return (
          <WorkoutDetails
            key={i}
            date={workout.workout_date}
            name={workout.workout_name}
            notes={workout.notes}
            tags={workout.tags}
          />
        );
      })}
    </div>
  );
}
