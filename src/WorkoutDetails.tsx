interface WorkoutDetailsProps {
  key: number;
  date: string;
  name: string;
  notes: string | null;
  tags: string[] | null;
}

export function WorkoutDetails(props: WorkoutDetailsProps) {
  const { key, date, name, notes, tags } = props;

  return (
    <div key={key} className="workout-details-card">
      <h3>Workout Details</h3>
      <p>Date: {date}</p>
      <p>Name: {name}</p>
      <p>Notes: {notes}</p>
      <p>Tags: {tags?.join(", ")}</p>
    </div>
  );
}
