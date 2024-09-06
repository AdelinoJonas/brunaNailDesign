import React, { useState, useEffect } from 'react';
import './styles.css';

interface TimeSlot {
  available_day: string;
  start_time: string;
  end_time: string;
  is_free: boolean;
}

const mockApiData = [
  {
    available_day: "2024-09-02",
    start_time: "14:00",
    end_time: "15:30",
    is_free: true
  },
  {
    available_day: "2024-09-05",
    start_time: "09:00",
    end_time: "11:00",
    is_free: true
  },
  {
    available_day: "2024-09-05",
    start_time: "13:00",
    end_time: "15:00",
    is_free: true
  },
  {
    available_day: "2024-09-10",
    start_time: "16:00",
    end_time: "18:00",
    is_free: false
  }
];

const getDaysInMonth = (year: number, month: number) => {
  const days = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const FreeTimeTable: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [form, setForm] = useState({
    available_day: "",
    start_time: "09:00",
    end_time: "10:00",
    is_free: true
  });

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  useEffect(() => {
    setTimeSlots(mockApiData);
  }, []);

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);

  const handleAddSlot = () => {
    setTimeSlots(prev => {
      const updatedTimeSlots = [...prev, {
        ...form,
        available_day: form.available_day
      }];
      return updatedTimeSlots;
    });
    setForm({
      available_day: "",
      start_time: "09:00",
      end_time: "10:00",
      is_free: true
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setForm(prev => {
      const newForm = {
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked :
                 name === 'is_free' ? value === 'true' : value
      };
      return newForm;
    });
  };

  const showAlert = (slot: TimeSlot) => {
    alert(`Dia: ${slot.available_day}\nInício: ${slot.start_time}\nFim: ${slot.end_time}`);
  };

  const chunkArray = (array: Date[], chunkSize: number) => {
    const result: Date[][] = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  };

  const weeks = chunkArray(daysInMonth, 7);

  const timeSlotsByDay = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.available_day]) {
      acc[slot.available_day] = [];
    }
    acc[slot.available_day].push(slot);
    return acc;
  }, {} as { [key: string]: TimeSlot[] });

  Object.keys(timeSlotsByDay).forEach(day => {
    timeSlotsByDay[day].sort((a, b) => {
      const startA = a.start_time;
      const startB = b.start_time;
      return startA.localeCompare(startB);
    });
  });

  return (
    <div className="schedule-table">
      <table>
        <thead>
         <tr>
            <th>Dom</th>
            <th>Seg</th>
            <th>Ter</th>
            <th>Qua</th>
            <th>Qui</th>
            <th>Sex</th>
            <th>Sáb</th>
          </tr>
        </thead>
        <tbody>
        {weeks.map((week, index) => (
            <tr key={index}>
              {week.map(day => {
                const dateString = day.toISOString().split('T')[0];
                const slots = timeSlotsByDay[dateString] || [];
                return (
                  <td key={dateString}>
                    {slots.map(slot => (
                      <div key={`${slot.start_time}-${slot.end_time}`} className='time-slot'>
                        <span 
                          onClick={() => showAlert(slot)} 
                          className={slot.is_free ? 'free' : 'occupied'}
                        >
                          {`${slot.start_time} - ${slot.end_time}`}
                        </span>
                      </div>
                    ))}
                  </td>
                );
              })}
              {week.length < 7 &&
                Array.from({ length: 7 - week.length }).map((_, idx) => (
                  <td key={`empty-${idx}`}>&nbsp;</td>
                ))
              }
            </tr>
          ))}
        </tbody>
      </table>

      <div className="form-container">
        <h2>Criar Novo Horário</h2>
        <label>
          Dia Disponível:
          <input type="date" name="available_day" value={form.available_day} onChange={handleChange} />
        </label>
        <label>
          Início:
          <input type="time" name="start_time" value={form.start_time} onChange={handleChange} />
        </label>
        <label>
          Fim:
          <input type="time" name="end_time" value={form.end_time} onChange={handleChange} />
        </label>
        <label>
          Status:
          <select name="is_free" value={form.is_free ? "true" : "false"} onChange={handleChange}>
            <option value="true">Livre</option>
            <option value="false">Ocupado</option>
          </select>
        </label>
        <button onClick={handleAddSlot}>Adicionar Horário</button>
      </div>
    </div>
  );
};

export default FreeTimeTable;



