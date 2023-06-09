-- USERS TABLE
CREATE TABLE IF NOT EXISTS `users` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL UNIQUE,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(20) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'inactive',
    `type` ENUM('user', 'admin') NOT NULL DEFAULT 'user'
);


-- Exam Questions
CREATE TABLE IF NOT EXISTS `exam_questions` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `question` VARCHAR(255) NOT NULL,
    `audio_file` VARCHAR(255) NOT NULL,
    `status` ENUM('active', 'inactive') NOT NULL DEFAULT 'active'
);



-- Questions Answers
CREATE TABLE IF NOT EXISTS `question_answers` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `text` TEXT NOT NULL,
    `priority` INT UNSIGNED NOT NULL,
    `isValid` BOOLEAN NOT NULL,
    `questionId` INT UNSIGNED NOT NULL,
    FOREIGN KEY (`questionId`) REFERENCES `exam_questions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);



-- Users Submissions
CREATE TABLE IF NOT EXISTS `user_submissions_history` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `userId` INT UNSIGNED NOT NULL,
    `correctQuestionsNumber` INT UNSIGNED NOT NULL,
    `allExamQuestionsNumber` INT UNSIGNED NOT NULL,
    `submittedAt` DATETIME NOT NULL DEFAULT NOW(),
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);


-- Submissions Answers (Historical data)
CREATE TABLE IF NOT EXISTS `submissions_questions_answers` (
    `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    `submissionId` INT UNSIGNED NOT NULL,
    `questionText` VARCHAR(255) NOT NULL,
    `questionAudioFile` VARCHAR(255) NOT NULL,
    `answerText` TEXT NOT NULL,
    `isValidAnswer` BOOLEAN NOT NULL,
    FOREIGN KEY (`submissionId`) REFERENCES `user_submissions_history` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
);

