CREATE TABLE IF NOT EXISTS `db`.`User` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(25) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(125) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `db`.`Consumer` (
  `consumer_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `isActive` BOOLEAN NOT NULL,
  CONSTRAINT plan_pk PRIMARY KEY (`consumer_id`)
);

CREATE TABLE IF NOT EXISTS `db`.`Token` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(125) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `expired` VARCHAR(100) NOT NULL,
  CONSTRAINT plan_pk PRIMARY KEY (`id`)
);