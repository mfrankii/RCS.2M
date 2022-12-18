CREATE TABLE IF NOT EXISTS `db`.`Users` (
    `user_id` INT NOT NULL AUTO_INCREMENT,
    `userName` VARCHAR(25) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(125) NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (`user_id`)
);

CREATE TABLE IF NOT EXISTS `db`.`Plans` (
  `plan_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `price` FLOAT NOT NULL,
  `dataSize` FLOAT NOT NULL,
  CONSTRAINT plan_pk PRIMARY KEY (`plan_id`)
);

CREATE TABLE IF NOT EXISTS `db`.`Consumers` (
  `consumer_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `phone` VARCHAR(15) NOT NULL,
  `email` VARCHAR(50) NOT NULL,
  `plan_id` INT NOT NULL,
  `isActive` BOOLEAN NOT NULL,
  CONSTRAINT plan_pk PRIMARY KEY (`consumer_id`)
);