-- University Accommodation Office Management Queries (Corrected a-n)
-- ---------------------------------------------------------
-- These queries correspond exactly to requirements (a) through (n).

USE accommodation_db;

-- (a) Present a report listing the manager's name and telephone number for each hall of residence.
SELECT h.hall_name, s.first_name, s.last_name, s.telephone
FROM HallOfResidence h
JOIN Staff s ON h.manager_id = s.staff_number
ORDER BY h.hall_name;

-- (b) Present a report listing the names and student numbers of students with the details of their lease agreements.
SELECT s.first_name, s.last_name, s.banner_number, l.lease_number, l.enter_date, l.leave_date, l.duration_semesters
FROM Student s
JOIN Lease l ON s.banner_number = l.student_banner_number;

-- (c) Display the details of lease agreements that include the Summer Semester.
-- Filtering by the semester name "Summer" or date range overlapping June-August.
SELECT * FROM Lease
WHERE lease_number IN (SELECT lease_number FROM Invoice WHERE semester LIKE 'Summer%')
   OR (MONTH(enter_date) <= 8 AND MONTH(leave_date) >= 6);

-- (d) Display the details of the total rent paid by a given student.
-- Example for student 'B00001'
SELECT s.first_name, s.last_name, SUM(i.payment_due) AS total_rent_paid
FROM Student s
JOIN Lease l ON s.banner_number = l.student_banner_number
JOIN Invoice i ON l.lease_number = i.lease_number
WHERE s.banner_number = 'B00001' AND i.date_paid IS NOT NULL
GROUP BY s.banner_number, s.first_name, s.last_name;

-- (e) Present a report on students that have not paid their invoices by a given date.
-- Example date: '2026-10-01'. Returns invoices where due_date has passed but date_paid is null.
SELECT s.first_name, s.last_name, i.invoice_number, i.payment_due, i.due_date
FROM Student s
JOIN Lease l ON s.banner_number = l.student_banner_number
JOIN Invoice i ON l.lease_number = i.lease_number
WHERE i.date_paid IS NULL AND i.due_date <= '2026-10-01';

-- (f) Display the details of apartment inspections where the property was found to be in an unsatisfactory condition.
SELECT * FROM Inspection
WHERE satisfactory_condition = FALSE;

-- (g) Present a report of the names and banner numbers of students with their room number and place number in a particular hall of residence.
-- Example for 'Hall A'
SELECT s.first_name, s.last_name, s.banner_number, r.room_number, r.place_number
FROM Student s
JOIN Lease l ON s.banner_number = l.student_banner_number
JOIN Room r ON l.place_number = r.place_number
WHERE r.hall_name = 'Hall A';

-- (h) List the details of all students currently on the waiting list for accommodation.
SELECT * FROM Student
WHERE status = 'waiting';

-- (i) Display the total number of students in each student category (e.g., undergraduate, postgraduate).
SELECT category, COUNT(*) as student_count
FROM Student
GROUP BY category;

-- (j) Present a report of the names and student numbers for all students who have not supplied details of their next-of-kin.
SELECT s.first_name, s.last_name, s.banner_number
FROM Student s
LEFT JOIN NextOfKin n ON s.banner_number = n.student_banner_number
WHERE n.student_banner_number IS NULL;

-- (k) Display the name and internal telephone number of the Adviser for a particular student (e.g., 'B00001').
SELECT s.first_name AS student_first, s.last_name AS student_last, 
       st.first_name AS adviser_first, st.last_name AS adviser_last, st.telephone
FROM Student s
JOIN Staff st ON s.adviser_id = st.staff_number
WHERE s.banner_number = 'B00001';

-- (l) Display the minimum, maximum, and average monthly rent for rooms in all residence halls.
SELECT MIN(monthly_rent) as min_rent, MAX(monthly_rent) as max_rent, AVG(monthly_rent) as avg_rent
FROM Room
WHERE hall_name IS NOT NULL;

-- (m) Display the total number of places (rooms) in each residence hall.
SELECT hall_name, COUNT(*) as total_places
FROM Room
WHERE hall_name IS NOT NULL
GROUP BY hall_name;

-- (n) Display the staff number, name, age, and current location of all members of the residence staff who are over 60 years old today.
SELECT staff_number, first_name, last_name, 
       TIMESTAMPDIFF(YEAR, dob, CURDATE()) AS age, 
       location
FROM Staff
WHERE TIMESTAMPDIFF(YEAR, dob, CURDATE()) > 60;
