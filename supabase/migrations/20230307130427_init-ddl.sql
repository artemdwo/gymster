CREATE TABLE
    user_profiles (
        user_id UUID PRIMARY KEY REFERENCES auth.users(id) NOT NULL,
        username TEXT UNIQUE NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now (),
        updated_at timestamptz NOT NULL DEFAULT now (),
        CONSTRAINT name_length CHECK (
            char_length(username) > 3
            AND char_length(username) < 15
        ),
        CONSTRAINT name_regex CHECK (
            username ~* '^[a-zA-Z0-9_]+$'
        )
    );

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "noone can see profile" 
ON public.user_profiles 
AS PERMISSIVE FOR SELECT 
TO public 
USING (auth.uid() = user_id);

CREATE POLICY "only owner can insert" 
ON public.user_profiles 
AS PERMISSIVE FOR INSERT 
TO public 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "only owner can update" 
ON public.user_profiles 
AS PERMISSIVE FOR UPDATE 
TO public 
USING (auth.uid() = user_id) 
WITH CHECK (auth.uid() = user_id);

CREATE TABLE workouts (
    workout_id SERIAL NOT NULL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id),
    workout_name TEXT NOT NULL,
    workout_date DATE NOT NULL,
    notes TEXT,
    tags TEXT[]
);

CREATE TABLE exercises (
    exercise_id SERIAL NOT NULL PRIMARY KEY,
    workout_id INTEGER NOT NULL REFERENCES workouts(workout_id),
    exercise_name TEXT NOT NULL,
    notes TEXT,
    tags TEXT[]
);

CREATE TABLE sets (
    set_id SERIAL NOT NULL PRIMARY KEY,
    exercise_id INTEGER NOT NULL REFERENCES exercises(exercise_id),
    set_number INTEGER NOT NULL,
    weight FLOAT NOT NULL,
    reps INTEGER NOT NULL,
    tags TEXT[]
);

CREATE POLICY workouts_policy ON workouts FOR ALL TO public USING (user_id = auth.uid());

CREATE FUNCTION check_exercises_policy(user_id UUID, exercise_id INTEGER)
RETURNS boolean
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM workouts
    WHERE workout_id = (SELECT workout_id FROM exercises WHERE exercise_id = $2)
      AND user_id = $1
  );
$$ LANGUAGE SQL;

CREATE POLICY exercises_policy ON exercises FOR ALL TO public USING (check_exercises_policy(auth.uid()::UUID, exercise_id::INTEGER));

CREATE FUNCTION check_sets_policy(user_id UUID, set_id INTEGER)
RETURNS boolean
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM workouts
    JOIN exercises ON workouts.workout_id = exercises.workout_id
    WHERE exercises.exercise_id = (SELECT exercise_id FROM sets WHERE set_id = $2)
      AND user_id = $1
  );
$$ LANGUAGE SQL;

CREATE POLICY sets_policy ON sets FOR ALL TO public USING (check_sets_policy(auth.uid()::UUID, set_id::INTEGER));