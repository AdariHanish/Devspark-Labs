-- ═══════════════════════════════════════════════════════════
-- DevSpark Labs - Add market_price column & Re-seed
-- Per-project Indian student project market research prices
-- ═══════════════════════════════════════════════════════════

USE devspark_labs;

-- Add market_price column if it doesn't exist
ALTER TABLE projects ADD COLUMN IF NOT EXISTS market_price INT DEFAULT 0;

DELETE FROM projects;

-- ══════════════════════ AI/ML ══════════════════════
-- market_price = real Indian market rates (freelancer/project-selling sites)
INSERT INTO projects (title, description, category, year_type, price, market_price, features, is_popular) VALUES
('Face Recognition UI',         'Modern dashboard UI for a face recognition system with real-time visual feedback', 'aiml', 'major', 2199, 3499, 'Real-time Camera Feed,Canvas Overlays,User Dashboard,Profile Settings', 1),
('Object Detection Visualizer', 'Interactive web interface showing YOLO-based bounding boxes and detection results', 'aiml', 'major', 1999, 2999, 'Image Upload,Bounding Box Rendering,Confidence Scores,Export Results', 1),
('MNIST Digit Canvas',          'Drawing pad interface for digit recognition with live chart feedback', 'aiml', 'mini',  1199, 1999, 'Drawing Canvas,Smoothing Filter,Prediction Chart,Documentation', 1),
('Sentiment Meter',             'Text analysis tool with visual gauge showing positive/negative sentiment', 'aiml', 'mini',  1499, 2199, 'Text Input,Sentiment Gauge,Word Frequency,History Panel', 0),
('Iris Classifier UI',          'Responsive input form for botanical parameters with animated result card', 'aiml', 'mini',   999, 1499, 'Input Validation,Animated Result,Clean Layout,Documentation', 0),
('Fake News Detector UI',       'Clean interface for submitting headlines and viewing credibility scores', 'aiml', 'major', 1799, 2799, 'Input Form,Score Meter,Source Badge,Explanation Card', 0),
('Pose Estimation Display',     'Skeleton overlay visualization for human pose estimation models', 'aiml', 'major', 2399, 3999, 'Camera Feed,Skeleton Overlay,Joint Tracking,Dark UI', 0);

-- ══════════════════════ DATA SCIENCE ══════════════════════
INSERT INTO projects (title, description, category, year_type, price, market_price, features, is_popular) VALUES
('Global Climate Dashboard',    'Interactive visualization showing temperature trends and climate indicators', 'datascience', 'major', 2499, 3499, 'Interactive Maps,Multi-series Charts,Yearly Comparisons,Data Tables', 1),
('Olympic History Explorer',    'Infographic-style dashboard exploring historical Olympic performance data', 'datascience', 'major', 1999, 2999, 'Interactive Timeline,Country Comparisons,Medal Tally,Filters', 1),
('E-Commerce Sales Insights',   'Business dashboard for tracking revenue, products, and customer trends', 'datascience', 'major', 2199, 3199, 'KPI Cards,Category Filters,Monthly Trends,Clean Charts', 1),
('Stock Market Tracker',        'Real-time price visualization with candlestick charts and indicators', 'datascience', 'major', 2799, 3999, 'Candlestick Charts,EMA/SMA,Watchlist UI,Price Alerts', 0),
('IPL Stats Dashboard',         'Cricket analytics platform with player comparisons and match statistics', 'datascience', 'mini',  1499, 2199, 'Player Cards,Match Stats,Season Filter,Bar Charts', 0),
('COVID-19 Tracker UI',         'Clean dashboard for tracking health metrics and vaccine distribution', 'datascience', 'mini',  1199, 1799, 'Daily Stats,Heat Map,Country Filter,Documentation', 0),
('HR Analytics Report',         'Employee data visualization showing attrition and performance trends', 'datascience', 'major', 1999, 2999, 'Attrition Chart,Department Filter,KPIs,Comparison View', 0);