// import React, { useState, useEffect } from 'react';
// import './schedule.css';

// interface TimeSlot {
//   available_day: string;
//   start_time: string;
//   end_time: string;
//   is_free: boolean;
// }

// const mockApiData = [
//   {
//     available_day: "Segunda-feira",
//     start_time: "14:00",
//     end_time: "15:30",
//     is_free: true
//   },
//   {
//     available_day: "Terça-feira",
//     start_time: "09:00",
//     end_time: "11:00",
//     is_free: true
//   },
//   {
//     available_day: "Quarta-feira",
//     start_time: "16:00",
//     end_time: "18:00",
//     is_free: true
//   }
// ];

// const daysOfWeek = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

// const sortHours = (timeSlots: TimeSlot[]) => {
//   return [...new Set(timeSlots.map(slot => slot.start_time))].sort();
// };

// const ScheduleTable: React.FC = () => {
//   const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
//   const [appointments, setAppointments] = useState<{ [key: string]: string }>({});
//   const [form, setForm] = useState({
//     available_day: "Segunda-feira",
//     start_time: "09:00",
//     end_time: "10:00",
//     is_free: true
//   });

//   useEffect(() => {
//     setTimeSlots(mockApiData);
//   },[]);

//   const hours = sortHours(timeSlots);

//   // const handleAppointment = (day: string, hour: string) => {
//   //   const appointmentColor = '#ffeb3b';
//   //   setAppointments(prevAppointments => {
//   //     const updatedAppointments = {
//   //       ...prevAppointments,
//   //       [`${day}-${hour}`]: appointmentColor
//   //     };
//   //     console.log('Updated appointments:', updatedAppointments);
//   //     return updatedAppointments;
//   //   });
//   // };

//   const handleAddSlot = () => {
//     setTimeSlots(prev => {
//       const updatedTimeSlots = [...prev, {
//         ...form,
//         is_free: form.is_free
//       }];
//       return updatedTimeSlots;
//     });
//     setForm({
//       available_day: "Segunda-feira",
//       start_time: "09:00",
//       end_time: "10:00",
//       is_free: true
//     });
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     const { name, value, type } = e.target;
//     setForm(prev => {
//       const newForm = {
//         ...prev,
//         [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
//                  name === 'is_free' ? value === 'true' : value
//       };
//       return newForm;
//     });
//   };

//   const showAlert = (slot: TimeSlot) => {
//     alert(`Dia: ${slot.available_day}\nInício: ${slot.start_time}\nFim: ${slot.end_time}`);
//   };

//   return (
//     <div className="schedule-table">
//       <table>
//         <thead>
//           <tr>
//             {daysOfWeek.map(day => (
//               <th key={day}>{day}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {hours.map(hour => (
//             <tr key={hour}>
//               {daysOfWeek.map(day => {
//                 const slot = timeSlots.find(
//                   slot => slot.available_day === day &&
//                           slot.start_time === hour
//                 );
//                 const appointment = appointments[`${day}-${hour}`];
//                 return (
//                   <td
//                     key={day}
//                     className={slot && slot.is_free ? 'free' : 'occupied'}
//                     style={{ backgroundColor: appointment || 'transparent' }}
//                   >
//                     {slot && (
//                       <span onClick={() => showAlert(slot)}>
//                         {`${slot.start_time} - ${slot.end_time}`}
//                       </span>
//                     )}
//                   </td>
//                 );
//               })}
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="form-container">
//         <h2>Criar Novo Horário</h2>
//         <label>
//           Dia Disponível:
//           <select name="available_day" value={form.available_day} onChange={handleChange}>
//             {daysOfWeek.map(day => (
//               <option key={day} value={day}>{day}</option>
//             ))}
//           </select>
//         </label>
//         <label>
//           Início:
//           <input type="time" name="start_time" value={form.start_time} onChange={handleChange} />
//         </label>
//         <label>
//           Fim:
//           <input type="time" name="end_time" value={form.end_time} onChange={handleChange} />
//         </label>
//         <label>
//           Status:
//           <select name="is_free" value={form.is_free ? "true" : "false"} onChange={handleChange}>
//             <option value="true">Livre</option>
//             <option value="false">Ocupado</option>
//           </select>
//         </label>
//         <button onClick={handleAddSlot}>Adicionar Horário</button>
//       </div>
//     </div>
//   );
// };

// export default ScheduleTable;
