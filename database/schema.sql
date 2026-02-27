-- ═══════════════════════════════════════════════════════════
-- DevSpark Labs Database Schema - UPDATED PRICING
-- ═══════════════════════════════════════════════════════════

CREATE DATABASE IF NOT EXISTS devspark_labs;
USE devspark_labs;

-- Drop existing tables to recreate with new prices
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS leads;

-- Create leads table
CREATE TABLE IF NOT EXISTS leads (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    college VARCHAR(200) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    project_domain VARCHAR(100) NOT NULL,
    budget VARCHAR(50) NOT NULL,
    deadline VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    message TEXT,
    status ENUM('new', 'contacted', 'in_progress', 'completed') DEFAULT 'new',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(50) NOT NULL,
    year_type VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features TEXT,
    is_popular TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    project_name VARCHAR(200) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    screenshot_path VARCHAR(255),
    status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    college_name VARCHAR(200) NOT NULL,
    year_of_study VARCHAR(50) NOT NULL,
    project_name VARCHAR(200) NOT NULL,
    rating INT NOT NULL,
    experience TEXT,
    pricing_review TEXT,
    is_approved TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ═══════════════════════════════════════════════════════════
-- INSERT SAMPLE PROJECTS WITH UPDATED PRICING
-- Mini Projects: Starting ₹1,500
-- Major Projects: Starting ₹2,000
-- Custom/Complex Projects: Starting ₹5,000
-- ═══════════════════════════════════════════════════════════

-- AI/ML Projects
INSERT INTO projects (title, description, category, year_type, price, features, is_popular) VALUES
('Image Classification System', 'Deep learning based image classifier using CNN with high accuracy', 'aiml', 'major', 2500, 'CNN Model,Dataset Training,Web Interface,Documentation,Code Explanation', 1),
('Disease Prediction ML', 'Healthcare prediction system using multiple ML algorithms', 'aiml', 'major', 3000, 'Multiple Diseases,ML Models,Accuracy Analysis,Report,Viva Prep', 1),
('Face Recognition Attendance', 'Automated attendance system using face detection technology', 'aiml', 'major', 3500, 'Face Detection,Database,Admin Panel,Reports,Deployment Help', 0),
('Sentiment Analysis Tool', 'NLP based sentiment analyzer for text and reviews', 'aiml', 'major', 2000, 'NLP Model,Web App,API,Documentation,Code Explanation', 0),
('Object Detection System', 'YOLO based real-time object detection with multiple classes', 'aiml', 'major', 4000, 'YOLO Model,Real-time Detection,GUI Interface,Documentation', 1),
('Plant Disease Detection', 'CNN model to detect diseases in plant leaves from images', 'aiml', 'major', 2800, 'CNN,Multiple Plants,Web Interface,Mobile Ready,Documentation', 0),
('Spam Email Classifier', 'ML model to classify spam vs legitimate emails', 'aiml', 'mini', 1500, 'ML Model,Dataset,Web UI,Documentation', 0),
('Handwritten Digit Recognition', 'Neural network to recognize handwritten digits', 'aiml', 'mini', 1500, 'Neural Network,MNIST,Web Interface,Documentation', 0);

-- Data Science Projects
INSERT INTO projects (title, description, category, year_type, price, features, is_popular) VALUES
('Sales Data Analytics Dashboard', 'Business analytics dashboard with interactive visualizations', 'datascience', 'major', 2200, 'Data Visualization,Insights,Dashboard,Export,Documentation', 0),
('Customer Segmentation', 'ML based customer clustering and segmentation analysis', 'datascience', 'major', 2000, 'K-Means,Visualization,Report,PPT,Code Explanation', 0),
('Stock Price Prediction', 'Time series forecasting using LSTM neural networks', 'datascience', 'major', 2800, 'LSTM Model,Charts,Prediction,Analysis,Documentation', 1),
('Fraud Detection System', 'ML model to detect fraudulent transactions in real-time', 'datascience', 'major', 3200, 'ML Models,Dashboard,Real-time,Alerts,Documentation', 0),
('COVID-19 Data Analysis', 'Analysis and visualization of COVID-19 pandemic data', 'datascience', 'mini', 1500, 'Data Analysis,Charts,Dashboard,Report', 0),
('Movie Recommendation System', 'Collaborative filtering based movie recommendations', 'datascience', 'major', 2400, 'Recommendation Engine,Web UI,Database,Documentation', 0);

-- Full Stack Projects
INSERT INTO projects (title, description, category, year_type, price, features, is_popular) VALUES
('Portfolio Website', 'Personal portfolio with modern animations and responsive design', 'fullstack', 'mini', 1500, 'Responsive,Animations,Contact Form,SEO,Documentation', 0),
('E-Commerce Platform', 'Complete shopping website with payment and admin panel', 'fullstack', 'major', 3500, 'Payment Gateway,Admin Panel,Cart,Orders,Documentation', 1),
('Blog Application', 'Full stack blog platform with authentication and comments', 'fullstack', 'major', 2000, 'CRUD,Authentication,Comments,Dashboard,Code Explanation', 0),
('Task Management App', 'React based task/todo management application', 'fullstack', 'mini', 1500, 'React,Modern UI,Responsive,LocalStorage,Documentation', 0),
('Hospital Management System', 'Complete hospital management with appointments and billing', 'fullstack', 'major', 4500, 'Patient Records,Appointments,Billing,Reports,Documentation', 0),
('Online Exam Portal', 'Platform for conducting online exams with auto-grading', 'fullstack', 'major', 3000, 'Exam System,Timer,Results,Admin Panel,Documentation', 0),
('Restaurant Management', 'Restaurant ordering and management system', 'fullstack', 'major', 2800, 'Menu,Orders,Kitchen Display,Billing,Documentation', 0),
('Social Media Clone', 'Mini social media platform with posts and messaging', 'fullstack', 'major', 3500, 'Posts,Comments,Messaging,Notifications,Documentation', 0);

-- Cybersecurity Projects
INSERT INTO projects (title, description, category, year_type, price, features, is_popular) VALUES
('Network Scanner Tool', 'Python based network analyzer and port scanner', 'cybersecurity', 'major', 2500, 'Port Scanning,Vulnerability Check,Report,GUI,Documentation', 0),
('Password Manager', 'Encrypted password storage with strong security', 'cybersecurity', 'major', 2000, 'Encryption,Secure Storage,Generator,Export,Documentation', 0),
('Keylogger Detector', 'Tool to detect keyloggers and malicious software', 'cybersecurity', 'major', 2800, 'Detection,Alerts,Reports,GUI,Documentation', 0);

-- Python Projects
INSERT INTO projects (title, description, category, year_type, price, features, is_popular) VALUES
('Web Scraper Bot', 'Automated data extraction from websites', 'python', 'mini', 1500, 'BeautifulSoup,Data Export,Scheduling,GUI,Documentation', 0),
('Automation Scripts', 'Office automation tools for Excel, Email, Files', 'python', 'mini', 1500, 'Excel Automation,Email,File Management,GUI,Documentation', 0),
('Chatbot System', 'AI powered chatbot with intent recognition', 'python', 'major', 2200, 'NLP,Intent Recognition,Web UI,Training,Documentation', 0),
('Voice Assistant', 'Python based voice assistant like Alexa/Siri', 'python', 'major', 2500, 'Speech Recognition,Commands,GUI,Documentation', 0),
('PDF Tools Application', 'Merge, split, convert PDF files with GUI', 'python', 'mini', 1500, 'PDF Operations,GUI,Batch Processing,Documentation', 0);

-- ═══════════════════════════════════════════════════════════
-- INSERT SAMPLE TESTIMONIALS
-- ═══════════════════════════════════════════════════════════

INSERT INTO reviews (student_name, college_name, year_of_study, project_name, rating, experience, pricing_review, is_approved) VALUES
('Rahul Sharma', 'JNTU Hyderabad', '4th Year', 'Image Classification System', 5, 'Amazing experience! The team helped me understand every line of code. Cleared my viva with full confidence. The project quality was excellent.', 'Much cheaper than market rate! Other vendors quoted ₹5000+ for same project. DevSpark did it in ₹2500 with better quality.', 1),
('Priya Reddy', 'VIT Vellore', '3rd Year', 'Sentiment Analysis Tool', 5, 'DevSpark Labs made my project journey smooth. Great documentation and support throughout. They explained everything patiently.', 'Super affordable! Got my major project in just ₹2000. Market rate was ₹4000-5000.', 1),
('Arun Kumar', 'SRM University', '4th Year', 'E-Commerce Platform', 4, 'Complete project with all features working perfectly. The mentors are very patient and helpful. Good code quality.', 'Reasonable pricing at ₹3500. Same project costs ₹8000-10000 elsewhere.', 1),
('Sneha Patel', 'BITS Pilani', '4th Year', 'Disease Prediction ML', 5, 'Best decision to choose DevSpark! They explain everything for viva preparation. I could answer all questions confidently.', 'Got it for ₹3000, market rate is ₹6000+. Excellent value for money!', 1),
('Vikram Singh', 'NIT Trichy', '3rd Year', 'Sales Data Analytics', 4, 'Good project delivery on time. Support team is very responsive on WhatsApp. Documentation was comprehensive.', 'Fair pricing at ₹2200. Very satisfied with the quality and price.', 1),
('Ananya Gupta', 'IIIT Hyderabad', '4th Year', 'Face Recognition Attendance', 5, 'Unique project idea! Impressed my professors. Code explanation session was excellent. They made complex concepts easy.', 'Paid ₹3500 vs market ₹7000. Highly affordable for students.', 1),
('Karthik Nair', 'Anna University', '4th Year', 'Object Detection System', 5, 'Complex YOLO project made simple by DevSpark team. Highly recommend! They even helped with deployment.', 'Best price at ₹4000. Others were charging ₹10000+ for YOLO projects.', 1),
('Divya Krishnan', 'Manipal University', '3rd Year', 'Portfolio Website', 5, 'Beautiful design and smooth animations. My portfolio stands out now! Got many appreciation from friends.', 'Mini project in just ₹1500. Great deal for students!', 1),
('Rohit Jain', 'Delhi Technical University', '4th Year', 'Stock Price Prediction', 4, 'Learned a lot about ML and LSTM during this project. Good mentorship throughout the project.', 'Competitive pricing at ₹2800. Worth every rupee spent.', 1),
('Meera Iyer', 'PSG Tech', '4th Year', 'Customer Segmentation', 5, 'DevSpark delivered exactly what I needed. Professional team with great communication skills!', 'Student-friendly pricing at ₹2000. No hidden costs at all.', 1);

SELECT 'Database setup complete with updated pricing!' AS Status;
SELECT COUNT(*) AS 'Total Projects' FROM projects;
SELECT COUNT(*) AS 'Total Reviews' FROM reviews;