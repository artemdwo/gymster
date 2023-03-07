import { useParams } from "react-router-dom";

export default function ExerciseList() {
    const { pageNumber } = useParams();
    return <h2>ExerciseList {pageNumber}</h2>
}