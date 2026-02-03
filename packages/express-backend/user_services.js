import User from "./user.js";
import mongoose from "mongoose";

// Get all users
function getUsers() {
  return User.find();
}

// Find users by name
function findUserByName(name) {
  return User.find({ name: name });
}

// Find users by job
function findUserByJob(job) {
  return User.find({ job: job });
}

// Find users by both name and job
function findUserByNameAndJob(name, job) {
  return User.find({ name: name, job: job });
}

// Find user by ID
function findUserById(id) {
  return User.findById(id);
}

// Add a new user
function addUser(user) {
  const userToAdd = new User(user);
  return userToAdd.save();
}

// Delete user by ID
function deleteUserById(id) {
  return User.findByIdAndDelete(id);
}

export default {
  getUsers,
  findUserByName,
  findUserByJob,
  findUserByNameAndJob,
  findUserById,
  addUser,
  deleteUserById
};