-- ══════════════════════ FRONTEND ══════════════════════
INSERT INTO projects (title, description, category, year_type, price, market_price, features, is_popular) VALUES
('NexGen Portfolio Website',        'Premium portfolio with 3D tilt effects, GSAP animations, and dark mode', 'frontend', 'major', 1999, 2799, 'GSAP Animations,3D Tilt,Dark Mode,SEO Optimized', 1),
('Modern E-Commerce Storefront',    'Stunning product catalog UI with cart, wishlist, and checkout animations', 'frontend', 'major', 2499, 3499, 'Product Grid,Cart,Wishlist,Responsive Design', 1),
('Food Delivery App UI',            'Mobile-first restaurant ordering interface with order tracking animations', 'frontend', 'major', 2199, 3199, 'Menu Filters,Order Tracking,Smooth Animations,Responsive', 1),
('SaaS Landing Page',               'Conversion-optimized landing page with feature sections and pricing table', 'frontend', 'mini',  1199, 1799, 'Hero Section,Pricing Table,Testimonials,Contact Form', 0),
('Minimalist Blog UI',              'Reading-focused blog interface with dark mode and typography emphasis', 'frontend', 'mini',   999, 1499, 'Reading Mode,Post Cards,Dark Mode,Mobile Ready', 0),
('Admin Dashboard UI',              'Modern analytics dashboard with sidebar, charts, tables, and KPI cards', 'frontend', 'major', 1799, 2599, 'Sidebar Nav,Charts,Data Tables,KPI Cards', 0),
('Travel Agency Website',           'Visually rich travel booking site with destination cards and gallery', 'frontend', 'major', 1999, 2799, 'Destination Cards,Gallery,Search Bar,Animated Cards', 0);

-- ══════════════════════ CYBERSECURITY ══════════════════════
INSERT INTO projects (title, description, category, year_type, price, market_price, features, is_popular) VALUES
('SecureVault PW Generator',        'Advanced client-side password generator with entropy meter and history', 'cybersecurity', 'major', 1799, 2799, 'Strength Meter,Clipboard API,History,Export Options', 1),
('Vulnerability Scanner Dashboard', 'Frontend UI showing severity levels, scan reports, and remediation tips', 'cybersecurity', 'major', 2199, 3499, 'Scan Reports,Severity Filter,PDF Export UI,Clean Dark UI', 1),
('Phishing Awareness Portal',       'Interactive quiz-based portal with cybersecurity training modules', 'cybersecurity', 'mini',  1499, 2199, 'Quiz System,Scenario Training,Progress Tracker,Certificate', 1),
('Network Monitor UI',              'Visualization dashboard for live network traffic with status indicators', 'cybersecurity', 'major', 2399, 3799, 'Live Graphs,Device Cards,Threat Levels,Clean Layout', 0),
('Hash Generator Tool',             'Browser-side MD5/SHA-256 hashing tool for text and file inputs', 'cybersecurity', 'mini',   999, 1499, 'Multiple Algorithms,File Support,Instant Results,Documentation', 0),
('Steganography Explorer',          'UI for hiding and extracting messages from images using browser APIs', 'cybersecurity', 'major', 1999, 2799, 'Image Upload,Message Embed,Extraction UI,Documentation', 0),
('Cyber Threat News Monitor',       'Dashboard aggregating cybersecurity alerts with categorized severity cards', 'cybersecurity', 'mini',  1199, 1799, 'News Grid,Severity Labels,Filter Panel,Dark Theme', 0);

-- ══════════════════════ PYTHON ══════════════════════
INSERT INTO projects (title, description, category, year_type, price, market_price, features, is_popular) VALUES
('PDF Suite UI',        'Modern interface for merging, splitting, and converting PDF documents', 'python', 'major', 1999, 2799, 'Drag and Drop,File Preview,Batch Processing,Clean Design', 1),
('Weather Hub',         'Interactive weather forecast interface with animated weather icons', 'python', 'major', 1799, 2599, 'Animated Icons,7-Day Forecast,Location Search,Hourly Details', 1),
('Unit Conversion Pro', 'Comprehensive multi-domain converter with live results and history', 'python', 'mini',  1199, 1799, 'Multi-Domain,Real-time Results,History,Clean Icons', 1),
('Inventory Tracker UI','Desktop-like inventory management interface for small businesses', 'python', 'major', 2199, 2999, 'Item Grid,Stock Alerts,Search Filter,Reports', 0),
('Scientific Calculator','Calculator UI with scientific mode, history, and keyboard support', 'python', 'mini',   999, 1499, 'Scientific Mode,Keyboard Support,History,Theme Toggle', 0),
('Expense Tracker',     'Personal finance dashboard tracking income, expenses, and savings', 'python', 'mini',  1399, 1999, 'Charts,Category Tags,Monthly View,Export CSV', 0),
('Pomodoro Timer App',  'Productivity timer with sessions, custom intervals, and sound alerts', 'python', 'mini',   999, 1499, 'Custom Timer,Session Log,Sound Alerts,Progress Ring', 0);

SELECT 'Seed with market prices complete!' AS Status;
SELECT title, price, market_price, (market_price - price) AS savings FROM projects ORDER BY savings DESC;
