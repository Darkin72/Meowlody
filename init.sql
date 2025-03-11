CREATE TABLE `song` (
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
	`favorite` TINYINT(3) UNSIGNED NOT NULL DEFAULT '0',
	`title` VARCHAR(250) NOT NULL DEFAULT 'No information' COLLATE 'utf8mb4_0900_ai_ci',
	`artist` VARCHAR(250) NOT NULL DEFAULT 'No information' COLLATE 'utf8mb4_0900_ai_ci',
	`album` VARCHAR(250) NOT NULL DEFAULT 'No information' COLLATE 'utf8mb4_0900_ai_ci',
	`duration` VARCHAR(250) NOT NULL DEFAULT 'No information' COLLATE 'utf8mb4_0900_ai_ci',
	`genre` VARCHAR(250) NOT NULL DEFAULT 'No information' COLLATE 'utf8mb4_0900_ai_ci',
	`date` VARCHAR(250) NOT NULL DEFAULT 'No information' COLLATE 'utf8mb4_0900_ai_ci',
	`type` VARCHAR(250) NOT NULL DEFAULT 'No information' COLLATE 'utf8mb4_0900_ai_ci',
	`src` VARCHAR(250) NOT NULL COLLATE 'utf8mb4_0900_ai_ci',
	PRIMARY KEY (`id`) USING BTREE,
	INDEX `favorite` (`favorite`) USING BTREE
)
COLLATE='utf8mb4_0900_ai_ci'
ENGINE=InnoDB
AUTO_INCREMENT=38
;
