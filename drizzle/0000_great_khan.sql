CREATE TABLE `contacts` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`subject` text,
	`email` text NOT NULL,
	`message` text NOT NULL
);
