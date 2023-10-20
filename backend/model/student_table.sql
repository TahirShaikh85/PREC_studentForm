-- 🔴 this file is not neccessary in this app code🔴
-- 🔴 this is just a reference file 🔴

CREATE DATABASE PRECstudents;
USE PRECstudents;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  age INT,
  department VARCHAR(255),
  class VARCHAR(255),
  dob VARCHAR(255),
  gender VARCHAR(10),
  address VARCHAR(255),
  village VARCHAR(255),
  street VARCHAR(255),
  locality VARCHAR(255),
  taluka VARCHAR(255),
  district VARCHAR(255),
  state VARCHAR(255),
  pincode VARCHAR(10),
  studentMobile VARCHAR(10),
  parentMobile VARCHAR(10)
);
