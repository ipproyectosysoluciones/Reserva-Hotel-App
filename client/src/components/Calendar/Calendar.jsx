import Fullcalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

function Calendar() {
  const handleDateClick = () => {
    // bind with an arrow function
    alert('clickaste un date!');
  };

  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView={'dayGridMonth'}
        height={'90vh'}
        locale={'esLocale'}
        dateClick={handleDateClick}
        selectable={false}
        select={('2023-09-06', ['2023-09-10'])}
      />
    </div>
  );
}

export default Calendar;
