import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Modal,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";

import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

import { fetchTasks, createTask, updateTask, deleteTask, getFarms, getFarmStaff } from "../services/api";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [farms, setFarms] = useState([]);
  const [farmStaff, setFarmStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [taskTime, setTaskTime] = useState(dayjs());
  const [taskStatus, setTaskStatus] = useState("Pending");
  const [assignedTo, setAssignedTo] = useState("");
  const [farmId, setFarmId] = useState("");

  useEffect(() => {
    loadTasks();
    loadFarms();
  }, []);

  const loadTasks = async () => {
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadFarms = async () => {
    try {
      const data = await getFarms();
      setFarms(data);
    } catch (error) {
      console.error("Error fetching farms:", error);
    }
  };

  const loadFarmStaff = async (farmId) => {
    try {
      const staff = await getFarmStaff(farmId);
      setFarmStaff(staff);
    } catch (error) {
      console.error("Error fetching farm staff:", error);
    }
  };

  const handleFarmChange = (event) => {
    const selectedFarm = event.target.value;
    setFarmId(selectedFarm);
    setAssignedTo(""); // Reset assigned staff when farm changes
    loadFarmStaff(selectedFarm);
  };

  const handleSaveTask = async () => {
    if (!taskTitle || !taskDate || !taskTime || !assignedTo || !farmId) return;

    const taskData = {
      title: taskTitle,
      due_date: taskDate,
      time: taskTime.format("HH:mm"),
      status: taskStatus,
      assigned_to: assignedTo,
      farm: farmId,
    };

    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, taskData);
      } else {
        await createTask(assignedTo, farmId, taskTitle, taskDate, taskTime.format("HH:mm"));
      }
      setModalOpen(false);
      loadTasks();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        🛠 Farm Task Management
      </Typography>

      <Button variant="contained" color="primary" onClick={() => setModalOpen(true)} sx={{ mt: 2 }}>
        ➕ Add Task
      </Button>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ffa500" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Task</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Name</TableCell>

                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Date</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Time</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Status</TableCell>
                <TableCell sx={{ fontWeight: "bold", color: "white" }}>Actions</TableCell>

              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>
        {task.assigned_to_username ? task.assigned_to_username : task.assigned_to_email}
      </TableCell>
                  <TableCell>{task.due_date}</TableCell>
                  <TableCell>{task.time}</TableCell>
                  <TableCell>{task.status}</TableCell>

                  <TableCell>
                    <Button size="small" color="primary" onClick={() => { setSelectedTask(task); setModalOpen(true); }}>
                      ✏️ Edit
                    </Button>
                    <Button size="small" color="error" onClick={() => handleDeleteTask(task.id)}>
                      ❌ Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Task Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box sx={{ p: 4, backgroundColor: "white", borderRadius: 2, mx: "auto", mt: 10, width: 400 }}>
          <Typography variant="h6">{selectedTask ? "Edit Task" : "Add Task"}</Typography>

          {/* Select Farm */}
          <Select fullWidth value={farmId} onChange={handleFarmChange} sx={{ mt: 2 }} displayEmpty>
            <MenuItem value="" disabled>
              Select a Farm
            </MenuItem>
            {farms.map((farm) => (
              <MenuItem key={farm.id} value={farm.id}>
                {farm.name}
              </MenuItem>
            ))}
          </Select>

          {/* Task Title */}
          <TextField
            fullWidth
            label="Task Title"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            sx={{ mt: 2 }}
            placeholder="Enter task (e.g., Milking, Cleaning, Feeding)"
          />

          {/* Task Date */}
          <TextField fullWidth type="date" value={taskDate} onChange={(e) => setTaskDate(e.target.value)} sx={{ mt: 2 }} />

          {/* Task Time */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              label="Select Time"
              value={taskTime}
              onChange={(newValue) => setTaskTime(newValue)}
              renderInput={(params) => <TextField {...params} fullWidth sx={{ mt: 2 }} />}
            />
          </LocalizationProvider>

          {/* Select Staff */}
          <Select fullWidth value={assignedTo} onChange={(e) => setAssignedTo(e.target.value)} sx={{ mt: 2 }} displayEmpty disabled={!farmId}>
            <MenuItem value="" disabled>
              Select Staff
            </MenuItem>
            {farmStaff.map((staff) => (
              <MenuItem key={staff.user.id} value={staff.user.id}>
                {staff.user.first_name} {staff.user.last_name} ({staff.user.email})
              </MenuItem>
            ))}
          </Select>

          {/* Status */}
          <Select fullWidth value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} sx={{ mt: 2 }}>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>

          <Button variant="contained" color="primary" onClick={handleSaveTask} sx={{ mt: 2 }}>
            Save Task
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default TaskManagement;
