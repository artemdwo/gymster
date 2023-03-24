INSERT INTO auth.users (id, email, encrypted_password) VALUES 
    ('a6cd079b-7b4e-4c61-86bd-18f2fe6b64fa','1@1.1','$2a$10$IZfrRKU.u9osabVHOCkI5exK58ZEXTTHPB9zusAwQOeCNzjIAOI/G'),
    ('9cd9a32d-96f1-40bf-95a9-ee5c42d6e38a','2@2.2','$2a$10$IZfrRKU.u9osabVHOCkI5exK58ZEXTTHPB9zusAwQOeCNzjIAOI/G');

INSERT INTO workouts (workout_id, user_id, workout_name, workout_date, notes, tags) VALUES 
    (1, 'a6cd079b-7b4e-4c61-86bd-18f2fe6b64fa', 'Leg Day', '2022-01-01', 'Good workout', ARRAY['legs']::TEXT[]),
    (2, 'a6cd079b-7b4e-4c61-86bd-18f2fe6b64fa', 'Chest Day', '2022-01-03', 'Great workout', ARRAY['chest']::TEXT[]);

INSERT INTO exercises (exercise_id, workout_id, exercise_name, notes, tags) VALUES 
    (1, 1, 'Squats', 'Heavy weight', ARRAY['legs']::TEXT[]),
    (2, 1, 'Lunges', 'Good form', ARRAY['legs']::TEXT[]),
    (3, 2, 'Bench Press', 'Increased weight', ARRAY['chest']::TEXT[]),
    (4, 2, 'Push-ups', 'Good pump', ARRAY['chest']::TEXT[]);

INSERT INTO sets (set_id, exercise_id, set_number, weight, reps, tags) VALUES 
    (1, 1, 1, 100.0, 10, ARRAY['legs']::TEXT[]),
    (2, 1, 2, 110.0, 8, ARRAY['legs']::TEXT[]),
    (3, 1, 3, 120.0, 6, ARRAY['legs']::TEXT[]),
    (4, 2, 1, 50.0, 10, ARRAY['legs']::TEXT[]),
    (5, 2, 2, 55.0, 8, ARRAY['legs']::TEXT[]),
    (6, 2, 3, 60.0, 6, ARRAY['legs']::TEXT[]),
    (7, 3, 1, 80.0, 10, ARRAY['chest']::TEXT[]),
    (8, 3, 2, 90.0, 8, ARRAY['chest']::TEXT[]),
    (9, 3, 3, 100.0, 6, ARRAY['chest']::TEXT[]),
    (10, 4, 1, 0.0, 20, ARRAY['chest']::TEXT[]),
    (11, 4, 2, 0.0, 25, ARRAY['chest']::TEXT[]),
    (12, 4, 3, 0.0, 30, ARRAY['chest']::TEXT[]);

INSERT INTO workouts (workout_id, user_id, workout_name, workout_date, notes, tags) VALUES 
    (3, '9cd9a32d-96f1-40bf-95a9-ee5c42d6e38a', 'Back Day', '2022-01-02', 'Good workout', ARRAY['back']::TEXT[]),
    (4, '9cd9a32d-96f1-40bf-95a9-ee5c42d6e38a', 'Shoulder Day', '2022-01-04', 'Great workout', ARRAY['shoulders']::TEXT[]),
    (5, '9cd9a32d-96f1-40bf-95a9-ee5c42d6e38a', 'Arm Day', '2022-01-06', 'Fantastic workout', ARRAY['arms']::TEXT[]);

INSERT INTO exercises (exercise_id, workout_id, exercise_name, notes, tags) VALUES 
    (5, 3, 'Pull-ups', 'Good pump', ARRAY['back']::TEXT[]),
    (6, 3, 'Rows', 'Increased weight', ARRAY['back']::TEXT[]),
    (7, 4, 'Overhead Press', 'Good form', ARRAY['shoulders']::TEXT[]),
    (8, 4, 'Lateral Raises', 'Increased reps', ARRAY['shoulders']::TEXT[]),
    (9, 5, 'Bicep Curls', 'Great pump', ARRAY['arms']::TEXT[]),
    (10, 5, 'Tricep Extensions', 'Good burn', ARRAY['arms']::TEXT[]);

INSERT INTO sets (set_id, exercise_id, set_number, weight, reps, tags) VALUES 
    (13, 5, 1, 0.0, 10, ARRAY['back']::TEXT[]),
    (14, 5, 2, 0.0, 8, ARRAY['back']::TEXT[]),
    (15, 5, 3, 0.0, 6, ARRAY['back']::TEXT[]),
    (16, 6, 1, 70.0, 10, ARRAY['back']::TEXT[]),
    (17, 6, 2, 75.0, 8, ARRAY['back']::TEXT[]),
    (18, 6, 3, 80.0, 6, ARRAY['back']::TEXT[]),
    (19, 7, 1, 40.0, 10, ARRAY['shoulders']::TEXT[]),
    (20, 7, 2, 45.0, 8, ARRAY['shoulders']::TEXT[]),
    (21, 7, 3, 50.0, 6, ARRAY['shoulders']::TEXT[]),
    (22, 8, 1, 20.0, 10, ARRAY['shoulders']::TEXT[]),
    (23, 8, 2, 25.0, 8, ARRAY['shoulders']::TEXT[]),
    (24, 8, 3, 30.0, 6, ARRAY['shoulders']::TEXT[]),
    (25, 9, 1, 20.0, 10, ARRAY['arms']::TEXT[]),
    (26, 9, 2, 25.0, 8, ARRAY['arms']::TEXT[]),
    (27, 9, 3, 30.0, 6, ARRAY['arms']::TEXT[]),
    (28, 10, 1, 25.0, 10, ARRAY['arms']::TEXT[]),
    (29, 10, 2, 30.0, 8, ARRAY['arms']::TEXT[]),
    (30, 10, 3, 35.0, 6, ARRAY['arms']::TEXT[]);