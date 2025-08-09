import React from "react";

const availableSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"
];

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const TimeSlotsTable = () => {
  return (
    <div className="p-4 w-screen flex justify-center">
      <h2 className="text-2xl font-bold text-black text-center mb-4">PawSpa Grooming Available Slots</h2>
      <div className="overflow-x-auto" style={{ maxWidth: "1300px" }}>
        <table className="w-full border border-white text-white rounded-md" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", width: "1300px", borderRadius: "14px" }}>
          <thead>
            <tr style={{ backgroundColor: "rgba(135, 206, 250, 0.5)" }}>
              <th className="border border-white p-2">Time Slot</th>
              {weekdays.map((day) => (
                <th key={day} className="border border-white p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {availableSlots.map((slot) => (
              <tr key={slot} style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}>
                <td className="border border-white p-2 text-center">{slot}</td>
                {weekdays.map((day) => (
                  <td key={day} className="border border-white p-2 text-center">✓</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TimeSlotsTable;