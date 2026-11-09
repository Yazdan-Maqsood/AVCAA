USE acvaa_db;

-- Note: Passwords below are bcrypt hashes for the string "password123"
-- You can generate your own by running: bcrypt.hash('password123', 10)

INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@acvaa.com', '$2a$10$X7x.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q', 'admin'),
('John Teacher', 'teacher@acvaa.com', '$2a$10$X7x.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q', 'teacher'),
('Alice Student', 'student@acvaa.com', '$2a$10$X7x.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q.5Q', 'student');

-- Insert dummy submission
INSERT INTO submissions (user_id, file_name, file_path, status, authorship_score) 
VALUES (3, 'algorithm.py', '/uploads/dummy.py', 'analyzed', 92.5);

-- Insert dummy viva questions
INSERT INTO viva_questions (submission_id, question_text, difficulty) VALUES 
(1, 'Why did you use a while loop instead of a for loop here?', 'Basic'),
(1, 'What is the time complexity of this algorithm?', 'Intermediate'),
(1, 'How would you optimize this code for large datasets?', 'Advanced');